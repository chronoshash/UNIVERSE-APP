# UNIVERSE

**Speichern. Wiederfinden. Offline ansehen.**

UNIVERSE soll eine einfache, persönliche Medienbibliothek werden. Das aktuell eigenständige `.scripting`-MVP bleibt bewusst kleiner: Nutzer geben einen direkten HTTPS-Videodateilink und Titel ein, ordnen ihn einer Kategorie zu und können abgeschlossene, lokal vorhandene Dateien in der Mediathek finden und abspielen. Downloads und Mediathek bieten Titelsuche; die Mediathek kann zusätzlich nach Kategorie gefiltert werden.

Das Script ist **noch nicht in der Scripting-App importiert oder auf einem iPhone ausgeführt**. Verfügbarkeit der verwendeten APIs im installierten Scripting-Build (einschließlich eines möglichen Pro-Erfordernisses), Import, Darstellung und Laufzeit sind unbestätigt. Die Endung MP4/M4V/MOV beweist weder Videoinhalt noch Codec-Kompatibilität. UNIVERSE löst keine Streams aus AniWorld oder anderen Webseiten auf, lädt keine Playlists und umgeht weder DRM noch Zugriffsbeschränkungen.

## Projekt-Dokumentation

- [UI_UX.md](UI_UX.md) — Produktziel und aktueller Offline-MVP-Flow
- [SORA_RESEARCH.md](SORA_RESEARCH.md) — UX-/Architekturbetrachtung der Referenz; keine Codeübernahme
- [ARCHITECTURE.md](ARCHITECTURE.md) — Zielplattform-Schichten und aktuelle Prototypgrenze
- [PLUGIN_SYSTEM.md](PLUGIN_SYSTEM.md) — geplante Capability-Verträge und Sicherheitsgrenze
- [DATA_MODEL.md](DATA_MODEL.md) — vorgeschlagene Entitäten, Quellenherkunft und Beziehungen
- [COMPATIBILITY.md](COMPATIBILITY.md) — Scripting-API-Recherche und offene Gerätechecks
- [TESTING.md](TESTING.md) — reproduzierbare lokale Prüfungen und iPhone-Testplan
- [TODO.md](TODO.md) — priorisierte Arbeit und verbindliches Review-Gate
- [AGENTS.md](AGENTS.md) — Repository-Workflow und Sicherheitsregeln

## Scripting-Projekt

Quellcode liegt in `scripting/UNIVERSE/`; das zugehörige Paket ist `UNIVERSE.scripting`. Nach **jeder** Änderung an Script-Quellen oder dem im Paket enthaltenen README neu bauen:

```sh
python3 tools/build_scripting_package.py
```

Das Paket enthält `script.json`, `index.tsx` und `README.md` am ZIP-Root. Die Queue ist auf Foreground und WLAN beschränkt und speichert Download-Aufgaben samt Quell-URL zur Wiederaufnahme. Keine vertraulichen Zugriffstoken in URLs einfügen. Nur Inhalte offline speichern, für die eine entsprechende Berechtigung besteht.

AniWorld ist lediglich ein optionaler externer Link. Kein Scripting-Pro-Zugang, Xcode-Projekt, Backend, dynamische Fremdcodeausführung oder dauerhaft laufender Hintergrundprozess wird vorausgesetzt. Das Script hat keine Sora-Abhängigkeit; Sora diente ausschließlich als UX-Referenz.

## Lokale Prüfungen

Lokale Paket-/ZIP-Prüfungen und ihre genauen Grenzen sind in [TESTING.md](TESTING.md) dokumentiert. Statische Prüfungen beweisen keinen App-Import und keinen iPhone-Laufzeiterfolg.
