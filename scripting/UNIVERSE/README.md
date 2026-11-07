# UNIVERSE Scripting foundation · 0.5.7

Version 0.5.7 builds on the viewport/content-width layout in 0.5.6. The user reports that the width now works; this is user feedback, not an independent Scripting-app/iPhone runtime test by the project. This release focuses on cross-type discovery: the chronological feed now has its own media/article/event filters, and detail pages show local related-content suggestions based on matching category or content type.

All feed entries and suggestions are derived only from the bundled demo fixtures. Recommendation criteria are disclosed in the UI; no live data, ranking service, or network request is involved. The 0.5.6 clipping, measured widths, compact horizontal navigation, and Info diagnostics are retained.

The interface uses an original local hero image in `assets/hero.jpg`, loaded from `Script.directory`.

## Included

- Home, Explore, Search, Feeds, a session-only Library, Info, and content details.
- Local demo media, articles, and events with visible source attribution.
- Capability-gated entity listing, cross-type search, feed listing, and detail lookup.
- Separate content-type filters in Explore, Search, and Feeds.
- Related demo-content rails on detail pages, based only on category or content type.
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

The generated `UNIVERSE.scripting` ZIP contains `script.json`, `index.tsx`, this README, `assets/hero.jpg`, and the disabled AniWorld plugin descriptor. Package structure and byte parity can be checked locally; import, UI rendering, and runtime in Scripting on a target iPhone have not been verified by the project.
