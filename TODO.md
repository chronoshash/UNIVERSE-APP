# UNIVERSE — TODO

Priorität: **P0** blockiert Foundation/Kompatibilität, **P1** Foundation, **P2** spätere Erweiterungen. Die Version 0.5.12 ergänzt die fünf nativen Tabs um eine kleine, über den dokumentierten privaten `Storage`-Bereich gespeicherte Merkliste (Entity-IDs in Merkreihenfolge). Die Tab-Bar-Transparenz ist über die dokumentierte API angefordert. Keine Live-Provider, Downloads oder Wiedergabe. Scripting-App-Import, Persistenz und Geräteverhalten bleiben offen; die GitHub-Veröffentlichung der 0.5.12-Änderungen ist in Arbeit.

## Verbindliches Qualitätsgate vor jeder Verifizierung und Dokumentation

- [ ] Vor **jedem** Test/Build/Package-Check und vor **jeder** Änderung an README, Architektur-, Kompatibilitäts-, Test- oder Release-Dokumentation den gesamten aktuellen Projektcode zeilenweise lesen: alle App-Quellen, Manifeste/Konfigurationen und Build-/Packaging-Skripte.
- [ ] Fehler, Sicherheits-/Datenrisiken, Edge Cases, unnötige Abhängigkeiten und Datenflüsse prüfen; Architektur und öffentliche Verträge abgleichen.
- [ ] Sichere, kompatible Verbesserungen vor der Verifizierung anwenden; unklare/riskante Erweiterungen begründet vertagen.
- [ ] Nach Codeänderungen vollständige Code-Durchsicht wiederholen, passende Tests ausführen und danach erst Ergebnisse/Dokumentation aktualisieren.
- [ ] Bei jeder Scripting-Quell- oder Paket-README-Änderung `UNIVERSE.scripting` neu bauen und ZIP-/Manifest-/Quellen-Parität prüfen.
- [ ] Statische Checks, App-Import und iPhone-Laufzeittests getrennt angeben; nichts Ungetestetes als bestanden markieren.

## P0 — Scripting-Kompatibilität und aktueller Shell-Import

- [ ] Auf dem Ziel-iPhone Scripting-App-/iOS-Version und tatsächlich verfügbaren Funktionsumfang der Shell-APIs protokollieren. API-Doku oder App-Store-Preis beweisen keinen kostenlosen Zugriff.
- [ ] Version-0.5.12-`UNIVERSE.scripting` auf dem Ziel-iPhone importieren; fünf native Tabs, transparente Tab-Bar, Info-Zugang, Tab-/Detail-Rücknavigation, Merkliste-Merkreihenfolge, Anzahl und direktes Entfernen, Feedfilter, Detailvorschläge, Accessibility und Lifecycle am Gerät prüfen. Merken/Entfernen über einen Script-Neustart prüfen, außerdem Storage-Ausfall/ungültige Werte und sichtbaren Session-Fallback. Der Nutzer bestätigt die 0.5.6-Breite; Regressionstest bleibt sinnvoll.
- [ ] Dark Mode, VoiceOver, Dynamic Type, Safe Areas, Tastatur, Touch-Ziele und Lifecycle prüfen.
- [x] 0.5.3-Paket lokal gebaut: ZIP-CRC, Manifest/Dateiliste, Asset- und Byte-Parität, deterministischer Doppelbuild, Validator und TSX-Quelltextcheck mit temporären Scripting-Stubs bestanden. Das ersetzt keinen App-Import- oder Laufzeittest; Details in `TESTING.md`.
- [x] 0.5.4-Paket lokal gebaut: GeometryReader-Viewport-Assertions, ZIP-/Manifest-/Quellenparität, deterministischer Doppelbuild, Validator, Python-Kompilierung, `git diff --check` und TypeScript 5.8.3 mit temporären, nicht offiziellen Scripting-Stubs bestanden. Import, Rendering und iPhone-Breite bleiben offen; Details in `TESTING.md`.
- [x] 0.5.5-Paket lokal gebaut: Root-GeometryReader-/NavigationStack-/ScrollView-Breitenassertions, explizites Scroll-Clipping, ZIP-/Manifest-/Quellenparität, deterministischer Doppelbuild, Validator, Python-Kompilierung, `git diff --check` und TypeScript 5.8.3 mit temporären, nicht offiziellen Scripting-Stubs bestanden. Gerätetest blieb offen; Details in `TESTING.md`.
- [x] 0.5.6-Paket lokal gebaut: Viewport-/Content-Width-, horizontale Scroll-Clipping-, Chip-Navigation- und kompakte Kartenassertions, ZIP-/Manifest-/Quellenparität, deterministischer Doppelbuild, Validator, Python-Kompilierung, `git diff --check` und TypeScript 5.8.3 mit temporären Stubs bestanden. Import und Gerätetest bleiben offen; Details in `TESTING.md`.
- [x] 0.5.7-Paket lokal gebaut: Filter-/Recommendation-Assertions, dreifache Typfilter in Explore/Search/Feed, Manifest-/Quellen-/ZIP-Parität, deterministischer Doppelbuild, Validator, TypeScript 5.8.3 mit temporären Stubs, Python-Kompilierung und `git diff --check` bestanden. PR #9, Main-Commit und Remote-Paket separat geprüft; Release v0.5.7 veröffentlicht. GitHub-Anhang-Upload scheiterte mit EOF, daher verweist der Release auf das bytegeprüfte Paket in `main`. Unabhängiger Gerätetest bleibt offen; Details in `TESTING.md`.
- [ ] Alle vier erzeugten Scripting-`llms.txt`-/`llms-full.txt`-Dokumente vollständig lesen. Offizielle Quellarchive und relevante API-Seiten sind geprüft; vollständige Chunk-Lektüre bleibt offen.

