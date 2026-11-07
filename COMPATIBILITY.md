# UNIVERSE — Scripting-Kompatibilität

**Stand: 2026-11-07.** Das Repository enthält ein eigenständiges TSX-Prototypprojekt, aber kein Xcode-Projekt. Paket 0.3.0 wurde lokal gebaut und auf ZIP-Struktur/Quellenparität geprüft. Import, API-Zugriff, kostenloser Funktionsumfang und Laufzeit auf dem Ziel-iPhone wurden **nicht** verifiziert.

## Harte Einschränkungen

- Keine Scripting-Pro-Funktion als Voraussetzung oder Fallback.
- Kein Xcode-Projekt, Backend, always-on Background-Worker oder externe Laufzeit voraussetzen.
- Keine dynamischen Imports oder heruntergeladenen ausführbaren Plugins.
- Keine Behauptung, dass jede Website integrierbar, jeder Stream extrahierbar oder jeder Codec abspielbar ist.
- Kein DRM-/Login-/CAPTCHA-/Paywall-Bypass und keine Umgehung von Zugriffsbeschränkungen.
- AniWorld bleibt ein externer Link. Der Download-Prototyp verarbeitet keine AniWorld-Webseiten oder Stream-URLs.

## Dokumentationsrecherche und Paketformat

