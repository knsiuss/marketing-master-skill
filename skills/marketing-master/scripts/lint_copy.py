#!/usr/bin/env python3
import re
import sys
from pathlib import Path

BANNED_WORDS = [
    "unlock", "revolutionize", "game-changer", "seamless", "elevate",
    "delve", "supercharge", "in today's fast-paced world", "cutting-edge",
    "tapestry", "leverage", "synergy", "unleash", "next-level"
]

def lint_file(filepath: str) -> int:
    text = Path(filepath).read_text(encoding="utf-8")
    lower = text.lower()
    errors = []

    for word in BANNED_WORDS:
        if re.search(rf"\b{re.escape(word)}\b", lower):
            errors.append(f"[SLOP WORD] Found banned term: '{word}'")

    em_dash_count = text.count("—")
    if em_dash_count > 6:
        errors.append(f"[STYLE] Too many em-dashes ({em_dash_count}). Max allowed: 6.")

    sentences = [s.strip() for s in re.split(r"[.!?]\s+", text) if s.strip()]
    long_sentences = [s for s in sentences if len(s.split()) > 28 and not s.startswith("#")]
    if len(long_sentences) > 3:
        errors.append(f"[RHYTHM] {len(long_sentences)} sentences exceed 28 words. Cut fluff.")

    if errors:
        print(f"LINT FAILED for {filepath}:")
        for e in errors:
            print(f"  - {e}")
        return 1

    print(f"LINT PASSED: {filepath} (0 slop issues)")
    return 0

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 lint_copy.py <markdown-file>")
        sys.exit(2)
    sys.exit(lint_file(sys.argv[1]))
