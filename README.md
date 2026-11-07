# UNIVERSE

**Eine Oberfläche. Viele Inhaltstypen.**

UNIVERSE ist ein persönlicher Hub für unterschiedliche Webinhalte. **Die aktuelle Basis ist zuerst die App-Shell, nicht der Download-Manager.** Version 0.5.13 behält die dokumentierte native Navigation mit fünf festen Bereichen (Start, Entdecken, Suche, Neu, Merkliste) und separatem Info-Zugang bei. Eine zentrale Literal-Tupeldefinition bildet `RootScreen`; ein explizit typisierter Helper verhindert, dass die Auswahl auf den Initialwert `"home"` verengt wird. Der gemeldete TypeScript-Fehler ist damit auf Quelltextebene adressiert. Die native Tab-Bar blendet ihren Hintergrund über den dokumentierten Modifier `toolbarBackgroundVisibility` gezielt aus. Der Scripting-App-Import und das iPhone-Rendering sind nicht unabhängig getestet.

Die dunkle Katalogoberfläche bietet lokales Titelmotiv, Inhaltsschienen und zwölf lokale Demo-Einträge. Home, Entdecken, Suche, Feeds, Merkliste und Info verwenden lokale Fixture-Inhalte für Medien, Artikel und Termine. Entity-Liste, Suche, Feed und Details laufen über Capability-Prüfungen; Explore, Suche, Feeds und Merkliste haben unabhängige Inhaltstypfilter. Die Merkliste zeigt pro Typ die Trefferzahl, erhält beim Filtern die Merkreihenfolge und bietet für leere Filter eine Rückkehr zu allen Inhalten. Das ändert weder den privaten Storage-Schlüssel noch das Schema der gespeicherten Entity-IDs. Lokale Detailvorschläge bleiben nachvollziehbar. Umfang und mögliche Sitzungs-Fallbacks der Merkliste werden offengelegt; vollständige Entities und Medien werden nicht gespeichert. Das AniWorld-Plugin ist ein deaktiviertes Skelett ohne Live-Abfragen.

Version 0.5.13 ist als [GitHub-Prerelease veröffentlicht](https://github.com/chronoshash/UNIVERSE-APP/releases/tag/v0.5.13). PR #21 wurde nach `main` gemergt (`9c0b8f5b4697005642dc6115bb4f221ef44cfb01`). Das 159.223 Byte große Paket wurde nach dem Merge unabhängig über die GitHub Contents API aus `main` geladen, byteweise mit dem lokalen Build verglichen und per ZIP-CRC sowie Manifestversion `0.5.13` geprüft. SHA-256: `cd55edeaf0bcd998ab332b7f1ff873924f198d7b9d473401416fb9714a45c061`. Es gibt keinen Release-Asset-Anhang; die Release-Notizen verlinken auf das unabhängig geprüfte Paket in `main`. Diese statischen Prüfungen belegen weder Scripting-App-Import noch native Darstellung, Storage-Persistenz oder iPhone-Laufzeit.

Vollständige Entity-Repositories/Migrationen, Offline-Wiedergabe, echte Provider und dynamische Plugins bleiben bewusst außerhalb der aktuellen Foundation. Der frühere 0.3.0-Download-Prototyp war ein Vorgriff auf spätere Arbeit; ein Download-/Playback-Manager kommt erst nach dem Aufbau und Testen der App-Shell, Datenverträge, statischen Registry und Storage-Grenzen wieder auf die Roadmap. Die Nutzerbestätigung der 0.5.6-Breitenlösung ist dokumentiert, wurde aber nicht unabhängig am Gerät nachgetestet.

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
