# Arbeitsregeln für UNIVERSE-APP

- Vor jeder Änderung zuerst `git status`, diese Datei und den relevanten Projektumfang prüfen.
- **Vor jedem Test/Build/Package-Check und vor jeder Dokumentationsänderung den vollständigen App-Quellcode, Manifeste/Konfigurationen und Build-/Packaging-Code zeilenweise lesen.** Risiken, Fehlerfälle und Datenflüsse festhalten; Architektur- und Vertragskonsistenz prüfen; sichere relevante Verbesserungen vor Tests umsetzen.
- Nach jeder Codeänderung die vollständige Code-Durchsicht wiederholen. Danach passende Tests und Regressionen ausführen und nur tatsächlich ausgeführte Ergebnisse dokumentieren.
- Nach jeder Änderung an Scripting-Quellen `python3 tools/build_scripting_package.py` ausführen und `UNIVERSE.scripting` aktualisieren. Paketinhalt und Manifest separat prüfen.
- Keine Scripting-Pro-Abhängigkeit, kein dynamischer Fremdcode, keine nicht belegte Runtime-Fähigkeit. Scripting-API- und iPhone-Kompatibilität ohne tatsächlichen Gerätetest als offen kennzeichnen.
- Download-/Offline-Medien: nur vom Nutzer bereitgestellte direkte HTTP(S)-Datei-URLs, erlaubte Codec-/Dateitypen und explizite Nutzeraktion; keine Webseiten-/Playlist-Extraktion, DRM-/Login-/CAPTCHA-Umgehung oder unzulässige Downloads. Transfers im MVP foreground-only; Offline-Dateien nach Inhaltstyp kategorisieren.
- Architektur-/API-Dokumentation muss den vorhandenen Code beschreiben und geplante Funktionen klar als geplant markieren.
