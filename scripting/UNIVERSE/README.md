# UNIVERSE Scripting foundation · 0.5.8

Version 0.5.8 replaces the custom top chip strip with the documented native Scripting `TabView`/`Tab` bottom navigation. It provides five primary destinations: Start, Entdecken, Suche, Neu, and Merkliste. Info remains reachable from the header, keeping the native bar focused and avoiding a sixth overflow/More item. Each primary tab owns its own `NavigationStack` and measured-width content page; detail and Info screens return to the tab that opened them.

The 0.5.6 viewport/content-width layout (which the user reports now works) and the 0.5.7 feed filters and local detail suggestions are retained. The new native tab navigation is documented by Scripting but has not been independently imported or tested in the Scripting app on an iPhone.

All content remains bundled demo fixtures. There are no live providers, network requests, dynamic plugins, downloads, or video playback. AniWorld remains a disabled scaffold.

## Included

- Five native tabs: Start, Explore, Search, Feeds, and a session-only Library.
- Info/settings reachable from a top-level button.
- Local demo media, articles, and events with visible source attribution.
- Capability-gated entity listing, cross-type search, feed listing, and detail lookup.
- Separate content-type filters in Explore, Search, and Feeds.
- Related demo-content rails on detail pages, based only on category or content type.
- Original local hero image in `assets/hero.jpg`, loaded from `Script.directory`.
- No accounts, database, downloads, video playback, dynamic plugins, or live AniWorld access.

All entries are sample data, not live news, real media, or actual release dates. UNIVERSE is not yet a streaming service.

## Build and import

Rebuild after any change to a Scripting source, packaged asset, plugin descriptor, or this README:

```sh
python3 tools/build_scripting_package.py
python3 tools/validate_scripting_foundation.py
```

The generated `UNIVERSE.scripting` ZIP contains `script.json`, `index.tsx`, this README, `assets/hero.jpg`, and the disabled AniWorld plugin descriptor. Package structure and byte parity can be checked locally; native-tab rendering, app import, and runtime in Scripting on a target iPhone have not been verified by the project.
