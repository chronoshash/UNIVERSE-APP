# UNIVERSE — Scripting-Kompatibilität

**Stand: 2026-11-07 · aktueller Quellstand: `.scripting` 0.5.12 (GitHub-Veröffentlichung in Arbeit).** Der Stand nutzt die dokumentierte native TabView-/Tab-API mit `useObservable`, fünf literal-typisierten Primärbereichen und separatem Info-Zugang. `toolbarBackgroundVisibility` blendet den nativen Tab-Bar-Hintergrund aus; `RootScreen` aus einem Literal-Tupel plus typisiertem Helper erhält die Auswahl-Union und adressiert den gemeldeten Typfehler auf Quelltextebene. Die Merkliste speichert nur geordnete IDs im standardmäßig privaten Scripting-`Storage`, mit begrenzter Validierung und sichtbarem Session-Fallback. Der offizielle Dokumentationsvertrag wurde geprüft, aber Import und Persistenz sind nicht auf dem iPhone getestet. Der gemeldete TypeScript-Fehler wurde nicht in der installierten App reproduziert. Cross-Type-Discovery und die vom Nutzer bestätigte 0.5.6-Breitenlösung bleiben erhalten. Statische lokale Checks bestanden; App-Import, iPhone-Runtime, APIs im installierten Build und möglicher Pro-Zugriff sind offen.

## Aktueller Funktionsumfang und Grenzen

- Home, Entdecken, Suche, Feeds, Merkliste und Detailansicht zeigen lokale Beispieldaten und das mitgelieferte illustrative Hero-Artwork.
- Entity-Liste, Suche, Feed und Detailzugriff werden nur aufgerufen, wenn der statisch eingetragene Demo-Provider die jeweilige Capability deklariert.
- Die Merkliste speichert geordnete Entity-IDs über `Storage.get/set` im privaten Script-Bereich; bei Storage-Fehlern/ungültigem Wert bleibt die UI sitzungsgebunden und zeigt einen Hinweis.
- Der 0.5.12-Arbeitsstand enthält weder `DownloadManager`, `AVPlayer`, Netzwerkzugriffe, einen echten Provider, vollständige Entity-Persistenz noch dynamische Plugins; das Hero-Bild wird lokal aus dem Paket geladen.
- 0.5.6 bindet Root-Navigation, Karten und alle horizontalen Scrollbereiche an eine abgerundete Viewportbreite und aktiviert Clipping; der Nutzer bestätigt nun, dass die Breite funktioniert. 0.5.7 ergänzte unabhängige Inhaltstypfilter im Feed und lokale Ähnlichkeitsvorschläge auf Detailseiten. 0.5.8 behält diese Cross-Type-Flows bei und ersetzt die Chip-Hauptnavigation durch native Tabs; diese Flows sind vom Projekt nicht auf dem iPhone verifiziert.
- Der Downloader aus Version 0.3.0 ist historisch und wurde aus der aktuellen Basis entfernt. Er kommt erst nach App-Shell-, Datenmodell-, Provider-, Storage- und Geräte-Gates zurück.
- Keine Scripting-Pro-Funktion als Voraussetzung oder Fallback; kein Xcode-Projekt, Backend, Background-Worker oder dynamischer Fremdcode.

## Dokumentationsquellen und offene Volllektüre

