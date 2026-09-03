# DESIGN.md

The visual system for everything with Rohan Aslam's name on it. Site, decks, docs, tools, README headers.

This file is the source of truth. Any agent building or editing something of mine reads this first and uses these tokens verbatim. If a value is not in here, it does not go in the design.

---

## 1. The idea: a wayfinding system

Not a portfolio theme. A **transit signage system**.

I studied CCIT and Computer Science at U of T, which is information design plus engineering. I led the Smart Commute research on how transit riders actually experience a journey. I plan community events, which is really volunteer routing and duty charts. I live in Scarborough and I have spent a large share of my life reading Toronto signage.

So the site is built like a transit network. Work categories are **routes** with route colors. Projects are **stations**. My career is a **line diagram**. Navigation is **wayfinding**, not decoration.

That gives every design decision an answer that is not "what looks nice." Signage is designed to be read fast, from a distance, by someone in a hurry, who needs to make a decision. A hiring manager scanning a portfolio is exactly that person.

**The one-line brief:** a Vignelli transit diagram that happens to be a career.

### What this is deliberately not

Warm off-white paper with a burnt orange accent. Serif headlines over a soft grid. Rounded cards with drop shadows. That is the house style of the AI tools I build with, and using it makes my work look like the tool made it. Also not: dark backgrounds with glowing purple gradient blobs and particle fields, which is the house style of every AI landing page template on the internet right now.

---

## 2. Principles

**1. Signage, not decoration.** Every element earns its place by helping someone navigate. If it does not tell you where you are, where you can go, or what something is, cut it.

**2. Read it from across the room.** Heavy weights, high contrast, big type, short labels. If the homepage does not work as a thumbnail, it does not work.

**3. Hard geometry.** Square corners, 45 and 90 degree angles only, 2px rules, strict left alignment. No soft radii, no diagonals that are not 45, no centered body copy. The system is rigid on purpose, and the rigidity is the style.

**4. Color is information.** Route colors mean something specific. They are never chosen for mood. A screen with five colors on it is showing you five routes, not being playful.

**5. Measured, not eyeballed.** Every color pair here is contrast tested and the ratio is printed. I have shipped against WCAG and AODA for real. Signage that fails contrast is not signage.

---

## 3. Color

### 3.1 Ground and ink

| Token | Light | Dark | Role |
|---|---|---|---|
| `--ground` | `#F4F4F2` | `#0D1014` | Page background. Cool concrete, never warm paper. |
| `--surface` | `#E9E9E6` | `#1A1F26` | Panels and inset blocks |
| `--ink` | `#0B0E12` | `#EDEFF2` | Primary text. **17.56** light, **16.55** dark |
| `--ink-muted` | `#535A63` | `#9AA3AE` | Secondary text. **6.33** / **7.47** |
| `--ink-faint` | `#7A828C` | `#727C88` | Timestamps, disabled. 3.53 / 4.50, large text only |
| `--rule` | `#0B0E12` | `#EDEFF2` | Rules are ink, not grey. See section 5. |
| `--rule-soft` | `#D3D3CE` | `#2A313A` | Secondary dividers inside dense lists only |

### 3.2 Route colors

Five routes. Each maps to one work category, permanently. A project's route color is decided by its tag and never by taste.

| Route | Category | Light | Dark | Bullet text |
|---|---|---|---|---|
| **Line 1** | `strategy` | `#1B44D9` cobalt | `#6E90FF` | white on light, ink on dark |
| **Line 2** | `ai-tools` | `#F2B705` amber | `#FFC933` | **ink, both modes** |
| **Line 3** | `startup` | `#D6246E` rose | `#FF6FA3` | white on light, ink on dark |
| **Line 4** | `data` | `#00875A` green | `#3FCC94` | white on light, ink on dark |
| **Line 5** | `earlier-work` (passion projects) | `#7A3EB0` purple | `#B77BE8` | white on light, ink on dark |

Measured, light mode: white on cobalt **7.30**, white on rose **4.84**, white on green **4.55**, ink on amber **10.64**. Dark mode bullets all carry ink: cobalt **6.44**, amber **12.40**, rose **7.31**, green **9.33**.