Die offiziellen Scripting-Dokumentationskataloge und relevante App-Store-/TestFlight-Seiten für Import, `DownloadManager`, `FileManager`, `TextField`, `Button`, `ProgressView`, `NavigationStack`, `AVPlayer` und `VideoPlayer` wurden geprüft. Zusätzlich wurden die beiden offiziellen Dokumentationsarchive aus dem GitHub-Repository [ScriptingApp/ScriptingApp.github.io, Commit `ed46a8eed3dde08d15c752e26aecfbcf250060e2`](https://github.com/ScriptingApp/ScriptingApp.github.io/tree/ed46a8eed3dde08d15c752e26aecfbcf250060e2) herangezogen: App Store ZIP SHA-256 `b603daa0415cf8a0c265670698349be80ef3257e9c679459b113bc408cf1c749`, TestFlight ZIP SHA-256 `0e829584b48194800ad1da2f3671314044b9c8031f3b7bb3c70f8c393362fbc7`. Die konkreten englischen API-Seiten in beiden Archiven stimmen für die hier verwendeten Download-/Datei-/TextField-Verträge überein. Die vier erzeugten `llms.txt`-/`llms-full.txt`-Dokumente sind weiterhin **nicht vollständig chunkweise gelesen**; diese Akzeptanzbedingung bleibt offen. App Store und TestFlight können sich in anderen Funktionen und Laufzeitständen unterscheiden.

Quellen:

- [App-Store-Dokumentationsindex](https://scriptingapp.github.io/llms.txt), [App-Store-Volltext](https://scriptingapp.github.io/llms-full.txt)
- [TestFlight-Dokumentationsindex](https://scriptingapp.github.io/TestFlight/llms.txt), [TestFlight-Volltext](https://scriptingapp.github.io/TestFlight/llms-full.txt)
- [Quick Start](https://scriptingapp.github.io/guide/Quick%20Start.md), [Scripting-Importseite](https://www.scripting.fun/import_scripts/)
- [DownloadManager](https://scriptingapp.github.io/guide/Utilities/DownloadManager.md), [FileManager](https://scriptingapp.github.io/guide/Utilities/FileManager.md)
- [TextField](https://scriptingapp.github.io/guide/Views/Text%20input/TextField/index.md), [Button](https://scriptingapp.github.io/guide/Views/Button.md), [ProgressView](https://scriptingapp.github.io/guide/Views/Controls/ProgressView/index.md)
- [NavigationStack mit Path](https://scriptingapp.github.io/guide/Views/Navigation/NavigationStack/NavigationStack%20with%20path.md)
- [AVPlayer](https://scriptingapp.github.io/guide/Device%20Capabilities/AVPlayer.md), [VideoPlayer](https://scriptingapp.github.io/guide/Device%20Capabilities/Play%20Video/VideoPlayer/index.md)
- [Offizielle Scripting-Beispiele](https://github.com/ScriptingApp/scripts)
- [Community-`.scripting`-ZIP-Beispiele](https://github.com/zhaomo08/awesome_script/tree/main/packages) (Beispiel, keine offizielle Format-Spezifikation)
- [App Store](https://apps.apple.com/us/app/scripting-ai-agent-tools/id6479691128) listet die App als kostenlos mit In-App-Käufen; daraus folgt **nicht**, dass jede API kostenlos zugänglich ist.

Das Paket ist ein ZIP mit Root-Einträgen `script.json`, `index.tsx` und `README.md`. CRC, Eintragsliste, Manifest/Entry, Byte-Parität zur Quelle und reproduzierbarer Neuaufbau wurden lokal geprüft. Nur der Import in Scripting kann die App-Akzeptanz endgültig nachweisen.

## Aktuell verwendete APIs — dokumentiert, aber nicht auf dem Gerät verifiziert

| API | Verwendung im Prototyp | Offener Nachweis |
|---|---|---|
| `DownloadManager` (global) | stabile Queue-ID, foreground-only, zwei parallele Aufgaben, WLAN-only; URL-basierte Duplikatprüfung, persistente Task-Snapshots, Status/Progress, Pause/Fortsetzen/Abbrechen/Entfernen und eigenes Ziel pro Kategorie | Vorhandensein in installierter Version, kostenfreier Zugriff, Lifecycle und persistente Wiederaufnahme auf iPhone |

Die offizielle API-Seite bestätigt: `DownloadManager` ist global und für Main-App-Scripts vorgesehen; explizite Ziele müssen absolute lokale Pfade sein, fehlende Elternordner werden beim Veröffentlichen angelegt, vorhandene Dateien werden nicht überschrieben. Das reduziert ein Risiko des bisherigen Zielpfads, ersetzt aber keinen kontrollierten Gerätetest.
| `FileManager` | `documentsDirectory`; prüft, ob der Queue-Zielpfad noch existiert | tatsächlicher Speicherort und Verhalten nach App-Update/-Löschung auf Zielgerät |
| `AVPlayer` / `VideoPlayer` | setzt den verifizierten lokalen Pfad als Playerquelle; eigener Play/Pause-Button und Fehleranzeige | iOS-Version, Codec/Audio-Session, Offline-Wiedergabe, Speicherzugriff und Geräteverhalten |
| `TextField`, `Button`, `ProgressView`, `List`, `Section`, `NavigationStack` | Eingabe, Steuerung, Fortschritt und App-Navigation | Import/Rendern, Accessibility, Dark Mode, Dynamic Type und Lifecycle |
| `Link` | öffnet die externe AniWorld-Website | Ziel-App-/Website-Verhalten auf iPhone |

Die konkreten Seiten dokumentieren diese APIs; sie bestätigen nicht den Pro-Status oder ihre Verfügbarkeit im installierten App-Build. Eine Dokumentations-/Store-Recherche konnte keinen verbindlichen kostenlosen Zugriff auf `DownloadManager` bestätigen. Keine Pro-Freiheit behaupten, bevor der Nutzer-Build auf dem Gerät geprüft wurde. TypeScript 5.8.3 hat `index.tsx` mit lokalen Platzhalterdeklarationen erfolgreich geprüft; das ist kein Compile gegen echte Scripting-Typen und bestätigt weder Scripting-Import noch App-Runtime (siehe `TESTING.md`).

## Laufzeitgrenzen des Offline-Prototyps

- Eingabe akzeptiert nur HTTPS, lehnt URL-Benutzername/Passwort und Fragmente ab und filtert nach URL-Pfad-Endung `.mp4`, `.m4v` oder `.mov`. Das beweist **nicht**, dass der Server eine Videodatei zurückgibt oder dass deren Codec unterstützt wird.
- Downloadziel ist `Documents/UNIVERSE/Offline/<Anime|Filme|Serien|Sonstiges>/…`. Queue-Aufzeichnungen und Quell-URL werden zum Wiederaufnehmen persistent verwaltet; keine geheimen Zugriffstoken in Links eingeben.
- `allowsCellularAccess: false` und `mode: "foreground"`: der Prototyp ist WLAN-only und stellt keinen Background-Worker bereit. Laut Dokumentation pausiert eine Foreground-Queue beim Wechsel der Scripting-App in den Hintergrund.
- Die Mediathek zeigt abgeschlossene Aufgaben nur, wenn der Zielpfad lokal existiert. Der Player verwendet den lokalen Pfad. Codec, Ton, Untertitel und tatsächliche Offline-Wiedergabe sind nicht garantiert.
- Downloads sind nur für direkte Dateien vorgesehen, die der Nutzer speichern darf. Keine Webseiten-/Playlist-Extraktion, Hoster-Auflösung oder Umgehung von Rechten/Zugriffsschranken.

## `.scripting`-Paketbau

`tools/build_scripting_package.py` nimmt ausschließlich Dateien unter `scripting/UNIVERSE/` auf:

```text
UNIVERSE.scripting (ZIP)
├── script.json
├── index.tsx
└── README.md
```

Nach jeder Script-Quelländerung ausführen: `python3 tools/build_scripting_package.py`.

## Capability-/Geräte-Audit — offen

| Frage | Erforderlicher Nachweis | Status |
|---|---|---|
| installierte Scripting- und iOS-Version, kostenloser API-Zugriff | Einstellungen/App-Store-Status und API-Test auf Ziel-iPhone | Offen |
| Paket importierbar und TSX ausführbar | Import, Start und alle Prototypseiten auf Ziel-iPhone | Offen |
| Downloads funktionieren und bleiben nach Wiederöffnung erhalten | kontrollierte, eigene/erlaubte HTTPS-Testdatei; Netzwerk-/Abbruch-/Wiederaufnahmefälle | Offen |
| Datei liegt korrekt im Kategorienordner und fehlt korrekt bei manueller Löschung | Files-App-/App-Dateitest | Offen |
| echte lokale Offline-Wiedergabe inkl. Ton | Flugmodus, lokale Datei, unterstützter Codec, Audio-Session und iOS-Version | Offen |
| UI/Navigation, Dark Mode, VoiceOver, Dynamic Type, Safe Areas | iPhone-Testprotokoll/Screenshots | Offen |
| Vollständige Lektüre aller `llms.txt`-/`llms-full.txt`-Dokumente | alle vier generierten Dokumente vollständig lesen; die offiziellen ZIP-Quellarchive wurden inzwischen geladen, relevante API-Seiten verglichen | Weiterhin offen; nicht als vollständig gelesen ausgeben |

REA wurde nicht installiert oder ausgeführt: für den aktuellen Source-/Dokumentationsstand gibt es kein autorisiertes Binärartefakt, das REA benötigt.
