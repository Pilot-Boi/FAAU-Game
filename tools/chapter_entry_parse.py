"""
Chapter entry parser utility.

How to use:
1. Provide prose either from a text file path or stdin.
2. Choose an interface with --interface: msg, scene, or cams.
3. Optional: add --speaker / --title / --discover-term / --set-flag / --require-event.
4. Output defaults to JS object literal; use --json for JSON output.
5. Generated output is always written to: tools/output_prose.js

Scene basics:
- Use --interface scene --type scene
- Optional but recommended: --title "SCENE TITLE"
- Supports inline speaker markers in prose: SPEAKER: Name

Cams basics:
- Use --interface cams --type scene
- Use --feed-id to set the camera feed key (for example: avian_cellblock)
- Add --title if you want an explicit camera scene title in output
- Cams output uses narration/dialogue blocks from prose, plus discovered terms/flags if provided

Examples (PowerShell):

# Parse a file into a msg reply entry
& ".venv/Scripts/python.exe" "tools/chapter_entry_parse.py" "tools/tmp_prose.txt" 
    --interface msg --type reply --speaker "EXAMPLE SPEAKER" 
    --require-event "example_event"
    --set-flag "flag_example"  --set-flag "another_flag"
    --discover-term "example_term" --discover-term "another_term"

# Parse a file into a scene entry
& ".venv/Scripts/python.exe" "tools/chapter_entry_parse.py" "tools/tmp_prose.txt"
    --interface scene --type scene --scene-id "scene_key" --title "SCENE TITLE"
    --require-event "example_event"
    --set-flag "flag_example"  --set-flag "another_flag"
    --discover-term "example_term" --discover-term "another_term"

# Parse a file into a cams scene entry
& ".venv/Scripts/python.exe" "tools/chapter_entry_parse.py" "tools/tmp_prose.txt"
    --interface cams --type scene --title "CAMERA LOCATION"
    --require-event "example_event"
    --set-flag "flag_example"  --set-flag "another_flag"
    --discover-term "example_term" --discover-term "another_term"
"""

import argparse
import json
import re
from dataclasses import dataclass
from pathlib import Path
from typing import List, Dict, Optional


QUOTE_PATTERN = re.compile(r'“([^”]+)”|"([^"]+)"')
SENTENCE_SPLIT_PATTERN = re.compile(r'(?<=[.!?…])\s+(?=[A-Z0-9“"])')
SPEAKER_MARKER_PATTERN = re.compile(r'^\s*SPEAKER\s*:\s*(.+?)\s*$', re.IGNORECASE)
OUTPUT_PATH = Path(__file__).resolve().parent / 'output_prose.js'


COMMON_SPEAKER_CUES = [
    " says ",
    " said ",
    " asks ",
    " asked ",
    " replies ",
    " replied ",
    " murmurs ",
    " murmured ",
    " whispers ",
    " whispered ",
    " mutters ",
    " muttered ",
    " growls ",
    " growled ",
    " purrs ",
    " purred ",
    " snaps ",
    " snapped ",
    " interrupts ",
    " interrupted ",
    " comments ",
    " commented ",
    " admits ",
    " admitted ",
]


VERB_TO_SPEAKER_PATTERN = re.compile(
    r'\b([A-Z][A-Za-z0-9_\-]*(?:\s+[A-Z][A-Za-z0-9_\-]*)*)\s+'
    r'(says|said|asks|asked|replies|replied|murmurs|murmured|whispers|whispered|mutters|muttered|growls|growled|purrs|purred|snaps|snapped|interrupts|interrupted|comments|commented|admits|admitted)\b'
)


@dataclass
class MessageMeta:
    sender: str
    body_lines: List[str]

@dataclass
class Config:
    interface: str
    entry_type: str
    feed_id: Optional[str]
    scene_id: Optional[str]
    require_event: Optional[str]
    sender: Optional[str]
    speaker: Optional[str]
    discover_terms: List[str]
    set_flags: List[str]
    title: Optional[str]
    indent: int = 12


def split_paragraphs(text: str) -> List[str]:
    return [p.strip() for p in re.split(r'\n\s*\n', text.strip()) if p.strip()]


def split_sentences(paragraph: str) -> List[str]:
    paragraph = re.sub(r'\s+', ' ', paragraph).strip()
    if not paragraph:
        return []
    return [s.strip() for s in SENTENCE_SPLIT_PATTERN.split(paragraph) if s.strip()]


def detect_speaker(text: str, fallback: Optional[str]) -> Optional[str]:
    match = VERB_TO_SPEAKER_PATTERN.search(text)
    if match:
        return match.group(1).strip()
    return fallback


def extract_dialogue_segments(paragraph: str) -> List[Dict[str, str]]:
    segments: List[Dict[str, str]] = []
    last_index = 0

    for match in QUOTE_PATTERN.finditer(paragraph):
        start, end = match.span()
        quoted = match.group(1) or match.group(2) or ""

        before = paragraph[last_index:start].strip()
        if before:
            segments.append({"type": "narration", "text": before})

        if quoted.strip():
            segments.append({"type": "dialogue", "text": quoted.strip()})

        last_index = end

    after = paragraph[last_index:].strip()
    if after:
        segments.append({"type": "narration", "text": after})

    if not segments:
        segments.append({"type": "narration", "text": paragraph.strip()})

    return segments


