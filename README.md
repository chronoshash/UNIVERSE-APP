# UNIVERSE

**Eine Oberfläche. Viele Inhaltstypen.**

UNIVERSE ist ein persönlicher Hub für unterschiedliche Webinhalte. **Die aktuelle Basis ist zuerst die App-Shell, nicht der Download-Manager.** Version 0.4.0 bündelt Home, Entdecken, Suche, Feeds, Merkliste und Info. Eine statische, capability-geprüfte Demoquelle speist lokale Fixture-Inhalte für Medien, Artikel und Termine; Entity-Liste, Suche, Feed und Details laufen durch passende Capability-Prüfungen und zeigen Quellenherkunft. Es gibt keine Live-Abfragen. Merklisteinträge gelten nur während der Script-Sitzung.

Downloads, Offline-Wiedergabe, echte Provider, dauerhafte Speicherung und dynamische Plugins sind in 0.4.0 bewusst nicht enthalten. Der frühere 0.3.0-Download-Prototyp war ein Vorgriff auf spätere Arbeit; die Download-Manager-Integration kommt erst nach dem Aufbau und Testen der App-Shell, Datenverträge, statischen Registry und Storage-Grenzen wieder auf die Roadmap.

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

Quellcode liegt in `scripting/UNIVERSE/`; das Paket ist `UNIVERSE.scripting`. Nach **jeder** Änderung an Script-Quellen oder dem im Paket enthaltenen README neu bauen:

```sh
python3 tools/build_scripting_package.py
```

Das Paket enthält `script.json`, `index.tsx` und `README.md` am ZIP-Root. Die Versionsdatei ist im GitHub-Repository abgelegt; lokale ZIP-, Manifest-, Quellenparitäts- und TSX-Stummeltyp-Prüfungen sind in [TESTING.md](TESTING.md) dokumentiert. Statische Prüfungen ersetzen keinen Import-/iPhone-Test.

Sora inspirierte allgemeine Navigation-/Suchideen, nicht die Implementierung. Kein Sora-Code, keine Assets und keine Sora-Abhängigkeit sind enthalten. Scripting-Pro-Zugang, Xcode, Backend, dynamische Fremdcodeausführung und Hintergrund-Dauerprozesse werden nicht vorausgesetzt.
