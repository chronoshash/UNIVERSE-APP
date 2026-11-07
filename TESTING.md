# UNIVERSE — Testing

## Grundsatz

Statische Prüfungen ersetzen keinen unabhängigen Import- oder Laufzeittest in der installierten Scripting-App auf dem iPhone. API-/Pro-Verfügbarkeit wird nur nach Gerätetest bestätigt. Aktueller veröffentlichter Arbeitsstand ist Version 0.5.11. `RootScreen` wird aus einem gemeinsamen Literal-Tupel abgeleitet; ein Helper mit explizitem `RootScreen`-Rückgabetyp übergibt die volle Union an `useObservable`, statt die Auswahl auf den initialen String-Literalwert einzuengen. Die fünf nativen `<Tab>`-Kinder bleiben literal-typisiert und der dokumentierte Modifier `toolbarBackgroundVisibility` blendet den Tab-Bar-Hintergrund aus. Damit wird der gemeldete TypeScript-Fehler an der `TabView`-Auswahl auf Quelltextebene adressiert; er wurde nicht in der installierten Scripting-App reproduziert. Die 0.5.11-Version ist nicht in Scripting importiert oder auf einem iPhone ausgeführt worden. Die Breite der Vorversion wurde vom Nutzer als funktionierend bestätigt.

## Lokale Checks — Foundation 0.5.11

- `python3 tools/build_scripting_package.py` nach den Änderungen an Scripting-Quelle und Paket-README ausgeführt; zwei aufeinanderfolgende Builds waren byteidentisch.
- `python3 tools/validate_scripting_foundation.py` bestanden: Manifest-/App-Versions-Parität, Capability-Union und Gates, Provider-Operationen, eindeutige IDs, Fixture-Provenienz/ISO-Daten, deaktivierte AniWorld-Sicherheitsflags sowie ZIP-/Quellenbyte-Parität.
- Layout-Assertions bestanden: Root-`GeometryReader` rundet seine Messung ab; Viewport und Inhalt sind an die gemessene Breite gebunden; horizontale ScrollViews bleiben geclippt; kompakte Karten bleiben innerhalb ihrer Inhaltsbreite. Die Navigations-Assertions prüfen ein `RootScreen`-typisiertes Observable, exakt fünf literal-typisierte native Tab-Werte, passende Seiteninhalte, `toolbarBackgroundVisibility` mit Ziel `tabBar` und den separaten Info-Button. Zusätzlich werden das explizite `SessionLibraryState`-Storage-Boundary, bewahrte Merkreihenfolge, sichtbare Anzahl und direktes Entfernen aus der Merkliste geprüft; unbeschränkte `maxWidth: infinity`-Frames sind ausgeschlossen.
- Paket-CRC, Dateiliste (`script.json`, `index.tsx`, `README.md`, `assets/hero.jpg`, `plugins/aniworld/plugin.json`), Manifest und Byte-Parität bestanden. Paketgröße 157.989 Byte, SHA-256 `a9be3b1e0e564e55f2663e101a1d6c8df9a6657a6d61ada7d371090a5fd268b7`.
- TypeScript 5.8.3 `tsc --noEmit --strict` mit temporären, selbst angelegten Platzhalterdeklarationen für Scripting-UI-APIs bestanden. Die Stubs modellieren `TabView`-Selektion als `Observable<RootScreen>` und `Tab.value` als `RootScreen`; das belegt den Quelltext gegen diesen Testvertrag, nicht gegen offizielle Scripting-Typdeklarationen oder die App-Runtime.
- Python Build-/Validator-Syntax und `git diff --check` bestanden.
- Nach dem Merge von PR #17 wurde `UNIVERSE.scripting` unabhängig über die GitHub-Contents-API von `main` abgerufen, byteweise mit dem lokalen Build verglichen und mit gleicher SHA-256, Paketdateiliste und ZIP-Prüfung bestätigt.
- Es wurden keine unabhängigen Scripting-App-Import-, iPhone-, Accessibility- oder Runtime-Tests ausgeführt. Die Transparenz der nativen Bar und der gemeldete Typfehler sind am Gerät weiterhin offen.

