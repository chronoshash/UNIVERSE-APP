# UNIVERSE — TODO

Priorität: **P0** blockiert Architektur/Funktion, **P1** MVP, **P2** spätere Erweiterung. Dieses Dokument enthält nur noch offene Arbeit; ein Haken wird erst nach einem nachvollziehbaren Nachweis gesetzt.

## Verbindliches Qualitätsgate vor jeder Verifizierung und Dokumentation

- [ ] Vor **jedem** Test/Build/Package-Check und vor **jeder** Änderung an README, Architektur-, Kompatibilitäts-, Test- oder Release-Dokumentation den gesamten aktuellen Projektcode zeilenweise lesen: alle App-Quellen, Manifeste/Konfigurationen und Build-/Packaging-Skripte, nicht nur den zuletzt geänderten Ausschnitt.
- [ ] Fehler, Sicherheits-/Datenrisiken, Edge Cases, unnötige Abhängigkeiten und konkrete Verbesserungen erfassen; Datenfluss, Fehlerpfade, öffentliche Verträge und Zusammenspiel mit der dokumentierten Architektur prüfen.
- [ ] Verbesserungen, die in diesem Scope sicher und kompatibel sind, vor der Verifizierung anwenden; größere, nicht belegte oder riskante Änderungen als offene TODOs begründen statt still einzubauen.
- [ ] Nach Codeänderungen die vollständige Code-Durchsicht wiederholen, dann gezielte Tests plus relevante Regressionen ausführen. Erst danach Testresultate und Dokumentation aktualisieren.
- [ ] Bei jeder Änderung an Scripting-Quellen `UNIVERSE.scripting` mit dem dokumentierten Builder neu erzeugen und ZIP-/Manifest-/Quellen-Parität prüfen.
- [ ] Tatsächliche statische Prüfungen, Tests und iPhone-Laufzeittests getrennt dokumentieren; nichts als bestanden markieren, was nicht ausgeführt wurde.

## P0 — Umgebung und Scripting-Prototyp

- [ ] Auf dem Ziel-iPhone Scripting-App-Version, iOS-Version und tatsächlich kostenlosen Funktionsumfang der verwendeten Download-/Datei-/Player-APIs dokumentieren; Pro-Status nicht aus App-Preis oder API-Dokumentation ableiten.
- [ ] `UNIVERSE.scripting` in der App importieren, öffnen und Home, Videoeingabe, Downloads, Mediathek, Offline-Player und externe AniWorld-Navigation testen; Ergebnis und Screenshot notieren.
- [x] Paket-Export lokal reproduzierbar geprüft (2026-11-06): ZIP CRC, Root-Dateien/Manifest, Quellen-Parität und doppelter identischer Build-SHA-256 bestanden. Das ersetzt keinen Scripting-App-Importtest.
- [ ] Verifizieren, dass statische Imports zwischen Projektdateien auf der Zielversion möglich sind; bis dahin keine Aufteilung der Runtime voraussetzen.
- [ ] UI-/Navigation-, Dark-Mode-, VoiceOver-, Dynamic-Type-, Lifecycle- und Safe-Area-Checks ausführen.
- [ ] Scripting-Pro-Ausschluss je geplantes API schriftlich belegen; nicht bestätigte Funktionen weglassen.

## P1 — Begrenzter Offline-MVP

- [x] TSX-Prototyp: direkte HTTPS-URL, fester Kategorienordner (Anime/Filme/Serien/Sonstiges), persistente foreground-only/WLAN-only Queue, Status/Fortschritt/Pause/Fortsetzen/Abbrechen, Completed-Library und lokale AVPlayer-Ansicht implementiert.
- [x] MVP-UX vereinfacht: klare deutsche Startaktionen, Titelsuche in Downloads und Mediathek, Kategorienfilter und keine leeren Mediathek-Gruppen. Statisch geprüft, iPhone-Bedienung bleibt offen.
- [ ] Auf iPhone verifizieren: Queue nach erneutem Öffnen, Hintergrundpause, lokale Datei in korrektem Ordner, Flugmodus-Playback inkl. Ton/Codec, echte Fehler-/Lifecyclefälle.
- [ ] Im Ziel-Build feststellen, ob DownloadManager/FileManager/AVPlayer ohne Pro zugänglich sind; bis dahin sind sie dokumentierte API-Kandidaten, nicht als kostenlos bestätigt.
- [ ] Nutzertest: URL-Endungsfilter ist keine Content-Type-/Codec-Prüfung; falsche Antworten und Speicherknappheit klar behandeln.
- [ ] URL-Aufbewahrung, Signed-URL-/Token-Risiko, Dateiverfügbarkeit und Queue-Wiederaufnahme auf Zielgerät prüfen.
- [ ] Falls der Scope wächst: Untertitel/Metadaten, Speicherquota und weitere Dateitypen getrennt entwerfen; aktuell nicht implementiert.

## P1 — Plattformkern

- [ ] App-Shell: Home / Explore / Search / Feeds / Library plus Settings.
- [ ] Capability-/Manifest-Validator und feste, statische Plugin-Registry.
- [ ] Fehler- und Logmodell, Permission-/Domainpolicy und sauberer Plugin-Lifecycle.
- [ ] Universal Entity, SourceRecord, Relations, FeedItem, Collections und Migrationen implementieren.
- [ ] Suche aggregiert passende Provider, zeigt Herkunft und behandelt partielle Fehler.
- [ ] Home UI Contributions auf feste Renderer-Allowlist begrenzen; Nutzerwahl für Sektionen.
- [ ] Fixture-Provider plus RSS/Atom-Provider als erste Integration; Tests siehe `TESTING.md`.

