# Sora — UX- und Funktionsreferenz für UNIVERSE

**Recherche-Stand:** 2026-11-06
**Referenz:** [cranci1/Sora, Commit `28f55f3d273b0dd32338e564324054287e500ff9` auf `dev`](https://github.com/cranci1/Sora/tree/28f55f3d273b0dd32338e564324054287e500ff9). Das Repository wurde flach geklont und die relevanten README-, Lizenz-, App-Shell-, Download-, Bibliotheks-, Such-, Modul- und Builddateien eingesehen. Das ist eine gezielte Produkt-/Architekturbetrachtung, kein vollständiges Sicherheits- oder Codeaudit.

## Was Sora gut löst

- **Klare Hauptbereiche:** Library, Downloads, Search und Settings sind als getrennte Bereiche auffindbar. So muss man nicht durch einen einzigen langen Bildschirm für alle Aufgaben blättern.
- **Downloads sind verwaltbare Objekte:** Der Downloadbereich bietet Status, Suche, Sortierung und Gruppierung; ein Download ist mehr als ein einmaliger Netzwerkvorgang.
- **Bibliothek statt Dateiliste:** Die Library macht gespeicherte Inhalte und Collections sichtbar; „Continue Watching“ versucht, beim zuletzt angesehenen Inhalt weiterzumachen.
- **Trennung von Verantwortung:** Queue-/Persistenzmodelle, Wiedergabe, Metadaten/Tracking und austauschbare Module sind in größeren separaten Bereichen organisiert.

Das sind nützliche Produktideen, aber keine Anforderung, Soras komplette Navigations- oder Funktionsbreite zu übernehmen.

## Warum Sora nicht als Implementierungsbasis taugt

Sora ist eine wesentlich umfangreichere native SwiftUI-App mit Xcode-/SwiftPM-Build, `SoraCore` und mehreren externen Integrationen. Das unterscheidet sich grundlegend von einem eigenständigen TSX-Script innerhalb der Scripting-App. Soras README beschreibt installierbare JavaScript-Module und Integrationen für Metadaten/Tracking; der untersuchte Download-/Playerbereich umfasst unter anderem HLS-/Playlist-Logik, mehrere Wiedergabewege und zusätzliche Lifecycle-Funktionen. Soras `Info.plist`/Berechtigungen und Laufzeitentscheidungen gelten nicht automatisch für Scripting.

Das Referenz-Repository weist im Root eine GPL-3.0-Lizenz aus; die README nennt für `SoraCore` abweichende eigene Lizenzbedingungen. **Es wurde kein Sora-Quellcode, Asset, Modul oder Markenbestandteil in UNIVERSE kopiert.** UNIVERSE hat keine Sora-Abhängigkeit. Diese Notiz ist keine Lizenzberatung.

## Was UNIVERSE davon übernimmt — nur als UX-Idee

Die Korrektur der Umsetzungsreihenfolge ist wichtig: Downloads/Player sind in UNIVERSE nicht die Basis. Version 0.4.0 legte zuerst kleine, risikoarme Shell-Grundlagen; 0.5.2 baut die Katalogdarstellung weiter aus:

1. Eine stets sichtbare, reduzierte Navigation macht Home, Entdecken, Suche, Feeds, Merkliste und Info erreichbar.
2. Eine einzige Suche filtert mehrere Fixture-Inhaltstypen; Ergebnisse zeigen Quelle und Abrufdatum.
3. Ein gemeinsamer chronologischer Feed und eine Detailansicht verwenden dieselben Entities.
4. Ein statischer capability-gesteuerter Demo-Provider zeigt den späteren Integrationspunkt, ohne dynamischen Code, Netzwerk oder Plugin-Installation.

Die frühere 0.3.0-Version experimentierte vorzeitig mit einer Downloadwarteschlange. Sie ist historisch, wurde aus der 0.4.0-Basis entfernt und ist auch in 0.5.2 kein Architekturfundament. Ein DownloadManager kommt erst nach App-Shell-, Entity-/Source-Vertrags-, Provider-Registry-, Storage- und Scripting-Geräte-Gates auf die Roadmap.

Bewusst **nicht** übernommen wurden Soras Modul-/Plugin-Ausführung, HLS-/Stream-Auflösung, Tracker-/Metadaten-Integrationen, Custom Player, Background-Download-Versprechen oder weitreichende Netzwerkfreigaben. „Continue Watching“ bleibt ebenfalls später: verlässliche Fortschritts-/Resume-Persistenz ist nicht nachgewiesen. Auch die neue Basis ist bisher nur statisch geprüft; Import, iPhone-UI und Laufzeit fehlen.
