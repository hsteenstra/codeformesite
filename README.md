# codeformesite

The Code For ME website, live at [codeforme.org](https://www.codeforme.org). GitHub Pages deploys it automatically on every push to `main`.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home: "Who's coding today?" picker (`#start`), step-by-step paths (`#elementary`, `#middle`, `#high`, `#educator`), Workbook (`#workbook`), free tools (`#tools`) |
| `learn.html` + `learn.js` | CodeCourse, the 6 Python units with in-browser Run buttons |
| `meet-the-team.html` | Our Team |
| `photo-gallery.html` | News and newsletters |
| `articles/history-of-python.html` | The History of Python article |
| `resources.html` | Redirects to the home page resources |

## Shared files

- `styles.css` holds every style for every page. Brand colors live at the top under `:root`.
- `site.js` runs all scroll effects (progress bar, reveal animations, level tracker, photo gallery, ticker).
- `assets/web/` holds web-sized photos. Put new photos here at about 1400px wide.

## Common edits

- **Add a resource to a grade level:** in `index.html`, find the level (for example `id="middle"`) and copy one `<li class="step">` block. Add `step--start` to the one kids should do first.
- **Add a newsletter:** in `photo-gallery.html`, copy one `<article class="tl-item">` block in the archive.
- **Animate something as it scrolls in:** add `data-reveal` to the element.
- Every page repeats the header and footer, so change a nav link in each page.