- [x] 0.5.8 lokal geprüft und veröffentlicht: dokumentiertes `TabView`/`Tab` mit `useObservable`, fünf primäre Ziele, separater Info-Zugang; Validator, Paketbyte-Parität, deterministischer Doppelbuild, TypeScript 5.8.3 mit temporären Stubs, Python-Kompilierung und `git diff --check` bestanden. PR #11 ist in `main` gemergt; Release v0.5.8 veröffentlicht. Remote-Paketbytes, SHA-256, Manifest, ZIP-CRC und native Navigation-Marker unabhängig geprüft. Release hat keinen Asset-Anhang; die Notizen verlinken zum geprüften Paket auf `main`. Dies belegt keine Scripting-App-/iPhone-Kompatibilität.

- [x] 0.5.10 lokal geprüft und veröffentlicht: fünf literal-typisierte native Tab-Ziele, explizit generisches `useObservable<RootScreen>`, dokumentiertes Ausblenden des `tabBar`-Hintergrunds; Validator, deterministischer Doppelbuild, ZIP-/Manifest-/Quellenparität, TypeScript 5.8.3 mit temporären Stubs, Python-Syntax und `git diff --check` bestanden. PR #15 gemergt, Release v0.5.10 veröffentlicht, Paket auf GitHub `main` bytegleich verifiziert. Kein Scripting-App-/iPhone-Test.
- [x] 0.5.11 lokal geprüft und veröffentlicht: `RootScreen` aus gemeinsamem Literal-Tupel abgeleitet; `asRootScreen` liefert die volle Union für `useObservable` und verhindert ein Narrowing auf `"home"`; native fünf Tabs und dokumentierter transparenter Tab-Bar-Hintergrund bleiben. Die Merkliste hatte explizite Session-Scope-Daten, stabile Merkreihenfolge, sichtbare Anzahl und direkten Entfernungsweg. Validator, deterministischer Paketbau, ZIP-/Manifest-/Quellenparität und TypeScript 5.8.3 mit temporären, nicht offiziellen Scripting-Stubs bestanden. PR #17 gemergt, Release v0.5.11 veröffentlicht, Remote-Paket bytegleich geprüft. Kein Scripting-App-/iPhone-Test.
- [x] 0.5.12 Foundation lokal geprüft: offizielle Scripting-Dokumentation am gepinnten Repository-Commit ausgewertet; `Storage.get/set` bleibt im standardmäßigen privaten Script-Bereich. Die Merkliste speichert nur begrenzte, validierte und deduplizierte Entity-IDs; Fehler führen sichtbar zum Session-Fallback bzw. lassen die bisherige Liste bei fehlgeschlagenem Schreiben stehen. Validator, ZIP-/Manifest-/Quellenparität, deterministischer Doppelbuild, Python-Syntax und TypeScript 5.8.3 mit temporären, nicht offiziellen Scripting-Stubs bestanden. Paket: 158.771 Byte, SHA-256 `0517c9a77a404dd4d45575ed226a264308097199607cf105d1c9768fc236a5ff`. GitHub-Veröffentlichung und App-/Gerätetest sind noch offen.

