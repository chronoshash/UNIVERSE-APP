import {
  Button,
  HStack,
  Link,
  List,
  Navigation,
  NavigationStack,
  ProgressView,
  Script,
  Section,
  Text,
  TextField,
  useEffect,
  useMemo,
  useState,
  VStack,
  VideoPlayer,
} from "scripting"

type Screen = "home" | "add" | "downloads" | "library" | "player"
type QueueEntry = {
  task: any
  snapshot: any
  progress: any
  localPath: string
  fileAvailable: boolean
}

const QUEUE_ID = "universe-offline-v1"
const VIDEO_CATEGORIES = ["Anime", "Filme", "Serien", "Sonstiges"]
const LIBRARY_FILTERS = ["Alle", ...VIDEO_CATEGORIES]
const VIDEO_EXTENSIONS = new Set(["mp4", "m4v", "mov"])

function safeFileSegment(value: string): string {
  return value
    .trim()
    .replace(/[^A-Za-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 56)
    .replace(/-+$/g, "") || "video"
}

function titleFromPath(path: string): string {
  const name = path.split("/").pop() ?? path
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/^[a-z0-9]+-[a-z0-9]+-/i, "")
    .replace(/[-_]+/g, " ")
}

function describeError(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}

function stateLabel(state: string): string {
  switch (state) {
    case "waiting": return "Wartet"
    case "running": return "Lädt herunter"
    case "retrying": return "Erneuter Versuch"
    case "suspended": return "Pausiert"
    case "verifying": return "Wird geprüft"
    case "publishing": return "Wird abgelegt"
    case "completed": return "Offline verfügbar"
    case "failed": return "Fehlgeschlagen"
    case "canceled": return "Abgebrochen"
    case "removed": return "Entfernt"
    default: return state
  }
}

