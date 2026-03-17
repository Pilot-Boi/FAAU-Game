"""
How to run this updater:

1. Open a terminal.
2. Move to the project root:
    Set-Location "c:\Users\dugan\OneDrive\Desktop\FAAU Game"
3. Run the script:
    & "c:/Users/dugan/OneDrive/Desktop/FAAU Game/.venv/Scripts/python.exe" "tools/update_file_system_diagram.py"
4. Check file_system_diagram.txt for the refreshed output.

Optional:
- You can pass custom paths:
  python tools/update_file_system_diagram.py --input scripts/directory.js --output file_system_diagram.txt
"""

from __future__ import annotations

import argparse
from dataclasses import dataclass, field
from pathlib import Path
from typing import Dict, List, Optional, Tuple


@dataclass
class Node:
    name: str
    node_type: Optional[str] = None
    required_flag: Optional[str] = None
    hidden_until_flag: Optional[str] = None
    children: List["Node"] = field(default_factory=list)


def find_matching(text: str, start: int, opener: str, closer: str) -> int:
    if text[start] != opener:
        raise ValueError(f"Expected '{opener}' at index {start}.")

    depth = 0
    i = start
    in_string: Optional[str] = None
    escaped = False

    while i < len(text):
        ch = text[i]

        if in_string is not None:
            if escaped:
                escaped = False
            elif ch == "\\":
                escaped = True
            elif ch == in_string:
                in_string = None
            i += 1
            continue

        if ch in ("'", '"'):
            in_string = ch
            i += 1
            continue

        if ch == opener:
            depth += 1
        elif ch == closer:
            depth -= 1
            if depth == 0:
                return i

        i += 1

    raise ValueError("No matching closing token found.")


def skip_ws(text: str, i: int) -> int:
    while i < len(text) and text[i].isspace():
        i += 1
    return i


def parse_string(text: str, i: int) -> Tuple[str, int]:
    quote = text[i]
    i += 1
    out: List[str] = []
    escaped = False

    while i < len(text):
        ch = text[i]
        if escaped:
            out.append(ch)
            escaped = False
        elif ch == "\\":
            escaped = True
        elif ch == quote:
            return "".join(out), i + 1
        else:
            out.append(ch)
        i += 1

    raise ValueError("Unterminated string literal.")


def parse_identifier(text: str, i: int) -> Tuple[str, int]:
    start = i
    while i < len(text) and (text[i].isalnum() or text[i] == "_"):
        i += 1
    return text[start:i], i


def parse_object_properties(text: str, obj_start: int, obj_end: int) -> Dict[str, Tuple[str, object]]:
    props: Dict[str, Tuple[str, object]] = {}
    i = obj_start + 1

    while i < obj_end:
        i = skip_ws(text, i)
        if i >= obj_end:
            break

        if text[i] == ",":
            i += 1
            continue

        if text[i] in ("'", '"'):
            key, i = parse_string(text, i)
        else:
            key, i = parse_identifier(text, i)

        i = skip_ws(text, i)
        if i >= obj_end or text[i] != ":":
            raise ValueError(f"Expected ':' after key '{key}'.")
        i += 1
        i = skip_ws(text, i)

        if i >= obj_end:
            break

        ch = text[i]
        if ch in ("'", '"'):
            value, i = parse_string(text, i)
            props[key] = ("string", value)
        elif ch == "{":
            end = find_matching(text, i, "{", "}")
            props[key] = ("object", (i, end))
            i = end + 1
        elif ch == "[":
            end = find_matching(text, i, "[", "]")
            props[key] = ("array", (i, end))
            i = end + 1
        else:
            start = i
            while i < obj_end and text[i] not in ",}":
                i += 1
            props[key] = ("raw", text[start:i].strip())

        i = skip_ws(text, i)
        if i < obj_end and text[i] == ",":
            i += 1

    return props


