# aravindmaya.com

Portfolio site for Aravindh Nagarajan (Maya) — product designer working on
spatial and AI interfaces.

Plain static HTML, CSS and JavaScript. There is no build step: what is in the
repository is what gets served.

## Structure

```
index.html            Home / work
about.html            About
fun.html              Concept films and interface explorations
projects/*.html       Individual case studies
site.css              Shared theme, cursor, layout
site.js               Shared behaviour (theme, cursor, reveal, hover video)
analytics.js          GA4 engagement tracking on top of the inline gtag snippet
sw.js                 Service worker
sw-register.js        Service worker registration
_next/static/css      Compiled utility classes, inherited from an earlier build
_next/static/media    Web fonts (Geist, Geist Mono)
fonts/                Newsreader (SIL OFL), self-hosted
Images/               Case study and concept-film assets
Resume/               Résumé PDF
```

`_next/` holds only CSS and fonts. The JavaScript bundle that used to live
there was removed — it belonged to a different site and is not needed.

## Local development

No dependencies. Serve the directory over HTTP rather than opening the files
directly, so that relative paths and the service worker behave:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which uploads the
repository to Hostinger over FTP into `/public_html/`. Deployment secrets
(`FTP_HOST`, `FTP_USERNAME`, `FTP_PASSWORD`) are configured in the repository's
GitHub Actions settings.

The workflow can also be run manually from the Actions tab via
**workflow_dispatch**.

## Conventions

- **Theme.** A small inline snippet in each `<head>` sets `.dark-mode` on
  `<html>` before first paint to avoid a flash. Never assign to
  `document.body.className` — the body carries the font-variable classes that
  define `--font-serif` and `--font-geist-mono`. Use
  `classList.toggle`.
- **Canonical domain.** `https://www.aravindmaya.com`. Canonical, `og:url` and
  `sitemap.xml` should agree.
- **New case studies.** Copy an existing page in `projects/`, then add it to
  the work grid in `index.html` and to `sitemap.xml`.
- **Images.** Reference files that exist; there is no image optimizer at
  runtime, so `srcset` pointing at `/_next/image` will 404.

## Analytics

GA4 (`G-LX6ZJQBQM8`) is initialised inline in each page's `<head>`.
`analytics.js` adds scroll depth, time-on-page milestones, outbound link
clicks, résumé downloads and per-project views. It deliberately does **not**
send a `page_view` — `gtag('config', …)` already does that, and sending a
second one double-counts every visit.
