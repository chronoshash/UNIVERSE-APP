# UNIVERSE Scripting foundation · 0.5.10

Version 0.5.10 continues the Foundation work from 0.5.9. It keeps the native five-tab navigation and now declares each `<Tab>` with a literal, type-safe destination instead of mapping a generic navigation array into native tabs. Together with the explicitly typed `useObservable<RootScreen>` selection, this is the source-level correction for the reported TypeScript error at the `TabView` selection binding. The error has not been independently reproduced in the installed Scripting app.

The native tab bar keeps its five destinations while applying the documented `toolbarBackgroundVisibility` modifier to hide the `tabBar` background, so the background is transparent rather than an opaque system panel. This requests the documented appearance; actual rendering remains unverified in the Scripting app and on an iPhone.

The session-only Library still offers a direct remove action on each saved item, in addition to removing it from its detail page. Saved items do not persist across script sessions.

The 0.5.6 viewport/content-width layout (which the user reports now works), cross-type foundation, native tabs, 0.5.7 feed filters, and local detail suggestions are retained. The Scripting UI API and iPhone runtime remain unverified by the project.

All content remains bundled demo fixtures. There are no live providers, network requests, dynamic plugins, downloads, or video playback. AniWorld remains a disabled scaffold.

## Included

- Five native tabs: Start, Explore, Search, Feeds, and a session-only Library.
- Type-safe literal tab destinations and an explicitly typed selection observable.
- Transparent native tab-bar background using the documented `toolbarBackgroundVisibility` modifier.
- Info/settings reachable from a top-level button.
- Remove saved items directly from the Library, without implying persistence.
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
