# UNIVERSE — Testing

## Grundsatz

Statische Prüfungen ersetzen keinen Import- oder Laufzeittest in der installierten Scripting-App auf dem iPhone. API-/Pro-Verfügbarkeit wird nur nach Gerätetest bestätigt. Aktueller Scope: lokale Foundation 0.5.3 mit gebündeltem Hero-Artwork und deaktiviertem AniWorld-Plugin-Skelett; der DownloadManager ist zurückgestellt.

## Lokale Checks — Foundation 0.5.3

- Paket nach Änderungen an Script oder Paket-README neu mit `python3 tools/build_scripting_package.py` gebaut.
- ZIP-CRC, Dateiliste (`script.json`, `index.tsx`, `README.md`, `assets/hero.jpg`, `plugins/aniworld/plugin.json`), Manifest-Version, Byte-Parität einschließlich Artwork und Plugin-Manifest sowie reproduzierbarer Doppelbuild geprüft.
- `python3 tools/validate_scripting_foundation.py` bestanden: statische Manifest-/App-Versions-Parität, Capability-Union und Gates, Provider-Operationen, eindeutige IDs, Fixture-Provenienz/ISO-Daten, deaktivierte AniWorld-Plugin-Sicherheitsflags sowie Paketparität. Das ist ein Quelltextvertragstest, kein App-Runtime-Test.
- Statische Assertions: kein `DownloadManager`, kein `AVPlayer` und keine Netzwerkquelle.
- TypeScript 5.8.3 `tsc --noEmit` mit selbst angelegten, temporären UI-Stubs für `Color`-Werte und `VirtualNode`-Kinder bestanden. Die Stubs bilden die gemeldeten Typmuster nach; sie sind nicht die echten Scripting-Typdeklarationen und belegen weder App-Import noch Runtime.
- Finales Paket 0.5.3: 156.871 Byte, SHA-256 `61f0a8f0ee466e6e5f7b5e62b63c42ed86301fc1747915c05b0ef635f29bb38c`. Der Build lief zweimal deterministisch durch. Der Validator prüft nun zusätzlich, dass Root-, Navigations- und Karten-Padding innerhalb des Max-Width-Frames liegt.
- Keine Scripting-App-Import-, iPhone-, Bedienbarkeits- oder Laufzeittests ausgeführt.

Diese Checks beweisen weder Scripting-Kompatibilität noch API-Freigabe im kostenlosen Build oder tatsächliche Gerätefunktion.

## Zieltests: Foundation auf dem iPhone

1. **Import/Start:** `UNIVERSE.scripting` importieren; Scripting-App- und iOS-Version festhalten; Start in Home und Rückkehr nach erneuter Script-Ausführung prüfen.
2. **Navigation:** Home, Entdecken, Suche, Feeds, Merkliste, Info und Detailansicht erreichen; Details aus Home/Feed/Suche öffnen und in die vorherige Ansicht zurückkehren.
3. **Lokale Suche:** Titel, Kurzbeschreibung, Kategorie und Quelle suchen; Inhaltstypfilter wechseln; Filter aus Entdecken übernehmen; Suchtext leeren; Nulltrefferzustand testen.
4. **Feed/Provenienz:** gemischte Demo-Inhalte chronologisch prüfen; Quelle und Abrufdatum in Karten und Details vergleichen; Demo-Inhalte nicht mit Live-Ergebnissen verwechseln.
5. **Merkliste:** merken/entfernen, mehrere Items, Navigation währenddessen; nach Script-Neustart ist Verlust erwartbar und muss zur UI-Aussage passen.
6. **Netzwerk:** beim Öffnen der Basis dürfen keine Provider-/Webanfragen ausgelöst werden.
7. **Layoutbreite:** auf dem schmalsten unterstützten iPhone dürfen Header, Navigationsmatrix, Featured-Panel, kompakte Karten und Text nicht über den Viewport hinausragen; nur die horizontalen Inhaltsschienen dürfen innerhalb ihres Scrollbereichs seitlich bewegt werden.
8. **iOS UX:** Dark Mode, Safe Areas, VoiceOver, Dynamic Type, Tastatur, Kontrast, Touch-Ziele und Lifecycle dokumentieren.

## Provider-/Daten-Foundation — spätere Tests

Vor Live-Provider oder persistenter Speicherung: statische Registry-/Manifestvalidierung, Capability-allowlist, unbekannte Capability, doppelte IDs, Providerfehler, partielle Ergebnisse, Schemafehler, Datenprovenienz, Session-Neustart, Speichermigration und Lösch-/Exportpfade mit lokalen Fixtures prüfen.

## Download-/Offline-Tests — erst nach Foundation-Gates

Der Manager ist **nicht** Teil der aktuellen Version 0.5.3. Diese Tests sind nur für eine spätere, separat freigegebene Version vorgesehen: direkte erlaubte HTTPS-Testdatei, Eingabevalidierung, WLAN/Foreground-Lifecycle, Queue-Wiederaufnahme, Speicherfehler, Dateilöschung, Flugmodus-Playback und Codec-/Tonverhalten. Keine DRM-, Login-, CAPTCHA-, Playlist- oder Zugriffsbeschränkungen umgehen.

## Release-Blocker

Shell-Import oder Start scheitert; UI behauptet Live-Daten oder persistente Speicherung obwohl nicht vorhanden; Capability-Gates werden umgangen; API braucht unbestätigtes Pro; erheblicher Datenverlust-/Accessibility-/Lifecycle-Fehler; riskanter Zugriff oder unerlaubte Quelle.
