# mater.welon

A personal website featuring a homepage, a D3.js data-visualization demo, and a playable "Yahtzee LITE" dice game — built with vanilla HTML, CSS, and JavaScript.

🔗 **Live site:** _add your GitHub Pages / hosting link here_

## Pages

### 🏠 Home (`index.html`)
Landing page with site navigation and a logo/header.

### 📊 Data Visualization (`data.html` + `data.js`)
A three-part demo built with [D3.js](https://d3js.org/):

1. **DOM Manipulation** — Dynamically renders a name and a list of classes, with the heading color randomized on each page load.
2. **SVG Animation** — Animates 8 circles and 8 rectangles bouncing around an SVG canvas, fading out over time. Click **Animate!** to reload and replay.
3. **Data Visualization** — An interactive pie chart of the top 10 movies by worldwide box office revenue for 2019, 2020, and 2021, selectable via a dropdown, with hover tooltips showing exact figures.

### 🎲 Yahtzee LITE (`yahtzee.html` + `yahtzee.js`)
A simplified dice game:

- Roll 5 dice, up to 3 times total.
- **Keep?** a die to lock in its value toward your set.
- Win by collecting either `1, 2, 3, 4, 5` or `2, 3, 4, 5, 6` across your kept dice.
- Includes rolling animations, sound effects, and feedback for duplicate keeps.
- **Reset Game** to start over at any time.

### 📄 Resume (`resume.html`)
A simple resume/contact page.

## Tech Stack

- HTML5 / CSS3
- Vanilla JavaScript
- [D3.js v7](https://d3js.org/) (via CDN) for the data visualization page

## Project Structure

```
├── index.html        # Home page
├── data.html          # D3 data visualization demo
├── data.js
├── yahtzee.html        # Yahtzee LITE game
├── yahtzee.js
├── resume.html        # Resume page
├── style.css          # Shared stylesheet for all pages
└── Assets/            # Dice images/GIF/audio used by yahtzee.js (not included — see note below)
```

> **Note:** `yahtzee.js` references image and audio files under `./Assets/` (`Die1.png`–`Die6.png`, `DieGIF.gif`, `DiceRollSound.mp3`). Make sure that folder is present alongside the HTML files or the dice game won't render/play correctly.

## Running Locally

No build step is required — it's a static site.

1. Clone the repo:
   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   cd <your-repo>
   ```
2. Open `index.html` directly in a browser, or serve the folder locally, e.g.:
   ```bash
   python3 -m http.server 8000
   ```
   then visit `http://localhost:8000`.

## Deployment

This project is a static site and can be hosted for free on **GitHub Pages**:

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Set the source branch (e.g. `main`) and root folder.
4. Your site will be live at `https://<your-username>.github.io/<your-repository>
