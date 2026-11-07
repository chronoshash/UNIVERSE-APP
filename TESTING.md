# UNIVERSE — Testing

## Grundsatz

Statische Prüfungen ersetzen keinen unabhängigen Import- oder Laufzeittest in der installierten Scripting-App auf dem iPhone. API-/Pro-Verfügbarkeit wird nur nach Gerätetest bestätigt. Der aktuelle Quellstand ist Version 0.5.13. `RootScreen` wird aus einem gemeinsamen Literal-Tupel abgeleitet; ein Helper mit explizitem `RootScreen`-Rückgabetyp übergibt die volle Union an `useObservable`. Die fünf nativen `<Tab>`-Kinder bleiben literal-typisiert und der dokumentierte Modifier `toolbarBackgroundVisibility` blendet den Tab-Bar-Hintergrund aus. Damit wird der gemeldete TypeScript-Fehler an der `TabView`-Auswahl auf Quelltextebene adressiert; er wurde nicht in der installierten Scripting-App reproduziert. Die Merkliste verwendet den laut offizieller Dokumentation standardmäßig privaten Scripting-`Storage`-Bereich; App-Import und Persistenz über Script-Neustarts sind nicht auf dem Gerät geprüft. Die Breite der Vorversion wurde vom Nutzer als funktionierend bestätigt.

## Lokale Checks — Foundation 0.5.13

- `python3 tools/build_scripting_package.py` nach den Änderungen an Scripting-Quelle und Paket-README ausgeführt; zwei aufeinanderfolgende Builds waren byteidentisch.
- `python3 tools/validate_scripting_foundation.py` bestanden: Manifest-/App-Versions-Parität, Capability-Union und Gates, Provider-Operationen, eindeutige IDs, Fixture-Provenienz/ISO-Daten, deaktivierte AniWorld-Sicherheitsflags sowie ZIP-/Quellenbyte-Parität. Die statischen Library-Assertions prüfen private Storage-Grenzen, bounded/validierte IDs, geordnete Ergebnisse, vier Content-Filter, Filterzählungen und die Wiederherstellung leerer Filteransichten.
- Layout- und Navigationsassertions bestanden: Root-`GeometryReader`, gebundene/geclippte Scrollbereiche, fünf literal-typisierte native Tab-Werte, getypte Auswahl, `toolbarBackgroundVisibility` für `tabBar` und separater Info-Button.
- Paket-CRC, Dateiliste (`script.json`, `index.tsx`, `README.md`, `assets/hero.jpg`, `plugins/aniworld/plugin.json`), Manifest und Byte-Parität bestanden. Paketgröße 159.223 Byte, SHA-256 `cd55edeaf0bcd998ab332b7f1ff873924f198d7b9d473401416fb9714a45c061`.
- TypeScript 5.8.3 `tsc --noEmit --strict` mit temporären, selbst angelegten Platzhalterdeklarationen für Scripting-UI und Storage bestanden. Die Stubs modellieren `TabView.selection` und `Tab.value` als `RootScreen`; das belegt den Quelltext gegen diesen Testvertrag, nicht gegen echte Scripting-Typdeklarationen oder die App-Runtime.
- Python Build-/Validator-Syntax und `git diff --check` bestanden.
- Nach Merge von PR #21 (`9c0b8f5b4697005642dc6115bb4f221ef44cfb01`) wurde das Paket unabhängig über die GitHub Contents API von `main` abgerufen; Bytes und SHA-256 stimmten mit dem lokalen Paket überein. ZIP-CRC und Manifestversion 0.5.13 bestanden. [GitHub-Prerelease v0.5.13](https://github.com/chronoshash/UNIVERSE-APP/releases/tag/v0.5.13) enthält keinen Asset-Anhang und verweist auf das geprüfte Paket in `main`.
- Die offiziellen Scripting-Dokumente am Commit `9dd44bc276c967f2900ecee2bdd785cf3426a5fa` wurden auf Storage, FileManager und SQLite geprüft. `Storage` ist für kleine Werte geeignet, standardmäßig script-privat, und seine Writes werden laut Doku asynchron persistiert. Die Wahl speichert nur IDs, verwendet weder die Shared-Domain noch eine eigene Datenbank. Das ist Dokumentationsprüfung, kein Nachweis im installierten Scripting-Build.
- Es wurden keine unabhängigen Scripting-App-Import-, iPhone-, Accessibility- oder Runtime-Tests ausgeführt. Die Transparenz der nativen Bar, Library-Filterdarstellung und Persistenz bleiben am Gerät offen.

Diese Checks beweisen weder Scripting-Kompatibilität noch API-Freigabe im kostenlosen Build oder tatsächliche Gerätefunktion.

