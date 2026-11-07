# UNIVERSE — Architektur

**One platform. Unlimited sources. Your own experience.** UNIVERSE ist ein universeller, pluginbasierter Web-Content-Hub für Scripting auf iOS: Media, News, Reading, Kalender, Communities und Websites. Anime ist ein Anwendungsfall; AniWorld ist ein mögliches Plugin.

## Status und Grenzen

Dieses Dokument beschreibt die Zielarchitektur, nicht eine fertige Plattform. Geplante UNIVERSE-APIs sind keine vorhandenen Scripting-APIs. Version 0.5.12 behält das dokumentierte `TabView`/`Tab` mit fünf nativen Primärbereichen bei. `RootScreen` wird aus einem gemeinsamen Literal-Tupel abgeleitet und typisiert den Observable-Wert; `toolbarBackgroundVisibility` blendet gezielt den nativen Tab-Bar-Hintergrund aus. Info bleibt separat im Header erreichbar. Die Shell zeigt zwölf lokale Demo-Fixtures mit sichtbarer Herkunft, Typfiltern, Feed und lokalen Detailvorschlägen. Der Nutzer bestätigt die in 0.5.6 ergänzte Viewportbreite; das Projekt hat sie nicht unabhängig am Gerät geprüft. Die Merkliste nutzt `Storage.get/set` im dokumentierten privaten Scripting-Bereich und speichert ausschließlich geordnete Entity-IDs. Grenzen/Fehler liefern einen sichtbaren Session-Fallback. Der Storage-Vertrag wurde der offiziellen Dokumentation entnommen; Persistenz und Import sind auf dem Gerät noch offen. Vollständige Entity-/Source-Repositories, Migrationen, Provider, Netzwerk, Downloads und Wiedergabe sind nicht implementiert. Der gemeldete Typfehler wurde nicht in der installierten Scripting-App reproduziert; native Darstellung und Transparenz bleiben Geräteprüfungen. Keine Scripting-Pro-Funktion, kein externes Backend, kein Xcode-Projekt, kein dauerhafter Background-Worker und keine dynamische Fremdcode-Sandbox voraussetzen; siehe [Kompatibilität](COMPATIBILITY.md).

## Prinzipien

- Core bleibt unabhängig von konkreten Webseiten und Plugin-Implementierungen.
- Plugins deklarieren Fähigkeiten; Capability-Registry aktiviert nur tatsächlich vorhandene Adapter.
- Entities und Beziehungen sind offen typisiert, namespaced, versionierbar und mit Provenienz versehen.
- UI-Beiträge sind Daten für kuratierte Core-Renderer, kein beliebiges Remote-UI.
- Cross-Plugin-Zusammenarbeit erfolgt über Core-Verträge, Entities und Events, nicht über direkte Plugin-Abhängigkeiten.
- Datenquellen sind austauschbar. Fehler eines Providers dürfen den Core nicht blockieren.
- Mobile-first, iPhone-native UX, dunkles Produktdesign, barrierearme Darstellung und nutzerkontrollierte Daten.
- Keine Umgehung von DRM, Login-/Zugriffsschranken oder Nutzungsbedingungen.

## Schichten

```text
App Experience: Home · Explore · Search · Feeds · Library · Settings
Dynamic Experience: UI Composer · Layout/Theme · Widget Registry
Plugin Host: Manifest/Validator · Lifecycle · Capability Registry · Permissions
Universal Engines: Search · Feed/Calendar · Matching · Collections
Universal Data: Entity Types · Entities · Sources · Relations · Indexes · Migrations
Platform Adapters: UI · Storage/SQLite · Networking · Files · Native APIs
Scripting Runtime: Script lifecycle · tatsächlich verfügbare iOS/Scripting APIs
```

Platform adapters kapseln Scripting-spezifische Funktionen. Der Core hängt nur an typisierten Interfaces und kann daher angepasst werden, wenn der Geräte-Audit Grenzen aufzeigt.

## Plugin Runtime: MVP und Zielbild

