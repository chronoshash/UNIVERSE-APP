#!/usr/bin/env python3
"""Build a deterministic Scripting project ZIP with the .scripting extension."""

from __future__ import annotations

import json
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "scripting" / "UNIVERSE"
OUTPUT = ROOT / "UNIVERSE.scripting"
FILES = ("script.json", "index.tsx", "README.md", "assets/hero.jpg", "plugins/aniworld/plugin.json")


def main() -> None:
    manifest = json.loads((SOURCE / "script.json").read_text(encoding="utf-8"))
    if manifest.get("entry") != "index.tsx":
        raise SystemExit("script.json entry must point to index.tsx")
    if not manifest.get("name") or not manifest.get("version"):
        raise SystemExit("script.json must contain name and version")

    missing = [name for name in FILES if not (SOURCE / name).is_file()]
    if missing:
        raise SystemExit(f"Missing package source files: {', '.join(missing)}")

    temporary = OUTPUT.with_suffix(".scripting.tmp")
    try:
        with ZipFile(temporary, "w", compression=ZIP_DEFLATED, compresslevel=9) as archive:
            for name in FILES:
                info = ZipInfo(name, date_time=(1980, 1, 1, 0, 0, 0))
                info.compress_type = ZIP_DEFLATED
                info.external_attr = 0o100644 << 16
                archive.writestr(info, (SOURCE / name).read_bytes())
        temporary.replace(OUTPUT)
    finally:
        temporary.unlink(missing_ok=True)

    print(f"Built {OUTPUT.relative_to(ROOT)} ({OUTPUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
