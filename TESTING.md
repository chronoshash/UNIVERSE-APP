# UNIVERSE — Testing

## Grundsatz

Statische Prüfungen ersetzen keinen Import- oder Laufzeittest in der installierten Scripting-App auf dem iPhone. API-/Pro-Verfügbarkeit wird nur nach Gerätetest bestätigt. Aktueller Scope: lokale Foundation 0.5.6 mit gebündeltem Hero-Artwork und deaktiviertem AniWorld-Plugin-Skelett; der DownloadManager ist zurückgestellt. Der Nutzer meldete nach Version 0.5.5 weiterhin horizontalen Überlauf. 0.5.6 begrenzt jetzt auch sämtliche sichtbaren Content-Bereiche und horizontalen Scrollregionen anhand einer am Präsentations-Root gemessenen Breite. Der neue Ansatz ist noch nicht importiert oder am Gerät geprüft.

## Lokale Checks — Foundation 0.5.6

- Paket nach Änderungen an Script oder Paket-README mit `python3 tools/build_scripting_package.py` neu gebaut.
- `python3 tools/validate_scripting_foundation.py` bestanden: Manifest-/App-Versions-Parität, Capability-Union und Gates, Provider-Operationen, eindeutige IDs, Fixture-Provenienz/ISO-Daten, deaktivierte AniWorld-Sicherheitsflags und ZIP-/Quellenbyte-Parität.
- Layout-Quelltextassertions bestanden: Root-`GeometryReader` rundet seine Messung ab; der Inhaltsrahmen reserviert 18 Punkte auf jeder Seite; `NavigationStack`, vertikaler Scrollbereich und Root-Inhalt sind an die Viewport-Breite gebunden; alle horizontalen ScrollViews erhalten die Inhaltsbreite und bleiben geclippt; die Navigationsleiste besteht aus intrinsisch breiten Chips; kompakte Karten teilen ihre Breite zwischen Thumbnail, Abstand, Innenrand und Text auf; es gibt keine `maxWidth: infinity`-Frames. Die Info-Seite zeigt Viewport- und Inhaltsbreite. Das ist ein statischer Quelltextvertrag, kein Layout-/Runtime-Test.
- Paket-CRC, Dateiliste (`script.json`, `index.tsx`, `README.md`, `assets/hero.jpg`, `plugins/aniworld/plugin.json`), Manifest und Byte-Parität geprüft. Zwei Builds waren byteidentisch. Lokales Paket: 157.235 Byte, SHA-256 `b1453839da9c0a26de27cd92dc588ef72d4bba7a49b7889c26ce05d674801bd1`.
- TypeScript 5.8.3 `tsc --noEmit --strict` mit temporären, selbst angelegten Platzhalterdeklarationen für die Scripting-UI-APIs bestanden. Die Platzhalter belegen TSX-/Quelltextkonsistenz, nicht die echten Scripting-Typdeklarationen, App-Import oder Runtime.
- Python-Bytecode-Kompilierung der Build-/Validator-Skripte und `git diff --check` bestanden.
- Keine Scripting-App-Import-, iPhone-, Bedienbarkeits- oder Laufzeittests ausgeführt; horizontaler Überlauf ist nicht als behoben bestätigt.

Diese Checks beweisen weder Scripting-Kompatibilität noch API-Freigabe im kostenlosen Build oder tatsächliche Gerätefunktion.

## Zieltests: Foundation auf dem iPhone

1. **Import/Start:** `UNIVERSE.scripting` importieren; Scripting-App- und iOS-Version festhalten; Start in Home und Rückkehr nach erneuter Script-Ausführung prüfen.
2. **Navigation:** Home, Entdecken, Suche, Feeds, Merkliste, Info und Detailansicht erreichen; Details aus Home/Feed/Suche öffnen und in die vorherige Ansicht zurückkehren.
3. **Lokale Suche:** Titel, Kurzbeschreibung, Kategorie und Quelle suchen; Inhaltstypfilter wechseln; Filter aus Entdecken übernehmen; Suchtext leeren; Nulltrefferzustand testen.
4. **Feed/Provenienz:** gemischte Demo-Inhalte chronologisch prüfen; Quelle und Abrufdatum in Karten und Details vergleichen; Demo-Inhalte nicht mit Live-Ergebnissen verwechseln.
5. **Merkliste:** merken/entfernen, mehrere Items, Navigation währenddessen; nach Script-Neustart ist Verlust erwartbar und muss zur UI-Aussage passen.
6. **Netzwerk:** beim Öffnen der Basis dürfen keine Provider-/Webanfragen ausgelöst werden.
7. **Layoutbreite:** Version 0.5.6 auf dem schmalsten unterstützten iPhone und in jeder unterstützten Fensterbreite prüfen. Viewport-/Inhaltsbreite in Info notieren, linke und rechte Außenkanten an Header, Navigation, Hero, Filtern, Rails, kompakten Karten und Detailansicht kontrollieren. Nur horizontale Chip-/Katalogschienen dürfen intern seitlich scrollen. Prüfen, dass keine Inhalte abgeschnitten oder durch zu schmale Texte unlesbar werden; Screenshots gegen 0.5.5 vergleichen.
8. **iOS UX:** Dark Mode, Safe Areas, VoiceOver, Dynamic Type, Tastatur, Kontrast, Touch-Ziele und Lifecycle dokumentieren.

## Provider-/Daten-Foundation — spätere Tests

Vor Live-Provider oder persistenter Speicherung: statische Registry-/Manifestvalidierung, Capability-allowlist, unbekannte Capability, doppelte IDs, Providerfehler, partielle Ergebnisse, Schemafehler, Datenprovenienz, Session-Neustart, Speichermigration und Lösch-/Exportpfade mit lokalen Fixtures prüfen.

## Download-/Offline-Tests — erst nach Foundation-Gates

Der Manager ist **nicht** Teil der aktuellen Version 0.5.6. Diese Tests sind nur für eine spätere, separat freigegebene Version vorgesehen: direkte erlaubte HTTPS-Testdatei, Eingabevalidierung, WLAN/Foreground-Lifecycle, Queue-Wiederaufnahme, Speicherfehler, Dateilöschung, Flugmodus-Playback und Codec-/Tonverhalten. Keine DRM-, Login-, CAPTCHA-, Playlist- oder Zugriffsbeschränkungen umgehen.

## Release-Blocker

Shell-Import oder Start scheitert; UI behauptet Live-Daten oder persistente Speicherung obwohl nicht vorhanden; Capability-Gates werden umgangen; API braucht unbestätigtes Pro; erheblicher Datenverlust-/Accessibility-/Lifecycle-Fehler; riskanter Zugriff oder unerlaubte Quelle.
