# UNIVERSE

**Eine Oberfläche. Viele Inhaltstypen.**

UNIVERSE ist ein persönlicher Hub für unterschiedliche Webinhalte. **Die aktuelle Basis ist zuerst die App-Shell, nicht der Download-Manager.** Der aktuelle Stand 0.5.10 behält die dokumentierte native Navigation mit fünf festen Bereichen (Start, Entdecken, Suche, Neu, Merkliste) und separatem Info-Zugang bei. Die Tab-Auswahl und alle fünf Tab-Werte sind explizit an `RootScreen` gebunden; der vom Nutzer gemeldete TypeScript-Fehler wird damit auf Quelltextebene adressiert. Die native Tab-Bar blendet ihren Hintergrund über den dokumentierten Modifier `toolbarBackgroundVisibility` gezielt aus. Der Scripting-App-Import und das iPhone-Rendering sind nicht unabhängig getestet.

Die dunkle Katalogoberfläche bietet lokales Titelmotiv, Inhaltsschienen und zwölf lokale Demo-Einträge. Home, Entdecken, Suche, Feeds, Merkliste und Info verwenden lokale Fixture-Inhalte für Medien, Artikel und Termine. Entity-Liste, Suche, Feed und Details laufen über Capability-Prüfungen; Inhaltstypfilter in Explore, Suche und Feed sowie lokale, nachvollziehbare Detailvorschläge bleiben enthalten. Die Merkliste gilt nur während der Script-Sitzung. Das AniWorld-Plugin ist ein deaktiviertes Skelett ohne Live-Abfragen.

Version 0.5.10 ist als [GitHub-Prerelease veröffentlicht](https://github.com/chronoshash/UNIVERSE-APP/releases/tag/v0.5.10). Der Paketstand auf `main` wurde nach dem Merge unabhängig heruntergeladen und byteweise mit dem lokalen Build verglichen: 157.709 Byte, SHA-256 `1d190dfc944af4afd271b5c854094721d0334b3a8b5c7a4d250a46fa9aa34559`. Das Release hat keinen Binäranhang; das geprüfte `UNIVERSE.scripting` liegt im verlinkten Repository-Stand. Die gemeldete Fehlermeldung wurde nicht in der installierten Scripting-App reproduziert. Scripting-App-Import, native Darstellung und iPhone-Laufzeit bleiben offen.

Downloads, Offline-Wiedergabe, echte Provider, dauerhafte Speicherung und dynamische Plugins bleiben bewusst außerhalb der aktuellen Foundation. Der frühere 0.3.0-Download-Prototyp war ein Vorgriff auf spätere Arbeit; ein Download-/Playback-Manager kommt erst nach dem Aufbau und Testen der App-Shell, Datenverträge, statischen Registry und Storage-Grenzen wieder auf die Roadmap. Die Nutzerbestätigung der 0.5.6-Breitenlösung ist dokumentiert, wurde aber nicht unabhängig am Gerät nachgetestet.

Das Script ist **noch nicht in der Scripting-App importiert oder auf einem iPhone ausgeführt**. API-Zugriff im installierten Build, ein mögliches Pro-Erfordernis, Darstellung, Lifecycle und Laufzeit sind unbestätigt. Die UI nutzt nur lokale Beispieldaten und behauptet keine echten Provider-Ergebnisse. Es gibt keinen AniWorld-Resolver und keine Webseiten-/Playlist-Extraktion oder Umgehung von Zugriffsbeschränkungen.

## Projekt-Dokumentation

- [UI_UX.md](UI_UX.md) — Zielnavigation und tatsächlicher Basis-Flow
- [SORA_RESEARCH.md](SORA_RESEARCH.md) — UX-/Architekturbetrachtung; keine Codeübernahme
- [ARCHITECTURE.md](ARCHITECTURE.md) — Lieferstufen und aktuelle Foundation
- [PLUGIN_SYSTEM.md](PLUGIN_SYSTEM.md) — statische Capability-Registry und spätere Verträge
- [DATA_MODEL.md](DATA_MODEL.md) — Entwurf und Status der lokalen Fixture-Daten
- [COMPATIBILITY.md](COMPATIBILITY.md) — Scripting-API-Recherche und offene Gerätechecks
- [TESTING.md](TESTING.md) — lokale Prüfungen und iPhone-Testplan
- [TODO.md](TODO.md) — Reihenfolge, Gates und bewusst zurückgestellte Downloads
- [AGENTS.md](AGENTS.md) — Repository-Workflow und Sicherheitsregeln

## Scripting-Projekt

Quellcode liegt in `scripting/UNIVERSE/`; das Paket ist `UNIVERSE.scripting`. [Paket aus dem GitHub-Repository herunterladen](UNIVERSE.scripting) · [GitHub-Releases ansehen](https://github.com/chronoshash/UNIVERSE-APP/releases). Nach **jeder** Änderung an Script-Quellen oder dem im Paket enthaltenen README neu bauen:

```sh
python3 tools/build_scripting_package.py
```

Das Paket enthält `script.json`, `index.tsx`, `README.md`, `assets/hero.jpg` und `plugins/aniworld/plugin.json`. Lokale ZIP-, Asset-/Quellenparitäts-, Manifest-, Capability- und TSX-Stummeltyp-Prüfungen sind in [TESTING.md](TESTING.md) dokumentiert. Statische Prüfungen ersetzen keinen Import-/iPhone-Test.

Sora inspirierte allgemeine Navigation-/Suchideen, nicht die Implementierung. Kein Sora-Code, keine Assets und keine Sora-Abhängigkeit sind enthalten. Scripting-Pro-Zugang, Xcode, Backend, dynamische Fremdcodeausführung und Hintergrund-Dauerprozesse werden nicht vorausgesetzt.
