# Chyrus Miguel Macalla — Personal Website

The personal portfolio of Chyrus Miguel D. Macalla, a Computer Science
undergraduate focused on Python automation, data processing, and practical
software engineering.

The site is a small, dependency-free static website. It presents selected
projects, verified experience and progression, skills backed by project
evidence, engineering principles, current areas of focus, an about section,
and contact links.

## Contents

- [Highlights](#highlights)
- [Featured projects](#featured-projects)
- [Technology](#technology)
- [Project structure](#project-structure)
- [How the site works](#how-the-site-works)
- [Run locally](#run-locally)
- [Deploy](#deploy)
- [Updating content](#updating-content)
- [Accessibility and progressive enhancement](#accessibility-and-progressive-enhancement)

## Highlights

- Responsive layout for desktop and mobile screens
- Sticky navigation with anchor links to the main sections
- Expandable project notes with repository links, technology details, and
  verified evidence
- Accessible project filtering by:
  - All
  - Data & ML
  - Automation & systems
  - Multi-language
- Evidence-linked skills that navigate to the relevant project card
- A direct, recruiter-focused experience list with verified milestones and
  project links
- Data-driven skills and engineering-principles sections
- An interactive system architecture inspector in the hero
- Native project-note sections that open as addressable deep links
- Scroll-progress indicator in the sticky navigation
- Responsive project demo media and safely wrapped technical evidence
- Scroll-reveal animations using `IntersectionObserver`
- Return-to-top button with an inline SVG icon
- Reduced-motion support for scrolling and animations
- Keyboard focus styles and screen-reader labels
- Downloadable resume PDF
- Contact email and GitHub profile links

## Featured projects

| Project | Description | Main technologies |
| --- | --- | --- |
| [CleanSheet](https://github.com/Migelitz/CleanSheet) | Desktop utility for spreadsheet cleaning, data-quality checks, and repeatable data workflows | Python, Pandas, Tkinter, Nuitka, pytest |
| [SortFlow V2.0](https://github.com/Migelitz/SortFlow) | Content-aware Linux automation utility with deterministic classification, document/OCR extraction, SQLite telemetry, and safe background file handling | Python 3.12+, Watchdog, PyMuPDF, Tesseract OCR, SQLite, pytest, systemd |
| [AutoVal](https://github.com/ThreeBytes-Studio/AutoVal) | Machine-learning web application for predicting second-hand vehicle values | Python, FastAPI, Pandas, scikit-learn, PostgreSQL |
| [Sentinel Risk Engine](https://github.com/Migelitz/Sentinel-Risk-Engine) | Transaction-scoring system combining machine learning with a multi-language architecture | Python, XGBoost, m2cgen, C/C++, Java, SQLite |

## Technology

- **HTML5** for the semantic page structure and project content
- **CSS3** for the responsive layout, dark visual theme, transitions, and
  reduced-motion styles
- **Vanilla JavaScript modules** for dynamic content rendering and interaction
- **GitHub Pages** for static hosting

There is currently no package manager, framework, bundler, or runtime
dependency. The website can be served directly by any static web server.

## Project structure

```text
.
├── index.html                 # Page structure, project cards, about, and contact
├── css/
│   └── styles.css             # Theme, layout, responsive rules, and animations
├── js/
│   ├── content.js             # Experience, skills, focus areas, and principles
│   └── main.js                # Rendering and interactive behavior
├── assets/
│   ├── macalla_resume.pdf     # Resume opened from the navigation
│   ├── *_demo.mp4             # Project demonstration videos
│   └── autoval_image.jpg      # AutoVal project showcase
└── README.md
```

## How the site works

### Static project content

Project cards are written directly in `index.html`. Keeping their summaries
and repository links in the HTML means the main portfolio content remains
available even when JavaScript is unavailable.

Each project card includes:

- A stable `id` used by evidence links
- `data-categories` used by the project filter
- A native `<details>` element for expandable project information
- Technology tags and a link to the project repository

### Data-driven sections

`js/content.js` exports the content used by `js/main.js`:

- `affiliation` — current role and organization
- `milestones` — dated experience and progression entries
- `currentlyExploring` — current focus and learning areas
- `skills` — grouped skills with project evidence IDs
- `principles` — engineering principles

`js/main.js` renders those values into the placeholders in `index.html` and
adds the following interactions:

- Project category filtering with an `aria-live` result summary
- Evidence links that reveal and scroll to their target project
- Addressable `<details>` project notes that open from direct links and
  evidence navigation
- Header scroll-progress updates
- Scroll-triggered reveal animations
- Return-to-top visibility and scrolling
- Accessible inspector tabs and pipeline-node states in the hero

## Run locally

Because this is a static site, no installation step is required.

### Option 1: Python local server

From the repository root:

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000> in a browser.

### Option 2: Any static server

Serve the repository root with your preferred static web server and open the
URL it provides. Opening `index.html` directly may work, but a local server is
recommended because the page imports `js/main.js` as an ES module.

## Deploy

The site is compatible with GitHub Pages because it consists only of static
HTML, CSS, JavaScript, and assets.

To deploy with GitHub Pages:

1. Push the repository to GitHub.
2. Open the repository's **Settings → Pages**.
3. Select the branch and repository root as the source.
4. Save the configuration and wait for GitHub Pages to publish the site.

Ensure that paths remain relative, especially the stylesheet, JavaScript
module, and resume references.

## Updating content

### Add or edit a project

Update the relevant project card in `index.html`:

1. Give the card a unique `id`, such as `project-example`.
2. Add one or more matching values to `data-categories`.
3. Update the summary, expanded details, technology tags, and repository URL.
4. Add the project ID to relevant `skills` evidence arrays in
   `js/content.js`.
5. Update the initial filter status text if the total number of projects
   changes.

Available category values are:

```text
data-ml
automation-systems
multi-language
```

### Update experience, skills, or focus areas

Edit the corresponding exports in `js/content.js`. Add links only when the
destination and the associated claims have been verified. Milestone entries
support multiple links through the `links` array.

### Update navigation or page sections

Add or edit the semantic markup in `index.html`, then add matching styles in
`css/styles.css` and behavior in `js/main.js` only when the section requires
interaction.

## Accessibility and progressive enhancement

The site includes:

- Semantic landmarks for navigation, main content, sections, and footer
- Native `<details>` controls for expandable project information
- `aria-label`, `aria-pressed`, and `aria-live` states for interactive controls
- Visible `:focus-visible` styles for links, buttons, and project summaries
- A screen-reader-only filter status message
- A labeled return-to-top button with a decorative SVG icon
- Reduced-motion handling for CSS transitions and JavaScript scrolling
- No-script messages for sections that are rendered from `js/content.js`

The project cards and core page structure remain in the HTML. JavaScript
enhances filtering, dynamic sections, navigation behavior, and visual
transitions rather than serving as a build-time requirement.
