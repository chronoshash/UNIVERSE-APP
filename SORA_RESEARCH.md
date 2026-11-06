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

Für das kleine, bereits abgegrenzte Offline-MVP wurden bewusst wenige, risikoarme Verbesserungen umgesetzt:

1. Die Startansicht nennt jetzt direkt den tatsächlichen Nutzen und zeigt drei klare Wege: Video hinzufügen, Mediathek öffnen, Downloads ansehen. Nicht implementierte Versprechen wie News, Kalender oder allgemeine Webquellen sind aus der Startansicht entfernt.
2. Downloads lassen sich nach dem eingegebenen Titel durchsuchen.
3. Die Offline-Mediathek bietet Titelsuche und einen einfachen Kategorienfilter. Leere Kategorien werden ausgeblendet; leere bzw. erfolglose Suchzustände erklären den nächsten Schritt.
4. Die vorhandene Trennung zwischen Downloadwarteschlange und abgeschlossener lokaler Mediathek bleibt erhalten. Der Prototyp bekommt dafür weder eine neue Runtime noch zusätzliche Dienste oder Berechtigungen.

Bewusst **nicht** übernommen oder ergänzt wurden Soras Modul-/Plugin-Ausführung, HLS-/Stream-Auflösung, Tracker-/Metadaten-Integrationen, ein komplexer Custom Player, Background-Download-Versprechen oder weitreichende Netzwerkfreigaben. UNIVERSE akzeptiert weiterhin nur vom Nutzer bereitgestellte direkte HTTPS-Dateilinks mit MP4/M4V/MOV-Endung. URL-Endung ist keine Inhalts- oder Codecprüfung; Rechte, Login-Schranken und DRM werden nicht umgangen.

„Continue Watching“ bleibt vorerst eine mögliche spätere Idee: Eine verlässliche Fortschritts-/Resume-Persistenz ist für die hier verwendete Scripting-Laufzeit nicht nachgewiesen. Ebenso ist die neue Suche/Filterung nur anhand des Quellcodes statisch geprüft; Import, iPhone-UI und Laufzeit müssen noch getestet werden.
