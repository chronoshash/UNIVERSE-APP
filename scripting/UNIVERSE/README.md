# UNIVERSE Scripting foundation · 0.5.6

The user continues to report full-screen horizontal overflow after 0.5.3, 0.5.4, and 0.5.5. Version 0.5.6 takes a stricter layout approach: it floors the width measured by the root `GeometryReader`, uses an explicit content width after the 18-point side gutters, removes unbounded `maxWidth: infinity` frames, assigns that content width to every horizontal scroller and full-width card, and clips both `NavigationStack` and scroll views. The navigation is now a compact horizontal chip rail rather than a three-row grid. The Info screen exposes the measured viewport and content widths so an on-device import can confirm the package and measurement.

This is another targeted correction and diagnostic build, not a verified device fix. Import and rendering in Scripting on the target iPhone still need to be checked. The twelve local demo entries, null-safe optional JSX children, literal-preserving gradient colors, local-only provider, and disabled AniWorld scaffold are retained.

The interface uses an original local hero image in `assets/hero.jpg`, loaded from `Script.directory`. It makes no live provider calls or network requests.

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
