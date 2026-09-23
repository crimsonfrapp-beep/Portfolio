# alliedon.com

Portfolio of Aleksandra Don, Product Designer. Plain static HTML/CSS/JS, hosted on GitHub Pages — no build step.

## Structure

```
index.html                  Projects (home)
about.html, connect.html    About / Connect
<case-slug>.html            One file per case study
404.html                    Not-found page (uses absolute /assets paths)
assets/css/style.css        All styles
assets/js/main.js           "Show all projects" toggle, lazy video playback
assets/media/               Images and videos
CNAME                       Custom domain for GitHub Pages
```

Links use clean URLs (`./about`) — GitHub Pages serves `about.html` for `/about`.

## Editing

- Text: edit the page's `.html` file directly.
- The sidebar is repeated in every page — when adding a project, add it to the
  `.all-projects` list in each file.
- New case study: copy an existing case file, rename it, update its content,
  then add a row to `index.html`.
- Media card: `<div class="card"><img src="assets/media/…" alt="…" loading="lazy"></div>`
  or `<div class="card"><video data-autoplay src="assets/media/….mp4" muted loop playsinline preload="metadata"></video></div>`.
  Modifiers: `card--top`, `card--bottom`, `card--contain`, `card--zoom`, `card--dark`.

## Local preview

```
npx serve .
```

(`serve` supports clean URLs, so `/about` works like on GitHub Pages.)
