import {
  Button,
  HStack,
  List,
  Navigation,
  NavigationStack,
  Script,
  Section,
  Text,
  TextField,
  useState,
  VStack,
} from "scripting"

type ContentType = "media.video" | "news.article" | "event.release"
type ContentFilter = "Alle" | "Medien" | "Artikel" | "Termine"
type AppScreen = "home" | "explore" | "search" | "feeds" | "library" | "settings" | "detail"
type RootScreen = Exclude<AppScreen, "detail">

type SourceRecord = {
  providerId: string
  providerName: string
  retrievedAt: string
}

type UniverseEntity = {
  id: string
  typeId: ContentType
  title: string
  summary: string
  category: string
  publishedAt: string
  source: SourceRecord
}

type CapabilityId = "entity.list" | "search.local" | "feed.local" | "entity.details"

type StaticProvider = {
  id: string
  name: string
  capabilities: CapabilityId[]
  kind: "fixture"
  listEntities: () => UniverseEntity[]
  search: (query: string, filter: ContentFilter) => UniverseEntity[]
  listFeed: () => UniverseEntity[]
  getEntity: (id: string) => UniverseEntity | undefined
}

const APP_VERSION = "0.4.0"
const CONTENT_FILTERS: ContentFilter[] = ["Alle", "Medien", "Artikel", "Termine"]
const PROVIDERS: StaticProvider[] = [
  {
    id: "universe.demo",
    name: "UNIVERSE Demoquelle",
    capabilities: ["entity.list", "search.local", "feed.local", "entity.details"],
    kind: "fixture",
    listEntities: () => ENTITIES,
    search: (query, filter) => ENTITIES.filter(entity => {
      const searchableText = `${entity.title} ${entity.summary} ${entity.category} ${entity.source.providerName}`.toLowerCase()
      return matchesFilter(entity, filter) && searchableText.includes(query)
    }),
    listFeed: () => ENTITIES,
    getEntity: id => ENTITIES.find(entity => entity.id === id),
  },
]

// Demonstration fixtures only: no network requests or external-provider claims.
const ENTITIES: UniverseEntity[] = [
  {
    id: "demo-media-001",
    typeId: "media.video",
    title: "Der erste Weltentwurf",
    summary: "Ein Beispieltitel, um Mediensuche, Kategorien und Quellenherkunft im Hub zu zeigen.",
    category: "Film",
    publishedAt: "2026-11-06T18:00:00Z",
    source: { providerId: "universe.demo", providerName: "UNIVERSE Demoquelle", retrievedAt: "2026-11-07T09:00:00Z" },
  },
  {
    id: "demo-article-001",
    typeId: "news.article",
    title: "Was eine gute digitale Bibliothek ausmacht",
    summary: "Ein lokaler Beispielartikel über Suche, Sammlungen und nachvollziehbare Quellen.",
    category: "Produkt",
    publishedAt: "2026-11-05T12:30:00Z",
    source: { providerId: "universe.demo", providerName: "UNIVERSE Demoquelle", retrievedAt: "2026-11-07T09:00:00Z" },
  },
  {
    id: "demo-event-001",
    typeId: "event.release",
    title: "UNIVERSE-Basis: nächster Meilenstein",
    summary: "Ein Beispieldatum für eine spätere, quellenübergreifende Terminansicht; noch kein echtes Release-Event.",
    category: "Planung",
    publishedAt: "2026-11-04T09:00:00Z",
    source: { providerId: "universe.demo", providerName: "UNIVERSE Demoquelle", retrievedAt: "2026-11-07T09:00:00Z" },
  },
  {
    id: "demo-media-002",
    typeId: "media.video",
    title: "Atlas der Ideen",
    summary: "Ein zweiter Demo-Medieneintrag zum Ausprobieren von Suche und Mediathek.",
    category: "Dokumentation",
    publishedAt: "2026-11-03T15:15:00Z",
    source: { providerId: "universe.demo", providerName: "UNIVERSE Demoquelle", retrievedAt: "2026-11-07T09:00:00Z" },
  },
  {
    id: "demo-article-002",
    typeId: "news.article",
    title: "Quellen bleiben sichtbar",
    summary: "Ein Demo-Eintrag zeigt, wie Quelle und Abrufzeit direkt am Inhalt nachvollziehbar bleiben.",
    category: "Architektur",
    publishedAt: "2026-11-02T08:45:00Z",
    source: { providerId: "universe.demo", providerName: "UNIVERSE Demoquelle", retrievedAt: "2026-11-07T09:00:00Z" },
  },
]

function typeLabel(typeId: ContentType): string {
  switch (typeId) {
    case "media.video": return "Video"
    case "news.article": return "Artikel"
    case "event.release": return "Termin"
  }
}