### 3.3 The route color rule, which is the one people get wrong

**Route colors are fills. They are not text colors.** A route color appears as a filled bullet, a filled block, or a drawn line. Text sits *on* it, in white or ink, whichever the table above says.

The single exception: **cobalt is also the interface color.** Links, primary buttons, focus rings, and the active nav state use cobalt, because it measures 6.63 on light ground and 6.44 on dark. No other route color may hold text on the ground.

Amber especially. Amber on the ground measures 1.65. It is invisible. If a project's route needs to be named in text, use ink and put the color in a bullet beside it. This is how real signage works: the yellow line's name is written in black next to a yellow dot.

When a category name must be text and cobalt is wrong, use these darkened variants: rose `#B81A5B` (5.71), green `#006B47` (5.97), amber `#6B5000` (6.88).

---

## 4. Typography

**One family, many weights.** This is how signage systems are built, and it is the opposite of pairing a display serif with a body sans.

| Role | Family | Fallback | Notes |
|---|---|---|---|
| Everything | **Archivo** (variable, 100 to 900) | `'Helvetica Neue', Helvetica, Arial, sans-serif` | A grotesque with real weight at the top end. Set station names at 800, body at 400. |
| Data | **IBM Plex Mono** (400, 500) | `ui-monospace, Menlo, Consolas, monospace` | Coordinates, dates, counts, route numbers, code. Industrial rather than cute. |

No serif anywhere. No third family.

### 4.1 Scale

| Token | Size / line-height | Weight | Case | Use |
|---|---|---|---|---|
| `--text-station` | 56px / 0.95 | 800 | UPPER | Homepage headline only |
| `--text-h1` | 34px / 1.05 | 800 | UPPER | Page titles |
| `--text-h2` | 22px / 1.15 | 700 | UPPER | Section headings |
| `--text-h3` | 19px / 1.3 | 700 | Sentence | Card titles, project names |
| `--text-lg` | 18px / 1.55 | 400 | Sentence | Lead paragraph |
| `--text-base` | 16px / 1.65 | 400 | Sentence | Body copy |
| `--text-sm` | 14px / 1.55 | 400 | Sentence | Card body, captions |
| `--text-label` | 12px / 1.2, `0.10em` tracking | 500 | UPPER | **Mono.** Route names, dates, coordinates, counts |

Mobile: station drops to 34px, h1 to 26px, h2 to 19px.

### 4.2 Rules

- Uppercase display type gets `letter-spacing: -0.01em` at 800 weight. Heavy grotesque caps tighten, they do not track out.
- `--text-label` is the only tracked-out style, and it is always mono.
- Body copy caps at **68 characters** per line and is never centered.
- Numbers everywhere use `font-variant-numeric: tabular-nums`. Station counts and dates must align in a column.
- Headlines are UPPER. Body and card titles are sentence case. Never Title Case.

---

## 5. Space, rules, radius

**Space.** 4px base. Only: `4, 8, 12, 16, 24, 32, 48, 64, 96`.

**Rules are the structure.** This system draws with heavy lines, not with boxes and shadows.

| Token | Weight | Use |
|---|---|---|
| `--rule-system` | 6px | The full-width bar at the top of every page. Segmented in route colors. |
| `--rule-heavy` | 3px | Section dividers, the line under a page title |
| `--rule-base` | 2px | Card borders, table rows, input borders |
| `--rule-soft` | 1px | Dividers inside dense lists only |

Rules are `--ink`, not grey. A grey hairline is a web convention. A black 2px rule is signage.

**Radius.** Two values. That is the whole set.

| Token | Value | Use |
|---|---|---|
| `--radius-none` | **0** | Cards, buttons, inputs, images, panels, everything |
| `--radius-full` | 999px | Route bullets, station dots, pills. Only things that are circles or capsules by nature. |

There is no 6px, no 10px, no 14px. A softly rounded card breaks the system instantly.

