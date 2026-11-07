# UNIVERSE — Plugin System

## Zweck

Ein Plugin integriert eine Quelle oder stellt eine klar begrenzte Funktion bereit. Kategorien (Source, Metadata, Feed, UI, Service, Integration, Automation) beschreiben den Zweck; registrierte **Capabilities** bestimmen, was die App tatsächlich aufruft.

Alles Folgende ist ein **UNIVERSE-Vertragsentwurf**, kein vorhandenes Scripting-API. Im MVP sind nur intern geprüfte, statisch gebündelte Plugins erlaubt.

## Manifestentwurf

```ts
export type PluginCategory =
  | "source" | "metadata" | "feed" | "ui"
  | "service" | "integration" | "automation"

export interface PluginManifest {
  id: string                 // stabil, namespaced, z. B. fun.universe.rss
  name: string
  version: string            // semver
  apiVersion: string         // UNIVERSE-Vertrag, nicht Scripting-Version
  description: string
  categories: PluginCategory[]
  capabilities: CapabilityDeclaration[]
  permissions: PermissionRequest[]
  domains?: string[]         // konkrete Hosts, standardmäßig keine Wildcards
  dependencies?: { id: string; range: string }[]
  supportedPlatforms: string[]
  entrypoint: string         // im MVP Schlüssel in statischer Registry
}
```

Der Validator prüft IDs, Version, Schema, Domains, Rechte, Dependencies und API-Kompatibilität. Das Manifest ist deklarative Konfiguration, kein ausführbarer Code.

## Geplanter Vertrag

```ts
export type Plugin = {
  manifest: PluginManifest
  activate(context: PluginContext): Promise<void>
  deactivate?(): Promise<void>
}

type PluginContext = {
  entities: EntityAPI
  events: EventAPI
  logger: LoggerAPI
  network: NetworkAPI
  storage: PluginStorage
  ui: UIExtensionAPI
}

interface SearchProvider {
  search(query: SearchQuery, signal?: AbortSignal): Promise<SearchResultPage>
}
interface FeedProvider {
  list(query: FeedQuery, signal?: AbortSignal): Promise<FeedPage>
}
```

Mögliche Host-Aufrufe sind `registerSearchProvider`, `registerFeedProvider`, `registerEntityType`, `registerPage`, `registerWidget`, `registerAction` und `registerSettings`. Das sind geplante UNIVERSE-APIs. Kein Plugin darf direkt Core-DB, Speicher anderer Plugins oder Core-Dateien verändern.

### Kategorien und Beispiele

| Kategorie | Beispiele | Fähigkeiten (nur falls implementiert) |
|---|---|---|
| Source | AniWorld, YouTube, Reddit, News | Search, Details, Feed, Entities |
| Metadata | IMDb, TMDB, AniList | Metadaten, externe IDs, Match-Vorschlag |
| Feed | RSS/Atom, Release-Quelle | Artikel, Updates, Termine |
| UI | Seite/Widget | eingeschränkte Page-/Widget-Beiträge |
| Service | Übersetzer, Dateiwerkzeug | validierte Aktion |
| Integration | Kalender, API | begrenzter Import/Export |
| Automation | Trigger/Condition/Action | spätere optionale Engine, keine stillen Background-Jobs |

Eine Capability-Deklaration allein garantiert keine Funktion; sie wird erst bei passendem implementiertem Adapter, kompatiblem Schema und erfüllten Permissions registriert.

## Kontrollierte UI-Beiträge

Beispiel einer deklarativen Contribution:

```json
{
  "id": "rss.unread",
  "type": "dashboard.section",
  "title": "Ungelesene Artikel",
  "renderer": "article.list",
  "dataSource": "rss.unread",
  "placement": "home",
  "configurable": true
}
```

`renderer` darf nur auf einer Core-Allowlist stehen (z. B. `article.list`, `media.grid`, `social.feed`, `event.list`). Keine beliebigen Komponenten, Skriptstrings, HTML/JS-Brücken oder Navigation-Mutationen. Unbekannte Renderer werden abgelehnt oder durch einen einfachen Fallback ersetzt.

## Netzwerk, Speicher und Lifecycle

- Pro Plugin eigener Storage-Namespace; Credentials nie im Manifest, Index oder Log.
- Netzwerkhosts sind explizit aufzulisten. Redirects, finale Hostnamen, Request-URLs und sensible Header müssen ebenfalls kontrolliert werden.
- Scripting-Permissions betreffen den Zugriff auf bestimmte Scripting-APIs; sie isolieren nicht automatisch Plugins im gleichen JS-Kontext.
- Lifecycle: `discovered → validated → enabled → activated → degraded/failed → deactivated`.
- Fehler, Timeout und Abbruch bleiben pro Plugin isoliert. Deaktivieren beendet zukünftige Provideraufrufe, behält Nutzerdaten standardmäßig. Entfernen und Löschen sind getrennte bestätigte Aktionen.

## Aktuelle Foundation und Download-Reihenfolge

Version 0.5.0 enthält weiterhin eine einzige statische Fixture-Quelle mit expliziten Capabilities für Entity-Liste, lokale Suche, Feed und Detailzugriff. Diese Registry ist noch kein Manifest-Validator und kein Drittanbieter-Plugin-System; Providerfunktionen sind fest im App-Code gebündelt.

Der frühere 0.3.0-Direktdatei-DownloadManager war ein eigenständiger Vorgriff, kein Plugin und kein implementierter `media.open`-Adapter. Er ist nicht Teil der aktuellen 0.5.0-Basis. Eine Download-Integration darf erst wieder beginnen, nachdem Shell, Datenverträge, statische Providerprüfung, Storage-Grenzen und Scripting-Gerätekompatibilität stehen. Weiterhin keine Webseiten-/Playlist-Extraktion oder Zugriffsschutzumgehung.

## Sicherheitsgrenze und späteres SDK

Kein Drittanbieter-Code wird heruntergeladen oder dynamisch ausgeführt, solange Isolation, Signaturprüfung, Review, Domain-/Permission-Policy, Rollback und Kompatibilität nicht tatsächlich implementiert und getestet sind. Separate Scripting-Skriptprojekte oder Datenpakete wären Optionen für spätere Arbeit, nicht automatisch sichere Sandboxes.

Spätere Projektstruktur:

```text
my-source-plugin/
  manifest.json  plugin.ts
  adapters/{search,details,feed}.ts
  entities/models.ts  ui/contributions.json
  settings/schema.ts  tests/{contract,fixtures,integration}.test.ts
```

Scripting-Modulgrenzen und Remote-Installation müssen auf der Ziel-App verifiziert werden. Siehe [COMPATIBILITY.md](COMPATIBILITY.md).
