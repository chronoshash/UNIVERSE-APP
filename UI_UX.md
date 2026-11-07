# UNIVERSE — UI/UX

## Produkt und globale Navigation

Langfristiges Ziel von UNIVERSE ist ein persönlicher Web-Content-Hub. Die Foundation 0.5.6 ist eine bewusst begrenzte, lokale Demo-Katalogoberfläche — keine echte Streaming- oder Anime-App. Sie zeigt Medien, Artikel und Termine in einer gemeinsamen, capability-gesteuerten Shell; Live-Provider, Wiedergabe und persistente Daten fehlen weiterhin. Die neue, explizit begrenzte Viewport-/Content-Breite ist ein weiterer Layoutversuch nach Nutzerberichten über vollständigen horizontalen Überlauf; ein iPhone-Test fehlt weiterhin.

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

## Aktueller Basis-Flow (0.5.6)

Home nutzt ein dunkles, kinematisches Layout mit markantem UNIVERSE-Header, einer horizontal scrollbaren Chip-Navigation, einem Featured-Panel mit lokalem Artwork und horizontalen Inhaltsschienen. Zwölf lokale Fixture-Titel füllen die gestalteten Poster-Karten; Chips filtern Medien, Artikel und Termine. Suche, Feed und Detailansicht teilen dieselben Entities und halten Quellenherkunft sichtbar. „Merken“ gilt nur für die aktuelle Script-Sitzung. Navigation, Filterleisten, Hero und Karten erhalten gemessene feste Breiten; nur horizontale Rails scrollen absichtlich seitlich. Die Info-Seite zeigt die gemessenen Breiten für den anstehenden Gerätetest. Das Design übernimmt allgemeine Katalogmuster, keine Netflix-/Sora-Markenmittel, Assets oder Implementierung.

Es gibt keine Netzwerkabfragen oder echten Provider. Der DownloadManager ist nicht Teil dieser Basis; die frühere 0.3.0-Downloader-Version ist historisch und wird erst nach den Core-/Storage-/Device-Gates wieder relevant.

## Stil, Barrierefreiheit, Zustände

- Feste dunkle Designpalette mit Kontrast bei geringer Helligkeit.
- Native, dokumentierte Scripting-Views bevorzugen; keine Web-App voraussetzen.
- Safe Areas, Dynamic Type, VoiceOver, Tastatur, Touch-Ziele und Einhandbedienung beachten.
- Für jeden Bereich: Laden, Inhalt, leer, offline, Permission verweigert, Providerfehler und Wiederholen.
- Veraltete Daten sichtbar kennzeichnen; keine Endlosschleifen bei Laden.
- Nutzerbestätigung/Undo für Löschen und Zusammenführen.

Die aktuelle `UNIVERSE.scripting`-Datei ist die Foundation 0.5.6: eine dunkle deutsche Katalog-Shell mit lokalem Hero-Artwork, horizontalen Rails und Chips, zwölf Demo-Fixtures, Poster-Karten, capability-gesteuerter Entity-Liste/Suche/Feed/Details und einem deaktivierten AniWorld-Skelett ohne Netzwerkzugriff. Der Nutzer meldete nach 0.5.4 und 0.5.5 weiterhin vollständigen Links-/Rechts-Überlauf. 0.5.6 rundet die am Root gemessene Viewportbreite, berechnet den Inhaltsrahmen nach 18-Punkt-Seitenrändern und bindet Navigation, Karten und sämtliche horizontalen Scrollbereiche explizit an diese Maße; beide Navigations-/Scroll-Ebenen werden geclippt. Unbegrenzte Maximalbreiten sind aus dem Script entfernt. Die Info-Seite exponiert Viewport- und Inhaltsbreite zur Diagnose. Das ist ein gezielter, lokal statisch geprüfter Layoutversuch, keine bestätigte Behebung: Import und tatsächliche Darstellung am iPhone stehen aus. Es gibt weder Live-Daten noch persistente Speicherung. DownloadManager, echte Provider und Playback fehlen absichtlich, bis Basis und Gerätekompatibilität stehen. Navigation und gemischte Inhaltssuche sind durch Sora-UX-Ideen inspiriert; kein Sora-Code wurde übernommen (siehe `SORA_RESEARCH.md`).