Die offiziellen Scripting-Dokumentationskataloge und relevante Seiten für Import, UI, `DownloadManager`, `FileManager`, `TextField`, `Button`, Navigation, `AVPlayer` und `VideoPlayer` wurden geprüft. Zusätzlich wurden die offiziellen Quelldateiarchive aus [ScriptingApp/ScriptingApp.github.io, Commit `ed46a8eed3dde08d15c752e26aecfbcf250060e2`](https://github.com/ScriptingApp/ScriptingApp.github.io/tree/ed46a8eed3dde08d15c752e26aecfbcf250060e2) herangezogen:

- App-Store-Dokumentation ZIP SHA-256: `b603daa0415cf8a0c265670698349be80ef3257e9c679459b113bc408cf1c749`
- TestFlight-Dokumentation ZIP SHA-256: `0e829584b48194800ad1da2f3671314044b9c8031f3b7bb3c70f8c393362fbc7`
- [App-Store-Index](https://scriptingapp.github.io/llms.txt) / [Volltext](https://scriptingapp.github.io/llms-full.txt)
- [TestFlight-Index](https://scriptingapp.github.io/TestFlight/llms.txt) / [Volltext](https://scriptingapp.github.io/TestFlight/llms-full.txt)

Die Quellenarchive liefern die Markdown-Ausgangsseiten. Für die native Navigation und Storage wurden zusätzlich die offiziellen App-Store-Dokumente im Repository-Stand `9dd44bc276c967f2900ecee2bdd785cf3426a5fa` geprüft: `TabView` mit `selection`/`useObservable` und `<Tab title systemImage value>` ist als modernes iOS-18+-Tab-System dokumentiert. `storage/en.md` beschreibt `Storage.get/set`, standardmäßig privaten Script-Scope und asynchron persistierte Writes. `SQLite`- und `FileManager`-Dokumentation wurde ebenfalls geprüft; für die kleine geordnete ID-Liste wurde der private Key-Value-Scope gegenüber einer Datenbank im gemeinsamen App-Group-Verzeichnis gewählt. Die Doku belegt keine Runtime-Verfügbarkeit im installierten iPhone-Build. Im offiziellen [App-Store-Dokumentationsarchiv desselben Repository-Stands](https://github.com/ScriptingApp/ScriptingApp.github.io/blob/9dd44bc276c967f2900ecee2bdd785cf3426a5fa/scripting/App%20Store/Scripting%20Documentation.zip), Datei `view_modifiers/toolbar_view_modifiers/en.md`, ist `toolbarBackgroundVisibility` (ab iOS 18) mit dem Bereich `tabBar` zum Ein-/Ausblenden des Tab-Bar-Hintergrunds dokumentiert. Das belegt die dokumentierte Oberfläche, nicht die Verfügbarkeit oder Darstellung im installierten Build. **Alle vier generierten `llms.txt`-/`llms-full.txt`-Dokumente wurden weiterhin nicht vollständig chunkweise gelesen.** Diese offene Anforderung wird nicht als erledigt ausgegeben. App Store und TestFlight können zudem unterschiedliche API-Stände enthalten.

## APIs der Foundation — dokumentiert, aber nicht auf dem Gerät bestätigt

| API | Verwendung im 0.5.12-Arbeitsstand | Offener Nachweis |
|---|---|---|
| `Navigation.present`, `NavigationStack`, `ScrollView`, `LazyHStack` | Script-Präsentation, vertikaler Screen und horizontale Katalog-Rails | Import, Scrollverhalten, Lifecycle auf iPhone |
| `Button`, `Text`, `TextField`, `HStack`, `VStack`, `ZStack`, `Spacer` | Navigation, Filter, Karten, Suche und Inhaltshierarchie | Rendern, Touch-Ziele, Barrierefreiheit, Tastatur |
| `Image`, `RoundedRectangle`, `Path` | SF-Symbol-Icons, Kartenflächen und lokales Hero-Bild aus `Script.directory` | gebündelten Asset-Pfad, Zuschnitt und Darstellung am Gerät |
| `GeometryReader`, `frame` | Viewportbreite direkt am präsentierten Root abrunden; daraus Karten-/Inhaltsbreite nach Seitenrändern berechnen und an Navigation, Scrollbereiche und Karten binden | Typen, Präsentationsgröße, NavigationStack-Layout und Laufzeit auf dem iPhone |
| `clipped`, `scrollClipDisabled` | äußeren vertikalen ScrollView innerhalb seiner Bounds halten | Bridge-Verhalten und horizontale Rails auf dem iPhone |
| `useState` | Suchfeld, Filter und Library-UI-State | tatsächlicher Hook-/Runtime-Zugriff in installierter Version |
| `Storage.get/set` | liest/schreibt eine gebundene Liste geordneter Entity-IDs im privaten Scope; kein `shared: true` und keine vollständigen Entities | tatsächliche API-Verfügbarkeit, Async-Persistenz, Restart-/Fehlerverhalten im installierten Build |
| `TabView`, `Tab`, `useObservable`, `toolbarBackgroundVisibility` | fünf native Hauptbereiche mit literal-typisierter Auswahl; der dokumentierte Modifier blendet den `tabBar`-Hintergrund aus; Info bleibt ein separater Header-Aktionspunkt | dokumentierte API laut Scripting-Dokumentation; Import, iOS-Version, tatsächliche Transparenz, Bar-Verhalten und Hook-/Runtime-Zugriff im installierten Build sind nicht am Gerät bestätigt |

Der Katalogstatus „nicht als Pro markiert“ wäre kein Beweis, dass ein API im kostenlosen Nutzer-Build zugänglich ist. Der aktuelle Shell-Import und tatsächlicher kostenloser Zugriff müssen am Zielgerät geprüft werden.

## Typcheck, Paket und Reichweite der lokalen Checks

TypeScript 5.8.3 hat den 0.5.12-`index.tsx`-Quelltext mit `tsc --noEmit --strict` und lokalen, temporären Platzhalterdeklarationen für `scripting` erfolgreich geprüft; darin sind `TabView.selection` und `Tab.value` als `RootScreen` modelliert. Das prüft TSX-/Quelltextkonsistenz gegen diesen Testvertrag, **nicht** gegen echte Scripting-Typen oder den App-Runtime. Das lokal bytegeprüfte Paket hat SHA-256 `0517c9a77a404dd4d45575ed226a264308097199607cf105d1c9768fc236a5ff`; die unabhängige GitHub-Prüfung ist noch offen. Details stehen in `TESTING.md`.

Das Paket wird von `tools/build_scripting_package.py` erstellt und enthält `script.json`, `index.tsx`, `README.md`, `assets/hero.jpg` sowie das inaktive `plugins/aniworld/plugin.json`. Es ist lokal auf CRC, Dateiliste, Manifest, Byte-Parität und deterministischen Build geprüft. Das `.scripting`-ZIP-Format ist hier eine Paketkonvention, keine durch einen erfolgreichen Scripting-Import bestätigte Kompatibilitätszusage.

## Zurückgestellte Download-/Player-APIs (nicht Teil des 0.5.12-Arbeitsstands)

In der offiziellen `DownloadManager`-Doku steht, dass diese globale API für Main-App-Scripts vorgesehen ist; explizite Ziele müssen lokale absolute Pfade sein, fehlende Elternordner werden beim Veröffentlichen angelegt und vorhandene Dateien werden nicht überschrieben. Die Seiten für `FileManager`, `AVPlayer` und `VideoPlayer` wurden für den früheren 0.3.0-Versuch gelesen. Das belegt weder Pro-Freiheit noch den API-Stand des installierten iPhones. Keine dieser APIs ist im aktuellen 0.5.12-Arbeitsstand aufgerufen.

Falls ein Manager später nach Abschluss der Foundation-Gates wieder gebaut wird, gelten weiterhin nur nutzerbereitgestellte direkte HTTP(S)-Dateilinks, Rechte-/Token-Hinweise und explizite Nutzeraktionen. Keine Webseiten-/Playlist-/Stream-Extraktion, kein DRM-/Login-/CAPTCHA-Bypass. Dateiendung beweist weder Videoinhalt noch Codec.

## Geräte-Audit — offen

| Frage | Nachweis | Status |
|---|---|---|
| installierte Scripting- und iOS-Version / kostenloser UI-API-Zugriff | App-Version, Geräte-Einstellungen und Test auf Ziel-iPhone | Offen |
| 0.5.12-Paket importierbar und startfähig | Import und Test der nativen Fünf-Tab-Shell einschließlich transparenter Tab-Bar | Offen |
| Merkliste-/Storage-Verhalten | privaten Storage über Neustarts, direkte Entfernung, invaliden Wert und Session-Fallback testen | Offen |
| Native Tab-Navigation, Suche, Typfilter, Demo-Feed und Detailnavigation | manuelle iPhone-Prüfung, Tastatur-/Lifecycle-Fälle | Offen |
| Dark Mode, VoiceOver, Dynamic Type, Safe Areas | iPhone-Testprotokoll/Screenshots | Offen |
| vollständige Lektüre aller vier `llms.txt`-/`llms-full.txt`-Dokumente | alle Index- und Volltexte chunkweise auswerten | Offen |
