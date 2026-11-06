# UNIVERSE — Testing

## Grundsatz

Statische Prüfungen ersetzen keinen Import- oder Laufzeittest in der installierten Scripting-App auf dem iPhone. Kein Test wird als bestanden dokumentiert, ohne tatsächlichen Nachweis. Keine Scripting-Pro-Abhängigkeit behaupten oder voraussetzen. Aktueller Stand: [COMPATIBILITY.md](COMPATIBILITY.md).

## Tatsächlich ausgeführte lokale Checks (2026-11-06, Paket 0.3.0)

- `python3 tools/build_scripting_package.py` zweimal; beide Builds erzeugten dieselbe SHA-256-Datei: `cc1ac8d065d578df74167f677f21312d3a6950fe7911824a0633cc3f874b1585` (7.595 Byte).
- Python `zipfile`: CRC-Test, exakte Root-Dateiliste und Reihenfolge (`script.json`, `index.tsx`, `README.md`), Manifest-JSON/Entry/Version 0.3.0 und Byte-Parität aller Paketdateien mit den Quellen bestanden.
- Statische Quelltext-Assertions für Suchfelder, Kategorienfilter, direkte HTTPS-URL-Grenze, Foreground-/WLAN-Konfiguration und fehlende Sora-Runtime bestanden. Das ist kein Ausführungs- oder Verhaltenstest.
- `git diff --check` bestanden.
- TypeScript/TSX-Compile-Check nicht ausgeführt: `tsc` ist in der Umgebung nicht installiert; es wurde keine Compiler-Abhängigkeit installiert.
- Keine Scripting-App-Import-, iPhone-, Download-, Bedienbarkeits- oder Playback-Laufzeittests ausgeführt.

Diese Checks beweisen weder Scripting-Kompatibilität noch API-Freigabe im kostenlosen Build oder tatsächliche Gerätefunktion.

## Zieltests: Download und Offline-Mediathek

Ausschließlich mit eigener oder sonst nachweisbar erlaubter direkter HTTPS-Testdatei testen; keine DRM-, Login-, CAPTCHA- oder Zugriffsbegrenzungen umgehen.

1. **Import/Start:** `UNIVERSE.scripting` importieren, Home öffnen, alle Ansichten, Navigation und Fehlerhinweise ausprobieren. Titel-Suche in Downloads/Mediathek, Kategorienfilter, leere Treffer und ausgeblendete leere Gruppen prüfen. Scripting-App- und iOS-Version protokollieren; tatsächlichen kostenlosen API-Zugriff prüfen.
2. **Eingabevalidierung:** gültige HTTPS-Datei mit `.mp4`/`.m4v`/`.mov`; ungültige URL; HTTP; URL-Benutzerinfo/Fragment; nicht unterstützte Endung; URL-Endung, deren Antwort kein Video ist; doppelter Link. Query-Token-Warnung beachten.
3. **Queue/Lifecycle:** WLAN-only, Fortschritt, Pause/Fortsetzen, Abbrechen, Fehleranzeige, App in den Hintergrund stellen (Foreground-Transfer muss laut API-Konfiguration pausieren), App-Skript erneut öffnen und Queue-/Completed-Task-Wiederherstellung prüfen.
4. **Organisation:** je eine erlaubte Testdatei in Anime/Filme/Serien/Sonstiges laden; Dateipfad und Anzeigegruppe kontrollieren; fehlende/manuell entfernte Datei darf nicht als offline verfügbar erscheinen.
5. **Offline-Playback:** nach vollständigem Download Flugmodus einschalten, Datei nur aus Offline-Mediathek starten, Play/Pause, Ton, Codecfehler und Ende testen. Nicht aus dem ursprünglichen Netzwerkpfad abspielen.
6. **Löschen:** zuerst Bestätigung, dann Queue-Eintrag und zugehörige lokale Datei entfernen; Abbrechen muss beides erhalten. Unbeteiligte Dateien dürfen nie entfernt werden.
7. **Fehler-/Randfälle:** WLAN-Verlust, HTTP-Fehler, abgebrochene/unterbrochene Datei, Speicherknappheit, inkompatibler Codec, fehlende Datei und erneute Queue-Verbindung dokumentieren.
8. **iOS UX:** Dark Mode, Safe Areas, VoiceOver, Dynamic Type, Tastatur, Einhandbedienung und Player-Lifecycle prüfen.

## Weitere Plattform- und Plugin-Zieltests

1. **Core-Vertrag:** Manifestfehler, doppelte Capability-IDs, nicht unterstützte API-Version, Plugin-Ausfall und Deaktivierung.
2. **Data:** Entities, SourceRecords, Relations, `confidence`, Migration/Rollback, Duplikat- und Löschpfad.
3. **Provider:** lokale Fixtures für valide, leere, falsche, geänderte und blockierte Antworten; Timeout/Abbruch/Redirect/Rate Limit.
4. **Suche/Feed/UI:** gemischte Entity-Typen, partielle Providerfehler, unbekannter Renderer, Offline-/Leerzustände und sortierbares Dashboard.
5. **AniWorld:** falls rechtlich und technisch freigegeben, zunächst nur externe Navigation und lokale öffentliche Metadaten-Fixtures. Live-Aufrufe sind separat freizugeben; keine CAPTCHA-/Access-Control-Umgehung oder Stream-Extraktion.

## Release-Blocker

Import oder Start scheitert; benötigte API ist nicht im tatsächlich verfügbaren Build enthalten; Downloads gefährden/überschreiben fremde Dateien; Queue-Status/Fehler werden verschleiert; Offline-Datei spielt im Flugmodus nicht oder UI behauptet das Gegenteil; unklare Rechte/Pro-Anforderung; Zugriffsbeschränkung wird umgangen; schwerer Accessibility-, Dark-Mode- oder Datenverlustfehler.
