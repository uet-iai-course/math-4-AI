#!/usr/bin/env python3
"""Sync local lecture materials into a single JS snapshot for file:// viewing.

Scans <repo>/materials/lec-[0-9][0-9]/lecture-note.md and exercises.md
(real files only, no symlinks) and generates
<repo>/material-local-data.js containing:

    window.LOCAL_MATERIALS = Object.freeze({...});

Keys are repo-relative POSIX paths, values are the raw Markdown content.

Usage:
    python3 scripts/sync-local-materials.py          # write if changed
    python3 scripts/sync-local-materials.py --check  # verify only, exit 1 on drift

This script is auto-generated tooling: run
    python3 scripts/sync-local-materials.py
after editing any materials/lec-XX/*.md file to refresh the snapshot.

Stdlib only. No network access. No .env reading.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

TERMDIR = Path(__file__).resolve().parents[1]
OUTPUT_PATH = TERMDIR / "material-local-data.js"
HEADER_LINES = (
    "// AUTO-GENERATED FILE - DO NOT EDIT BY HAND.",
    "// Regenerate with: python3 scripts/sync-local-materials.py",
    "// Snapshot of materials/lec-[0-9][0-9]/lecture-note.md and exercises.md",
    "// for offline file:// viewing; over HTTP the raw Markdown is fetched instead.",
)
MATERIALS_DIR = TERMDIR / "materials"
BASENAMES = ("lecture-note.md", "exercises.md")


def collect_materials() -> dict[str, str]:
    """Return {relative_posix_path: raw_markdown} for real (non-symlink) files."""
    result: dict[str, str] = {}
    if not MATERIALS_DIR.is_dir():
        return result
    for lec_dir in sorted(MATERIALS_DIR.iterdir()):
        if not lec_dir.is_dir() or lec_dir.is_symlink():
            continue
        name = lec_dir.name
        # lec-[0-9][0-9]
        if not (
            name.startswith("lec-")
            and len(name) == 6
            and name[4].isdigit()
            and name[5].isdigit()
        ):
            continue
        for base in BASENAMES:
            f = lec_dir / base
            if not f.is_file() or f.is_symlink():
                continue
            rel = f.relative_to(TERMDIR).as_posix()
            result[rel] = f.read_text(encoding="utf-8")
    return result


def build_output(materials: dict[str, str]) -> str:
    payload = json.dumps(
        materials, ensure_ascii=True, sort_keys=True, indent=2
    )
    header = "\n".join(HEADER_LINES)
    return f"{header}\nwindow.LOCAL_MATERIALS = Object.freeze({payload});\n"


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Generate material-local-data.js snapshot for file:// viewing."
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="Verify the snapshot matches; exit 1 and print guidance on drift. No writes.",
    )
    args = parser.parse_args()

    materials = collect_materials()
    expected = build_output(materials).encode("utf-8")

    current: bytes | None = None
    exists = OUTPUT_PATH.is_file() and not OUTPUT_PATH.is_symlink()
    if exists:
        current = OUTPUT_PATH.read_bytes()

    if current == expected:
        print(f"OK: {OUTPUT_PATH.relative_to(TERMDIR)} is up to date "
              f"({len(materials)} file(s)).")
        return 0

    if args.check:
        print("MISMATCH: material-local-data.js is missing or out of date.", file=sys.stderr)
        print("Run: python3 scripts/sync-local-materials.py", file=sys.stderr)
        return 1

    tmp = OUTPUT_PATH.with_suffix(".js.tmp")
    tmp.write_bytes(expected)
    os.replace(tmp, OUTPUT_PATH)
    print(f"Wrote {OUTPUT_PATH.relative_to(TERMDIR)} "
          f"({len(materials)} file(s), {len(expected)} bytes).")
    return 0


if __name__ == "__main__":
    sys.exit(main())