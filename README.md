# UNIVERSE

**Eine Oberfläche. Viele Inhaltstypen.**

UNIVERSE ist ein persönlicher Hub für unterschiedliche Webinhalte. **Die aktuelle Basis ist zuerst die App-Shell, nicht der Download-Manager.** Der veröffentlichte Stand 0.5.8 bietet native, dokumentierte Scripting-Tab-Navigation mit fünf festen Hauptbereichen (Start, Entdecken, Suche, Neu, Merkliste); Info bleibt über den Header erreichbar. Die fünf Bereiche behalten ihre eigenen Navigationsstapel. Die lokale, capability-gesteuerte Foundation aus 0.5.7 bleibt erhalten: Inhaltstypfilter in Explore, Suche und chronologischem Feed sowie transparente, lokale Ähnlichkeitsvorschläge auf Detailseiten. Die 0.5.6-Breitenlösung wurde vom Nutzer als funktionierend bestätigt. Die App ist weiterhin eine lokale Demo-Shell; diese Projektänderungen wurden nicht unabhängig in der Scripting-App oder auf einem iPhone nachgetestet. Die dunkle Katalogoberfläche bietet lokales Titelmotiv, Inhaltsschienen und zwölf lokale Demo-Einträge. Home, Entdecken, Suche, Feeds, Merkliste und Info verwenden weiterhin lokale Fixture-Inhalte für Medien, Artikel und Termine; Entity-Liste, Suche, Feed und Details laufen über Capability-Prüfungen. Das AniWorld-Plugin ist ein deaktiviertes Skelett ohne Live-Abfragen. Merklisteinträge gelten nur während der Script-Sitzung.

0.5.8 ist als [GitHub-Prerelease veröffentlicht](https://github.com/chronoshash/UNIVERSE-APP/releases/tag/v0.5.8); das Paket auf `main` wurde nach dem Merge unabhängig bytegeprüft. Version 0.5.9 ist als [GitHub-Prerelease veröffentlicht](https://github.com/chronoshash/UNIVERSE-APP/releases/tag/v0.5.9) und das Paket auf `main` wurde unabhängig bytegeprüft. Sie reagiert auf den vom Nutzer gemeldeten Typfehler an der nativen Tab-Auswahl und ergänzt direktes Entfernen aus der sitzungsgebundenen Merkliste. Scripting-App-Import und iPhone-Laufzeit sind weiterhin nicht unabhängig getestet. Downloads, Offline-Wiedergabe, echte Provider, dauerhafte Speicherung und dynamische Plugins bleiben bewusst außerhalb der aktuellen Foundation. Der frühere 0.3.0-Download-Prototyp war ein Vorgriff auf spätere Arbeit; die Download-Manager-Integration kommt erst nach dem Aufbau und Testen der App-Shell, Datenverträge, statischen Registry und Storage-Grenzen wieder auf die Roadmap.

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