## P1 — AniWorld-Quellenplugin (Nutzerreferenzen geprüft)

- [ ] Use-case präzisieren: nur externe AniWorld-Navigation? Suche/Metadaten? Episoden? Keine Downloaderfunktion im ersten Schritt.
- [ ] Host/Redirect-Verhalten und aktuelle Nutzungs-/Rechtsbedingungen prüfen; Speicherung/Attribution/TTL dokumentieren.
- [ ] Mit lokalen Fixtures arbeiten, bevor Live-Website-Abfragen implementiert werden.
- [ ] Separates Plugin-Manifest für `aniworld.to`; v1 möglichst `source.search` und `source.details`/öffnen externer URL.
- [ ] Bei Änderungen an Website-Struktur Providerfehler und Fallback auf die externe Website zeigen.
- [ ] Geräteversuch unter kostenlosem Scripting-Build und explizitem Nutzeraufruf.

### Referenzanalyse, keine Codeübernahme

- [AniWorld-Downloader](https://github.com/phoenixthrush/AniWorld-Downloader), geprüft auf `models` Commit `ba6231b` am 2026-11-06: Python ≥3.11 Desktop-/Web-UI/CLI, mit optionalen externen Komponenten wie FFmpeg, mpv, Docker/Playwright. Zeigt konzeptionell Provider-/Serien-/Staffel-/Episodenmodelle und umfangreiche Fixtures/Tests. Das ist nicht direkt die Architektur oder Laufzeit von Scripting auf iOS.
- Das Repository weist MIT-Lizenz aus; dieser Prototyp kopiert keinen Quellcode. Eine spätere Übernahme muss Copyright-/Lizenztext beilegen und die betroffenen Stellen separat prüfen.
- AniWorld-Downloader listet diverse Stream-Hoster, Download-/Playback-Funktionen und CAPTCHA-bezogene Funktionalität. Diese stehen **nicht** im initialen UNIVERSE-Plugin-Scope. Keine DRM-/Zugriffsschutz-/CAPTCHA-Umgehung und keine Behauptung, dass Inhalte rechtmäßig abrufbar seien.

## Sora-UX-Referenz, keine Codeübernahme

- Die gezielte Analyse von [Sora, Commit `28f55f3d273b0dd32338e564324054287e500ff9`](https://github.com/cranci1/Sora/tree/28f55f3d273b0dd32338e564324054287e500ff9) ist in [SORA_RESEARCH.md](SORA_RESEARCH.md) dokumentiert. Übernommen wurden nur allgemeine UX-Ideen (auffindbare Queue/Library, Suche und Gruppierung); kein Code, keine Assets und keine Abhängigkeit.
- Soras SwiftUI-/Xcode-/Modul-/Tracking-/HLS-Architektur ist kein passender oder freigegebener Scripting-Baustein. Resume-Fortschritt bleibt offen, bis dafür eine geeignete Scripting-Persistenz nachgewiesen ist.

## P2 — Erweiterungen (nicht voraussetzen)

- [ ] Weitere Source-/Metadata-/Feed-Plugins nach erfolgreichem SDK-/Contract-Test.
- [ ] Event-/Release-Kalender und Cross-Plugin-Entity-Matching mit expliziter Confidence.
- [ ] Breitere Media-/Download-Integration nur für erlaubte direkte Dateien, nach Rechte-/Lizenz-/Pro-/iPhone-Test; keine AniWorld-Streamauflösung.
- [ ] Plugin Store/Install/Update erst nach nachweisbarer Sandbox, Signaturen, Review und Rollback.
- [ ] AI/semantische Suche/Automationen nur nach eigener Datenschutz-, Kosten- und Runtime-Entscheidung.

## REA-Referenz

- [Morluto REA: deutsches README](https://github.com/morluto/rea/blob/main/docs/readme/README_de.md), geprüft bis Commit `fdc4e39` am 2026-11-06: REA ist ein MCP/CLI-Toolkit für evidenzbasierte Reverse-Engineering-Analysen von Binärdateien, Anwendungen und Web-Laufzeitverhalten. Es verlangt rechtmäßige Analyse eigener Software bzw. mit Genehmigung und führt Runtime-Tests im Auftrag mit entsprechenden Auswirkungen aus.
- Derzeit gibt es hier nur lesbaren Quellcode und kein zu analysierendes Binärartefakt. REA wurde daher weder installiert noch ausgeführt; README-/Skill-Tooling nicht als Abhängigkeit hinzufügen.
- [ ] Bei späterer Analyse eines eigenen, autorisierten Binär-/Laufzeit-Artefakts REA nur dann einsetzen, wenn die konkrete Frage mit Quellcode/Tests nicht beantwortet werden kann; jede Schlussfolgerung mit Evidence und Unknowns dokumentieren.

## Release Gate

- [ ] `TESTING.md`-Checks abgeschlossen, Ziel-iPhone und Scripting-/iOS-Version festgehalten.
- [ ] Keine Scripting-Pro-Abhängigkeit.
- [ ] Alle ungetesteten Funktionen/offenen Risiken in `COMPATIBILITY.md` sichtbar.
