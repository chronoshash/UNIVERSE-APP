#!/usr/bin/env python3
"""Validate the static UNIVERSE Scripting foundation and built package."""

from __future__ import annotations

import json
import re
from datetime import datetime
from pathlib import Path
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "scripting" / "UNIVERSE"
PACKAGE = ROOT / "UNIVERSE.scripting"
PACKAGE_FILES = ("script.json", "index.tsx", "README.md", "assets/hero.jpg", "plugins/aniworld/plugin.json")
CAPABILITY_OPERATIONS = {
    "entity.list": "listEntities",
    "search.local": "search",
    "feed.local": "listFeed",
    "entity.details": "getEntity",
}
FORBIDDEN_SOURCE_TOKENS = (
    "DownloadManager",
    "AVPlayer",
    "fetch(",
    "XMLHttpRequest",
    "URLSession",
    "eval(",
)


def require(condition: bool, message: str) -> None:
    if not condition:
        raise SystemExit(f"Foundation validation failed: {message}")


def field(block: str, name: str) -> str:
    match = re.search(rf'(?<![\w]){re.escape(name)}:\s*"([^\"]+)"', block)
    require(match is not None, f"fixture/provider is missing {name}")
    return match.group(1)


def validate_sources() -> tuple[dict, str, bytes]:
    manifest_bytes = (SOURCE / "script.json").read_bytes()
    manifest = json.loads(manifest_bytes)
    code_bytes = (SOURCE / "index.tsx").read_bytes()
    code = code_bytes.decode("utf-8")
    readme_bytes = (SOURCE / "README.md").read_bytes()
    hero_art = SOURCE / "assets" / "hero.jpg"
    plugin_path = SOURCE / "plugins" / "aniworld" / "plugin.json"
    plugin_bytes = plugin_path.read_bytes()
    aniworld_plugin = json.loads(plugin_bytes)

    require(hero_art.is_file(), "local hero artwork is required")
    require(aniworld_plugin.get("id") == "aniworld", "AniWorld plugin scaffold ID is required")
    require(aniworld_plugin.get("host") == "aniworld.to", "AniWorld plugin host must be explicit")
    require(aniworld_plugin.get("status") == "disabled", "AniWorld plugin scaffold must remain disabled")
    require(aniworld_plugin.get("capabilities") == [], "disabled AniWorld scaffold must declare no active capabilities")
    require(aniworld_plugin.get("networkEnabled") is False, "AniWorld scaffold must not enable network access")
    require(aniworld_plugin.get("streamResolutionEnabled") is False, "AniWorld scaffold must not resolve streams")
    require(aniworld_plugin.get("downloadsEnabled") is False, "AniWorld scaffold must not enable downloads")
    require('"aniworld.to"' in code and '"deaktiviert"' in code, "disabled AniWorld scaffold must be disclosed in the app")
    require('Path.join(Script.directory, "assets/hero.jpg")' in code, "hero artwork must be loaded from the packaged local asset")
    require(manifest.get("name") == "UNIVERSE", "manifest name must be UNIVERSE")
    require(manifest.get("entry") == "index.tsx", "manifest entry must be index.tsx")
    require(manifest.get("runInApp") is True, "manifest runInApp must be true")
    require(manifest.get("permissions") is None, "foundation manifest must not request permissions")
    require(manifest.get("version") is not None, "manifest version is required")
    require(f'const APP_VERSION = "{manifest["version"]}"' in code, "manifest and app versions differ")
    require("<GeometryReader>" in code and "Math.max(1, Math.floor(proxy.size.width))" in code,
            "root layout must floor the available GeometryReader presentation width")
    require("Math.max(1, viewportWidth - 36)" in code,
            "root content width must reserve both 18-point horizontal gutters")
    geometry_position = code.index("<GeometryReader>")
    navigation_position = code.find('<NavigationStack frame={{ width: viewportWidth }} clipped>')
    scroll_position = code.find('<ScrollView navigationTitle=', navigation_position)
    require(geometry_position < navigation_position < scroll_position,
            "GeometryReader must measure the presentation before NavigationStack and ScrollView are laid out")
    require('frame={{ width: viewportWidth }} clipped scrollClipDisabled={false}' in code,
            "outer vertical scroll view must be width-bound to and clipped at the measured viewport")
    require('padding={{ horizontal: 18, top: 14, bottom: 34 }} frame={{ width: viewportWidth }}' in code,
            "root content must use the measured viewport width with its padding inside that frame")
    require('const ROOT_SCREENS = ["home", "explore", "search", "feeds", "library"] as const' in code
            and 'type RootScreen = typeof ROOT_SCREENS[number]' in code
            and 'function asRootScreen(value: RootScreen): RootScreen {' in code
            and 'const selectedTab = useObservable(asRootScreen(ROOT_SCREENS[0]))' in code
            and '<TabView\n            selection={selectedTab}\n            toolbarBackgroundVisibility={{ visibility: "hidden", bars: ["tabBar"] }}' in code,
            "native TabView selection must infer the explicit five-screen union and hide the tab-bar background")
    tab_values = re.findall(r'<Tab title="[^"]+" systemImage="[^"]+" value="([^"]+)">', code)
    require(tab_values == ["home", "explore", "search", "feeds", "library"]
            and all(f'renderTabPage("{tab}")' in code for tab in tab_values),
            "native bottom bar must use five literal, type-safe destinations and matching pages")
    require('Button title="Info" systemImage="info.circle"' in code,
            "Info/settings must remain available outside the five-item native tab bar")
    require('padding={12} frame={{ width: contentWidth }}' in code and 'const textWidth = Math.max(1, contentWidth - 113)' in code,
            "compact cards must keep thumbnail, spacing, padding, and text inside their measured row width")
    horizontal_scrolls = code.count('<ScrollView axes="horizontal"')
    bounded_horizontal_scrolls = code.count('frame={{ width: contentWidth }} clipped scrollClipDisabled={false}>')
    require(horizontal_scrolls == bounded_horizontal_scrolls,
            "every horizontal scroll region must use the measured content width and remain clipped")
    require('Viewport: {viewportWidth} · Inhaltsrahmen: {contentWidth}' in code,
            "Info screen must expose the measured widths for on-device overflow diagnosis")
    require('maxWidth: "infinity"' not in code,
            "layout must not contain unbounded max-width frames")
    require('const [exploreFilterIndex, setExploreFilterIndex] = useState(0)' in code
            and 'const [searchFilterIndex, setSearchFilterIndex] = useState(0)' in code
            and 'const exploreFilter = CONTENT_FILTERS[exploreFilterIndex]' in code
            and 'const searchFilter = CONTENT_FILTERS[searchFilterIndex]' in code
            and 'const exploreResults = listedEntities.filter(entity => matchesFilter(entity, exploreFilter))' in code
            and 'const exploreFilterCounts = CONTENT_FILTERS.map(filter => listedEntities.filter(entity => matchesFilter(entity, filter)).length)' in code
            and 'exploreResults.map((entity, index) => compactCard(entity, index, contentWidth))' in code
            and 'Keine Inhalte in „{exploreFilter}“' in code
            and 'action={() => setExploreFilterIndex(index)}' in code
            and 'action={() => setSearchFilterIndex(index)}' in code
            and '.flatMap(provider => provider.search(query, searchFilter))' in code
            and 'action={() => setExploreFilterIndex(0)}' in code,
            "Explore must filter the complete catalog, count/recover results, and remain independent from Search state")
    require('const [feedFilterIndex, setFeedFilterIndex] = useState(0)' in code
            and 'const visibleFeedItems = feedItems.filter(entity => matchesFilter(entity, feedFilter))' in code
            and 'visibleFeedItems.map((entity, index) => compactCard(entity, index, contentWidth))' in code,
            "chronological feed must apply the selected local content-type filter")
    require('type LibraryState = {' in code
            and 'scope: "private" | "session"' in code
            and 'entityIds: string[]' in code
            and 'const [libraryState, setLibraryState] = useState<LibraryState>(initialLibraryState)' in code
            and 'const storedValue = Storage.get<unknown>(LIBRARY_STORAGE_KEY)' in code
            and 'initialLibraryState = loadLibraryState()' in code,
            "Library must load a validated private-storage state with an explicit session fallback")
    require('const LIBRARY_STORAGE_KEY = "universe.library.entity-ids.v1"' in code
            and 'value.length > MAX_STORED_LIBRARY_ITEMS' in code
            and 'item.length <= MAX_STORED_LIBRARY_ID_LENGTH' in code
            and 'const validatedEntityIds = parseStoredLibraryIds(nextEntityIds)' in code
            and 'Storage.set(LIBRARY_STORAGE_KEY, validatedEntityIds)' in code
            and 'if (libraryState.scope === "private")' in code
            and 'shared: true' not in code,
            "Library persistence must validate bounded IDs and remain in the script-private storage domain")
    require('const savedEntities = libraryState.entityIds\n    .map(id => listedEntities.find(entity => entity.id === id))' in code
            and 'const visibleSavedEntities = savedEntities.filter(entity => matchesFilter(entity, libraryFilter))' in code
            and 'privater Scripting-Speicher' in code
            and 'Button title="Aus Merkliste entfernen"' in code
            and 'action={() => toggleSaved(entity.id)}' in code,
            "Library must retain save order, disclose storage scope, and support direct removal")
    require(code.count('CONTENT_FILTERS.map((filter, index) => <Button') == 4
            and 'const visibleSavedEntities = savedEntities.filter(entity => matchesFilter(entity, libraryFilter))' in code
            and 'const libraryFilterCounts = CONTENT_FILTERS.map(filter => savedEntities.filter(entity => matchesFilter(entity, filter)).length)' in code
            and 'action={() => setLibraryFilterIndex(index)}' in code
            and 'Alle Inhalte anzeigen' in code,
            "Explore, Search, Feeds, and Library must expose the shared type filters and a recoverable empty state")
    require('entity.id !== selectedEntity.id && (entity.category === selectedEntity.category || entity.typeId === selectedEntity.typeId)' in code
            and 'contentRail("Ähnliche Demo-Inhalte", relatedItems, contentWidth' in code,
            "detail recommendations must be local, related by category/type, and labeled as demo content")

    for token in FORBIDDEN_SOURCE_TOKENS:
        require(token not in code, f"deferred/network token present in app source: {token}")

    declaration = re.search(r"type CapabilityId = ([^\n]+)", code)
    require(declaration is not None, "CapabilityId union is required")
    declared = set(re.findall(r'"([^\"]+)"', declaration.group(1)))
    require(declared == set(CAPABILITY_OPERATIONS), "CapabilityId union and validator contract differ")

    provider_array = re.search(r"const PROVIDERS: StaticProvider\[\] = \[(.*?)\n\]", code, re.DOTALL)
    require(provider_array is not None, "static provider registry is required")
    provider_blocks = re.findall(r"(?ms)^  \{\n(.*?)(?=^  \},?$)", provider_array.group(1))
    require(provider_blocks, "static provider registry must contain a provider")

    provider_ids: set[str] = set()
    provider_names: dict[str, str] = {}
    for provider in provider_blocks:
        provider_id = field(provider, "id")
        provider_name = field(provider, "name")
        provider_ids.add(provider_id)
        provider_names[provider_id] = provider_name
        capability_match = re.search(r"capabilities:\s*\[([^\]]*)\]", provider)
        require(capability_match is not None, f"provider {provider_id} has no capability list")
        capabilities = re.findall(r'"([^\"]+)"', capability_match.group(1))
        require(len(capabilities) == len(set(capabilities)), f"provider {provider_id} has duplicate capabilities")
        require(set(capabilities) <= declared, f"provider {provider_id} declares an unknown capability")
        for capability in capabilities:
            operation = CAPABILITY_OPERATIONS[capability]
            require(f'{operation}:' in provider, f"provider {provider_id} declares {capability} without {operation}")
            require(f'capabilities.includes("{capability}")' in code, f"{capability} has no capability gate")
            require(f"provider.{operation}(" in code, f"{capability} operation is not dispatched through the registry")
    require(len(provider_ids) == len(provider_blocks), "provider IDs must be unique")

    fixture_start = "const ENTITIES: UniverseEntity[] = ["
    require(fixture_start in code, "local fixture entity list is required")
    fixture_section = code.split(fixture_start, 1)[1].split("\n]\n", 1)[0]
    entity_blocks = re.findall(r"(?ms)^  \{\n(.*?)(?=^  \},?$)", fixture_section)
    require(entity_blocks, "fixture catalog must contain entities")
    entity_ids: set[str] = set()
    for entity in entity_blocks:
        entity_id = field(entity, "id")
        entity_type = field(entity, "typeId")
        provider_id = field(entity, "providerId")
        provider_name = field(entity, "providerName")
        entity_ids.add(entity_id)
        require(entity_type in {"media.video", "news.article", "event.release"}, f"unsupported fixture type {entity_type}")
        require(provider_id in provider_ids, f"fixture {entity_id} references unknown provider {provider_id}")
        require(provider_name == provider_names[provider_id], f"fixture {entity_id} source name does not match provider registry")
        published_at = field(entity, "publishedAt")
        retrieved_at = field(entity, "retrievedAt")
        for value in (published_at, retrieved_at):
            try:
                datetime.fromisoformat(value.replace("Z", "+00:00"))
            except ValueError as error:
                raise SystemExit(f"Foundation validation failed: fixture {entity_id} has invalid ISO date {value}") from error
    require(len(entity_ids) == len(entity_blocks), "fixture entity IDs must be unique")
    return manifest, code, readme_bytes


