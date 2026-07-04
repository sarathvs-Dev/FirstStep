# First Step Learning 🌈

A colorful, voice-guided React learning app for preschoolers and children who
benefit from extra learning support — big buttons, slow gentle animation,
repetition, and positive-only feedback throughout.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

To build a production version:

```bash
npm run build
npm run preview
```

## What's inside

- **12 sections**: Alphabets (A–Z), Numbers (0–20), Animals (20), Birds (10),
  Fruits (14), Colors (12), Objects (20), Simple Words (25), Math (6 problem
  types), Quiz, 4 Mini Games, and a Progress dashboard.
- **Voice on every lesson** via the browser's built-in SpeechSynthesis API —
  no API keys or network calls needed.
- **Progress saved locally** (stars, streak, per-category completion,
  achievements) using `localStorage`, so it survives closing the tab.
- **Every button is large, high-contrast, and works with touch, mouse, or
  keyboard.** Reduced-motion is respected automatically.
- **All content lives in `src/data/*.json`** — nothing is hardcoded in
  components, so adding more letters, numbers, animals, or quiz questions is
  just adding another entry to the matching JSON file.

## A few practical choices worth knowing about

- **Visuals are cartoon-style icons, not photographs.** Every emoji
  character in the data/components is rendered through `<Emoji>`
  ([src/components/Emoji.jsx](src/components/Emoji.jsx)), which swaps the
  raw character for a local [Twemoji](https://github.com/twitter/twemoji)
  SVG (`public/twemoji/`, CC-BY 4.0) — a crisper, more colorful, consistent
  cartoon look than relying on the OS's own emoji font, with no runtime
  network calls. Only the ~130 codepoints actually used in the app are
  bundled. Photographs would still mean broken image links without image
  hosting; swapping in real photos later just means adding an `image` field
  to the JSON and an `<img>` in the relevant page component.
- **Animal/bird "sounds" are spoken** (e.g. the dog card says "Woof Woof")
  rather than played from audio files, for the same offline-asset reason.
  Real `.mp3`/`.wav` files can be dropped into `src/assets/sounds/` and
  wired up in `useSpeech`-adjacent code later if desired.
- **Numbers cover 0–20**, not 0–100, to keep the flashcard pattern focused —
  but the page is fully data-driven, so extending `numbers.json` up to 100
  is a copy-paste-and-edit job, no component changes needed.
- Drag-and-drop in the Fruit Basket game is implemented as **tap-to-collect**
  rather than pointer drag, so it works equally well on a touchscreen, with
  a mouse, or via keyboard/switch access.

## Project structure

```
src/
  assets/          images, animations, sounds (empty — see notes above)
  components/      Navbar, Footer, LessonCard, BigButton, SpeakButton,
                    ProgressBar, QuizCard, RewardPopup, AnimationWrapper,
                    LessonShell (shared flashcard chrome), Confetti,
                    FloatingBackground, games/ (4 mini games)
  pages/           Home, Alphabets, Numbers, Animals, Birds, Fruits,
                    Colors, Objects, Words, Math, Quiz, Games, Progress
  hooks/           useSpeech, useProgress
  data/            alphabet.json, numbers.json, animals.json, birds.json,
                    fruits.json, colors.json, objects.json, words.json,
                    math.json, quiz.json
  App.jsx, main.jsx, index.css
```

## Accessibility notes

- Large tap targets (min ~48px), clear focus rings for keyboard users.
- `prefers-reduced-motion` disables/shortens animation automatically.
- No flashing effects, no negative sounds or language — wrong quiz answers
  get "Try again!" plus a gentle shake, never a red X or buzzer.
- One-tap navigation from any page back to Home via the top nav bar.