def parse_children_object(text: str, obj_start: int, obj_end: int) -> List[Node]:
    props = parse_object_properties(text, obj_start, obj_end)
    children: List[Node] = []

    for child_name, (value_kind, value_data) in props.items():
        if value_kind != "object":
            continue

        child_start, child_end = value_data  # type: ignore[misc]
        children.append(parse_node(text, child_name, child_start, child_end))

    return children


def parse_node(text: str, node_name: str, obj_start: int, obj_end: int) -> Node:
    props = parse_object_properties(text, obj_start, obj_end)

    node = Node(name=node_name)

    if "type" in props and props["type"][0] == "string":
        node.node_type = str(props["type"][1])

    if "requiredFlag" in props and props["requiredFlag"][0] == "string":
        node.required_flag = str(props["requiredFlag"][1])

    if "hiddenUntilFlag" in props and props["hiddenUntilFlag"][0] == "string":
        node.hidden_until_flag = str(props["hiddenUntilFlag"][1])

    if "children" in props and props["children"][0] == "object":
        child_start, child_end = props["children"][1]  # type: ignore[misc]
        node.children = parse_children_object(text, child_start, child_end)

    return node


def extract_file_system_text(directory_js: str) -> Tuple[str, int, int]:
    marker = "const FILE_SYSTEM ="
    marker_index = directory_js.find(marker)
    if marker_index == -1:
        raise ValueError("Could not find 'const FILE_SYSTEM =' in scripts/directory.js")

    obj_start = directory_js.find("{", marker_index)
    if obj_start == -1:
        raise ValueError("Could not find FILE_SYSTEM object start.")

    obj_end = find_matching(directory_js, obj_start, "{", "}")
    return directory_js, obj_start, obj_end


def node_label(node: Node) -> str:
    base = f"{node.name}/" if node.node_type == "dir" else node.name

    if node.required_flag:
        return f"{base} [requires flag: {node.required_flag}]"

    if node.hidden_until_flag:
        return f"{base} [hidden until flag: {node.hidden_until_flag}]"

    return base


def render_tree_lines(nodes: List[Node], prefix: str = "") -> List[str]:
    lines: List[str] = []
    total = len(nodes)

    for idx, node in enumerate(nodes):
        is_last = idx == (total - 1)
        branch = "`-- " if is_last else "|-- "
        lines.append(f"{prefix}{branch}{node_label(node)}")

        if node.children:
            child_prefix = f"{prefix}{'    ' if is_last else '|   '}"
            lines.extend(render_tree_lines(node.children, child_prefix))

    return lines


def generate_diagram(directory_js_path: Path, output_path: Path) -> None:
    text = directory_js_path.read_text(encoding="utf-8")
    _, root_start, root_end = extract_file_system_text(text)

    root = parse_node(text, "/", root_start, root_end)

    lines: List[str] = [
        "FAAU GAME FILE SYSTEM REFERENCE",
        "Source: scripts/directory.js",
        "",
        "/",
    ]

    lines.extend(render_tree_lines(root.children))
    lines.extend([
        "",
        "Notes:",
        "- Entries marked [requires flag: ...] are present but locked until the flag is set.",
        "- Entries marked [hidden until flag: ...] are hidden until the flag is set.",
        "- Generated by tools/update_file_system_diagram.py.",
    ])

    output_path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    script_path = Path(__file__).resolve()
    repo_root = script_path.parents[1]

    parser = argparse.ArgumentParser(description="Generate file_system_diagram.txt from scripts/directory.js FILE_SYSTEM.")
    parser.add_argument("--input", default=str(repo_root / "scripts" / "directory.js"), help="Path to scripts/directory.js")
    parser.add_argument("--output", default=str(repo_root / "file_system_diagram.txt"), help="Path to output diagram file")
    args = parser.parse_args()

    input_path = Path(args.input)
    output_path = Path(args.output)

    generate_diagram(input_path, output_path)
    print(f"Updated {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