def clean_narration_fragment(text: str) -> str:
    text = re.sub(r'^[-—–\s]+', '', text.strip())
    return re.sub(r'\s+', ' ', text)


def capitalize_first_character(text: str) -> str:
    if not text:
        return text

    first = text[0]
    if first.isalpha():
        return first.upper() + text[1:]

    return text


def split_narration_lines(text: str) -> List[str]:
    lines: List[str] = []

    for raw_line in str(text).splitlines():
        cleaned = clean_narration_fragment(raw_line)
        if cleaned:
            lines.append(capitalize_first_character(cleaned))

    return lines


def normalize_line(text: str) -> str:
    return re.sub(r'\s+', ' ', text).strip()


def clean_dialogue_line(text: str) -> str:
    """Normalize dialogue and replace trailing commas with periods."""
    cleaned = normalize_line(text)
    if cleaned.endswith(','):
        cleaned = cleaned[:-1] + '.'
    return cleaned


def build_message_header_blocks(sender: str, body_lines: List[str]) -> List[Dict]:
    blocks: List[Dict] = []
    if sender:
        blocks.append({"type": "message_header", "sender": sender})
    if body_lines:
        blocks.append({"type": "message_body", "lines": body_lines})
    return blocks


def split_paragraph_with_speaker_markers(paragraph: str) -> List[Dict[str, str]]:
    segments: List[Dict[str, str]] = []
    text_lines: List[str] = []

    def flush_text_lines() -> None:
        nonlocal text_lines
        chunk = '\n'.join(text_lines).strip()
        if chunk:
            segments.append({"type": "text", "text": chunk})
        text_lines = []

    for raw_line in str(paragraph).splitlines():
        match = SPEAKER_MARKER_PATTERN.match(raw_line)
        if match:
            flush_text_lines()
            speaker_name = normalize_line(match.group(1))
            if speaker_name:
                segments.append({"type": "speaker", "speaker": speaker_name})
            continue

        text_lines.append(raw_line)

    flush_text_lines()
    return segments


def group_blocks(raw_blocks: List[Dict], speaker: Optional[str]) -> List[Dict]:
    grouped: List[Dict] = []

    first_content_block = next((block for block in raw_blocks if block and block.get("type")), None)

    if speaker and (not first_content_block or first_content_block.get("type") != "speaker"):
        grouped.append({"type": "speaker", "speaker": speaker})

    current_type: Optional[str] = None
    current_lines: List[str] = []

    def flush() -> None:
        nonlocal current_type, current_lines
        if current_type and current_lines:
            grouped.append({"type": current_type, "lines": current_lines[:]})
        current_type = None
        current_lines = []

    for block in raw_blocks:
        block_type = block["type"]

        if block_type == "speaker":
            flush()
            speaker_name = normalize_line(block.get("speaker", ""))
            if speaker_name:
                grouped.append({"type": "speaker", "speaker": speaker_name})
            continue

        text = normalize_line(block.get("text", ""))
        if not text and block_type in {"narration", "dialogue", "divider"}:
            continue

        if block_type not in {"narration", "dialogue"}:
            flush()
            grouped.append(block)
            continue

        if current_type == block_type:
            current_lines.append(text)
        else:
            flush()
            current_type = block_type
            current_lines = [text]

    flush()
    return grouped


def build_scene_blocks(prose: str, speaker: Optional[str], include_dividers: bool = True) -> List[Dict]:
    raw_blocks: List[Dict] = []
    paragraphs = split_paragraphs(prose)

    for i, paragraph in enumerate(paragraphs):
        for paragraph_segment in split_paragraph_with_speaker_markers(paragraph):
            if paragraph_segment["type"] == "speaker":
                raw_blocks.append({
                    "type": "speaker",
                    "speaker": paragraph_segment["speaker"]
                })
                continue

            for segment in extract_dialogue_segments(paragraph_segment["text"]):
                if segment["type"] == 'narration':
                    for narration_line in split_narration_lines(segment["text"]):
                        raw_blocks.append({"type": "narration", "text": narration_line})
                    continue

                if segment["type"] == 'dialogue':
                    cleaned = clean_dialogue_line(segment["text"])
                else:
                    cleaned = normalize_line(segment["text"])
                if cleaned:
                    raw_blocks.append({"type": segment["type"], "text": cleaned})

        if include_dividers and i < len(paragraphs) - 1:
            raw_blocks.append({"type": "divider", "text": "---"})

    return group_blocks(raw_blocks, speaker)


