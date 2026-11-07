# UNIVERSE — TODO

Priorität: **P0** blockiert Foundation/Kompatibilität, **P1** Foundation, **P2** spätere Erweiterungen. Der aktuelle Produktstand ist `.scripting` 0.4.0: erst die Shell, noch kein Download-Manager.

## Verbindliches Qualitätsgate vor jeder Verifizierung und Dokumentation

- [ ] Vor **jedem** Test/Build/Package-Check und vor **jeder** Änderung an README, Architektur-, Kompatibilitäts-, Test- oder Release-Dokumentation den gesamten aktuellen Projektcode zeilenweise lesen: alle App-Quellen, Manifeste/Konfigurationen und Build-/Packaging-Skripte.
- [ ] Fehler, Sicherheits-/Datenrisiken, Edge Cases, unnötige Abhängigkeiten und Datenflüsse prüfen; Architektur und öffentliche Verträge abgleichen.
- [ ] Sichere, kompatible Verbesserungen vor der Verifizierung anwenden; unklare/riskante Erweiterungen begründet vertagen.
- [ ] Nach Codeänderungen vollständige Code-Durchsicht wiederholen, passende Tests ausführen und danach erst Ergebnisse/Dokumentation aktualisieren.
- [ ] Bei jeder Scripting-Quell- oder Paket-README-Änderung `UNIVERSE.scripting` neu bauen und ZIP-/Manifest-/Quellen-Parität prüfen.
- [ ] Statische Checks, App-Import und iPhone-Laufzeittests getrennt angeben; nichts Ungetestetes als bestanden markieren.

## P0 — Scripting-Kompatibilität und aktueller Shell-Import

- [ ] Auf dem Ziel-iPhone Scripting-App-/iOS-Version und tatsächlich verfügbaren Funktionsumfang der Shell-APIs protokollieren. API-Doku oder App-Store-Preis beweisen keinen kostenlosen Zugriff.
- [ ] Version 0.4.0 `UNIVERSE.scripting` importieren und Home, Entdecken, Suche, Feeds, Merkliste, Info und Detailnavigation testen.
- [ ] Dark Mode, VoiceOver, Dynamic Type, Safe Areas, Tastatur, Touch-Ziele und Lifecycle prüfen.
- [x] 0.4.0-Paket lokal gebaut: ZIP-CRC, Root-Dateien/Manifest, Byte-Parität, deterministischer Doppelbuild und TSX-Quelltextcheck mit temporären Scripting-Stubs bestanden. Das ersetzt keinen App-Import- oder Laufzeittest; Details in `TESTING.md`.
- [ ] Alle vier erzeugten Scripting-`llms.txt`-/`llms-full.txt`-Dokumente vollständig lesen. Offizielle Quellarchive und relevante API-Seiten sind geprüft; vollständige Chunk-Lektüre bleibt offen.

## P1 — Foundation zuerst

- [x] App-Shell 0.4.0: Home, Entdecken, Suche, Feeds, Merkliste, Info und Detailansicht.
- [x] Statisch gebündelter Demo-Provider mit expliziter Capability-Liste; Suche, Feed und Details werden über diese Liste geroutet. Keine dynamischen Imports oder Netzwerkabfragen.
- [x] Lokale Fixture-Entities für Medien, Artikel und Termine mit sichtbarer Quellenherkunft; Suche über mehrere Typen und einfache Filter.
- [x] Merkliste als sitzungsgebundener UI-State; keine falsche Zusage persistenter Speicherung.
- [x] Statische `script.json`-/Capability-/Provider-Fixture-Validierung ergänzt (`python3 tools/validate_scripting_foundation.py`); sie prüft Quelltextverträge, nicht Provider-Runtime oder App-Kompatibilität.
- [ ] Storage-Grenze und persistentes lokales Repository anhand der offiziellen API-Dokumentation und anschließend auf dem Gerät prüfen.
- [ ] Modell für `Entity`, `SourceRecord`, FeedItem und Relations festlegen; Provenienz und Datenaufbewahrung in Tests absichern.
- [ ] Providerfehler-/Lade-/Offlinezustände und Telemetrie-/Logpolicy definieren; partielle Ergebnisse dürfen erfolgreiche Provider nicht verdecken.
- [ ] Nach Foundation- und Gerätegates einen lokalen RSS/Atom-Fixture-Provider als ersten realen Adapter ergänzen; Netzwerk-/Domainregeln vorher festlegen.

