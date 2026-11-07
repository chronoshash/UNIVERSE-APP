# UNIVERSE — Universal Data Model

## Ziele und Status

Der Core soll verschiedene Webinhalte repräsentieren, ohne eine feste Anime-/Video-Typenliste vorauszusetzen. Version 0.5.7 führt das in 0.4.0 begonnene kleine lokale Modell aus `Entity`-ähnlichen Fixture-Einträgen, `typeId` und `SourceRecord`-Herkunft hinter einem statischen Provider fort. Plugins registrieren noch keine Typen. Das vollständige Modell bleibt **Entwurf**; konkrete Repository-/SQLite-Tabellen und Migrationen folgen nach dem iPhone-Capability-Test.

## Aktuelle Foundation und zurückgestellter Download-Prototyp

Die aktuelle 0.5.7-Basis nutzt lokale Fixture-Entities mit stabilen IDs, Inhaltstypen, Kategorien und einem `SourceRecord`-ähnlichen Quellnachweis. Ein statischer Provider liefert Suche, Feed und Detailzugriff; der Feed filtert die chronologischen Fixture-Einträge nach Typ. Detailvorschläge werden zur Laufzeit aus gleicher Kategorie oder gleichem Typ abgeleitet und sind keine persistierten `EntityRelation`-Datensätze. Die Merkliste lebt nur im UI-State der laufenden Script-Sitzung. Es gibt noch kein persistentes Repository und keine Migrationen.

Der 0.3.0-Download-Prototyp liegt nur in der Git-Historie/älteren Version. Seine Queue-Snapshots sind nicht das Datenmodell des aktuellen Produkts. Der DownloadManager wird erst nach Shell-, Provider-, Storage- und Geräte-Gates wieder aufgenommen.

## Begriffe

- **Entity:** interne, stabile Identität eines Gegenstands.
- **EntityType:** Plugin-registriertes Schema, z. B. `media.video`, `news.article`, `aniworld.anime`.
- **SourceRecord:** nachvollziehbare Aussage eines Plugins über eine Entity.
- **Relation:** Verknüpfung zwischen Entities mit Typ, Herkunft und optionalem Confidence-Wert.
- **FeedItem:** zeitlich sortierbarer Quelleneintrag, optional mit Entity verbunden.

## Typen (TypeScript-Entwurf)

```ts
type JsonValue = null | boolean | number | string | JsonValue[] | {
  [key: string]: JsonValue
}

type Entity = {
  id: string
  typeId: string
  title: string
  summary?: string
  attributes: Record<string, JsonValue>
  externalIds: ExternalId[]
  sourceRecordIds: string[]
  createdAt: string            // ISO-8601 UTC
  updatedAt: string
  quality?: { score?: number; method?: string }
}

type ExternalId = {
  pluginId: string
  namespace: string
  value: string
  url?: string
}

type SourceRecord = {
  id: string
  pluginId: string
  remoteId?: string
  entityId: string
  fields: Record<string, JsonValue>
  canonicalUrl?: string
  retrievedAt: string
  publishedAt?: string
  expiresAt?: string
}

type EntityRelation = {
  id: string
  fromEntityId: string
  relationTypeId: string
  toEntityId: string
  pluginId: string
  confidence?: number
  evidence?: string
  createdAt: string
}
```

Gemeinsame Attribute werden normalisiert; quellspezifische Werte bleiben unter SourceRecord/namespace. Fehlende Felder bleiben fehlend. Anbieterwerte werden nicht überschrieben, sondern provenance-bewusst dargestellt. Alle Zeitangaben sind UTC plus bei Bedarf ursprüngliche Zeitzone.

## Dynamische Typen und Beziehungen

Plugins dürfen `Video`, `Series`, `Movie`, `Anime`, `Manga`, `Book`, `Article`, `News`, `Channel`, `User`, `Community`, `Product`, `Event`, `Episode`, `Collection` und `Playlist` registrieren, auch neue Typen. Typdefinitionen enthalten Schema-Version, Label und erlaubte Attribute; der Core erzwingt technische Validität statt Branchenliste.

Mögliche Relations: `core.partOf`, `core.sequelTo`, `core.createdBy`, `core.publishedBy`, `core.references`, `core.similarTo`, `core.episodeOf`, `core.commentOn`. Jede Relation bewahrt Urheber und Evidenz. Unsichere Entity-Matches werden vorgeschlagen statt still zusammengeführt.

Beispiel: Ein Metadatenplugin liefert Anime-Attribute; ein AniWorld-Adapter verknüpft Episoden als `episodeOf`; ein weiterer Provider kann Rezensionen/Artwork ergänzen. SourceRecords bleiben erhalten und Merge kann rückgängig gemacht werden.

## Suche, Duplikate und Feeds

Externe IDs werden nach Provider-Namespace verglichen. Fuzzy Match verwendet Titel, Sprache, Jahr, Typ und Providerhinweise, liefert Score und Begründung. Niedrige Confidence bleibt getrennt, mittlere schlägt Zusammenführung vor. Indexe sind wiederaufbaubar; SourceRecords bleiben die nachvollziehbare Grundlage.

```ts
type FeedItem = {
  id: string
  sourcePluginId: string
  entityId?: string
  type: string
  title: string
  description?: string
  image?: string
  url?: string
  publishedAt?: string
  updatedAt?: string
  categories?: string[]
}

type CalendarOccurrence = {
  id: string
  entityId?: string
  sourcePluginId: string
  title: string
  startsAt: string
  endsAt?: string
  timeZone?: string
  allDay?: boolean
  sourceUrl?: string
}
```

RSS-Beitrag, Systemkalendertermin und Releasezeitpunkt sind nicht automatisch dieselbe Semantik; alle behalten Quellenherkunft und Zeitzone.

## Nutzerinhalte und Speicherung

Collections referenzieren beliebige Entity-IDs. Tags, Bookmarks, Notizen, History und Nutzerbewertung sind getrennt von Provider-Metadaten. Plugin-Deaktivierung löscht keine persönlichen Inhalte. Cache, Providerdaten und Nutzerinhalte haben getrennte Lösch-/Exportpfade.

Zielablage ist SQLite plus versionierte, transaktionale Migrationen, falls der dokumentierte Scripting-Zugriff auf dem Zielgerät verifiziert ist. Große Medien gehören nicht in JSON/Key-Value-Storage. Datenaufbewahrung muss Providerbedingungen/TTL respektieren; Tokens und sensible Header gehören nie in Entity-Datensätze.