**Elevation.** None. There are no drop shadows in this system. Depth comes from the ink rule and from filled blocks of route color. If something needs to float (a modal), it gets a 3px ink border and a flat scrim, not a blur.

---

## 6. Motion

One animated element on the site: **the route diagram in the homepage hero.** Everything below it is still. That is deliberate. Signage does not wiggle.

| Token | Value | Use |
|---|---|---|
| `--ease` | `cubic-bezier(0.65, 0, 0.35, 1)` | Everything |
| `--dur-micro` | 100ms | Hover color and border changes |
| `--dur-base` | 200ms | Small state transitions |
| `--dur-draw` | 2200ms | The route diagram drawing itself, once, on load |

The diagram draws left to right via `stroke-dashoffset`, stations scale in as the line reaches them, labels fade in behind. It runs once. It does not loop, it does not replay on scroll.

Hover states change color and border weight only. Nothing moves, lifts, scales, or fades on hover. Under `prefers-reduced-motion: reduce`, the diagram renders in its final state immediately and every duration goes to zero.

---

## 7. Components

### The system bar

A 6px full-width bar pinned to the top of every page, divided into five segments in route color order (cobalt, amber, rose, green, grey). It is the legend, the masthead, and the thing that makes any screenshot instantly recognizable as mine. It appears on every page, always, and never changes.

### Route bullets

A capsule in the route color carrying the category name, in `--text-label`, in white or ink per section 3.2. Height 20px, horizontal padding 8px, `--radius-full`. This replaces the generic "tag chip." Every project shows its route bullet.

### Buttons

Height 44px, padding `0 20px`, **radius 0**, `--text-label` styling (mono, uppercase, tracked), 2px border.

- **Primary.** Cobalt fill, white text, no border. Hover goes to `#1739B4`.
- **Secondary.** Transparent, 2px ink border, ink text. Hover fills ink and reverses the text to ground.
- **Ghost.** Ink text with a 2px cobalt underline. Hover moves the underline to full width.

Labels are verbs and destinations, like signage: "SEE THE WORK", "READ THE CASE", "EMAIL ME". This is the one place uppercase is right, because it is a sign.

### Focus

```css
outline: 3px solid var(--cobalt);
outline-offset: 2px;
```

Applied with `:focus-visible` to every interactive element. Never removed.

### Station cards

The project card is a station on a route.

Ground fill, **2px ink border, radius 0**, 20px padding. A 6px vertical bar of the route color runs down the full left edge, flush, like a platform marker. Title at `--text-h3`. Body at `--text-sm` in `--ink-muted`. A mono label line above the title carrying date and status. Hover: border goes cobalt, nothing moves.

### Data rows

Tables and lists use 2px ink rules between rows, mono for anything numeric, tabular figures, and left alignment. Think departure board, not spreadsheet.

### Inputs

44px tall, ground fill, 2px ink border, radius 0, mono label above in `--text-label`. Focus adds the cobalt ring and a cobalt border. Errors get a rose border with the message in `#B81A5B` below, in real words.

---

## 8. Signature elements

The five things that make something recognizably mine.

**1. The system bar.** 6px, five route colors, top of every page. Nothing else looks like this.

**2. The route diagram.** The homepage hero: my path drawn as a transit line. 45 and 90 degree angles only, station dots for each milestone, branch lines for the startup and the AI tools. It draws itself once on load.

**3. Route bullets.** Every project carries its line color. Over time the work page reads as a network map.

**4. Station-name headlines.** Heavy Archivo caps at 800, tight tracking, with a 3px ink rule underneath.

**5. Mono coordinate lines.** Every page carries one line of mono data, like a sign carrying its own reference number: `43.7°N 79.3°W · TORONTO · 08 PROJECTS · LINE 1–5`.

---

## 9. Voice

This is the longest section in this file on purpose. The visual system stops the site looking generated. The writing is what stops it *sounding* generated, and that is the harder half.

Everything below is derived from Rohan's actual writing: course essays, reflection pieces, cover letters, application answers, a usability study write-up, and his LinkedIn posts. Where a rule has a quote attached, that quote is verbatim from something he wrote. Use the quotes as calibration. If a draft does not sound like it could sit beside them, it is wrong.

