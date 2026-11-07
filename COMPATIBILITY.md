# UNIVERSE — Scripting-Kompatibilität

**Stand: 2026-11-07 · aktuelle Basis: `.scripting` 0.5.6.** Version 0.5.6 ist eine lokale Katalog-Shell mit Demo-Fixtures, statischer Capability-Registry, gebündeltem Hero-Artwork und strikten Viewport-/Inhaltsbreiten. Sie wurde lokal gebaut, aber nicht in die Scripting-App importiert oder auf einem iPhone ausgeführt. Verfügbarkeit der UI-APIs im installierten Build, Pro-Zugriff, Darstellung und Lifecycle sind offen.

## Aktueller Funktionsumfang und Grenzen

- Home, Entdecken, Suche, Feeds, Merkliste und Detailansicht zeigen lokale Beispieldaten und das mitgelieferte illustrative Hero-Artwork.
- Entity-Liste, Suche, Feed und Detailzugriff werden nur aufgerufen, wenn der statisch eingetragene Demo-Provider die jeweilige Capability deklariert.
- Merkliste ist ausschließlich UI-State der aktuellen Script-Sitzung; es wird keine Persistenz behauptet.
- Version 0.5.6 enthält weder `DownloadManager`, `AVPlayer`, Netzwerkzugriffe, einen echten Provider noch dynamische Plugins; das Hero-Bild wird lokal aus dem Paket geladen.
- Der Nutzer meldete nach den 0.5.3-, 0.5.4- und 0.5.5-Versuchen weiterhin Überlauf. 0.5.6 bindet Root-Navigation, Karten und alle horizontalen Scrollbereiche an eine abgerundete Viewportbreite mit definierten Seitenrändern, entfernt unbeschränkte Maximalbreiten und aktiviert Clipping. Die Info-Seite zeigt beide Messwerte. Auch dieser Versuch ist bis zum Import-/iPhone-Test unbestätigt.
- Der Downloader aus Version 0.3.0 ist historisch und wurde aus der aktuellen Basis entfernt. Er kommt erst nach App-Shell-, Datenmodell-, Provider-, Storage- und Geräte-Gates zurück.
- Keine Scripting-Pro-Funktion als Voraussetzung oder Fallback; kein Xcode-Projekt, Backend, Background-Worker oder dynamischer Fremdcode.

## Dokumentationsquellen und offene Volllektüre

