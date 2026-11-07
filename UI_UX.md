# UNIVERSE — UI/UX

## Produkt und globale Navigation

Langfristiges Ziel von UNIVERSE ist ein persönlicher Web-Content-Hub. Die Foundation 0.5.3 ist eine bewusst begrenzte, lokale Demo-Katalogoberfläche — keine echte Streaming- oder Anime-App. Sie zeigt Medien, Artikel und Termine in einer gemeinsamen, capability-gesteuerten Shell; Live-Provider, Wiedergabe und persistente Daten fehlen weiterhin.

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

## Aktueller Basis-Flow (0.5.3)

Home nutzt ein dunkles, kinematisches Layout mit markantem UNIVERSE-Header, zweispaltigen Navigationszeilen, einem breiten Featured-Panel mit eigens erstelltem lokalem Artwork und horizontalen Inhaltsschienen. Zwölf lokale Fixture-Titel füllen die gestalteten Poster-Karten; Chips filtern Medien, Artikel und Termine. Suche, Feed und Detailansicht teilen dieselben Entities und halten Quellenherkunft sichtbar. „Merken“ gilt nur für die aktuelle Script-Sitzung. Das Design übernimmt allgemeine Katalogmuster, keine Netflix-/Sora-Markenmittel, Assets oder Implementierung.

Es gibt keine Netzwerkabfragen oder echten Provider. Der DownloadManager ist nicht Teil dieser Basis; die frühere 0.3.0-Downloader-Version ist historisch und wird erst nach den Core-/Storage-/Device-Gates wieder relevant.

## Stil, Barrierefreiheit, Zustände

- Feste dunkle Designpalette mit Kontrast bei geringer Helligkeit.
- Native, dokumentierte Scripting-Views bevorzugen; keine Web-App voraussetzen.
- Safe Areas, Dynamic Type, VoiceOver, Tastatur, Touch-Ziele und Einhandbedienung beachten.
- Für jeden Bereich: Laden, Inhalt, leer, offline, Permission verweigert, Providerfehler und Wiederholen.
- Veraltete Daten sichtbar kennzeichnen; keine Endlosschleifen bei Laden.
- Nutzerbestätigung/Undo für Löschen und Zusammenführen.

Die aktuelle `UNIVERSE.scripting`-Datei ist die Foundation 0.5.3: eine dunkle, visuell ausgebaute deutsche Katalog-Shell mit lokalem Hero-Artwork, horizontalen Rails, zweispaltiger Navigation, zwölf Demo-Fixtures, Poster-Karten, lokaler Demoquelle, capability-gesteuerter Entity-Liste/Suche/Feed/Details und einem deaktivierten AniWorld-Plugin-Skelett ohne Netzwerkzugriff. Die Layout-Korrektur setzt horizontales Padding innerhalb der Max-Width-Frames; ob sie den sichtbaren Geräteüberlauf vollständig beseitigt, bleibt bis zum erneuten iPhone-Test offen. Es gibt weder Live-Daten noch persistente Speicherung. DownloadManager, echte Provider und Playback fehlen absichtlich, bis Basis und Gerätekompatibilität stehen. Navigation und gemischte Inhaltssuche sind durch Sora-UX-Ideen inspiriert; kein Sora-Code wurde übernommen (siehe `SORA_RESEARCH.md`). Scripting-Import, API-Zugriff und Bedienbarkeit wurden nicht auf einem iPhone getestet.
