# UNIVERSE Scripting foundation · 0.5.11

Version 0.5.11 continues the Foundation work from 0.5.10. It keeps the native five-tab navigation, literal `Tab` destinations, and a `RootScreen` union derived from a single constant tuple. A small `asRootScreen` helper returns the seed as the full union before it reaches `useObservable`, preventing TypeScript from narrowing the mutable tab selection to only the initial `"home"` literal. The documented `toolbarBackgroundVisibility` modifier still hides the native `tabBar` background. These source-level choices address the reported selection type mismatch while retaining native tabs; the error has not been independently reproduced in the installed Scripting app, and the transparent appearance has not been verified on an iPhone.

The Library has an explicit `SessionLibraryState` contract with `scope: "session"` and ordered entity IDs. Saved items render in the order they were added, and the screen shows the count and session-only scope. This remains in-memory UI state: no persistence or storage API is in use. The state shape creates a clear boundary for a future storage review without claiming items survive script sessions.

The 0.5.6 viewport/content-width layout (which the user reports now works), cross-type foundation, 0.5.7 feed filters, local detail suggestions, direct Library removal, five native tabs, and transparent-background request are retained. The Scripting UI API and iPhone runtime remain unverified by the project.

All content remains bundled demo fixtures. There are no live providers, network requests, dynamic plugins, downloads, or video playback. AniWorld remains a disabled scaffold.

## Included

- Five native tabs: Start, Explore, Search, Feeds, and a session-only Library.
- A shared literal screen tuple and corresponding `RootScreen` union, with a type-inferred observable selection.
- Transparent native tab-bar background using the documented `toolbarBackgroundVisibility` modifier.
- Explicit session-scoped Library state, ordered by save action, with a visible item count and direct removal.
- Info/settings reachable from a top-level button.
- Local demo media, articles, and events with visible source attribution.
- Capability-gated entity listing, cross-type search, feed listing, and detail lookup.
- Separate content-type filters in Explore, Search, and Feeds.
- Related demo-content rails on detail pages, based only on category or content type.
- Original local hero image in `assets/hero.jpg`, loaded from `Script.directory`.
- No accounts, database, persistent storage, downloads, video playback, dynamic plugins, or live AniWorld access.

All entries are sample data, not live news, real media, or actual release dates. UNIVERSE is not yet a streaming service.

## Build and import

Rebuild after any change to a Scripting source, packaged asset, plugin descriptor, or this README:

```sh
python3 tools/build_scripting_package.py
python3 tools/validate_scripting_foundation.py
```

The generated `UNIVERSE.scripting` ZIP contains `script.json`, `index.tsx`, this README, `assets/hero.jpg`, and the disabled AniWorld plugin descriptor. Package structure and byte parity can be checked locally; native-tab rendering, app import, and runtime in Scripting on a target iPhone have not been verified by the project.