## P1 — Foundation zuerst

- [x] App-Shell 0.5.8 (veröffentlicht): Home, Entdecken, Suche, typgefilterte Feeds, Merkliste, Info und Detailansicht; fünf native Haupttabs, zwölf Demo-Fixtures und lokale Related-Content-Schiene in Details.
- [x] 0.5.9 Foundation-Folgearbeit veröffentlicht: explizit typisierte native Tab-Auswahl als Reaktion auf den Nutzerbericht sowie direktes Entfernen gespeicherter Elemente aus der sitzungsgebundenen Merkliste. Validator/Paketparität, deterministischer Doppelbuild, TypeScript 5.8.3 mit temporären API-Stubs, Python-Kompilierung und `git diff --check` bestanden. PR #13 ist gemergt; Release v0.5.9 veröffentlicht. Remote-Paketbytes, SHA-256, Manifest, ZIP-CRC und Feature-Marker unabhängig geprüft. Release hat keinen Asset-Anhang und verlinkt zum verifizierten `main`-Paket. Scripting-App-Import und iPhone-Test bleiben offen.
- [x] Statisch gebündelter Demo-Provider mit expliziter Capability-Liste; Suche, Feed und Details werden über diese Liste geroutet. Keine dynamischen Imports oder Netzwerkabfragen.
- [x] Discovery-Ausbau 0.5.7: unabhängige Typfilter im chronologischen Feed und lokale Detailvorschläge nach gleicher Kategorie oder gleichem Typ; Demo-Regel in der UI offengelegt.
- [x] Lokale Fixture-Entities für Medien, Artikel und Termine mit sichtbarer Quellenherkunft; Suche über mehrere Typen und einfache Filter.
- [x] 0.5.11: Merkliste als explizit typisierter sitzungsgebundener UI-State; Einträge werden in Merkreihenfolge angezeigt, Anzahl ist sichtbar, keine falsche Zusage persistenter Speicherung.
- [x] 0.5.12: kleine geordnete Entity-ID-Merkliste im dokumentierten privaten Scripting-Storage; bounded/validierte Lese- und Schreibgrenze sowie sichtbarer Session-Fallback. Keine vollständigen Entity-/Media-Daten im Storage.
- [x] Statische `script.json`-/Capability-/Provider-Fixture-Validierung ergänzt (`python3 tools/validate_scripting_foundation.py`); sie prüft Quelltextverträge, nicht Provider-Runtime oder App-Kompatibilität.
- [x] Offizielle Storage-API-Grenze dokumentiert; 0.5.12 verwendet privaten Key-Value-Storage nur für die kleine Merkliste.
- [ ] Privates Storage-Verhalten, Persistenz über Script-Neustarts, Fehler-/Fallback-UI und Erhalt der Merkreihenfolge in der installierten App auf dem Zielgerät verifizieren.
- [ ] Modell für `Entity`, `SourceRecord`, FeedItem und Relations festlegen; Provenienz und Datenaufbewahrung in Tests absichern.
- [ ] Providerfehler-/Lade-/Offlinezustände und Telemetrie-/Logpolicy definieren; partielle Ergebnisse dürfen erfolgreiche Provider nicht verdecken.
- [ ] Nach Foundation- und Gerätegates einen lokalen RSS/Atom-Fixture-Provider als ersten realen Adapter ergänzen; Netzwerk-/Domainregeln vorher festlegen.

## P2 — DownloadManager und Offline-Wiedergabe (bewusst zurückgestellt)

Version 0.3.0 war ein vorzeitiger Downloader-Prototyp. Sie bleibt als historische GitHub-Version erhalten, ist aber **nicht** die aktuelle Basis. In 0.4.0 wurde der DownloadManager entfernt, damit zuerst die Plattformgrundlagen stehen.

Erst wieder anfangen, wenn alle folgenden Gates erfüllt sind:

- [ ] App-Shell auf dem Ziel-iPhone importiert und navigierbar getestet.
- [ ] Entity-/Source-Verträge festlegen und die dokumentierte Storage-Grenze sowie Merkliste-Persistenz auf dem Zielgerät bestätigen.
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
- 0.5.7 nutzt allgemeine Content-Discovery- und Katalog-UX-Muster. Kein Sora-Code, Sora-Asset, Markenbestandteil, Lizenztext oder Abhängigkeit wurde übertragen.
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
