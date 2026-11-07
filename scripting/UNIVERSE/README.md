# UNIVERSE Scripting foundation · 0.5.14

Version 0.5.14 continues the Foundation work from 0.5.13. It retains the native five-tab navigation, literal `Tab` destinations, and a `RootScreen` union derived from one constant tuple. The `asRootScreen` helper supplies the full union to `useObservable`, avoiding a narrowed selection type. The documented `toolbarBackgroundVisibility` modifier still hides the native `tabBar` background. These source-level choices address the reported selection type mismatch; it has not been independently reproduced against the installed Scripting app declarations. The actual transparent appearance remains unverified on an iPhone.

The Library uses the documented private `Storage` key-value domain for a small ordered list of entity IDs, under `universe.library.entity-ids.v1`. It does not save full entities, personal notes, media, or shared-domain values. Stored input is bounded to 500 IDs (256 characters each), validated, and de-duplicated before use. If private storage is unavailable or the saved value is invalid, the app falls back to session-only state and shows a warning; failed writes leave the prior list visible. The Scripting documentation says writes are persisted asynchronously. Import, storage persistence, and recovery behavior still need testing in the installed app.

Explore now has its own content-type selection, separate from Search. Each chip shows the matching catalog count, and the selection applies to the entire vertical results list rather than leaving an unfiltered “all items” rail below it. If a future catalog has no results for a type, the empty state can reset to all items.

The Library has separate content-type filters for all items, media, articles, and events. Each filter displays its matching saved-item count; filtering preserves save order. If a non-empty Library has no items for the selected type, a clear empty state offers a one-tap return to all items. The genuinely empty Library continues to guide users toward Explore. Direct removal remains available beside each saved item. These are presentation changes only: the private storage key, bounded ordered-ID value, and entity schema are unchanged.

The 0.5.6 viewport/content-width layout (which the user reports now works), cross-type foundation, 0.5.7 feed filters, local detail suggestions, direct Library removal, five native tabs, and transparent-background request are retained.

All content remains bundled demo fixtures. There are no live providers, network requests, dynamic plugins, downloads, or video playback. AniWorld remains a disabled scaffold.

## Included

- Five native tabs: Start, Explore, Search, Feeds, and Library.
- A shared literal screen tuple and corresponding `RootScreen` union with a type-inferred observable selection.
- Transparent native tab-bar background using the documented `toolbarBackgroundVisibility` modifier.
- An explicitly private, persistent Scripting Storage value containing ordered Library entity IDs only, with bounded/validated loading, session fallback, visible scope/count, and direct removal.
- Separate Library content-type filters with per-filter counts, order-preserving results, and an empty-filter recovery action.
- Info/settings reachable from a top-level button.
- Local demo media, articles, and events with visible source attribution.
- Capability-gated entity listing, cross-type search, feed listing, and detail lookup.
- Independent content-type filters in Explore, Search, and Feeds; Explore shows per-type catalog counts and filters its entire results list.
- Related demo-content rails on detail pages, based only on category or content type.
- Original local hero image in `assets/hero.jpg`, loaded from `Script.directory`.
- No accounts, database, network providers, downloads, video playback, dynamic plugins, or live AniWorld access.

All entries are sample data, not live news, real media, or actual release dates. UNIVERSE is not yet a streaming service. App import, native rendering, and actual persistence in Scripting have not been verified by the project.

## Build and import

Rebuild after any change to a Scripting source, packaged asset, plugin descriptor, or this README:

```sh
python3 tools/build_scripting_package.py
python3 tools/validate_scripting_foundation.py
```

The generated `UNIVERSE.scripting` ZIP contains `script.json`, `index.tsx`, this README, `assets/hero.jpg`, and the disabled AniWorld plugin descriptor. Package structure and byte parity can be checked locally; native-tab rendering, app import, persistent Storage behavior, and runtime in Scripting on a target iPhone have not been verified by the project.
