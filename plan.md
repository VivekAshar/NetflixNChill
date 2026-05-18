# plan.md

## Objectives
- Deliver **Part 1** scaffolding for a **static GitHub Pages** Netflix-themed birthday site in **/app/static-site/**.
- Centralize all editable data in **/data/config.js** (beginner-friendly).
- Provide a reusable **TMDB API module** (**/js/tmdb.js**) to auto-fetch Shah Rukh Khan film data later.
- Ship a complete **Netflix dark theme CSS** (**/css/style.css**) reusable across upcoming pages.
- Include a **README.md** with step-by-step instructions to obtain and paste a free TMDB API key.

## Implementation Steps

### Phase 1: Core Integration POC (TMDB module in isolation)
User stories:
1. As a builder, I want a single place to paste my TMDB key so the site can fetch movie data without code hunting.
2. As a builder, I want a minimal test snippet to confirm TMDB requests work before building pages.
3. As a builder, I want clear error messages when the TMDB key is missing/invalid.
4. As a builder, I want a stable function to search TMDB people so I can reliably find Shah Rukh Khan.
5. As a builder, I want a stable function to fetch a person’s movie credits so I can build carousels later.

Steps:
- Create **/app/static-site/js/tmdb.js** with:
  - `tmdbFetch(path, params)` (handles base URL, api_key, query params, errors)
  - `searchPerson(query)`
  - `getPersonMovieCredits(personId)`
  - `getMovieDetails(movieId)`
  - `getMovieImages(movieId)` (optional now but useful later)
  - No DOM usage; pure functions only.
- Add an optional **manual test snippet** in README (copy/paste into browser console) to validate the module once key is set.
- Define expected failure states (missing key, 401, network error) and how they surface.

### Phase 2: V1 Part-1 Delivery (Scaffold + Config + CSS)
User stories:
1. As a non-technical user, I want to edit names, dates, and messages in one config file.
2. As a designer, I want a consistent Netflix-like theme with reusable components (hero, buttons, rows).
3. As a builder, I want a predictable folder structure so adding pages later is fast and clean.
4. As a builder, I want placeholder asset paths so I can swap in real images later without refactoring.
5. As a builder, I want config-driven URLs/IDs for TMDB so I can switch between manual and auto-fetch modes.

Steps:
- Create folder structure under **/app/static-site/**:
  - `/assets/images/` (placeholders)
  - `/assets/audio/` (placeholders)
  - `/assets/icons/` (placeholders)
  - `/css/style.css`
  - `/data/config.js`
  - `/js/tmdb.js`
  - (No HTML files in Part 1)
- Implement **/data/config.js** (single export or global) including:
  - `site`: title, language, base paths
  - `theme`: colors (Netflix red #E50914), typography tokens
  - `profiles`: placeholder names + avatar paths (user will customize later)
  - `birthday`: personName placeholder, date, hero headline/subhead, CTA labels
  - `content`: sections (movies row labels, categories)
  - `tmdb`: apiKey placeholder, baseUrl, imageBaseUrl, SRK person query + optional personId override
  - `assets`: placeholder image/audio references
  - `messages`: love notes / prompts placeholders
- Implement **/css/style.css** with Netflix-inspired system:
  - CSS variables (colors, spacing, font sizes)
  - Base reset + typography
  - Reusable components: navbar, hero, buttons, profile cards, rows/carousels, modal shell, footer
  - Utility classes: spacing, hidden, screen-reader text
  - Responsive breakpoints (mobile/tablet/desktop)
- Add **README.md**:
  - What Part 1 includes / excludes
  - Step-by-step TMDB key instructions (beginner-friendly)
  - Exact location and example for pasting key into `/data/config.js`
  - Notes on GitHub Pages deployment expectations for later

### Phase 3: Testing & Validation (Part 1)
User stories:
1. As a builder, I want to confirm the folder structure matches the README so I don’t get lost.
2. As a builder, I want config.js to load cleanly with no syntax errors.
3. As a builder, I want tmdb.js functions to be importable and not depend on the DOM.
4. As a builder, I want CSS to be self-contained so future HTML pages render consistently.
5. As a builder, I want clear next-step instructions so Part 2 can start without rework.

Steps:
- Lint-by-inspection: ensure all modules are valid ES modules and paths are correct.
- Verify config has no missing commas/exports and uses obvious placeholders.
- Validate tmdb module error handling and parameter encoding.
- Ensure CSS variables and component class names are consistent and documented briefly.

## Next Actions
- Implement all Part 1 deliverables in **/app/static-site/** in a single cohesive commit.
- After delivery, user obtains TMDB key and pastes into config; run the README test snippet.
- Start Part 2 only after TMDB POC validation succeeds (key works + basic calls return data).

## Success Criteria
- **/app/static-site/** contains required directories and files exactly as specified.
- README enables a beginner to obtain a TMDB key and paste it correctly without additional help.
- `config.js` is the only file a non-technical user needs to edit for names/messages/assets.
- `tmdb.js` provides clean, reusable functions with helpful errors and no side effects.
- `style.css` defines a complete Netflix-like design system usable for upcoming HTML pages.
- No HTML pages are created in Part 1.