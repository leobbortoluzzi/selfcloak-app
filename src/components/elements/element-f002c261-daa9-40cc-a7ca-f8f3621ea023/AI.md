---
name: json-viewer
description: A customizable component that displays JSON data with syntax highlighting, collapsible sections, and interactive controls.
keywords: json, viewer, formatter, syntax highlighting, collapsible, tree view, code
---

#### JSON Viewer

***Purpose:***
The JSON Viewer component provides a clean, interactive way to display JSON data with proper formatting, syntax highlighting, and collapsible sections, making it easy to navigate and understand complex data structures.

***Features:***
- Syntax highlighting with multiple color themes (default, dark, light)
- Collapsible tree structure for nested objects and arrays
- Expand/collapse all functionality
- Copy to clipboard button
- Customizable styling (colors, fonts, borders)
- Support for both JSON strings and JavaScript objects
- Proper indentation and formatting
- Error handling for invalid JSON

***Properties:***
- jsonData: string|object - The JSON data to display. Can be a JSON string or a JavaScript object.
- theme: 'default'|'dark'|'light' - Color theme for syntax highlighting.
- initiallyExpanded: boolean - Whether the JSON tree should be initially expanded.
- indentSize: number - The size of each indentation level in pixels (10-50).
- showControls: boolean - Whether to show the expand/collapse and copy buttons.
- backgroundColor: string - The background color of the JSON viewer.
- textColor: string - The base text color for the JSON viewer.
- fontSize: string - The font size for the JSON viewer text.
- borderRadius: string - The border radius of the JSON viewer container.
- padding: string - The internal padding of the JSON viewer container.
- showBorder: boolean - Whether to show a border around the JSON viewer.
- borderColor: string - The color of the border when "Show Border" is enabled.
- maxHeight: string - The maximum height of the JSON viewer (leave empty for auto).

***Events:***
- expandAll: Triggered when the "Expand All" button is clicked.
- collapseAll: Triggered when the "Collapse All" button is clicked.
- copy: Triggered when the "Copy" button is clicked. Payload: { success: true }

***Exposed Actions:***
- `expandAll`: Expands all collapsible sections in the JSON tree.
- `collapseAll`: Collapses all expandable sections in the JSON tree.
- `copyToClipboard`: Copies the current JSON data to the clipboard.

***Notes:***
- The component automatically detects and handles invalid JSON, displaying an error message instead of crashing.
- For large JSON structures, consider using the maxHeight property to limit the component's size and enable scrolling.
- The component uses a monospace font for better code readability.
- When binding to dynamic data sources, the component will automatically update when the data changes.