## P2 — DownloadManager und Offline-Wiedergabe (bewusst zurückgestellt)

Version 0.3.0 war ein vorzeitiger Downloader-Prototyp. Sie bleibt als historische GitHub-Version erhalten, ist aber **nicht** die aktuelle Basis. In 0.4.0 wurde der DownloadManager entfernt, damit zuerst die Plattformgrundlagen stehen.

Erst wieder anfangen, wenn alle folgenden Gates erfüllt sind:

- [ ] App-Shell auf dem Ziel-iPhone importiert und navigierbar getestet.
- [ ] Entity-/Source-/Library-Verträge und bestätigte Storage-Grenze vorhanden.
- [ ] Capability-/Provider-Verträge und Fehlerzustände getestet.
- [ ] Download-/Datei-/Player-APIs im tatsächlichen Scripting-Build und ohne unbestätigte Pro-Annahme verifiziert.
- [ ] Rechte-, Token-, Speicher-, Lösch- und Lifecycle-Verhalten für direkte Dateien spezifiziert.

Danach darf separat geplant werden: nur nutzerbereitgestellte direkte HTTP(S)-Datei-URLs, erlaubte Inhalte/Dateitypen, explizite Aktion; keine Webseiten-/Playlist-/Stream-Extraktion und keine DRM-/Login-/CAPTCHA- oder Zugriffsschutzumgehung. Foreground-only, wenn nicht anders auf Zielgeräten bestätigt.

## P2 — Externe Quellen, darunter AniWorld

- [ ] Use-case und Host-/Redirect-/Rechtsbedingungen definieren. Erst lokale Fixtures; danach höchstens erlaubte Metadaten oder externe Navigation.
- [ ] Keine Downloaderfunktion, Stream-Auflösung oder Zugriffsschutzumgehung aus AniWorld-Webseiten.
- [ ] Quelle soll als expliziter Provider mit Attribution, Fehler-/TTL-Verhalten und Nutzeraufruf eingebunden werden, erst nach Foundation- und iPhone-Gates.

## Sora-Referenz — nur UX, keine Codeübernahme

- Die Analyse von [Sora, Commit `28f55f3d273b0dd32338e564324054287e500ff9`](https://github.com/cranci1/Sora/tree/28f55f3d273b0dd32338e564324054287e500ff9) steht in `SORA_RESEARCH.md`.
- 0.4.0 übernimmt nur allgemeine UX-Ideen: erkennbare globale Bereiche, eine durchsuchbare Bibliothek und Quellenherkunft. Kein Code, keine Assets, keine Lizenztexte oder Abhängigkeit wurden übertragen.
- Sora-Module, HLS-/Streamlogik, Tracking, Custom Player und Background-Download-Verhalten sind nicht Teil von UNIVERSE.

## REA-Referenz

- [Morluto REA: deutsches README](https://github.com/morluto/rea/blob/main/docs/readme/README_de.md), geprüft bis Commit `fdc4e39` am 2026-11-06: REA ist ein MCP/CLI-Toolkit für evidenzbasierte Reverse-Engineering-Analysen.
- Für den aktuellen Quellcode gibt es kein autorisiertes Binärartefakt. REA wurde nicht installiert oder ausgeführt.
- [ ] Später nur bei eigener, autorisierter Binär-/Laufzeitanalyse verwenden, wenn der Quellcode die konkrete Frage nicht beantwortet.

## Release Gate

- [ ] Shell auf Ziel-iPhone importiert und getestet; Scripting-/iOS-Version festgehalten.
- [ ] Keine ungeprüfte Scripting-Pro-Abhängigkeit.
- [ ] Datenmodell, Capability-Grenzen und alle offenen Risiken in `COMPATIBILITY.md` sichtbar.
- [ ] DownloadManager nicht vor Abschluss der P1-Foundation-Gates wieder in die aktuelle Basis aufnehmen.