def parse_message_meta(text: str) -> tuple[str, Optional[MessageMeta]]:
    paragraphs = split_paragraphs(text)
    if len(paragraphs) < 2:
        return text.strip(), None

    first = paragraphs[0]
    second = paragraphs[1]

    if second.startswith("-") and len(second) < 120:
        sender = second.lstrip("- ").strip()
        remaining = "\n\n".join(paragraphs[2:]).strip()
        body_lines = [normalize_line(line) for line in first.splitlines() if normalize_line(line)]
        return remaining, MessageMeta(sender=sender, body_lines=body_lines)

    return text.strip(), None


def build_entry(config: Config, prose: str) -> Dict:
    remaining_text, message_meta = parse_message_meta(prose)
    speaker = config.speaker or detect_speaker(remaining_text, None)
    sender = config.sender or (message_meta.sender if message_meta else None)
    body_lines = message_meta.body_lines if message_meta else []

    blocks: List[Dict] = []
    if config.interface in {"msg", "scene"}:
        blocks.extend(build_message_header_blocks(sender or '', body_lines))

    blocks.extend(build_scene_blocks(
        remaining_text,
        speaker,
        include_dividers=(config.interface == 'scene')
    ))

    entry: Dict = {
        "interface": config.interface,
        "type": config.entry_type,
    }

    if config.feed_id:
        entry["feedId"] = config.feed_id

    if config.scene_id:
        entry["sceneId"] = config.scene_id

    if config.title:
        entry["title"] = config.title

    if config.require_event:
        entry["requireEvent"] = config.require_event

    if config.discover_terms:
        entry["discoverTerms"] = config.discover_terms

    if config.set_flags:
        entry["setFlags"] = config.set_flags

    entry["blocks"] = blocks

    return entry


def js_quote(text: str) -> str:
    escaped = text.replace('\\', '\\\\').replace("'", "\\'")
    return f"'{escaped}'"


def format_js_value(value, indent: int, level: int = 0) -> str:
    pad = ' ' * (indent * level)
    next_pad = ' ' * (indent * (level + 1))

    if isinstance(value, str):
        return js_quote(value)

    if isinstance(value, bool):
        return 'true' if value else 'false'

    if value is None:
        return 'null'

    if isinstance(value, list):
        if not value:
            return '[]'
        inner = ',\n'.join(
            f"{next_pad}{format_js_value(item, indent, level + 1)}" for item in value
        )
        return f"[\n{inner}\n{pad}]"

    if isinstance(value, dict):
        if not value:
            return '{}'

        def format_inline_string_array(items: List[str]) -> str:
            return '[' + ', '.join(js_quote(item) for item in items) + ']'

        parts = []
        for key, item in value.items():
            if key in {'discoverTerms', 'setFlags'} and isinstance(item, list) and all(isinstance(x, str) for x in item):
                formatted_item = format_inline_string_array(item)
            else:
                formatted_item = format_js_value(item, indent, level + 1)

            parts.append(
                f"{next_pad}{key}: {formatted_item}"
            )
        return f"{{\n{',\n'.join(parts)}\n{pad}}}"

    return repr(value)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description='Convert prose into chapter entry blocks for msg/scene/cams style data.'
    )
    parser.add_argument('input', nargs='?', help='Path to prose text file. If omitted, reads stdin.')
    parser.add_argument('--interface', required=True, choices=['msg', 'scene', 'cams'])
    parser.add_argument('--type', dest='entry_type', default='reply')
    parser.add_argument('--feed-id', dest='feed_id', help='Feed id for cams entries (for example: avian_cellblock).')
    parser.add_argument('--scene-id', dest='scene_id', help='Scene id for scene entries (for example: avian_interrogation).')
    parser.add_argument('--require-event', dest='require_event', help='Optional event id required before this entry unlocks.')
    parser.add_argument('--speaker', help='Fallback speaker label if not inferred from prose.')
    parser.add_argument('--sender', help='Optional sender override for message header.')
    parser.add_argument('--discover-term', action='append', default=[])
    parser.add_argument('--set-flag', action='append', default=[])
    parser.add_argument('--title')
    parser.add_argument('--json', action='store_true', help='Output JSON instead of JS object literal.')
    parser.add_argument('--indent', type=int, default=4)
    return parser


def read_input(path: Optional[str]) -> str:
    if path:
        return Path(path).read_text(encoding='utf-8')
    import sys
    return sys.stdin.read()


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()

    prose = read_input(args.input)
    config = Config(
        interface=args.interface,
        entry_type=args.entry_type,
        feed_id=args.feed_id,
        scene_id=args.scene_id,
        require_event=args.require_event,
        sender=args.sender,
        speaker=args.speaker,
        discover_terms=args.discover_term,
        set_flags=args.set_flag,
        title=args.title,
        indent=args.indent,
    )

    entry = build_entry(config, prose)

    if args.json:
        rendered = json.dumps(entry, indent=2, ensure_ascii=False)
    else:
        rendered = format_js_value(entry, args.indent)

    OUTPUT_PATH.write_text(f"{rendered}\n", encoding='utf-8')
    print(f"Saved parsed entry to: {OUTPUT_PATH}")


if __name__ == '__main__':
    main()
