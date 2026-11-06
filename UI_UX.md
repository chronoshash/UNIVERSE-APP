# UNIVERSE — UI/UX

## Produkt und globale Navigation

Langfristiges Ziel von UNIVERSE ist ein persönlicher Web-Content-Hub; das aktuelle Produkt ist bewusst noch kein solcher All-in-one-Hub und keine Anime- oder Streaming-App. Das eigenständige Scripting-MVP konzentriert sich auf eine einfache Offline-Videobibliothek. Erst wenn weitere Quellen/Capabilities tatsächlich gebaut und getestet sind, werden zusätzliche globale Bereiche ergänzt:

| Bereich | Aufgabe |
|---|---|
| Home | konfigurierbares Dashboard und Workspaces |
| Explore | Quellen, Kategorien, Entdeckung |
| Search | gemeinsame Suche mit Ergebnissen aus aktiven Capabilities |
| Feeds | globale, Plugin-, Kategorie- und chronologische Ansichten |
| Library | Collections, Bookmarks, Tags, Notizen |

Settings/Plugin-Verwaltung sind separat erreichbar. Plugins dürfen keine beliebigen globalen Tabs hinzufügen.

## Dynamisches Dashboard

Sektionen werden nur angezeigt, wenn ein aktives Plugin die passende Capability und ein unterstütztes UI-Template bereitstellt. Nutzer fügt hinzu, entfernt, sortiert, filtert und wählt Templates. Beispiele: `media.grid`, `article.list`, `social.feed`, `event.list`. Home bleibt ohne installierte Quelle nutzbar und erklärt leere Zustände. Deaktivierung entfernt den Beitrag, nicht die Daten anderer Quellen.

## Suche und Explore

Eine globale Eingabe mit Typ-/Quellenfilter, Verlauf und konfigurierbarer Priorität. Dispatcher berücksichtigt Plugin-Capabilities und Suchkontext statt blind jeden Provider aufzurufen. Ergebnisse zeigen Typ, Quelle, Abruf-/Veröffentlichungszeit und Rankingprovenienz. Deduplizierung bewahrt Einzelquellen. Providerfehler werden separat dargestellt und verstecken keine erfolgreichen Resultate.

MVP: explizite Textsuche und Filter. Natürliche Sprache, semantische Suche und KI-Empfehlungen bleiben spätere optionale Vorhaben.

## Detailseiten, Feeds, Kalender, Library

Generische Entity-Detailseite zeigt gemeinsame Attribute plus Quellenprovenienz. Zusatzbereiche (Trailer, Artikel, Bewertungen) nur bei tatsächlich verknüpften Beiträgen. Kontextaktionen hängen von Entity/Capability ab: Speichern, Teilen, extern öffnen, Collection oder Abspielen (nur wenn die Media-Quelle getestet und zulässig ist).

Feeds markieren Herkunft und Aktualisierungszeit. Kalender vereinigt Termine, hält Zeitzone/ganztägig auseinander und verknüpft Events mit Entities. Eine Collection kann beliebige Typen mischen. Providerdaten und persönliche Notizen bleiben getrennt.

## Aktueller Offline-MVP-Flow

`Video hinzufügen` nimmt eine nutzerbereitgestellte HTTPS-URL, einen Titel und eine feste Kategorie an. Die Downloads-Ansicht zeigt Queue-Zustand, Fortschritt, Pause/Fortsetzen/Abbrechen und Entfernen und kann nach dem eingegebenen Titel suchen. Abgeschlossene Dateien werden nur dann in der Offline-Mediathek gruppiert, wenn der erwartete lokale Pfad vorhanden ist; dort gibt es Titelsuche, einen einfachen Kategorienfilter und keine leeren Kategorien. Von der Mediathek öffnet der Player den lokalen Pfad. Löschen ist mit einer zweiten Aktion bestätigt. Die Oberfläche erklärt WLAN-/Foreground-Verhalten, URL-Token-Risiko und Rechteverantwortung. URL-Endung und AVPlayer-Fehler sind keine vollständige Validierung des entfernten Inhalts.

## Stil, Barrierefreiheit, Zustände

- Feste dunkle Designpalette mit Kontrast bei geringer Helligkeit.
- Native, dokumentierte Scripting-Views bevorzugen; keine Web-App voraussetzen.
- Safe Areas, Dynamic Type, VoiceOver, Tastatur, Touch-Ziele und Einhandbedienung beachten.
- Für jeden Bereich: Laden, Inhalt, leer, offline, Permission verweigert, Providerfehler und Wiederholen.
- Veraltete Daten sichtbar kennzeichnen; keine Endlosschleifen bei Laden.
- Nutzerbestätigung/Undo für Löschen und Zusammenführen.

Die aktuelle `UNIVERSE.scripting`-Datei ist ein begrenzter, eigenständiger Prototyp mit einer auf Deutsch klaren Startansicht, direktem Video-Download, suchbarer Downloadwarteschlange, suchbarer und nach Kategorie filterbarer Offline-Mediathek sowie lokalem Player. Kategorien sind Anime, Filme, Serien und Sonstiges; leere Kategorien werden verborgen. Der Nutzer muss eine HTTPS-Datei-URL und einen Titel eingeben; die Dateiendung wird auf MP4/M4V/MOV geprüft, aber weder Antwortinhalt noch Codec vorab verifiziert. Die Queue ist foreground-only und Wi-Fi-only. Das ist kein AniWorld-Resolver: der AniWorld-Link öffnet nur die externe Website. Die Scripting-Laufzeit, API-Verfügbarkeit und Bedienbarkeit wurden hier nicht auf einem iPhone getestet. Die Ideen zu Suche/Trennung von Queue und Library sind von Sora inspiriert; kein Sora-Code wurde übernommen (siehe `SORA_RESEARCH.md`).
