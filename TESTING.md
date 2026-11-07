# UNIVERSE — Testing

## Grundsatz

Statische Prüfungen ersetzen keinen unabhängigen Import- oder Laufzeittest in der installierten Scripting-App auf dem iPhone. API-/Pro-Verfügbarkeit wird nur nach Gerätetest bestätigt. Aktueller Arbeitsstand ist Version 0.5.9: Sie reagiert auf den vom Nutzer gemeldeten `RootScreen`-Typfehler an der nativen Tab-Auswahl mit einem expliziten Screen-Union-Typ und einem entsprechend typisierten Observable-Startwert. Zusätzlich ist direktes Entfernen aus der sitzungsgebundenen Merkliste möglich. Die Meldung wurde nicht unabhängig in der installierten Scripting-App reproduziert; 0.5.9 ist nicht importiert oder auf einem iPhone ausgeführt worden. Der Nutzer bestätigt, dass die Breite der vorherigen Version funktioniert.

## Lokale Checks — Foundation 0.5.9 Arbeitsstand

- Paket nach Änderungen an Script oder Paket-README mit `python3 tools/build_scripting_package.py` neu gebaut.
- `python3 tools/validate_scripting_foundation.py` bestanden: Manifest-/App-Versions-Parität, Capability-Union und Gates, Provider-Operationen, eindeutige IDs, Fixture-Provenienz/ISO-Daten, deaktivierte AniWorld-Sicherheitsflags sowie ZIP-/Quellenbyte-Parität.
- Layout-Quelltextassertions bestanden: Root-`GeometryReader` rundet seine Messung ab; Viewport und Inhalt sind an die gemessene Breite gebunden; horizontale ScrollViews bleiben geclippt; kompakte Karten bleiben innerhalb ihrer Inhaltsbreite. Native-Navigationsassertions prüfen `RootScreen`-typisierte `useObservable`-Auswahl, fünf `Tab`-Ziele, `TabView`-Einbettung und den separaten Info-Button. Zusätzlich prüft der Validator das direkte Entfernen gespeicherter Elemente aus der Merkliste; es gibt keine `maxWidth: infinity`-Frames.
- Discovery-Assertions bestanden: Explore, Search und Feeds verwenden dieselben Inhaltstypfilter; der Feed wendet seinen unabhängigen Filter auf chronologisch sortierte Fixture-Einträge an; Detailvorschläge verwenden ausschließlich gleiche Kategorie oder gleichen Inhaltstyp und sind in der UI als lokale Demo-Vorschläge gekennzeichnet.
- Paket-CRC, Dateiliste (`script.json`, `index.tsx`, `README.md`, `assets/hero.jpg`, `plugins/aniworld/plugin.json`), Manifest und Byte-Parität geprüft. Zwei 0.5.9-Builds waren byteidentisch. Lokales Arbeitspaket: 157.481 Byte, SHA-256 `f8c95a116e42accf3c9da9cc56cce1e6d737e1c5b455a379f15d5c6cfe3f02d3`.
- TypeScript 5.8.3 `tsc --noEmit --strict` mit temporären, selbst angelegten Platzhalterdeklarationen für die Scripting-UI-APIs bestanden. Die Platzhalter belegen TSX-/Quelltextkonsistenz, nicht die echten Scripting-Typdeklarationen, App-Import oder Runtime.
- Python-Bytecode-Kompilierung der Build-/Validator-Skripte und `git diff --check` bestanden.
- Keine unabhängigen Scripting-App-Import-, iPhone-, Accessibility- oder Runtime-Tests für den 0.5.9-Arbeitsstand ausgeführt. Die Breite ist vom Nutzer als funktionierend bestätigt, nicht durch diesen Projektlauf nachgetestet.

Diese Checks beweisen weder Scripting-Kompatibilität noch API-Freigabe im kostenlosen Build oder tatsächliche Gerätefunktion.