Diese Checks beweisen weder Scripting-Kompatibilität noch API-Freigabe im kostenlosen Build oder tatsächliche Gerätefunktion.

## Zieltests: Foundation auf dem iPhone

1. **Import/Start:** `UNIVERSE.scripting` importieren; Scripting-App- und iOS-Version festhalten; Start in Home und Rückkehr nach erneuter Script-Ausführung prüfen.
2. **Native Navigation und Bar:** alle fünf Tabs Start, Entdecken, Suche, Neu und Merkliste über die native Tab-Bar auswählen; transparenten Tab-Bar-Hintergrund auf hellen und dunklen Inhaltsflächen prüfen; Info über den Header öffnen; Tab-Wechsel und Info-Rückkehr testen; Details aus mehreren Tabs öffnen, Detailvorschlag auswählen und zum aufrufenden Tab zurückkehren.
3. **Suche und Filter:** Titel, Kurzbeschreibung, Kategorie und Quelle suchen; Filter unabhängig in Explore, Search und Feeds wechseln; Suchtext leeren; Nulltrefferzustand testen.
4. **Feed/Provenienz:** Medien, Artikel und Termine im Feed einzeln filtern; neueste Einträge zuerst prüfen; Quelle und Abrufdatum in Karten und Details vergleichen; Demo-Inhalte nicht mit Live-Ergebnissen verwechseln.
5. **Detailvorschläge:** Einträge aus mehreren Typen öffnen; prüfen, dass Vorschläge nur bei gleicher Kategorie oder gleichem Typ erscheinen, keine Quelle als Live-Anbieter ausgegeben wird und die Detailnavigation beim Öffnen eines Vorschlags zurückführt.
6. **Merkliste:** merken/entfernen sowohl im Detail als auch direkt in der Merkliste testen, Merkreihenfolge und Anzahl kontrollieren, mehrere Items und Tab-Wechsel prüfen; nach Script-Neustart ist Verlust erwartbar und muss zur UI-Aussage passen.
7. **Netzwerk:** beim Öffnen der Basis dürfen keine Provider-/Webanfragen ausgelöst werden.
8. **Layoutbreite:** vom Nutzer bestätigte Breite auf dem schmalsten unterstützten iPhone erneut regressionsprüfen. Viewport-/Inhaltsbreite in Info notieren, Außenkanten an Header, nativer Tab-Bar, Hero, Filtern, Rails, kompakten Karten und Detailansicht kontrollieren. Nur horizontale Katalogschienen dürfen intern seitlich scrollen. Prüfen, dass neue Detail-Rails keine unerwünschte Überbreite oder Abschneidung verursachen.
9. **iOS UX:** Dark Mode, Safe Areas, VoiceOver, Dynamic Type, Tastatur, Kontrast, Touch-Ziele und Lifecycle dokumentieren.

## Provider-/Daten-Foundation — spätere Tests

Vor Live-Provider oder persistenter Speicherung: statische Registry-/Manifestvalidierung, Capability-Allowlist, unbekannte Capability, doppelte IDs, Providerfehler, partielle Ergebnisse, Schemafehler, Datenprovenienz, Session-Neustart, Speichermigration und Lösch-/Exportpfade mit lokalen Fixtures prüfen.

## Download-/Offline-Tests — erst nach Foundation-Gates

Der Manager ist **nicht** Teil des aktuellen 0.5.11-Arbeitsstands. Diese Tests sind nur für eine spätere, separat freigegebene Version vorgesehen: direkte erlaubte HTTPS-Testdatei, Eingabevalidierung, WLAN/Foreground-Lifecycle, Queue-Wiederaufnahme, Speicherfehler, Dateilöschung, Flugmodus-Playback und Codec-/Tonverhalten. Keine DRM-, Login-, CAPTCHA-, Playlist- oder Zugriffsbeschränkungen umgehen.

## Release-Blocker

Shell-Import oder Start scheitert; UI behauptet Live-Daten oder persistente Speicherung obwohl nicht vorhanden; Capability-Gates werden umgangen; API braucht unbestätigtes Pro; erheblicher Datenverlust-/Accessibility-/Lifecycle-Fehler; riskanter Zugriff oder unerlaubte Quelle.