function matchesFilter(entity: UniverseEntity, filter: ContentFilter): boolean {
  if (filter === "Alle") return true
  if (filter === "Medien") return entity.typeId.startsWith("media.")
  if (filter === "Artikel") return entity.typeId.startsWith("news.")
  return entity.typeId.startsWith("event.")
}

function formatDate(value: string): string {
  return value.slice(0, 10)
}

function UniverseApp() {
  const [screen, setScreen] = useState<AppScreen>("home")
  const [returnScreen, setReturnScreen] = useState<RootScreen>("home")
  const [searchText, setSearchText] = useState("")
  const [searchFilterIndex, setSearchFilterIndex] = useState(0)
  const [savedIds, setSavedIds] = useState<string[]>([])
  const [selectedEntityId, setSelectedEntityId] = useState("")

  const currentFilter = CONTENT_FILTERS[searchFilterIndex]
  const query = searchText.trim().toLowerCase()
  const listedEntities = PROVIDERS
    .filter(provider => provider.capabilities.includes("entity.list"))
    .flatMap(provider => provider.listEntities())
  const searchResults = PROVIDERS
    .filter(provider => provider.capabilities.includes("search.local"))
    .flatMap(provider => provider.search(query, currentFilter))
  const feedItems = PROVIDERS
    .filter(provider => provider.capabilities.includes("feed.local"))
    .flatMap(provider => provider.listFeed())
    .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt))
  const savedEntities = listedEntities.filter(entity => savedIds.includes(entity.id))
  const selectedEntity = PROVIDERS
    .filter(provider => provider.capabilities.includes("entity.details"))
    .map(provider => provider.getEntity(selectedEntityId))
    .find(entity => entity !== undefined)

  function navigateTo(nextScreen: RootScreen) {
    setScreen(nextScreen)
  }

  function openEntity(entity: UniverseEntity) {
    if (screen !== "detail") setReturnScreen(screen)
    setSelectedEntityId(entity.id)
    setScreen("detail")
  }

  function toggleSaved(entityId: string) {
    setSavedIds(current => current.includes(entityId)
      ? current.filter(id => id !== entityId)
      : [...current, entityId]
    )
  }

  function cycleSearchFilter() {
    setSearchFilterIndex(index => (index + 1) % CONTENT_FILTERS.length)
    setScreen("search")
  }

  function selectContentFilter(index: number) {
    setSearchFilterIndex(index)
    setSearchText("")
    setScreen("search")
  }

  function navigationButton(target: RootScreen, label: string) {
    return <Button
      title={screen === target ? `● ${label}` : label}
      buttonStyle="borderless"
      action={() => navigateTo(target)}
    />
  }

  function contentCard(entity: UniverseEntity) {
    const isSaved = savedIds.includes(entity.id)
    return <VStack key={entity.id} alignment="leading" spacing={6}>
      <Text>{entity.title}</Text>
      <Text>{typeLabel(entity.typeId)} · {entity.category}</Text>
      <Text>{entity.summary}</Text>
      <Text>Quelle: {entity.source.providerName} · Abruf: {formatDate(entity.source.retrievedAt)}</Text>
      <HStack spacing={8}>
        <Button title="Details" buttonStyle="borderless" action={() => openEntity(entity)} />
        <Button
          title={isSaved ? "Aus Merkliste entfernen" : "Merken"}
          buttonStyle="borderless"
          action={() => toggleSaved(entity.id)}
        />
      </HStack>
    </VStack>
  }

  const pageTitle = screen === "home" ? "UNIVERSE"
    : screen === "explore" ? "Entdecken"
    : screen === "search" ? "Suche"
    : screen === "feeds" ? "Feeds"
    : screen === "library" ? "Merkliste"
    : screen === "settings" ? "Einstellungen"
    : "Inhalt"

  return (
    <NavigationStack>
      <List navigationTitle={pageTitle}>
        <Section header={<Text>UNIVERSE · Basis {APP_VERSION}</Text>}>
          <HStack spacing={6}>
            {navigationButton("home", "Home")}
            {navigationButton("explore", "Entdecken")}
            {navigationButton("search", "Suche")}
          </HStack>
          <HStack spacing={6}>
            {navigationButton("feeds", "Feeds")}
            {navigationButton("library", "Merkliste")}
            {navigationButton("settings", "Info")}
          </HStack>
        </Section>

        {screen === "home" && <>
          <Section header={<Text>Dein Hub beginnt hier</Text>}>
            <Text>Eine gemeinsame Oberfläche für verschiedene Inhalte. Diese Basisversion arbeitet absichtlich nur mit lokalen Beispieldaten.</Text>
            <Text>{listedEntities.length} Demo-Inhalte · {PROVIDERS.length} statische Quelle · {savedEntities.length} gemerkt (nur diese Sitzung)</Text>
            <Button title="Inhalte durchsuchen" action={() => navigateTo("search")} />
            <Button title="Themen entdecken" action={() => navigateTo("explore")} />
          </Section>
          <Section header={<Text>Zuletzt im Demo-Feed</Text>}>
            {feedItems.slice(0, 3).map(contentCard)}
          </Section>
        </>}

        {screen === "explore" && <Section header={<Text>Nach Inhaltstyp entdecken</Text>}>
          <Text>Die Zähler stammen aus dem lokalen Demo-Katalog, nicht aus Live-Quellen.</Text>
          <Button title={`Alle Inhalte · ${listedEntities.length}`} action={() => selectContentFilter(0)} />
          <Button title={`Medien · ${listedEntities.filter(entity => entity.typeId.startsWith("media.")).length}`} action={() => selectContentFilter(1)} />
          <Button title={`Artikel · ${listedEntities.filter(entity => entity.typeId.startsWith("news.")).length}`} action={() => selectContentFilter(2)} />
          <Button title={`Termine · ${listedEntities.filter(entity => entity.typeId.startsWith("event.")).length}`} action={() => selectContentFilter(3)} />
        </Section>}

        {screen === "search" && <>
          <Section header={<Text>Eine Suche, verschiedene Inhaltstypen</Text>}>
            <TextField
              title="Inhalte suchen"
              value={searchText}
              onChanged={setSearchText}
              prompt="Titel, Thema oder Quelle"
            />
            <Button title={`Typ: ${currentFilter} · wechseln`} action={cycleSearchFilter} />
            {searchText.length > 0 && <Button title="Suche leeren" action={() => setSearchText("")} />}
            <Text>{searchResults.length} Treffer im lokalen Demo-Katalog</Text>
          </Section>
          {searchResults.length === 0
            ? <Section header={<Text>Keine Treffer</Text>}>
                <Text>Ändere den Suchbegriff oder wähle einen anderen Inhaltstyp.</Text>
              </Section>
            : <Section header={<Text>Ergebnisse</Text>}>
                {searchResults.map(contentCard)}
              </Section>}
        </>}

        {screen === "feeds" && <Section header={<Text>Chronologischer Demo-Feed</Text>}>
          <Text>Ein gemeinsamer Zeitstrahl für unterschiedliche Inhaltstypen. Herkunft und Beispielstatus stehen am Eintrag.</Text>
          {feedItems.map(contentCard)}
        </Section>}

        {screen === "library" && <Section header={<Text>Deine Merkliste</Text>}>
          <Text>Merken funktioniert in dieser Basisversion nur während der aktuellen Script-Sitzung; dauerhafte Speicherung kommt erst nach dem Storage-Capability-Test.</Text>
          {savedEntities.length === 0
            ? <Text>Noch nichts gemerkt. Entdecke Inhalte und tippe auf „Merken“.</Text>
            : savedEntities.map(contentCard)}
        </Section>}

        {screen === "settings" && <>
          <Section header={<Text>Aktive Basis</Text>}>
            <Text>Version {APP_VERSION} · statische Registry · lokale Fixtures · keine Netzwerkanfragen.</Text>
            {PROVIDERS.map(provider => <VStack key={provider.id} alignment="leading" spacing={4}>
              <Text>{provider.name}</Text>
              <Text>ID: {provider.id} · Typ: {provider.kind}</Text>
              <Text>Capabilities: {provider.capabilities.join(", ")}</Text>
            </VStack>)}
          </Section>
          <Section header={<Text>Bewusst noch nicht enthalten</Text>}>
            <Text>Download-Manager, echte Provider, dauerhafte Datenbank, Account-Sync und dynamische Plugins kommen erst, wenn App-Shell, Datenmodell, statische Registry und Capability-Grenzen stehen.</Text>
          </Section>
        </>}

        {screen === "detail" && selectedEntity && <Section header={<Text>{selectedEntity.title}</Text>}>
          <Button title="Zur vorherigen Ansicht" action={() => setScreen(returnScreen)} />
          <Text>Typ: {typeLabel(selectedEntity.typeId)} · Kategorie: {selectedEntity.category}</Text>
          <Text>{selectedEntity.summary}</Text>
          <Text>Quelle: {selectedEntity.source.providerName} ({selectedEntity.source.providerId})</Text>
          <Text>Abgerufen am: {formatDate(selectedEntity.source.retrievedAt)}</Text>
          <Text>Demo-Eintrag · keine Live-Quelle</Text>
          <Button
            title={savedIds.includes(selectedEntity.id) ? "Aus Merkliste entfernen" : "In Merkliste merken"}
            action={() => toggleSaved(selectedEntity.id)}
          />
        </Section>}
      </List>
    </NavigationStack>
  )
}

async function main() {
  await Navigation.present({ element: <UniverseApp /> })
  Script.exit()
}

void main()
