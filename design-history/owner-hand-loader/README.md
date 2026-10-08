# Hand Loader

An intro loader. 21 landmarks assemble into a hand, the bones draw in, the hand pinches, and the page opens out of the fingertip. It runs for about 3 seconds and needs no dependencies.

## Any website (plain HTML)

Add this right after the opening `<body>` tag:

```html
<script src="hand-loader.js"></script>
<script>HandLoader.start({ name: "Your Name" });</script>
```

Placing it at the top of `<body>` means the page never flashes before the loader covers it. Open `demo.html` to see it run.

## React / Next.js

Copy `hand-loader.js` and `HandLoader.jsx` into your project, then add this to your root layout:

```jsx
import HandLoader from "./HandLoader";

<HandLoader name="Your Name" />
```

## Options (all optional)

| Option | Default | What it does |
|---|---|---|
| `name` | `""` | Text under the hand (hidden when empty) |
| `caption` | `"Locking landmarks"` | First status line |
| `captionDone` | `"Pinch detected"` | Status line after the pinch |
| `background` | `"#f1eee6"` | Overlay colour (match your page background) |
| `ink` | `"#1c1a17"` | Lines, dots and text |
| `accent` | `"#e4462b"` | Fingertip dot and pinch ring |
| `nameFont` | Instrument Serif stack | Font for the name (load it on your page) |
| `monoFont` | System monospace | Font for the caption |
| `zIndex` | `9999` | Overlay stacking order |
| `oncePerSession` | `true` | Play only once per browser session |
| `sessionKey` | `"hand-loader"` | sessionStorage key used for the above |
| `onDone` | `null` | Called when the loader finishes or is skipped |

`start()` returns `{ skip() }`. Pressing any key also skips the loader. It never plays for visitors who have "reduce motion" turned on.

Example for a dark site:

```js
HandLoader.start({ name: "Studio", background: "#0e0e0e", ink: "#f4f1ea", accent: "#4ade80" });
```
