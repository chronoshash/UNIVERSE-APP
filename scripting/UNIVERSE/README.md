# UNIVERSE Scripting foundation · 0.5.3

Version 0.5.3 fixes a width-ordering bug visible on device: horizontal padding had been added after the maximum-width frame, making the padded root and cards wider than their viewport. Padding now sits inside the width constraint on the root, navigation chips, compact cards, featured overlay, and information panels. The top navigation remains a two-column grid, the local showcase has twelve demo entries, and the null-safe child and literal-preserving gradient color fixes are retained. Device layout still needs rechecking.

The interface uses a statically bundled fixture provider and an original local hero image in `assets/hero.jpg`, loaded from `Script.directory`. It makes no live provider calls or network requests.

## Included

- Home, Explore, Search, Feeds, a session-only Library, Info, and content details.
- Local demo media, articles, and events with visible source attribution.
- Capability-gated entity listing, cross-type search, feed listing, and detail lookup.
- A disabled AniWorld plugin scaffold at `plugins/aniworld/plugin.json`, also disclosed in Info. It declares no capabilities and has network access, stream resolution, and downloads disabled. It is not a functional AniWorld integration.
- A session-only saved-items list; it is not presented as persistent storage.
- No accounts, database, downloads, video playback, dynamic plugins, or live AniWorld access.

All entries are sample data, not live news, real media, or actual release dates. UNIVERSE is not yet a streaming service.

## Deliberately deferred

The DownloadManager from the earlier 0.3.0 experiment is not part of this foundation. The AniWorld scaffold is intentionally inactive. Any future connector is limited to permitted metadata work and must pass source-policy, contract, and on-device compatibility checks first; no stream resolution, access-control bypass, or downloads are included.

## Build and import

Rebuild after any change to a Scripting source, packaged asset, plugin descriptor, or this README:

```sh
python3 tools/build_scripting_package.py
python3 tools/validate_scripting_foundation.py
```

The generated `UNIVERSE.scripting` ZIP contains `script.json`, `index.tsx`, this README, `assets/hero.jpg`, and the disabled AniWorld plugin descriptor. Package structure and byte parity can be checked locally; import, UI rendering, and runtime in Scripting on a target iPhone have not been verified.
