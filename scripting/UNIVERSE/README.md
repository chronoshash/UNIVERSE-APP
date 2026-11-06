# UNIVERSE Scripting prototype · 0.3.0

A deliberately small, standalone Scripting script for organizing user-provided direct video downloads and playing completed local files. The German UI keeps the main actions clear and adds title search in Downloads and the offline library, plus a simple category filter. Empty categories are hidden. Sora informed these UX choices only; no Sora code or runtime dependency is included.

The script uses the documented Scripting `DownloadManager`, `FileManager`, `AVPlayer` and `VideoPlayer` interfaces. Availability in a particular installed Scripting build, any Pro requirement, import, rendering and iPhone runtime remain unverified.

## Current scope

- Enter an HTTPS URL, a display title and one fixed category: Anime, Filme, Serien or Sonstiges.
- The URL path must end in `.mp4`, `.m4v` or `.mov`. This is only a suffix filter: response content and codec are not independently checked. Use only direct files you are authorized to save offline; web pages, playlists, DRM and access-control workarounds are out of scope.
- Search the download queue by display title. Completed, locally existing files appear in the library, where they can be searched by title and filtered by category.
- A persistent queue targets `Documents/UNIVERSE/Offline/<category>/…`. It is configured foreground-only and with cellular access disabled. Transfers are expected to pause when Scripting backgrounds; no background worker is implemented.
- Playback is requested from the local path. iOS codec support and audio-session behavior need device testing.
- Deletion requires a second tap. The queue API is asked to delete only its own completed output; no unrelated file path is deleted by app code.

The native queue persists the source URL to support resuming. Avoid confidential access tokens in URLs. AniWorld is only an external link and has no stream extraction or downloader integration.

## Build and import

Rebuild the package after any change to a Scripting source file or this README:

```sh
python3 tools/build_scripting_package.py
```

The generated `UNIVERSE.scripting` is a ZIP with `script.json`, `index.tsx`, and this README at its root. Local ZIP and source-parity checks have passed; the recorded checks are in the repository's `TESTING.md`. Importing and running the script in Scripting on the target iPhone has not yet been tested.