function UniverseApp() {
  const [screen, setScreen] = useState<Screen>("home")
  const [queue, setQueue] = useState<any>(null)
  const [entries, setEntries] = useState<QueueEntry[]>([])
  const [notice, setNotice] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [mediaUrl, setMediaUrl] = useState("")
  const [mediaTitle, setMediaTitle] = useState("")
  const [categoryIndex, setCategoryIndex] = useState(0)
  const [isAdding, setIsAdding] = useState(false)
  const [pendingRemoveId, setPendingRemoveId] = useState("")
  const [downloadsSearch, setDownloadsSearch] = useState("")
  const [librarySearch, setLibrarySearch] = useState("")
  const [libraryFilterIndex, setLibraryFilterIndex] = useState(0)
  const [selectedPath, setSelectedPath] = useState("")
  const [playerReady, setPlayerReady] = useState(false)
  const [playerError, setPlayerError] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const player = useMemo(() => new AVPlayer(), [])

  function bindTask(task: any, activeQueue: any) {
    task.onProgress = (progress: any) => {
      setEntries(current => current.map(entry =>
        entry.task.id === task.id ? { ...entry, progress } : entry
      ))
    }
    task.onStateChange = (snapshot: any) => {
      setEntries(current => current.map(entry =>
        entry.task.id === task.id
          ? { ...entry, snapshot, progress: snapshot.progress ?? entry.progress }
          : entry
      ))
    }
    task.onComplete = (error: any) => {
      if (error) setErrorMessage(`Download fehlgeschlagen: ${describeError(error)}`)
      void reloadQueue(activeQueue).catch(loadError => {
        setErrorMessage(`Downloadstatus konnte nicht aktualisiert werden: ${describeError(loadError)}`)
      })
    }
  }

  async function reloadQueue(activeQueue: any) {
    const tasks = await activeQueue.getTasks()
    const next: QueueEntry[] = []
    let skippedRecords = 0
    for (const task of tasks) {
      try {
        const snapshot = await task.getSnapshot()
        const localPath = typeof snapshot.destination === "string" ? snapshot.destination : ""
        const fileAvailable = snapshot.state === "completed"
          && localPath.length > 0
          && await FileManager.exists(localPath)
        bindTask(task, activeQueue)
        next.push({
          task,
          snapshot,
          progress: snapshot.progress ?? null,
          localPath,
          fileAvailable,
        })
      } catch {
        // Keep valid items visible, but surface the skipped records below.
        skippedRecords += 1
      }
    }
    setEntries(next)
    if (skippedRecords > 0) {
      setErrorMessage(`${skippedRecords} Download-Eintrag/Einträge konnten nicht gelesen werden.`)
    }
    return skippedRecords
  }

  useEffect(() => {
    let alive = true
    let openedQueue: any = null

    void (async () => {
      try {
        const restoredQueue = await DownloadManager.open({
          identifier: QUEUE_ID,
          mode: "foreground",
          maxConcurrentTasks: 2,
          allowsCellularAccess: false,
        })
        if (!alive) {
          restoredQueue.dispose()
          return
        }
        openedQueue = restoredQueue
        setQueue(restoredQueue)
        await reloadQueue(restoredQueue)
      } catch (error) {
        if (alive) {
          setErrorMessage(`Offline-Verwaltung konnte nicht gestartet werden: ${describeError(error)}`)
        }
      }
    })()

    return () => {
      alive = false
      openedQueue?.dispose()
    }
  }, [])

  useEffect(() => {
    if (!selectedPath) {
      player.pause()
      return
    }

    let alive = true
    setPlayerReady(false)
    setPlayerError("")
    setIsPlaying(false)
    player.pause()
    player.onReadyToPlay = () => {
      if (alive) setPlayerReady(true)
    }
    player.onTimeControlStatusChanged = status => {
      if (alive) setIsPlaying(status === "playing")
    }
    player.onError = message => {
      if (alive) setPlayerError(message)
    }

    void (async () => {
      try {
        if (!await FileManager.exists(selectedPath)) {
          if (alive) setPlayerError("Die lokale Datei wurde nicht gefunden.")
          return
        }
        if (!player.setSource(selectedPath) && alive) {
          setPlayerError("Die Datei konnte nicht an den Player übergeben werden.")
        }
      } catch (error) {
        if (alive) setPlayerError(describeError(error))
      }
    })()

    return () => {
      alive = false
      player.pause()
    }
  }, [selectedPath])

  useEffect(() => () => player.dispose(), [player])

  async function startDownload() {
    if (isAdding) return
    if (!queue) {
      setErrorMessage("Die Download-Verwaltung ist noch nicht bereit.")
      return
    }
    if (!mediaTitle.trim()) {
      setErrorMessage("Bitte gib dem Video einen Namen.")
      return
    }

    setIsAdding(true)
    setErrorMessage("")
    setNotice("")
    try {
      const parsed = new URL(mediaUrl.trim())
      if (parsed.protocol !== "https:") {
        throw new Error("Aus Sicherheitsgründen werden hier nur HTTPS-Links akzeptiert.")
      }
      if (parsed.username || parsed.password || parsed.hash) {
        throw new Error("Der Link darf keine Zugangsdaten oder URL-Fragmente enthalten.")
      }
      const extension = parsed.pathname.split(".").pop()?.toLowerCase() ?? ""
      if (!VIDEO_EXTENSIONS.has(extension)) {
        throw new Error("Bitte einen direkten MP4-, M4V- oder MOV-Dateilink verwenden. Webseiten und Playlists werden nicht geladen.")
      }
      if (await queue.getTaskByURL(parsed.toString())) {
        throw new Error("Dieser Link ist bereits in Downloads oder Mediathek. Entferne zuerst den vorhandenen Eintrag.")
      }

      const category = VIDEO_CATEGORIES[categoryIndex]
      const folder = `${FileManager.documentsDirectory}/UNIVERSE/Offline/${category}`
      const uniquePrefix = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
      const fileName = `${uniquePrefix}-${safeFileSegment(mediaTitle)}.${extension}`
      const destination = `${folder}/${fileName}`
      const task = await queue.download({
        url: parsed.toString(),
        destination,
        priority: 0.7,
      })
      bindTask(task, queue)
      setNotice(`Zur Warteschlange hinzugefügt · ${category}. Nur WLAN; der Download pausiert, wenn Scripting in den Hintergrund geht.`)
      setMediaUrl("")
      await reloadQueue(queue)
      setScreen("downloads")
    } catch (error) {
      setErrorMessage(describeError(error))
    } finally {
      setIsAdding(false)
    }
  }

  async function controlTask(entry: QueueEntry) {
    setErrorMessage("")
    try {
      const state = entry.snapshot.state
      if (state === "running" || state === "waiting" || state === "retrying") {
        await entry.task.suspend()
      } else if (state === "suspended" || state === "failed") {
        await entry.task.resume()
      }
      await reloadQueue(queue)
    } catch (error) {
      setErrorMessage(`Download-Aktion fehlgeschlagen: ${describeError(error)}`)
    }
  }

  async function cancelTask(entry: QueueEntry) {
    setErrorMessage("")
    try {
      await entry.task.cancel()
      await reloadQueue(queue)
    } catch (error) {
      setErrorMessage(`Abbrechen fehlgeschlagen: ${describeError(error)}`)
    }
  }

  async function removeDownload(entry: QueueEntry) {
    setErrorMessage("")
    try {
      await entry.task.remove({ deleteFile: entry.fileAvailable })
      setPendingRemoveId("")
      setNotice(entry.fileAvailable ? "Download und lokale Datei entfernt." : "Download-Eintrag entfernt.")
      try {
        await reloadQueue(queue)
      } catch (loadError) {
        setErrorMessage(`Eintrag entfernt, aber die Liste konnte nicht aktualisiert werden: ${describeError(loadError)}`)
      }
    } catch (error) {
      setErrorMessage(`Entfernen fehlgeschlagen: ${describeError(error)}`)
    }
  }

  async function refreshDownloads() {
    if (!queue) return
    try {
      const skippedRecords = await reloadQueue(queue)
      if (skippedRecords === 0) setErrorMessage("")
    } catch (error) {
      setErrorMessage(`Aktualisieren fehlgeschlagen: ${describeError(error)}`)
    }
  }

  const selectedEntry = entries.find(entry => entry.localPath === selectedPath && entry.fileAvailable)
  const libraryEntries = entries.filter(entry => entry.snapshot.state === "completed" && entry.fileAvailable)
  const downloadQuery = downloadsSearch.trim().toLowerCase()
  const visibleDownloads = entries.filter(entry =>
    titleFromPath(entry.localPath || entry.snapshot.url || "Video").toLowerCase().includes(downloadQuery)
  )
  const libraryQuery = librarySearch.trim().toLowerCase()
  const selectedLibraryCategory = LIBRARY_FILTERS[libraryFilterIndex]
  const visibleLibraryEntries = libraryEntries.filter(entry => {
    const title = titleFromPath(entry.localPath).toLowerCase()
    const matchesTitle = title.includes(libraryQuery)
    const matchesCategory = libraryFilterIndex === 0
      || entry.localPath.includes(`/Offline/${selectedLibraryCategory}/`)
    return matchesTitle && matchesCategory
  })
  const visibleLibraryCategories = VIDEO_CATEGORIES.filter(category =>
    visibleLibraryEntries.some(entry => entry.localPath.includes(`/Offline/${category}/`))
  )
  const pageTitle = screen === "add" ? "Video hinzufügen"
    : screen === "downloads" ? "Downloads"
    : screen === "library" ? "Offline-Mediathek"
    : screen === "player" ? "Offline-Wiedergabe"
    : "UNIVERSE"

  function downloadRow(entry: QueueEntry) {
    const state = entry.snapshot.state as string
    const fraction = entry.progress?.fractionCompleted
    const canControl = ["waiting", "running", "retrying", "suspended", "failed"].includes(state)
    const active = ["waiting", "running", "retrying"].includes(state)
    const canRemove = ["completed", "failed", "canceled"].includes(state)
    const confirmingRemove = pendingRemoveId === entry.task.id
    const category = VIDEO_CATEGORIES.find(name => entry.localPath.includes(`/Offline/${name}/`)) ?? "Sonstiges"
    return (
      <VStack key={entry.task.id} alignment="leading" spacing={6}>
        <Text>{titleFromPath(entry.localPath || entry.snapshot.url || "Video")}</Text>
        <Text>{category} · {stateLabel(state)}</Text>
        {typeof fraction === "number" && Number.isFinite(fraction) && active && <ProgressView value={Math.max(0, Math.min(1, fraction))} total={1} />}
        {entry.snapshot.error?.message && <Text>{entry.snapshot.error.message}</Text>}
        <HStack spacing={8}>
          {canControl && <Button
            title={state === "suspended" || state === "failed" ? "Fortsetzen" : "Pausieren"}
            buttonStyle="borderless"
            action={() => { void controlTask(entry) }}
          />}
          {active && <Button title="Abbrechen" buttonStyle="borderless" action={() => { void cancelTask(entry) }} />}
          {state === "completed" && <Button
            title={entry.fileAvailable ? "In Mediathek" : "Datei fehlt"}
            buttonStyle="borderless"
            action={() => {
              if (entry.fileAvailable) {
                setSelectedPath(entry.localPath)
                setScreen("player")
              }
            }}
          />}
          {canRemove && <Button
            title={confirmingRemove ? "Endgültig löschen" : "Eintrag entfernen"}
            buttonStyle="borderless"
            role={confirmingRemove ? "destructive" : undefined}
            action={() => {
              if (confirmingRemove) void removeDownload(entry)
              else setPendingRemoveId(entry.task.id)
            }}
          />}
          {confirmingRemove && <Button
            title="Abbrechen"
            buttonStyle="borderless"
            action={() => setPendingRemoveId("")}
          />}
        </HStack>
      </VStack>
    )
  }

  if (screen === "player" && selectedEntry) {
    return (
      <NavigationStack>
        <List navigationTitle={pageTitle}>
          <Section>
            <Button title="Zur Offline-Mediathek" action={() => {
              player.pause()
              setSelectedPath("")
              setScreen("library")
            }} />
            <Text>{titleFromPath(selectedEntry.localPath)}</Text>
            <VideoPlayer player={player} frame={{ height: 300 }} />
            <HStack spacing={8}>
              <Button
                title={isPlaying ? "Pause" : "Abspielen"}
                action={() => {
                  if (!playerReady) {
                    setPlayerError("Der Player lädt die lokale Datei noch oder unterstützt deren Codec nicht.")
                  } else if (isPlaying) {
                    player.pause()
                  } else if (!player.play()) {
                    setPlayerError("Wiedergabe konnte nicht gestartet werden.")
                  }
                }}
              />
            </HStack>
            {playerError.length > 0 && <Text>{playerError}</Text>}
            {!playerReady && playerError.length === 0 && <Text>Lokale Datei wird geöffnet …</Text>}
            <Text>Wiedergabe erfolgt aus dem lokalen UNIVERSE-Ordner. Unterstützte Codecs hängen von iOS und der Datei ab.</Text>
          </Section>
        </List>
      </NavigationStack>
    )
  }

  return (
    <NavigationStack>
      <List navigationTitle={pageTitle}>
        {screen !== "home" && <Section>
          <Button title="← Home" action={() => setScreen("home")} />
        </Section>}

        {screen === "home" && <>
          <Section header={<Text>Speichern. Wiederfinden. Offline ansehen.</Text>}>
            <VStack alignment="leading" spacing={8}>
              <Text>Deine Videos liegen übersichtlich nach Kategorie sortiert – und sind lokal abspielbar, sobald sie heruntergeladen wurden.</Text>
              <Text>{libraryEntries.length} offline verfügbar · {entries.filter(entry => entry.snapshot.state !== "completed" || !entry.fileAvailable).length} in Downloads</Text>
            </VStack>
            <Button title="Video hinzufügen" action={() => setScreen("add")} />
            <Button title="Offline-Mediathek öffnen" action={() => setScreen("library")} />
            <Button title="Downloads ansehen" action={() => setScreen("downloads")} />
          </Section>
          <Section header={<Text>Eine optionale Quelle</Text>}>
            <Text>AniWorld wird nur extern geöffnet. UNIVERSE löst keine Streams von Websites auf.</Text>
            <Link url="https://aniworld.to/">AniWorld-Website öffnen</Link>
          </Section>
          <Section header={<Text>Einfach und nachvollziehbar</Text>}>
            <Text>Nur selbst bereitgestellte HTTPS-Dateilinks und Inhalte, die du speichern darfst. Keine Webseiten, Playlists oder DRM-Inhalte.</Text>
            <Text>Downloads sind WLAN-only und pausieren, wenn Scripting in den Hintergrund geht.</Text>
          </Section>
        </>}

        {screen === "add" && <Section header={<Text>Direkten Dateilink hinzufügen</Text>}>
          <TextField
            title="HTTPS-Video-URL"
            value={mediaUrl}
            onChanged={setMediaUrl}
            prompt="https://example.org/video.mp4"
          />
          <TextField
            title="Titel"
            value={mediaTitle}
            onChanged={setMediaTitle}
            prompt="z. B. Meine Episode"
          />
          <Button
            title={`Kategorie: ${VIDEO_CATEGORIES[categoryIndex]} · ändern`}
            action={() => setCategoryIndex(index => (index + 1) % VIDEO_CATEGORIES.length)}
          />
          <Text>Filter nach Dateiendung: MP4, M4V oder MOV über HTTPS. Die Antwort und der iOS-Codec müssen trotzdem kompatibel sein; keine Webseiten, Playlists oder DRM-Inhalte.</Text>
          <Text>Die Warteschlange speichert den Link zum Fortsetzen. Keine vertraulichen Zugriffstoken in URLs einfügen. Nur WLAN; Foreground-Downloads pausieren beim Wechsel in den Hintergrund.</Text>
          <Button
            title={isAdding ? "Wird hinzugefügt …" : queue ? "In Downloads einreihen" : "Download-Verwaltung lädt …"}
            action={() => { void startDownload() }}
          />
        </Section>}

        {screen === "downloads" && <>
          <Section header={<Text>Warteschlange · foreground-only</Text>}>
            <TextField
              title="Downloads suchen"
              value={downloadsSearch}
              onChanged={setDownloadsSearch}
              prompt="Titel eingeben"
            />
            <Button title="Liste aktualisieren" action={() => { void refreshDownloads() }} />
            {!queue && <Text>Download-Verwaltung wird geladen …</Text>}
            {entries.length === 0 && queue && <Text>Noch keine Downloads. Füge einen direkten Dateilink hinzu.</Text>}
            {entries.length > 0 && visibleDownloads.length === 0 && <Text>Keine passenden Downloads gefunden.</Text>}
            {visibleDownloads.map(downloadRow)}
            <Button title="Video hinzufügen" action={() => setScreen("add")} />
          </Section>
        </>}

        {screen === "library" && <>
          <Section header={<Text>Finde deine Videos</Text>}>
            <TextField
              title="Titel suchen"
              value={librarySearch}
              onChanged={setLibrarySearch}
              prompt="Titel eingeben"
            />
            <Button
              title={`Kategorie: ${selectedLibraryCategory} · wechseln`}
              action={() => setLibraryFilterIndex(index => (index + 1) % LIBRARY_FILTERS.length)}
            />
          </Section>
          {visibleLibraryEntries.length === 0 && <Section header={<Text>Keine Videos gefunden</Text>}>
            <Text>{libraryEntries.length === 0
              ? "Abgeschlossene Downloads mit vorhandener lokaler Datei erscheinen hier."
              : "Passe die Suche oder Kategorie an."}</Text>
            <Button title="Video hinzufügen" action={() => setScreen("add")} />
          </Section>}
          {visibleLibraryCategories.map(category => {
            const grouped = visibleLibraryEntries.filter(entry => entry.localPath.includes(`/Offline/${category}/`))
            return (
              <Section key={category} header={<Text>{category} · {grouped.length}</Text>}>
                {grouped.map(entry => (
                  <VStack key={entry.task.id} alignment="leading" spacing={6}>
                    <Text>{titleFromPath(entry.localPath)}</Text>
                    <Text>Offline verfügbar</Text>
                    <HStack spacing={8}>
                      <Button title="Offline ansehen" buttonStyle="borderless" action={() => {
                        setSelectedPath(entry.localPath)
                        setScreen("player")
                      }} />
                      <Button
                        title={pendingRemoveId === entry.task.id ? "Endgültig löschen" : "Entfernen"}
                        buttonStyle="borderless"
                        role={pendingRemoveId === entry.task.id ? "destructive" : undefined}
                        action={() => {
                          if (pendingRemoveId === entry.task.id) void removeDownload(entry)
                          else setPendingRemoveId(entry.task.id)
                        }}
                      />
                      {pendingRemoveId === entry.task.id && <Button
                        title="Abbrechen"
                        buttonStyle="borderless"
                        action={() => setPendingRemoveId("")}
                      />}
                    </HStack>
                  </VStack>
                ))}
              </Section>
            )
          })}
          <Section>
            <Button title="Video hinzufügen" action={() => setScreen("add")} />
          </Section>
        </>}

        {notice.length > 0 && <Section header={<Text>Status</Text>}><Text>{notice}</Text></Section>}
        {errorMessage.length > 0 && <Section header={<Text>Hinweis</Text>}><Text>{errorMessage}</Text></Section>}
      </List>
    </NavigationStack>
  )
}

async function main() {
  await Navigation.present({ element: <UniverseApp /> })
  Script.exit()
}

void main()