### 9.1 The register

Casual, direct, specific. He writes the way he'd explain something to a friend who works in tech. Contractions throughout: "I'm", "I've", "don't", "wasn't", "would've". His register has been loosening every year, so match the recent writing, not the 2023 writing.

Sentence rhythm is his most consistent tell. Two or three medium clausal sentences that build the context, then a short one that lands it. Five to nine words for the landing.

> "The camera became the game's unique selling point, but also a constraint. But at the time, it was a genuine design advantage."

He starts sentences with "But" and "And" constantly. Let him. Fragments are fine when they carry weight.

### 9.2 How to open

Three moves, and never a thesis statement cold.

**A hard number, sometimes standing alone as its own sentence.** This is his signature and it is the safest default.

> "100,000. That was the entire budget for a small 10 person team in 1993 as they looked to create a game for the soccer world."

**A concrete action, first person, plain past tense.** No setup, straight into the scene.

> "We bribed students with donuts and asked them to break our app."

**A memory or an image.**

> "I don't remember the first time I saw you, but I do remember what you symbolized to me."

He never opens with a rhetorical question. He closes with them.

### 9.3 How to close

Never a summary of what was just said. He ends on a turn. Four patterns:

**A short reframe that inverts the opening.**
> "You are no longer a symbol of success to me. You are the infrastructure that keeps us connected. Thank you for carrying me."

**A dry undercut, often with a trailing ellipsis.**
> "We walked away with 23 concrete pieces of feedback, a clearer roadmap, a lot of humility, but no leftover doughnuts..."
> "We don't have big budget funding... yet."

**A rhetorical question.**
> "if they can persist in a game then why not in real life?"

**A call to the people in the same boat.**
> "For all the other student founders out there grinding: see the wishes, not the weeds."

### 9.4 Humour

Get this right or the whole thing reads false. His humour is **dry, situational, and structural.** It is not jokes.

The three moves that are actually his:

**The deflating fourth item.** List three earnest things, then undercut with a trivial one. That is the doughnuts line, and it is the funniest thing in his archive.

**Blunt anti-jargon.** Where a normal writeup would say "we conducted moderated observation sessions", he writes:
> "we shut up and watched."
> "messing around with it."

**Slogan play.** He does do wordplay, but only on a phrase that already exists, never invented puns. His LinkedIn headline is "Soaking up the Sun @ Sun Life". A post opens:
> "\"Life's brighter under the sun\" isn't just a motto. It has been my whole internship experience so far."

What is **not** his: invented puns, "plot twist", exclamation-mark comedy, absurd exaggeration, quips in headings. His exclamation marks are sincere ("which I absolutely love!"), never comic.

Aim for roughly one dry moment per piece. Two is pushing it. Humour that has to announce itself is worse than none.

### 9.5 Analogies

Stronger and more frequent than the jokes. This is his real signature move, and copy without one usually reads flat.

His domains, in order of how naturally they come to him:

- **Sports.** Baseball, cricket, soccer. He played cricket in Pakistan, picked up baseball after moving to Toronto, and plays on the Sun Life soccer team. "level the playing field", "head to head", "hit the ground running", an entire essay on FIFA 93.
- **Transit and commuting.** The GO Train, Guildwood station, the commuter-student experience. This is also the site's whole design language, so these land twice.
- **Physical proximity and surveillance.** His single best original line: "A digital message that you have yet to respond to now feels like a supervisor hovering at your desk waiting for your response."
- **Domestic space.** "Bedrooms have started to become boardrooms."
- **Food.** Doughnuts as bribes, "Pizza for fuel."

Place the analogy **at the end of a section**, as the thing that makes the point stick. Do not sprinkle similes through a paragraph. One good one beats four.

### 9.6 His vocabulary

Transitions he actually uses: "Moreover," · "What's more," · "Lastly," · "Overall," · "However," · "This means that…" · "The truth is that…" · sentence-initial "But" and "And".