## Zieltests: Foundation auf dem iPhone

1. **Import/Start:** `UNIVERSE.scripting` importieren; Scripting-App- und iOS-Version festhalten; Start in Home und Rückkehr nach erneuter Script-Ausführung prüfen.
2. **Native Navigation:** alle fünf Tabs Start, Entdecken, Suche, Neu und Merkliste direkt über die native Tab-Bar auswählen; Info über den Header öffnen; Tab-Wechsel und Info-Rückkehr testen; Details aus mehreren Tabs öffnen, Detailvorschlag auswählen und zum aufrufenden Tab zurückkehren.
3. **Suche und Filter:** Titel, Kurzbeschreibung, Kategorie und Quelle suchen; Filter unabhängig in Explore, Search und Feeds wechseln; Suchtext leeren; Nulltrefferzustand testen.
4. **Feed/Provenienz:** Medien, Artikel und Termine im Feed einzeln filtern; neueste Einträge zuerst prüfen; Quelle und Abrufdatum in Karten und Details vergleichen; Demo-Inhalte nicht mit Live-Ergebnissen verwechseln.
5. **Detailvorschläge:** Einträge aus mehreren Typen öffnen; prüfen, dass Vorschläge nur bei gleicher Kategorie oder gleichem Typ erscheinen, keine Quelle als Live-Anbieter ausgegeben wird und die Detailnavigation beim Öffnen eines Vorschlags zurückführt.
6. **Merkliste:** merken/entfernen sowohl im Detail als auch direkt in der Merkliste testen, mehrere Items und Tab-Wechsel prüfen; nach Script-Neustart ist Verlust erwartbar und muss zur UI-Aussage passen.
7. **Netzwerk:** beim Öffnen der Basis dürfen keine Provider-/Webanfragen ausgelöst werden.
8. **Layoutbreite:** vom Nutzer bestätigte Breite auf dem schmalsten unterstützten iPhone erneut regressionsprüfen. Viewport-/Inhaltsbreite in Info notieren, Außenkanten an Header, nativer Tab-Bar, Hero, Filtern, Rails, kompakten Karten und Detailansicht kontrollieren. Nur horizontale Katalogschienen dürfen intern seitlich scrollen. Prüfen, dass neue Detail-Rails keine unerwünschte Überbreite oder Abschneidung verursachen.
9. **iOS UX:** Dark Mode, Safe Areas, VoiceOver, Dynamic Type, Tastatur, Kontrast, Touch-Ziele und Lifecycle dokumentieren.

## Provider-/Daten-Foundation — spätere Tests

Vor Live-Provider oder persistenter Speicherung: statische Registry-/Manifestvalidierung, Capability-allowlist, unbekannte Capability, doppelte IDs, Providerfehler, partielle Ergebnisse, Schemafehler, Datenprovenienz, Session-Neustart, Speichermigration und Lösch-/Exportpfade mit lokalen Fixtures prüfen.

## Download-/Offline-Tests — erst nach Foundation-Gates

Der Manager ist **nicht** Teil des aktuellen 0.5.9-Arbeitsstands. Diese Tests sind nur für eine spätere, separat freigegebene Version vorgesehen: direkte erlaubte HTTPS-Testdatei, Eingabevalidierung, WLAN/Foreground-Lifecycle, Queue-Wiederaufnahme, Speicherfehler, Dateilöschung, Flugmodus-Playback und Codec-/Tonverhalten. Keine DRM-, Login-, CAPTCHA-, Playlist- oder Zugriffsbeschränkungen umgehen.

## Release-Blocker

Shell-Import oder Start scheitert; UI behauptet Live-Daten oder persistente Speicherung obwohl nicht vorhanden; Capability-Gates werden umgangen; API braucht unbestätigtes Pro; erheblicher Datenverlust-/Accessibility-/Lifecycle-Fehler; riskanter Zugriff oder unerlaubte Quelle.
