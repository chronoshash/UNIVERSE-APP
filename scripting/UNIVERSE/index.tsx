import {
  Button,
  GeometryReader,
  HStack,
  Image,
  LazyHStack,
  Navigation,
  NavigationStack,
  Path,
  RoundedRectangle,
  Script,
  ScrollView,
  Spacer,
  Text,
  TextField,
  useState,
  VStack,
  ZStack,
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

const APP_VERSION = "0.5.6"
const CONTENT_FILTERS: ContentFilter[] = ["Alle", "Medien", "Artikel", "Termine"]
const NAV_ITEMS: { id: RootScreen; label: string; symbol: string }[] = [
  { id: "home", label: "Start", symbol: "house.fill" },
  { id: "explore", label: "Entdecken", symbol: "sparkles" },
  { id: "search", label: "Suche", symbol: "magnifyingglass" },
  { id: "feeds", label: "Neu", symbol: "clock.arrow.circlepath" },
  { id: "library", label: "Merkliste", symbol: "bookmark.fill" },
  { id: "settings", label: "Info", symbol: "info.circle.fill" },
]
const POSTER_THEMES = [
  { top: "#4C1D95", bottom: "#111827", symbol: "sparkles" },
  { top: "#075985", bottom: "#111827", symbol: "waveform" },
  { top: "#9A3412", bottom: "#1C1917", symbol: "text.book.closed.fill" },
  { top: "#164E63", bottom: "#0F172A", symbol: "globe.americas.fill" },
  { top: "#831843", bottom: "#1F1235", symbol: "moon.stars.fill" },
] as const
const ANIWORLD_PLUGIN = {
  name: "AniWorld",
  host: "aniworld.to",
  status: "deaktiviert",
  capabilities: [] as string[],
  description: "Sicheres Plugin-Skelett. Kein Netzwerkzugriff, keine Stream-Auflösung und keine Downloads.",
}
const HERO_ART_PATH = Path.join(Script.directory, "assets/hero.jpg")

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
    category: "Sci-Fi",
    publishedAt: "2026-11-06T18:00:00Z",
    source: { providerId: "universe.demo", providerName: "UNIVERSE Demoquelle", retrievedAt: "2026-11-07T09:00:00Z" },
  },
  {
    id: "demo-article-001",
    typeId: "news.article",
    title: "Was eine gute digitale Bibliothek ausmacht",
    summary: "Ein lokaler Beispielartikel über Suche, Sammlungen und nachvollziehbare Quellen.",
    category: "Ideen",
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
    summary: "Ein zweiter Demo-Medieneintrag zum Ausprobieren von Suche und Merkliste.",
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
  {
    id: "demo-media-003",
    typeId: "media.video",
    title: "Lichter über Kyoto",
    summary: "Eine leise Demo-Reise durch eine Stadt zwischen Neon, Regen und Erinnerung.",
    category: "Drama",
    publishedAt: "2026-11-01T19:20:00Z",
    source: { providerId: "universe.demo", providerName: "UNIVERSE Demoquelle", retrievedAt: "2026-11-07T09:00:00Z" },
  },
  {
    id: "demo-media-004",
    typeId: "media.video",
    title: "Die letzte Umlaufbahn",
    summary: "Ein Science-Fiction-Konzept für die lokale Vorschau, ohne echte Sendungsdaten.",
    category: "Sci-Fi",
    publishedAt: "2026-10-30T20:00:00Z",
    source: { providerId: "universe.demo", providerName: "UNIVERSE Demoquelle", retrievedAt: "2026-11-07T09:00:00Z" },
  },
  {
    id: "demo-media-005",
    typeId: "media.video",
    title: "Wilde Horizonte",
    summary: "Ein dokumentarischer Demo-Titel über Landschaften und die Geschichten darin.",
    category: "Natur",
    publishedAt: "2026-10-28T16:45:00Z",
    source: { providerId: "universe.demo", providerName: "UNIVERSE Demoquelle", retrievedAt: "2026-11-07T09:00:00Z" },
  },
  {
    id: "demo-article-003",
    typeId: "news.article",
    title: "Die Kunst guter Empfehlungen",
    summary: "Ein Beispieltext darüber, wie transparente Auswahl statt undurchsichtiger Rankings Vertrauen schafft.",
    category: "Design",
    publishedAt: "2026-10-31T10:00:00Z",
    source: { providerId: "universe.demo", providerName: "UNIVERSE Demoquelle", retrievedAt: "2026-11-07T09:00:00Z" },
  },
  {
    id: "demo-article-004",
    typeId: "news.article",
    title: "Ein persönliches digitales Archiv",
    summary: "Ein lokaler Showcase-Eintrag für Sammlungen, Notizen und eigene Themenwelten.",
    category: "Bibliothek",
    publishedAt: "2026-10-27T08:30:00Z",
    source: { providerId: "universe.demo", providerName: "UNIVERSE Demoquelle", retrievedAt: "2026-11-07T09:00:00Z" },
  },
  {
    id: "demo-event-002",
    typeId: "event.release",
    title: "Design-Notizen: Hub im Wandel",
    summary: "Ein fiktiver Termin zum Testen der gemeinsamen Event- und Medienansicht.",
    category: "Community",
    publishedAt: "2026-10-26T13:00:00Z",
    source: { providerId: "universe.demo", providerName: "UNIVERSE Demoquelle", retrievedAt: "2026-11-07T09:00:00Z" },
  },
  {
    id: "demo-event-003",
    typeId: "event.release",
    title: "Ein Abend für neue Ideen",
    summary: "Ein weiteres erfundenes Datum, das ausschließlich die lokale Terminoberfläche illustriert.",
    category: "Kultur",
    publishedAt: "2026-10-24T18:00:00Z",
    source: { providerId: "universe.demo", providerName: "UNIVERSE Demoquelle", retrievedAt: "2026-11-07T09:00:00Z" },
  },
]