Stance markers: "I believe that…" · "I would argue…" · "I think…" · "The way I've looked at it is…" · "What excites me about…"

Recurring content words: insight, pain points, friction, buy in, from the ground up, in the weeds, under the microscope, hit the ground running, full circle, human centred, "the people you are designing for", genuine, actionable, foundational.

His intensifier is **"extremely"**. Not "incredibly", not "deeply".

He does **not** say: "I'll be honest", "to be fair", "look", "here's the thing".

### 9.7 Punctuation

- **No em dashes. Ever.** There is not a single one in four full essays or the GO Train letter. This is the strongest authenticity signal on the list.
- Semicolons: occasionally, to fuse a claim to its correction.
- Ellipses: yes, for the trailing undercut. "…yet."
- Parentheses: rare in prose.
- Fragments: yes, deliberately. "100,000." / "Some of it works."
- One line paragraphs: only in short posts and project entries. Essays run as dense blocks.
- Section headers inside narrative prose: no. He writes flowing paragraphs.
- Bullets inside narrative prose: no. Bullets are for specs and lists of actual items.

### 9.8 How he talks about his own work

State it plainly, attach the number, then say what is still unfinished. He does not undersell with false modesty and he does not inflate. The deflection is always forward, toward what he wants to learn next.

> "I conducted 20+ live user interviews… I have so much yet to learn."
> "Growing up in Pakistan I did not have my own PSP due to its rarity and ridiculous price but I would have killed for one."

His actual failure mode is **undershooting**. On the SmartSyllabus incubator application he described his own product as "a limited function prototype that has changed a few times" and a reviewer flagged it as too modest. So: plain and specific, not shrinking. A number is not a brag.

He praises other people's work with more enthusiasm than his own. Keep that asymmetry.

### 9.9 Never

- Em dashes.
- "It's not just X, it's Y." as a standalone punchy fragment. He uses the idea constantly but always inside a full sentence with "not only… but also".
- Rhetorical triads. "Fast, simple, and beautiful." He lists three things only when there are three things.
- Second person addressed to the reader. No "you'll love this", no "here's what you need to know". The only "you" in his archive is addressed to a GO Train or a hiring manager.
- Marketing superlatives about himself: passionate, seasoned, proven track record, results driven, crafting delightful experiences.
- "Humbled to announce", "grateful to share", "excited to share that".
- One word paragraphs for drama. ("Twice." "Exactly.")
- Opening with a rhetorical question.
- Vague abstraction where a number would do. A sentence of his without a number in it usually has a person in it instead.
- Summary endings.

### 9.10 The trap

"Not only… but also", "Moreover", "Furthermore" and "extremely" are simultaneously **his real tics and common AI tells**. Leaning on them makes authentic copy read as generated.

So do not use them as proof of authenticity. The signals that actually work, because generic AI copy rarely produces them:

1. Zero em dashes.
2. A hard number in the first line.
3. A sports or transit analogy, placed at the end of a section.
4. A trailing ellipsis undercut.
5. Closing on a turn rather than a summary.

### 9.11 Worked example

**Wrong.** Reads competent and says nothing. This is the failure mode.

> Leveraging cutting-edge AI, SmartSyllabus transforms the student experience by seamlessly turning complex syllabi into actionable academic plans. Built through ICUBE, it represents a new paradigm in academic management.

**Also wrong,** and subtler. No buzzwords, but still performative: the antithesis construction, the em dash, the triad, the summary ending.

> SmartSyllabus turns syllabus PDFs into a plan. Not just a calendar — a system. Fast, simple, and built for students. It's proof that good strategy starts with real user research.

**Right.**

> Five syllabi, five formats, and about three weeks before most students give up on the calendar they built in September.
>
> SmartSyllabus reads the PDFs and builds the semester for you. We ran a usability study in July, watched people get lost in our own onboarding, and rewrote it around what actually confused them rather than what we assumed would.
>
> It's live at smartsyllabus.ca. The parsing is good. The part where we convince a whole department to adopt it is the part I'm still figuring out.

