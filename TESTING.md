# UNIVERSE — Testing

## Grundsatz

Statische Prüfungen ersetzen keinen Import- oder Laufzeittest in der installierten Scripting-App auf dem iPhone. API-/Pro-Verfügbarkeit wird nur nach Gerätetest bestätigt. Aktueller Scope: lokale Foundation 0.4.0; der DownloadManager ist zurückgestellt.

## Lokale Checks — Foundation 0.4.0

- Paket nach Änderungen an Script oder Paket-README neu mit `python3 tools/build_scripting_package.py` gebaut.
- ZIP-CRC, Root-Dateiliste (`script.json`, `index.tsx`, `README.md`), Manifest-Version, Byte-Parität und reproduzierbarer Doppelbuild geprüft.
- `python3 tools/validate_scripting_foundation.py` bestanden: statische Manifest-/App-Versions-Parität, Capability-Union und Gates, Provider-Operationen, eindeutige IDs, Fixture-Provenienz/ISO-Daten sowie Paketparität. Das ist ein Quelltextvertragstest, kein App-Runtime-Test.
- Statische Assertions: kein `DownloadManager`, kein `AVPlayer` und keine Netzwerkquelle.
- TypeScript 5.8.3 `tsc --noEmit` mit temporären Scripting-Platzhalterdeklarationen bestanden. Das prüft Syntax/TSX, nicht die echten Scripting-API-Typen oder das App-Runtime.
- Finales Paket 0.4.0: 5.298 Byte, SHA-256 `b7a3b23595918bccb97eb7109a419b226af5b820d745956e1b0e28abeae41d6f`.
- Keine Scripting-App-Import-, iPhone-, Bedienbarkeits- oder Laufzeittests ausgeführt.

Diese Checks beweisen weder Scripting-Kompatibilität noch API-Freigabe im kostenlosen Build oder tatsächliche Gerätefunktion.

## Zieltests: Foundation auf dem iPhone

1. **Import/Start:** `UNIVERSE.scripting` importieren; Scripting-App- und iOS-Version festhalten; Start in Home und Rückkehr nach erneuter Script-Ausführung prüfen.
2. **Navigation:** Home, Entdecken, Suche, Feeds, Merkliste, Info und Detailansicht erreichen; Details aus Home/Feed/Suche öffnen und in die vorherige Ansicht zurückkehren.
3. **Lokale Suche:** Titel, Kurzbeschreibung, Kategorie und Quelle suchen; Inhaltstypfilter wechseln; Filter aus Entdecken übernehmen; Suchtext leeren; Nulltrefferzustand testen.
4. **Feed/Provenienz:** gemischte Demo-Inhalte chronologisch prüfen; Quelle und Abrufdatum in Karten und Details vergleichen; Demo-Inhalte nicht mit Live-Ergebnissen verwechseln.
5. **Merkliste:** merken/entfernen, mehrere Items, Navigation währenddessen; nach Script-Neustart ist Verlust erwartbar und muss zur UI-Aussage passen.
6. **Netzwerk:** beim Öffnen der Basis dürfen keine Provider-/Webanfragen ausgelöst werden.
7. **iOS UX:** Dark Mode, Safe Areas, VoiceOver, Dynamic Type, Tastatur, Kontrast, Touch-Ziele und Lifecycle dokumentieren.

## Provider-/Daten-Foundation — spätere Tests

Vor Live-Provider oder persistenter Speicherung: statische Registry-/Manifestvalidierung, Capability-allowlist, unbekannte Capability, doppelte IDs, Providerfehler, partielle Ergebnisse, Schemafehler, Datenprovenienz, Session-Neustart, Speichermigration und Lösch-/Exportpfade mit lokalen Fixtures prüfen.

## Download-/Offline-Tests — erst nach Foundation-Gates

Der Manager ist **nicht** Teil der aktuellen Version 0.4.0. Diese Tests sind nur für eine spätere, separat freigegebene Version vorgesehen: direkte erlaubte HTTPS-Testdatei, Eingabevalidierung, WLAN/Foreground-Lifecycle, Queue-Wiederaufnahme, Speicherfehler, Dateilöschung, Flugmodus-Playback und Codec-/Tonverhalten. Keine DRM-, Login-, CAPTCHA-, Playlist- oder Zugriffsbeschränkungen umgehen.

## Release-Blocker

Shell-Import oder Start scheitert; UI behauptet Live-Daten oder persistente Speicherung obwohl nicht vorhanden; Capability-Gates werden umgangen; API braucht unbestätigtes Pro; erheblicher Datenverlust-/Accessibility-/Lifecycle-Fehler; riskanter Zugriff oder unerlaubte Quelle.