function typeLabel(typeId: ContentType): string {
  switch (typeId) {
    case "media.video": return "Film & Video"
    case "news.article": return "Artikel"
    case "event.release": return "Termin"
  }
}

function contentSymbol(entity: UniverseEntity): string {
  switch (entity.typeId) {
    case "media.video": return "play.rectangle.fill"
    case "news.article": return "text.book.closed.fill"
    case "event.release": return "calendar"
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

  function selectContentFilter(index: number) {
    setSearchFilterIndex(index)
    setSearchText("")
    setScreen("search")
  }

  function navigationChip(item: { id: RootScreen; label: string; symbol: string }) {
    const selected = screen === item.id || (screen === "detail" && returnScreen === item.id)
    return <Button key={item.id} buttonStyle="plain" action={() => navigateTo(item.id)}>
      <HStack spacing={7} padding={{ horizontal: 13, vertical: 9 }} background={
        <RoundedRectangle cornerRadius={18} fill={selected ? "#7047EB" : "rgba(255,255,255,0.07)"} />
      }>
        <Image systemName={item.symbol} frame={{ width: 15, height: 15 }} foregroundStyle={selected ? "white" : "#B5B6C6"} />
        <Text font="caption" fontWeight={selected ? "semibold" : "medium"} foregroundStyle={selected ? "white" : "#B5B6C6"}>{item.label}</Text>
      </HStack>
    </Button>
  }

  function sectionHeading(title: string, eyebrow?: string) {
    return <VStack alignment="leading" spacing={3}>
      {eyebrow ? <Text font="caption" fontWeight="semibold" foregroundStyle="#9C8BFF" kerning={1.1}>{eyebrow.toUpperCase()}</Text> : null}
      <Text font="title" fontWeight="bold" foregroundStyle="white">{title}</Text>
    </VStack>
  }

  function posterCard(entity: UniverseEntity, index: number) {
    const theme = POSTER_THEMES[index % POSTER_THEMES.length]
    return <Button key={entity.id} buttonStyle="plain" action={() => openEntity(entity)}>
      <VStack alignment="leading" spacing={9} frame={{ width: 144 }}>
        <ZStack alignment="bottomLeading" frame={{ width: 144, height: 194 }}>
          <RoundedRectangle cornerRadius={18} frame={{ width: 144, height: 194 }} fill={{
            gradient: [
              { color: theme.top, location: 0 },
              { color: theme.bottom, location: 1 },
            ],
            startPoint: { x: 0, y: 0 },
            endPoint: { x: 1, y: 1 },
          }} />
          <Image systemName={contentSymbol(entity)} frame={{ width: 144, height: 194, alignment: "center" }} foregroundStyle="rgba(255,255,255,0.48)" />
          <VStack alignment="leading" spacing={5} padding={12}>
            <Text font="caption2" fontWeight="bold" foregroundStyle="#E8E1FF" kerning={1}>UNIVERSE · DEMO</Text>
            <Text font="headline" fontWeight="bold" foregroundStyle="white" lineLimit={2}>{entity.title}</Text>
          </VStack>
        </ZStack>
        <Text font="subheadline" fontWeight="semibold" foregroundStyle="white" lineLimit={1}>{entity.title}</Text>
        <Text font="caption" foregroundStyle="#A6A7B6" lineLimit={1}>{entity.category} · {typeLabel(entity.typeId)}</Text>
      </VStack>
    </Button>
  }

  function contentRail(title: string, items: UniverseEntity[], contentWidth: number, eyebrow?: string) {
    if (items.length === 0) return null
    return <VStack alignment="leading" spacing={12} frame={{ width: contentWidth }}>
      <HStack alignment="bottom" frame={{ width: contentWidth }}>
        {sectionHeading(title, eyebrow)}
        <Spacer />
        <Text font="caption" foregroundStyle="#999BAD">{items.length} TITEL</Text>
      </HStack>
      <ScrollView axes="horizontal" scrollIndicator="never" frame={{ width: contentWidth }} clipped scrollClipDisabled={false}>
        <LazyHStack spacing={13}>
          {items.map((entity, index) => posterCard(entity, index))}
        </LazyHStack>
      </ScrollView>
    </VStack>
  }

  function featuredCard(entity: UniverseEntity, contentWidth: number) {
    return <Button buttonStyle="plain" action={() => openEntity(entity)}>
      <ZStack alignment="bottomLeading" frame={{ width: contentWidth, height: 330 }}>
        <Image
          filePath={HERO_ART_PATH}
          resizable
          scaleToFill
          frame={{ width: contentWidth, height: 330 }}
          clipShape={{ type: "rect", cornerRadius: 24 }}
        />
        <RoundedRectangle
          cornerRadius={24}
          frame={{ width: contentWidth, height: 330 }}
          fill={{
            gradient: [
              { color: "rgba(5,7,18,0.02)", location: 0 },
              { color: "rgba(5,7,18,0.40)", location: 0.46 },
              { color: "rgba(5,7,18,0.96)", location: 1 },
            ],
            startPoint: { x: 0.5, y: 0 },
            endPoint: { x: 0.5, y: 1 },
          }}
        />
        <VStack alignment="leading" spacing={9} padding={20} frame={{ width: contentWidth, alignment: "leading" }}>
          <HStack spacing={7} padding={{ horizontal: 9, vertical: 5 }} background={
            <RoundedRectangle cornerRadius={14} fill="rgba(112,71,235,0.84)" />
          }>
            <Image systemName="sparkles" frame={{ width: 12, height: 12 }} foregroundStyle="white" />
            <Text font="caption2" fontWeight="bold" foregroundStyle="white" kerning={0.8}>UNIVERSE ORIGINAL · DEMO</Text>
          </HStack>
          <Text font="largeTitle" fontWeight="black" foregroundStyle="white" lineLimit={2}>{entity.title}</Text>
          <Text font="subheadline" foregroundStyle="#E0E0E8" lineLimit={2}>{entity.summary}</Text>
          <HStack spacing={8} padding={{ horizontal: 13, vertical: 9 }} background="white">
            <Image systemName="arrow.right" frame={{ width: 15, height: 15 }} foregroundStyle="#15131D" />
            <Text font="subheadline" fontWeight="bold" foregroundStyle="#15131D">Details entdecken</Text>
          </HStack>
        </VStack>
      </ZStack>
    </Button>
  }

  function compactCard(entity: UniverseEntity, index: number, contentWidth: number) {
    const theme = POSTER_THEMES[index % POSTER_THEMES.length]
    const textWidth = Math.max(1, contentWidth - 113)
    return <Button key={entity.id} buttonStyle="plain" action={() => openEntity(entity)}>
      <HStack alignment="top" spacing={13} padding={12} frame={{ width: contentWidth }} background={
        <RoundedRectangle cornerRadius={18} fill="rgba(255,255,255,0.065)" />
      }>
        <ZStack frame={{ width: 76, height: 94 }}>
          <RoundedRectangle cornerRadius={12} frame={{ width: 76, height: 94 }} fill={{
            gradient: [
              { color: theme.top, location: 0 },
              { color: theme.bottom, location: 1 },
            ],
            startPoint: { x: 0, y: 0 },
            endPoint: { x: 1, y: 1 },
          }} />
          <Image systemName={contentSymbol(entity)} frame={{ width: 30, height: 30 }} foregroundStyle="rgba(255,255,255,0.85)" />
        </ZStack>
        <VStack alignment="leading" spacing={6} frame={{ width: textWidth, alignment: "leading" }}>
          <Text font="caption" fontWeight="semibold" foregroundStyle="#A996FF">{typeLabel(entity.typeId).toUpperCase()} · {entity.category.toUpperCase()}</Text>
          <Text font="headline" fontWeight="bold" foregroundStyle="white" lineLimit={2}>{entity.title}</Text>
          <Text font="caption" foregroundStyle="#B7B8C5" lineLimit={2}>{entity.summary}</Text>
          <Text font="caption2" foregroundStyle="#858797">Quelle: {entity.source.providerName}</Text>
        </VStack>
      </HStack>
    </Button>
  }

  const heroEntity = listedEntities.find(entity => entity.id === "demo-media-001") ?? listedEntities[0]
  const mediaItems = listedEntities.filter(entity => entity.typeId.startsWith("media."))
  const articleItems = listedEntities.filter(entity => entity.typeId.startsWith("news."))
  const eventItems = listedEntities.filter(entity => entity.typeId.startsWith("event."))
  const pageTitle = screen === "home" ? "UNIVERSE"
    : screen === "explore" ? "Entdecken"
    : screen === "search" ? "Suche"
    : screen === "feeds" ? "Neu im Hub"
    : screen === "library" ? "Merkliste"
    : screen === "settings" ? "Über UNIVERSE"
    : "Details"

  return (
    <GeometryReader>
      {(proxy) => {
        const viewportWidth = Math.max(1, Math.floor(proxy.size.width))
        const contentWidth = Math.max(1, viewportWidth - 36)
        return (
          <NavigationStack frame={{ width: viewportWidth }} clipped>
            <ScrollView navigationTitle={pageTitle} navigationBarTitleDisplayMode="inline" background="#080A12" frame={{ width: viewportWidth }} clipped scrollClipDisabled={false}>
              <VStack alignment="leading" spacing={22} padding={{ horizontal: 18, top: 14, bottom: 34 }} frame={{ width: viewportWidth }} background="#080A12">
                <HStack alignment="center" spacing={10} frame={{ width: contentWidth }}>
                  <ZStack frame={{ width: 42, height: 42 }}>
                    <RoundedRectangle cornerRadius={14} frame={{ width: 42, height: 42 }} fill={{
                      gradient: [
                        { color: "#8B5CF6", location: 0 },
                        { color: "#4F46E5", location: 1 },
                      ],
                      startPoint: { x: 0, y: 0 },
                      endPoint: { x: 1, y: 1 },
                    }} />
                    <Image systemName="circle.hexagongrid.fill" frame={{ width: 22, height: 22 }} foregroundStyle="white" />
                  </ZStack>
                  <VStack alignment="leading" spacing={1}>
                    <Text font="title" fontWeight="black" foregroundStyle="white" kerning={1.2}>UNIVERSE</Text>
                    <Text font="caption2" fontWeight="medium" foregroundStyle="#999BAD" kerning={1.1}>DEIN CONTENT-HUB</Text>
                  </VStack>
                  <Spacer />
                  <Button title="Suchen" systemImage="magnifyingglass" buttonStyle="bordered" buttonBorderShape="circle" action={() => navigateTo("search")} />
                </HStack>

                <ScrollView axes="horizontal" scrollIndicator="never" frame={{ width: contentWidth }} clipped scrollClipDisabled={false}>
                  <LazyHStack spacing={8}>
                    {NAV_ITEMS.map(navigationChip)}
                  </LazyHStack>
                </ScrollView>

                {screen === "home" && <>
                  {heroEntity && featuredCard(heroEntity, contentWidth)}
                  {contentRail("Weiter entdecken", mediaItems, contentWidth, "Dein nächstes Kapitel")}
                  {contentRail("Lesestoff & Perspektiven", articleItems, contentWidth, "Aus dem Wissensstrom")}
                  {contentRail("Themen & Termine", eventItems, contentWidth, "Im Blick behalten")}
                  <VStack alignment="leading" spacing={9} padding={16} frame={{ width: contentWidth }} background={
                    <RoundedRectangle cornerRadius={20} fill="rgba(255,255,255,0.055)" />
                  }>
                    <Text font="headline" fontWeight="bold" foregroundStyle="white">Alles an einem Ort.</Text>
                    <Text font="subheadline" foregroundStyle="#B7B8C5">UNIVERSE verbindet Medien, Artikel und Termine. Diese Vorschau verwendet ausschließlich lokale Demo-Inhalte.</Text>
                    <Button title="Katalog öffnen" systemImage="square.grid.2x2.fill" buttonStyle="borderedProminent" action={() => navigateTo("explore")} />
                  </VStack>
                </>}

                {screen === "explore" && <>
                  {sectionHeading("Finde deine nächste Welt", "Der Katalog")}
                  <Text font="subheadline" foregroundStyle="#B7B8C5">Stöbere durch gemischte Inhalte. Alle Einträge sind Beispiele, keine Live-Empfehlungen.</Text>
                  <ScrollView axes="horizontal" scrollIndicator="never" frame={{ width: contentWidth }} clipped scrollClipDisabled={false}>
                    <LazyHStack spacing={8}>
                      {CONTENT_FILTERS.map((filter, index) => <Button
                        key={filter}
                        title={filter}
                        buttonStyle={searchFilterIndex === index ? "borderedProminent" : "bordered"}
                        action={() => setSearchFilterIndex(index)}
                      />)}
                    </LazyHStack>
                  </ScrollView>
                  {contentRail("Beliebt im Demo-Katalog", listedEntities.filter(entity => matchesFilter(entity, currentFilter)), contentWidth, "Ausgewählt")}
                  {contentRail("Alle Inhalte", listedEntities, contentWidth, "Die ganze Sammlung")}
                </>}

                {screen === "search" && <>
                  {sectionHeading("Wonach suchst du?", "Die Suche")}
                  <TextField
                    title="Inhalte suchen"
                    value={searchText}
                    onChanged={setSearchText}
                    prompt="Titel, Thema oder Quelle"
                  />
                  <ScrollView axes="horizontal" scrollIndicator="never" frame={{ width: contentWidth }} clipped scrollClipDisabled={false}>
                    <LazyHStack spacing={8}>
                      {CONTENT_FILTERS.map((filter, index) => <Button
                        key={filter}
                        title={filter}
                        buttonStyle={searchFilterIndex === index ? "borderedProminent" : "bordered"}
                        action={() => setSearchFilterIndex(index)}
                      />)}
                    </LazyHStack>
                  </ScrollView>
                  {searchText.length > 0 && <Button title="Suche leeren" systemImage="xmark.circle" buttonStyle="plain" action={() => setSearchText("")} />}
                  <Text font="caption" foregroundStyle="#999BAD">{searchResults.length} Treffer im lokalen Demo-Katalog</Text>
                  {searchResults.length === 0
                    ? <VStack alignment="leading" spacing={10} padding={20} frame={{ width: contentWidth }} background={
                        <RoundedRectangle cornerRadius={20} fill="rgba(255,255,255,0.055)" />
                      }>
                        <Image systemName="sparkle.magnifyingglass" frame={{ width: 34, height: 34 }} foregroundStyle="#9C8BFF" />
                        <Text font="headline" fontWeight="bold" foregroundStyle="white">Nichts gefunden</Text>
                        <Text font="subheadline" foregroundStyle="#B7B8C5">Ändere den Suchbegriff oder wähle einen anderen Inhaltstyp.</Text>
                      </VStack>
                    : <VStack alignment="leading" spacing={10}>
                        {searchResults.map((entity, index) => compactCard(entity, index, contentWidth))}
                      </VStack>}
                </>}

                {screen === "feeds" && <>
                  {sectionHeading("Neu im Hub", "Chronologischer Überblick")}
                  <Text font="subheadline" foregroundStyle="#B7B8C5">Ein gemeinsamer Zeitstrahl für unterschiedliche Inhaltstypen.</Text>
                  {feedItems.map((entity, index) => compactCard(entity, index, contentWidth))}
                </>}

                {screen === "library" && <>
                  {sectionHeading("Deine Merkliste", "Für später")}
                  <Text font="subheadline" foregroundStyle="#B7B8C5">Gespeichert wird nur für die aktuelle Script-Sitzung.</Text>
                  {savedEntities.length === 0
                    ? <VStack alignment="leading" spacing={10} padding={20} frame={{ width: contentWidth }} background={
                        <RoundedRectangle cornerRadius={20} fill="rgba(255,255,255,0.055)" />
                      }>
                        <Image systemName="bookmark" frame={{ width: 34, height: 34 }} foregroundStyle="#9C8BFF" />
                        <Text font="headline" fontWeight="bold" foregroundStyle="white">Deine Sammlung beginnt hier</Text>
                        <Text font="subheadline" foregroundStyle="#B7B8C5">Entdecke einen Titel und tippe auf das Merken-Symbol.</Text>
                        <Button title="Inhalte entdecken" systemImage="sparkles" buttonStyle="borderedProminent" action={() => navigateTo("explore")} />
                      </VStack>
                    : <VStack alignment="leading" spacing={10}>{savedEntities.map((entity, index) => compactCard(entity, index, contentWidth))}</VStack>}
                </>}

                {screen === "settings" && <>
                  {sectionHeading("Ein Hub. Viele Quellen.", "Über das Projekt")}
                  <Text font="subheadline" foregroundStyle="#B7B8C5">UNIVERSE sortiert unterschiedliche Inhaltstypen in einer gemeinsamen, nachvollziehbaren Oberfläche.</Text>
                  <VStack alignment="leading" spacing={12} padding={16} frame={{ width: contentWidth }} background={
                    <RoundedRectangle cornerRadius={20} fill="rgba(255,255,255,0.055)" />
                  }>
                    <Text font="headline" fontWeight="bold" foregroundStyle="white">Aktive Basis · {APP_VERSION}</Text>
                    <Text font="caption" foregroundStyle="#A6A7B6">Viewport: {viewportWidth} · Inhaltsrahmen: {contentWidth}</Text>
                    <Text font="caption" foregroundStyle="#A6A7B6">Nur statische Registry und lokale Fixtures. Keine Netzwerkabfragen und keine dauerhafte Speicherung.</Text>
                    {PROVIDERS.map(provider => <VStack key={provider.id} alignment="leading" spacing={4} padding={{ top: 8 }} frame={{ width: contentWidth }}>
                      <Text font="subheadline" fontWeight="semibold" foregroundStyle="white">{provider.name}</Text>
                      <Text font="caption" foregroundStyle="#A6A7B6">ID: {provider.id} · Typ: {provider.kind}</Text>
                      <Text font="caption" foregroundStyle="#A6A7B6">Capabilities: {provider.capabilities.join(" · ")}</Text>
                    </VStack>)}
                  </VStack>
                  <VStack alignment="leading" spacing={8} padding={16} frame={{ width: contentWidth }} background={
                    <RoundedRectangle cornerRadius={20} fill="rgba(112,71,235,0.14)" />
                  }>
                    <Text font="headline" fontWeight="bold" foregroundStyle="white">Foundation vor Features</Text>
                    <Text font="subheadline" foregroundStyle="#C6C2D8">Echte Provider, Konten, dauerhafte Bibliothek und Wiedergabe werden erst nach den Daten-, Storage- und Geräteprüfungen ergänzt.</Text>
                  </VStack>
                  <VStack alignment="leading" spacing={8} padding={16} frame={{ width: contentWidth }} background={
                    <RoundedRectangle cornerRadius={20} fill="rgba(255,255,255,0.055)" />
                  }>
                    <Text font="headline" fontWeight="bold" foregroundStyle="white">Plugin-Verbindungen</Text>
                    <Text font="subheadline" fontWeight="semibold" foregroundStyle="white">{ANIWORLD_PLUGIN.name} · {ANIWORLD_PLUGIN.status}</Text>
                    <Text font="caption" foregroundStyle="#A6A7B6">{ANIWORLD_PLUGIN.host} · keine aktiven Capabilities</Text>
                    <Text font="caption" foregroundStyle="#A6A7B6">{ANIWORLD_PLUGIN.description}</Text>
                  </VStack>
                </>}

                {screen === "detail" && selectedEntity && <>
                  <ZStack alignment="bottomLeading" frame={{ width: contentWidth, height: 260 }}>
                    <RoundedRectangle cornerRadius={22} frame={{ width: contentWidth, height: 260 }} fill={{
                      gradient: [
                        { color: POSTER_THEMES[0].top, location: 0 },
                        { color: POSTER_THEMES[0].bottom, location: 1 },
                      ],
                      startPoint: { x: 0, y: 0 },
                      endPoint: { x: 1, y: 1 },
                    }} />
                    <Image systemName={contentSymbol(selectedEntity)} frame={{ width: contentWidth, height: 260 }} foregroundStyle="rgba(255,255,255,0.22)" />
                    <VStack alignment="leading" spacing={8} padding={18} frame={{ width: contentWidth, alignment: "leading" }}>
                      <Text font="caption" fontWeight="bold" foregroundStyle="#D3C8FF">{typeLabel(selectedEntity.typeId).toUpperCase()} · {selectedEntity.category.toUpperCase()}</Text>
                      <Text font="largeTitle" fontWeight="black" foregroundStyle="white" lineLimit={3}>{selectedEntity.title}</Text>
                      <Text font="caption" foregroundStyle="#C1C2D0">DEMO-INHALT · KEINE LIVE-QUELLE</Text>
                    </VStack>
                  </ZStack>
                  <Text font="subheadline" foregroundStyle="#E0E0E8">{selectedEntity.summary}</Text>
                  <VStack alignment="leading" spacing={8} padding={16} frame={{ width: contentWidth }} background={
                    <RoundedRectangle cornerRadius={18} fill="rgba(255,255,255,0.055)" />
                  }>
                    <Text font="headline" fontWeight="bold" foregroundStyle="white">Herkunft</Text>
                    <Text font="subheadline" foregroundStyle="#C1C2D0">{selectedEntity.source.providerName} · {selectedEntity.source.providerId}</Text>
                    <Text font="caption" foregroundStyle="#999BAD">Veröffentlicht: {formatDate(selectedEntity.publishedAt)} · Abgerufen: {formatDate(selectedEntity.source.retrievedAt)}</Text>
                  </VStack>
                  <Button
                    title={savedIds.includes(selectedEntity.id) ? "Aus Merkliste entfernen" : "Für später merken"}
                    systemImage={savedIds.includes(selectedEntity.id) ? "bookmark.fill" : "bookmark"}
                    buttonStyle="borderedProminent"
                    action={() => toggleSaved(selectedEntity.id)}
                  />
                  <Button title="Zur vorherigen Ansicht" systemImage="arrow.left" buttonStyle="plain" action={() => setScreen(returnScreen)} />
                </>}
              </VStack>
            </ScrollView>
          </NavigationStack>
        )
      }}
    </GeometryReader>
  )
}

async function main() {
  await Navigation.present({ element: <UniverseApp /> })
  Script.exit()
}

void main()
