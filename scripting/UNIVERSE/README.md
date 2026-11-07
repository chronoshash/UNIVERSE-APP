# UNIVERSE Scripting foundation · 0.4.0

This release establishes the app shell before any download manager is added. The German UI provides Home, Explore, Search, Feeds, a session-only Library and Info. A single statically bundled fixture provider supplies example media, articles and events through capability-gated entity listing, local search, feed listing and detail lookup.

## Included

- A compact global navigation shell for the first UNIVERSE sections.
- Cross-type local search with a type filter, clear-search action and explicit empty state.
- A chronological fixture feed; content cards and details show their source and retrieval date.
- A session-only saved-items list. It is intentionally not presented as persistent storage.
- A static capability registry. No provider code is downloaded or dynamically imported.
- No network requests, user accounts, database, downloads, video playback, or AniWorld integration.

All sample entries are marked as demo data. They are not live news, real media, actual release dates, or claims about an external provider.

## Deliberately deferred

The DownloadManager from the earlier 0.3.0 experiment is not part of this foundation. It will be reconsidered only after the app shell, entity/source contracts, static provider validation, persistence boundary, and on-device Scripting compatibility are in place. No Sora code or runtime dependency is included.

## Build and import

Rebuild the package after any change to a Scripting source file or this README:

```sh
python3 tools/build_scripting_package.py
```

The generated `UNIVERSE.scripting` is a ZIP containing `script.json`, `index.tsx`, and this README at its root. ZIP and source parity can be checked locally; import and runtime in Scripting on a target iPhone have not been verified.