## Zieltests: Foundation auf dem iPhone

1. **Import/Start:** `UNIVERSE.scripting` importieren; Scripting-App- und iOS-Version festhalten; Start in Home und Rückkehr nach erneuter Script-Ausführung prüfen.
2. **Native Navigation und Bar:** alle fünf Tabs Start, Entdecken, Suche, Neu und Merkliste über die native Tab-Bar auswählen; transparenten Tab-Bar-Hintergrund auf hellen und dunklen Inhaltsflächen prüfen; Info über den Header öffnen; Tab-Wechsel und Info-Rückkehr testen; Details aus mehreren Tabs öffnen, Detailvorschlag auswählen und zum aufrufenden Tab zurückkehren.
3. **Suche und Filter:** Titel, Kurzbeschreibung, Kategorie und Quelle suchen; Filter unabhängig in Explore, Search und Feeds wechseln; im Library jeden Typ, Filterzählungen und leere Filter samt Rückweg zu allen Inhalten prüfen; Suchtext leeren; Nulltrefferzustand testen.
4. **Feed/Provenienz:** Medien, Artikel und Termine im Feed einzeln filtern; neueste Einträge zuerst prüfen; Quelle und Abrufdatum in Karten und Details vergleichen; Demo-Inhalte nicht mit Live-Ergebnissen verwechseln.
5. **Detailvorschläge:** Einträge aus mehreren Typen öffnen; prüfen, dass Vorschläge nur bei gleicher Kategorie oder gleichem Typ erscheinen, keine Quelle als Live-Anbieter ausgegeben wird und die Detailnavigation beim Öffnen eines Vorschlags zurückführt.
6. **Merkliste/Storage:** merken und entfernen sowohl im Detail als auch direkt in der Merkliste testen; Reihenfolge, Anzahl und Tab-Wechsel prüfen. Script beenden und erneut ausführen: IDs und Reihenfolge sollen wiederhergestellt sein, wenn Scripting-Storage verfügbar ist. Storage-Ausfall oder ungültige gespeicherte Form muss einen sichtbaren Session-Fallback liefern. Nach erfolgreichem Aufruf von `Storage.set` anschließend Neustart kontrollieren, da die Doku asynchrone Persistenz beschreibt.
7. **Netzwerk:** beim Öffnen der Basis dürfen keine Provider-/Webanfragen ausgelöst werden.
8. **Layoutbreite:** vom Nutzer bestätigte Breite auf dem schmalsten unterstützten iPhone erneut regressionsprüfen. Viewport-/Inhaltsbreite in Info notieren, Außenkanten an Header, nativer Tab-Bar, Hero, Filtern, Rails, kompakten Karten und Detailansicht kontrollieren. Nur horizontale Katalogschienen dürfen intern seitlich scrollen. Prüfen, dass neue Detail-Rails keine unerwünschte Überbreite oder Abschneidung verursachen.
9. **iOS UX:** Dark Mode, Safe Areas, VoiceOver, Dynamic Type, Tastatur, Kontrast, Touch-Ziele und Lifecycle dokumentieren.

## Provider-/Daten-Foundation — spätere Tests

Vor vollständiger Entity-Persistenz oder Live-Providern: statische Registry-/Manifestvalidierung, Capability-Allowlist, unbekannte Capability, doppelte IDs, Providerfehler, partielle Ergebnisse, Schemafehler, Datenprovenienz, Migrationen und Lösch-/Exportpfade mit lokalen Fixtures prüfen. Die kleine ID-Merkliste aus 0.5.12 separat über Script-Neustarts und Storage-Fehler testen.

## Download-/Offline-Tests — erst nach Foundation-Gates

Der Manager ist **nicht** Teil des aktuellen 0.5.13-Arbeitsstands. Diese Tests sind nur für eine spätere, separat freigegebene Version vorgesehen: direkte erlaubte HTTPS-Testdatei, Eingabevalidierung, WLAN/Foreground-Lifecycle, Queue-Wiederaufnahme, Speicherfehler, Dateilöschung, Flugmodus-Playback und Codec-/Tonverhalten. Keine DRM-, Login-, CAPTCHA-, Playlist- oder Zugriffsbeschränkungen umgehen.

## Release-Blocker

Shell-Import oder Start scheitert; UI behauptet Live-Daten oder privaten Storage-Erfolg obwohl nicht vorhanden; Capability-Gates werden umgangen; API braucht unbestätigtes Pro; erheblicher Datenverlust-/Accessibility-/Lifecycle-Fehler; riskanter Zugriff oder unerlaubte Quelle.
