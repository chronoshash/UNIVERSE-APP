# UNIVERSE — Architektur

**One platform. Unlimited sources. Your own experience.** UNIVERSE ist ein universeller, pluginbasierter Web-Content-Hub für Scripting auf iOS: Media, News, Reading, Kalender, Communities und Websites. Anime ist ein Anwendungsfall; AniWorld ist ein mögliches Plugin.

## Status und Grenzen

Dieses Dokument beschreibt die Zielarchitektur, nicht eine fertige Plattform. Geplante UNIVERSE-APIs sind keine vorhandenen Scripting-APIs. Der derzeitige Stand enthält ein eigenständiges Scripting-UI-Prototyp-Paket mit einer bewusst begrenzten, nutzerinitiierten HTTPS-Datei-Downloadwarteschlange, festen Offline-Kategorien und lokaler Videowiedergabe. Das ist **nicht** auf einem iPhone importiert oder ausgeführt worden; API-Verfügbarkeit im installierten Build und Pro-Zugriff sind offen. Die Downloadfunktion ist kein AniWorld-Plugin und extrahiert keine Streams. Keine Scripting-Pro-Funktion, kein externes Backend, kein Xcode-Projekt, kein dauerhafter Background-Worker und keine dynamische Fremdcode-Sandbox voraussetzen; siehe [Kompatibilität](COMPATIBILITY.md).

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

Die aktuelle TSX-Datei enthält Home, Video hinzufügen, Downloads, Offline-Mediathek und Player. Die Kategorie steckt im expliziten lokalen Zielpfad (`Documents/UNIVERSE/Offline/<Kategorie>/…`); Downloadstatus und Wiederaufnahme kommen aus einer persistenten Scripting-Downloadqueue, nicht aus dem geplanten UNIVERSE-Entity-/SQLite-Modell. Die Eingabe verlangt HTTPS und prüft nur die Dateiendung MP4/M4V/MOV. Queue ist foreground-only und Wi-Fi-only. Weitere Feeds, Such-/Metadata-Provider, Plugin-Laufzeit und AniWorld-Integration sind nicht implementiert. Siehe [Datenmodell](DATA_MODEL.md) und [Kompatibilität](COMPATIBILITY.md).

## Daten und Qualität

Providerantworten bleiben als einzelne SourceRecords nachvollziehbar. Merge/Entity Resolution ist reversibel und unsichere Zuordnungen werden vorgeschlagen. SQLite ist ein dokumentierter Scripting-Kandidat, aber Speicherort, Limits, Migration und iPhone-Verhalten sind erst nach Gerätetest festgelegt. Key-Value-Storage ist nicht der Hub-Datenspeicher. Details siehe [DATA_MODEL.md](DATA_MODEL.md).

## Lieferstufen

1. Kostenloses Scripting-Capability-Audit und Importtest.
2. UI-Shell mit statischer Registry und Fixture-Daten.
3. Core-Verträge plus zwei gebündelte Provider (z. B. Beispielquelle und RSS).
4. Universelle Entities, Provenienz, Relations, Collections und Migrationen.
5. Capability-getriebener Composer mit festen Renderer-Templates.
6. Suche, Feed und Kalender mit Fehlerisolation.
7. Weitere Media-/Download-/Intelligence-Funktionen erst nach Rechts-, Lizenz-, API-Zugriffs- und Gerätetests; der aktuelle generische Direktdatei-Prototyp ersetzt diese Integrationen nicht.

Erfolgskriterien und Gerätematrix: [TESTING.md](TESTING.md). Offene priorisierte Arbeiten: [TODO.md](TODO.md).