Number opener. Contractions. Plain statement of the work. A concrete admission that costs something. Ends on what is unfinished, not on a summary.

## 10. Accessibility floor

- Body text meets 4.5:1. Large text and meaningful UI borders meet 3:1. Every pair in section 3 is measured and printed.
- Route color never carries meaning alone. Every bullet has its name written in it.
- Visible 3px cobalt focus on everything interactive, always.
- Touch targets 44x44px minimum. Buttons are already 44px tall for this reason.
- One `h1` per page, headings in order.
- The route diagram is decorative and carries `aria-hidden="true"`, with the same information available as text below it.
- Works at 200% zoom and with `prefers-reduced-motion` on.

---

## 11. Anti-patterns

- **Warm off-white grounds and orange or ember accents.** This is the single most important line in this file. That palette belongs to the AI tools I build with, and it makes my work look generated.
- Dark backgrounds with glowing gradient blobs, particle fields, or aurora meshes. That is the AI landing page template look.
- Rounded corners on anything that is not a bullet or a pill.
- Drop shadows. Any drop shadow.
- Serif type anywhere.
- Grey hairline borders where an ink rule belongs.
- Route colors used as text on the ground, amber above all.
- Hover states that move, lift, scale, or bounce.
- Gradients used as decoration rather than to encode data.
- Stock photography, 3D cartoon characters, emoji in headings.
- Title Case, "Learn more", "Click here".
- Centered paragraphs of body copy.
- More than one animated element per page.

---

## 12. Tokens

```css
:root {
  /* Ground and ink */
  --ground: #F4F4F2;
  --surface: #E9E9E6;
  --ink: #0B0E12;
  --ink-muted: #535A63;
  --ink-faint: #7A828C;
  --rule-soft: #D3D3CE;

  /* Routes */
  --line-1: #1B44D9;  /* strategy     */
  --line-2: #F2B705;  /* ai-tools     */
  --line-3: #D6246E;  /* startup      */
  --line-4: #00875A;  /* data         */
  --line-5: #7A3EB0;  /* earlier-work and writing */

  /* Text-safe route variants, for the rare case a route name must be text */
  --line-1-text: #1739B4;
  --line-2-text: #6B5000;
  --line-3-text: #B81A5B;
  --line-4-text: #006B47;

  /* Interface, cobalt only */
  --cobalt: #1B44D9;
  --cobalt-hover: #1739B4;

  /* Type */
  --font-sans: 'Archivo', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, Menlo, Consolas, monospace;

  /* Rules */
  --rule-system: 6px;
  --rule-heavy: 3px;
  --rule-base: 2px;

  /* Radius */
  --radius-none: 0;
  --radius-full: 999px;

  /* Motion */
  --ease: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-micro: 100ms;
  --dur-base: 200ms;
  --dur-draw: 2200ms;

  /* Layout */
  --measure: 68ch;
  --shell: 1680px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --ground: #0D1014;
    --surface: #1A1F26;
    --ink: #EDEFF2;
    --ink-muted: #9AA3AE;
    --ink-faint: #727C88;
    --rule-soft: #2A313A;

    --line-1: #6E90FF;
    --line-2: #FFC933;
    --line-3: #FF6FA3;
    --line-4: #3FCC94;
    --line-5: #B77BE8;

    --cobalt: #6E90FF;
    --cobalt-hover: #8FA9FF;
  }
}
```

### Font loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

---

## 13. How agents use this file

1. Read this file before writing a line of CSS.
2. Use the tokens above by name. Never hardcode a hex that is not here.
3. Check the route color rule in section 3.3 before putting any route color on text.
4. Radius is 0 or full. Nothing between.
5. Apply the voice rules in section 9 to every string, including button labels and empty states.
6. Read the anti-patterns in section 11 before calling it done. The first one is the one that matters.
7. If something genuinely needs a value this file does not have, add it here first, with a measured contrast ratio if it is a color, then use it.

Live implementation: `src/styles/global.css`, the route diagram in `src/components/RouteMap.astro`, and the style guide at `/style`.