**MVP:** ein Scripting-Skriptprojekt mit statischer Registry und intern geprüftem, fest gebündeltem Code. Kein Laden von Plugins aus URL/ZIP, keine ungeprüften dynamischen Imports, kein `eval`, keine automatische Installation oder Updates. Scripting-Per-Script-Rechte sind nicht gleichbedeutend mit einer Sandbox für Plugin-Code.

**Später:** SDK, package manager, Signaturen, Prüfungen, Updates und Store nur nach einem separaten Sicherheitsdesign sowie nachgewiesener Isolation. Bis dahin gelten Plugins im selben JS-Kontext als vertrauenswürdiger App-Code.

## Capability-basierte UI und Engine-Fluss

```text
Nutzeraktion → Capability-/Rechteprüfung → Adapter → Normalisierung
             → Entity/Feed/Relation Repository → lokaler Index → Composer/Ansicht
```

Beispiele: `search.query` registriert einen Suchprovider; `feed.list` kann eine Feed-Sektion bereitstellen; `calendar.events` kann Termine liefern; `media.open` wird nur bei einem getesteten und zulässigen Media-Descriptor angeboten. Eine Manifestdeklaration ohne implementierten Adapter erzeugt keine UI-Funktion. Suche wählt passende Provider anhand Capability, Suchkontext und Nutzervorgaben, statt jeden Provider blind anzufragen.

## App-Struktur und Navigation

Globale Bereiche: **Home**, **Explore**, **Search**, **Feeds**, **Library**. Plugin-Seiten und Dashboard-Beiträge sind optional und können keine globale Navigation überschreiben. Der Nutzer bestimmt Home-Sektionen, Filter, Layout und Workspaces. Plugin-Deaktivierung blendet dessen Beiträge aus, löscht aber keine persönlichen Daten.

### Tatsächlich implementierter Prototypumfang

Die aktuelle TSX-Datei implementiert die Shell-Basis mit Home, Entdecken, Suche, Feeds, privater ID-Merkliste, Info und Detailansicht. Ein fest gebündelter Fixture-Provider stellt lokale Demo-Entities bereit; Entity-Liste, Suche, Feed und Details werden jeweils nur über eine Capability-Allowlist aufgerufen. Quellenherkunft ist am Inhalt sichtbar. Es gibt noch keine aktive externe Quelle, vollständige Entity-Persistenz, Datenbank oder Netzwerkfunktion. Das gebündelte AniWorld-Plugin-Skelett bleibt deaktiviert und hat keine Capabilities. Der DownloadManager ist bewusst aus 0.5.12 herausgehalten und folgt erst nach den Foundation-Gates. Siehe [Datenmodell](DATA_MODEL.md), [Plugin-System](PLUGIN_SYSTEM.md) und [TODO.md](TODO.md).

## Daten und Qualität

Providerantworten bleiben als einzelne SourceRecords nachvollziehbar. Merge/Entity Resolution ist reversibel und unsichere Zuordnungen werden vorgeschlagen. Der dokumentierte private Key-Value-Storage wird nur für die kleine geordnete ID-Merkliste verwendet; er ist nicht das vollständige Hub-Entity-Repository. SQLite bleibt Kandidat für strukturierte Entity-Daten, aber Auswahl, Migration und iPhone-Verhalten sind offen, bis sie im Zielgerät verifiziert wurden. Details siehe [DATA_MODEL.md](DATA_MODEL.md).

## Lieferstufen

1. Kostenloses Scripting-Capability-Audit und Importtest.
2. UI-Shell mit statischer Registry und Fixture-Daten.
3. Core-Verträge plus zwei gebündelte Provider (z. B. Beispielquelle und RSS).
4. Universelle Entities, Provenienz, Relations, Collections und Migrationen.
5. Capability-getriebener Composer mit festen Renderer-Templates.
6. Suche, Feed und Kalender mit Fehlerisolation.
7. Download-/Media-/Intelligence-Funktionen erst nach Abschluss der Shell-, Daten-, Provider-, Storage- und Geräte-Gates. Der frühere Direktdatei-Download-Prototyp ist nicht Teil der aktuellen Basis.

Erfolgskriterien und Gerätematrix: [TESTING.md](TESTING.md). Offene priorisierte Arbeiten: [TODO.md](TODO.md).
