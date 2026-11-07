# UNIVERSE — Testing

## Grundsatz

Statische Prüfungen ersetzen keinen Import- oder Laufzeittest in der installierten Scripting-App auf dem iPhone. API-/Pro-Verfügbarkeit wird nur nach Gerätetest bestätigt. Aktueller Scope: lokale Foundation 0.5.5 mit gebündeltem Hero-Artwork und deaktiviertem AniWorld-Plugin-Skelett; der DownloadManager ist zurückgestellt. Der Nutzer berichtet, dass sowohl 0.5.3 als auch 0.5.4 weiter horizontal überliefen. 0.5.5 verlegt die Breitenmessung an den präsentierten Root; auch dieser Versuch ist noch nicht am Gerät verifiziert.

## Lokale Checks — Foundation 0.5.5

- Paket nach Änderungen an Script oder Paket-README mit `python3 tools/build_scripting_package.py` neu gebaut.
- ZIP-CRC, Dateiliste (`script.json`, `index.tsx`, `README.md`, `assets/hero.jpg`, `plugins/aniworld/plugin.json`), Manifest-Version, Byte-Parität einschließlich Artwork und Plugin-Manifest sowie reproduzierbarer Doppelbuild geprüft.
- `python3 tools/validate_scripting_foundation.py` bestanden: statische Manifest-/App-Versions-Parität, Capability-Union und Gates, Provider-Operationen, eindeutige IDs, Fixture-Provenienz/ISO-Daten, deaktivierte AniWorld-Plugin-Sicherheitsflags, Paketparität und Assertions, dass der `GeometryReader` vor `NavigationStack` und `ScrollView` misst, alle drei dieselbe Viewportbreite erhalten und Scroll-Clipping aktiv bleibt. Das ist ein Quelltextvertragstest, kein App-Runtime-Test.
- Statische Assertions: kein `DownloadManager`, kein `AVPlayer` und keine Netzwerkquelle.
- TypeScript 5.8.3 `tsc --noEmit` mit selbst angelegten, temporären Scripting-UI-Stubs bestanden; die Stubs enthalten die dokumentierten Proxy-/ScrollView-Prop-Formen, optionale JSX-Kinder und Farbtypen. Sie sind nicht die echten Scripting-Typdeklarationen und belegen weder App-Import noch Runtime.
- Aktuelles Paket 0.5.5: 157.096 Byte, SHA-256 `f89894fe4c0f794448511398287b1eeb59c71fa3d0bcb9604e9727657b40ccb4`. Zwei Builds waren byteidentisch. Das zuvor veröffentlichte 0.5.4-Paket war 157.071 Byte mit SHA-256 `9c344b9decdaeedd35c0708c4d14dd7ac3c32b2a8d5af02b8607ec38fe758d87`.
- Python-Bytecode-Kompilierung der Build-/Validator-Skripte und `git diff --check` bestanden.
- Keine Scripting-App-Import-, iPhone-, Bedienbarkeits- oder Laufzeittests ausgeführt; der gemeldete Vollbild-Überlauf ist daher nicht als behoben bestätigt.

Diese Checks beweisen weder Scripting-Kompatibilität noch API-Freigabe im kostenlosen Build oder tatsächliche Gerätefunktion.

## Zieltests: Foundation auf dem iPhone

1. **Import/Start:** `UNIVERSE.scripting` importieren; Scripting-App- und iOS-Version festhalten; Start in Home und Rückkehr nach erneuter Script-Ausführung prüfen.
2. **Navigation:** Home, Entdecken, Suche, Feeds, Merkliste, Info und Detailansicht erreichen; Details aus Home/Feed/Suche öffnen und in die vorherige Ansicht zurückkehren.
3. **Lokale Suche:** Titel, Kurzbeschreibung, Kategorie und Quelle suchen; Inhaltstypfilter wechseln; Filter aus Entdecken übernehmen; Suchtext leeren; Nulltrefferzustand testen.
4. **Feed/Provenienz:** gemischte Demo-Inhalte chronologisch prüfen; Quelle und Abrufdatum in Karten und Details vergleichen; Demo-Inhalte nicht mit Live-Ergebnissen verwechseln.
5. **Merkliste:** merken/entfernen, mehrere Items, Navigation währenddessen; nach Script-Neustart ist Verlust erwartbar und muss zur UI-Aussage passen.
6. **Netzwerk:** beim Öffnen der Basis dürfen keine Provider-/Webanfragen ausgelöst werden.
7. **Layoutbreite:** Version 0.5.5 auf dem schmalsten unterstützten iPhone und in jeder unterstützten Fensterbreite prüfen. Header, Navigation, Featured-Panel, kompakte Karten und Text müssen innerhalb der direkt am Präsentations-Root gemessenen Breite bleiben; nur horizontale Inhaltsschienen dürfen intern seitlich scrollen. Sichtbare linke/rechte Außenkanten in jedem Bereich fotografieren und gegen 0.5.4 vergleichen.
8. **iOS UX:** Dark Mode, Safe Areas, VoiceOver, Dynamic Type, Tastatur, Kontrast, Touch-Ziele und Lifecycle dokumentieren.

## Provider-/Daten-Foundation — spätere Tests

Vor Live-Provider oder persistenter Speicherung: statische Registry-/Manifestvalidierung, Capability-allowlist, unbekannte Capability, doppelte IDs, Providerfehler, partielle Ergebnisse, Schemafehler, Datenprovenienz, Session-Neustart, Speichermigration und Lösch-/Exportpfade mit lokalen Fixtures prüfen.

## Download-/Offline-Tests — erst nach Foundation-Gates

Der Manager ist **nicht** Teil der aktuellen Version 0.5.5. Diese Tests sind nur für eine spätere, separat freigegebene Version vorgesehen: direkte erlaubte HTTPS-Testdatei, Eingabevalidierung, WLAN/Foreground-Lifecycle, Queue-Wiederaufnahme, Speicherfehler, Dateilöschung, Flugmodus-Playback und Codec-/Tonverhalten. Keine DRM-, Login-, CAPTCHA-, Playlist- oder Zugriffsbeschränkungen umgehen.

## Release-Blocker

Shell-Import oder Start scheitert; UI behauptet Live-Daten oder persistente Speicherung obwohl nicht vorhanden; Capability-Gates werden umgangen; API braucht unbestätigtes Pro; erheblicher Datenverlust-/Accessibility-/Lifecycle-Fehler; riskanter Zugriff oder unerlaubte Quelle.