Die offiziellen Scripting-Dokumentationskataloge und relevante Seiten für Import, UI, `DownloadManager`, `FileManager`, `TextField`, `Button`, Navigation, `AVPlayer` und `VideoPlayer` wurden geprüft. Zusätzlich wurden die offiziellen Quelldateiarchive aus [ScriptingApp/ScriptingApp.github.io, Commit `ed46a8eed3dde08d15c752e26aecfbcf250060e2`](https://github.com/ScriptingApp/ScriptingApp.github.io/tree/ed46a8eed3dde08d15c752e26aecfbcf250060e2) herangezogen:

- App-Store-Dokumentation ZIP SHA-256: `b603daa0415cf8a0c265670698349be80ef3257e9c679459b113bc408cf1c749`
- TestFlight-Dokumentation ZIP SHA-256: `0e829584b48194800ad1da2f3671314044b9c8031f3b7bb3c70f8c393362fbc7`
- [App-Store-Index](https://scriptingapp.github.io/llms.txt) / [Volltext](https://scriptingapp.github.io/llms-full.txt)
- [TestFlight-Index](https://scriptingapp.github.io/TestFlight/llms.txt) / [Volltext](https://scriptingapp.github.io/TestFlight/llms-full.txt)

Die Quellenarchive liefern die Markdown-Ausgangsseiten. **Alle vier generierten `llms.txt`-/`llms-full.txt`-Dokumente wurden weiterhin nicht vollständig chunkweise gelesen.** Diese offene Anforderung wird nicht als erledigt ausgegeben. App Store und TestFlight können zudem unterschiedliche API-Stände enthalten.

## APIs der Foundation — dokumentiert, aber nicht auf dem Gerät bestätigt

| API | Verwendung in 0.5.6 | Offener Nachweis |
|---|---|---|
| `Navigation.present`, `NavigationStack`, `ScrollView`, `LazyHStack` | Script-Präsentation, vertikaler Screen und horizontale Katalog-Rails | Import, Scrollverhalten, Lifecycle auf iPhone |
| `Button`, `Text`, `TextField`, `HStack`, `VStack`, `ZStack`, `Spacer` | Navigation, Filter, Karten, Suche und Inhaltshierarchie | Rendern, Touch-Ziele, Barrierefreiheit, Tastatur |
| `Image`, `RoundedRectangle`, `Path` | SF-Symbol-Icons, Kartenflächen und lokales Hero-Bild aus `Script.directory` | gebündelten Asset-Pfad, Zuschnitt und Darstellung am Gerät |
| `GeometryReader`, `frame` | Viewportbreite direkt am präsentierten Root abrunden; daraus Karten-/Inhaltsbreite nach Seitenrändern berechnen und an Navigation, Scrollbereiche und Karten binden | Typen, Präsentationsgröße, NavigationStack-Layout und Laufzeit auf dem iPhone |
| `clipped`, `scrollClipDisabled` | äußeren vertikalen ScrollView innerhalb seiner Bounds halten | Bridge-Verhalten und horizontale Rails auf dem iPhone |
| `useState` | Navigation, Suchfeld, Filter und sitzungsgebundene Merkliste | tatsächlicher Hook-/Runtime-Zugriff in installierter Version |

Der Katalogstatus „nicht als Pro markiert“ wäre kein Beweis, dass ein API im kostenlosen Nutzer-Build zugänglich ist. Der aktuelle Shell-Import und tatsächlicher kostenloser Zugriff müssen am Zielgerät geprüft werden.

## Typcheck, Paket und Reichweite der lokalen Checks

TypeScript 5.8.3 hat `index.tsx` mit lokalen, temporären Platzhalterdeklarationen für `scripting` erfolgreich geprüft. Das prüft TSX-Syntax und Quelltext gegen die Platzhalter, **nicht** gegen echte Scripting-Typen oder den App-Runtime. Details und Paket-Hash stehen in `TESTING.md`.

Das Paket wird von `tools/build_scripting_package.py` erstellt und enthält `script.json`, `index.tsx`, `README.md`, `assets/hero.jpg` sowie das inaktive `plugins/aniworld/plugin.json`. Es ist lokal auf CRC, Dateiliste, Manifest, Byte-Parität und deterministischen Build geprüft. Das `.scripting`-ZIP-Format ist hier eine Paketkonvention, keine durch einen erfolgreichen Scripting-Import bestätigte Kompatibilitätszusage.

## Zurückgestellte Download-/Player-APIs (nicht Teil von 0.5.6)

In der offiziellen `DownloadManager`-Doku steht, dass diese globale API für Main-App-Scripts vorgesehen ist; explizite Ziele müssen lokale absolute Pfade sein, fehlende Elternordner werden beim Veröffentlichen angelegt und vorhandene Dateien werden nicht überschrieben. Die Seiten für `FileManager`, `AVPlayer` und `VideoPlayer` wurden für den früheren 0.3.0-Versuch gelesen. Das belegt weder Pro-Freiheit noch den API-Stand des installierten iPhones. Keine dieser APIs ist in der aktuellen Version 0.5.6 aufgerufen.

Falls ein Manager später nach Abschluss der Foundation-Gates wieder gebaut wird, gelten weiterhin nur nutzerbereitgestellte direkte HTTP(S)-Dateilinks, Rechte-/Token-Hinweise und explizite Nutzeraktionen. Keine Webseiten-/Playlist-/Stream-Extraktion, kein DRM-/Login-/CAPTCHA-Bypass. Dateiendung beweist weder Videoinhalt noch Codec.

## Geräte-Audit — offen

| Frage | Nachweis | Status |
|---|---|---|
| installierte Scripting- und iOS-Version / kostenloser UI-API-Zugriff | App-Version, Geräte-Einstellungen und Test auf Ziel-iPhone | Offen |
| 0.5.6-Paket importierbar und startfähig | Import und Shell-/Navigationstest | Offen |
| Merkliste-/Storage-Verhalten | Persistenz bleibt absichtlich nicht implementiert; Storage API vor Nutzung testen | Offen |
| Suche, Typfilter, Demo-Feed und Detailnavigation | manuelle iPhone-Prüfung, Tastatur-/Lifecycle-Fälle | Offen |
| Dark Mode, VoiceOver, Dynamic Type, Safe Areas | iPhone-Testprotokoll/Screenshots | Offen |
| vollständige Lektüre aller vier `llms.txt`-/`llms-full.txt`-Dokumente | alle Index- und Volltexte chunkweise auswerten | Offen |
