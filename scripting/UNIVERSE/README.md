# UNIVERSE Scripting foundation · 0.5.0

Version 0.5.0 turns the first shell into a cinematic, dark content-discovery experience: a full-width featured story, horizontal editorial rails, illustrated poster cards, compact navigation chips, and a clear detail view. The look borrows familiar streaming-catalogue patterns without copying Netflix or Sora assets or code.

The interface still runs only on a statically bundled fixture provider. The featured artwork is an original local image in `assets/hero.jpg`; it is packaged with the script and loaded from `Script.directory`. No remote images, live provider calls, or network requests are used.

## Included

- Home, Explore, Search, Feeds, a session-only Library, Info, and content details.
- Local demo media, articles, and events with visible source attribution.
- Capability-gated entity listing, cross-type search, feed listing, and detail lookup.
- A local hero artwork and stylized poster cards; artwork is illustrative demo UI, not live media.
- A session-only saved-items list; it is not presented as persistent storage.
- No accounts, database, downloads, video playback, dynamic plugins, or AniWorld integration.

All entries are sample data, not live news, real media, or actual release dates. UNIVERSE is not yet a streaming service.

## Deliberately deferred

The DownloadManager from the earlier 0.3.0 experiment is not part of this foundation. It will be reconsidered only after the app shell, entity/source contracts, static provider validation, persistence boundary, and on-device Scripting compatibility are in place.

## Build and import

Rebuild after any change to a Scripting source, packaged asset, or this README:

```sh
python3 tools/build_scripting_package.py
python3 tools/validate_scripting_foundation.py
```

The generated `UNIVERSE.scripting` ZIP contains `script.json`, `index.tsx`, this README, and `assets/hero.jpg`. Package structure and byte parity can be checked locally; import, UI rendering, and runtime in Scripting on a target iPhone have not been verified.
