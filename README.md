# UNIVERSE

**Eine Oberfläche. Viele Inhaltstypen.**

UNIVERSE ist ein persönlicher Hub für unterschiedliche Webinhalte. **Die aktuelle Basis ist zuerst die App-Shell, nicht der Download-Manager.** Version 0.5.6 ergänzt den vom Nutzer inzwischen als funktionierend bestätigten Breitenansatz: gemessener Viewport, definierte Seitenränder, feste Breiten für Navigation/Karten/Scroller und Clipping. Version 0.5.7 baut darauf auf und ergänzt Inhaltstypfilter im chronologischen Feed sowie transparente lokale Ähnlichkeitsvorschläge auf Detailseiten. Die App ist weiterhin eine lokale Demo-Shell; diese Projektänderungen wurden nicht unabhängig in der Scripting-App oder auf einem iPhone nachgetestet. Die dunkle Katalogoberfläche bietet lokales Titelmotiv, Inhaltsschienen und zwölf lokale Demo-Einträge. Home, Entdecken, Suche, Feeds, Merkliste und Info verwenden weiterhin lokale Fixture-Inhalte für Medien, Artikel und Termine; Entity-Liste, Suche, Feed und Details laufen über Capability-Prüfungen. Das AniWorld-Plugin ist ein deaktiviertes Skelett ohne Live-Abfragen. Merklisteinträge gelten nur während der Script-Sitzung.

Downloads, Offline-Wiedergabe, echte Provider, dauerhafte Speicherung und dynamische Plugins sind in 0.5.7 bewusst nicht enthalten. Der frühere 0.3.0-Download-Prototyp war ein Vorgriff auf spätere Arbeit; die Download-Manager-Integration kommt erst nach dem Aufbau und Testen der App-Shell, Datenverträge, statischen Registry und Storage-Grenzen wieder auf die Roadmap.

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
