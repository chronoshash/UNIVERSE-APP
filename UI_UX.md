# UNIVERSE — UI/UX

## Produkt und globale Navigation

Langfristiges Ziel von UNIVERSE ist ein persönlicher Web-Content-Hub. Der veröffentlichte Stand 0.5.8 baut auf einer bewusst begrenzten, lokalen Demo-Katalogoberfläche auf — keine echte Streaming- oder Anime-App. Sie zeigt Medien, Artikel und Termine in einer gemeinsamen, capability-gesteuerten Shell; Live-Provider, Wiedergabe und persistente Daten fehlen weiterhin. Der Nutzer bestätigt, dass die Breite nun funktioniert; 0.5.7 ergänzte Feed-Filter und lokale, transparent begründete Ähnlichkeitsvorschläge; 0.5.8 wechselt zur dokumentierten nativen TabView-Navigation.

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

## Aktueller Basis-Flow (Entwicklungsstand 0.5.8)

Die fünf nativen Tabs Start, Entdecken, Suche, Neu und Merkliste ersetzen die horizontale Hauptnavigation; ein Info-Button im Header hält Projektstatus und Foundation-Hinweise erreichbar, ohne einen sechsten Tab zu belegen. Jeder Primärbereich besitzt einen eigenen NavigationStack; Detail- und Infoansichten kehren zum aufrufenden Tab zurück. Home nutzt ein dunkles, kinematisches Layout mit lokalem Featured-Panel und Inhaltsschienen. Zwölf lokale Fixture-Titel füllen die Poster-Karten. Explore, Search und jetzt auch der chronologische Feed haben eigene Inhaltstypfilter. Detailseiten schlagen lokal ähnliche Demo-Einträge anhand gleicher Kategorie oder gleichen Inhaltstyps vor und legen diese Regel offen. Suche, Feed und Detailansicht teilen dieselben Entities und zeigen Quellenherkunft. „Merken“ gilt nur für die aktuelle Script-Sitzung. Die vom Nutzer bestätigte Breitenlösung und alle gemessenen Content-Rails bleiben erhalten. Das Design übernimmt allgemeine Katalogmuster, keine Netflix-/Sora-Markenmittel, Assets oder Implementierung.

Es gibt keine Netzwerkabfragen oder echten Provider. Der DownloadManager ist nicht Teil dieser Basis; die frühere 0.3.0-Downloader-Version ist historisch und wird erst nach den Core-/Storage-/Device-Gates wieder relevant.

## Stil, Barrierefreiheit, Zustände

- Feste dunkle Designpalette mit Kontrast bei geringer Helligkeit.
- Native, dokumentierte Scripting-Views bevorzugen; keine Web-App voraussetzen.
- Safe Areas, Dynamic Type, VoiceOver, Tastatur, Touch-Ziele und Einhandbedienung beachten.
- Für jeden Bereich: Laden, Inhalt, leer, offline, Permission verweigert, Providerfehler und Wiederholen.
- Veraltete Daten sichtbar kennzeichnen; keine Endlosschleifen bei Laden.
- Nutzerbestätigung/Undo für Löschen und Zusammenführen.

Die veröffentlichte Version `UNIVERSE.scripting` ist 0.5.8. Der 0.5.9-Arbeitsstand ergänzt direktes Entfernen von Merklisteinträgen; die `TabView`-Auswahl wurde als Reaktion auf einen gemeldeten Typfehler enger typisiert: lokale Demo-Fixtures mit capability-gesteuerter Entity-Liste, Suche, Feed und Details; separate Typfilter in Explore, Search und Feed; Detailvorschläge aus gleicher Kategorie oder gleichem Typ; deaktiviertes AniWorld-Skelett. Die native TabView-/Tab-API und `useObservable` sind laut offizieller Scripting-Dokumentation beschrieben; Import und Darstellung sind hier nicht auf dem iPhone nachgetestet. Der Nutzer bestätigt, dass die in 0.5.6 eingeführte Viewport-/Inhaltsbreite funktioniert; diese Umgebung hat das nicht selbst am iPhone nachgetestet. Es gibt keine Live-Daten oder persistente Speicherung. DownloadManager, echte Provider und Playback bleiben zurückgestellt. Kein Sora-Code wurde übernommen (siehe `SORA_RESEARCH.md`).