def validate_package(manifest: dict, code: str, readme_bytes: bytes) -> None:
    require(PACKAGE.is_file(), "build UNIVERSE.scripting before package validation")
    source_bytes = {
        "script.json": (SOURCE / "script.json").read_bytes(),
        "index.tsx": code.encode("utf-8"),
        "README.md": readme_bytes,
        "assets/hero.jpg": (SOURCE / "assets" / "hero.jpg").read_bytes(),
        "plugins/aniworld/plugin.json": (SOURCE / "plugins" / "aniworld" / "plugin.json").read_bytes(),
    }
    with ZipFile(PACKAGE) as archive:
        require(archive.testzip() is None, "package ZIP CRC check failed")
        require(tuple(archive.namelist()) == PACKAGE_FILES, "package root file list differs from contract")
        packaged_manifest = json.loads(archive.read("script.json"))
        require(packaged_manifest == manifest, "packaged manifest differs from source manifest")
        for name, content in source_bytes.items():
            require(archive.read(name) == content, f"package/source byte parity failed for {name}")


def main() -> None:
    manifest, code, readme_bytes = validate_sources()
    validate_package(manifest, code, readme_bytes)
    print("UNIVERSE static manifest, capability/provider, fixture, and package checks: PASS")


if __name__ == "__main__":
    main()
