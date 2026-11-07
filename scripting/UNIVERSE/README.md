# UNIVERSE Scripting foundation · 0.5.1

Version 0.5.1 tightens the cinematic catalogue layout for narrow screens and fixes the Scripting color/conditional typing issues. The UI uses a dark featured story, horizontal content rails, illustrated poster cards, compact navigation chips, search, and content details.

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
