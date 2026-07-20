# The Resonance War — Jekyll site

The site kitrivas.com/the-resonance-war/, converted to [Jekyll](https://jekyllrb.com/).
The visual design is unchanged — same CSS, same fonts, same JavaScript. Jekyll only
removes the duplicated page "chrome" (head, nav, footer, audio player, scripts) so you
edit content, not boilerplate.

## Structure

```
_config.yml            Site settings (title, url, baseurl, font links)
_layouts/
  default.html         Standard pages (home, world, characters, read, media)
  story.html           Story reader pages (header, part-nav, audio player)
_includes/
  head.html            <meta>, Open Graph, fonts
  nav.html             Top nav for content pages
  nav-story.html       Top nav for story pages (adds theme toggle + font sizer)
  footer.html          Footer
  audio-player.html    Fixed audio player bar
css/
  site.css             Shared styles (unchanged)
  story.css            Story styles (+ part-nav styles moved out of the old inline <style>)
  pages/*.css          Per-page styles that used to live in each page's <head>
js/
  site.js  story.js    Unchanged
images/                og-image.jpg
stories/*.html         One file per story (front matter + prose)
index/world/characters/read/media.html   Content pages (front matter + body)
tools/formatter.html   Static utility, passed through untouched
media/music/watch.html Static page, passed through untouched
```

## Run it locally

```
bundle install          # first time
bundle exec jekyll serve
```

Then open **http://localhost:4000/the-resonance-war/** (the trailing path comes from
`baseurl` in `_config.yml`, because the live site is a project site served under
`kitrivas.com/the-resonance-war/`).

## Add a new story

Create `stories/your-story.html`:

```
---
layout: story
title_full: "Your Story — The Resonance War"   # the browser tab / Open Graph title
title: "Your Story"                              # the on-page <h1>
description: "One-line summary for link previews."
og_type: article
tagline: "Place. Year."
audio: "https://.../your-story.mp3"              # optional — omit to hide the Listen button
back_link: true                                  # single-part story → centered "Back to Read"
---
{% raw %}
<h2>Place &mdash; Date</h2>
<p>First paragraph (no indent).</p>
<p>Following paragraphs indent automatically.</p>
<div class="story-break"></div>
<p>New section.</p>
{% endraw %}
```

Keep the prose inside `{% raw %} … {% endraw %}` so Jekyll never tries to interpret
anything in the text. Then add a card for it in `read.html`.

### Multi-part stories

Numbered series (like Blood on the Floor) — put this in each part instead of `back_link`:

```
part_label: "Part 2 of 9 &mdash; The Descent"
series: { slug: blood-on-the-floor, count: 9, index: 1 }   # index is 0-based
nav_prev: { url: "blood-on-the-floor-0.html", label: "&larr; Part 0: The Non-Life" }
nav_next: { url: "blood-on-the-floor-2.html", label: "Part 2: The Gambling Den &rarr;" }
```

Two-part series (like The Pursuit) uses a compact nav instead of `series`:

```
meta: "Short Fiction &middot; Part I"
part_links: [ { label: "Part I", current: true }, { label: "Part II", url: "the-pursuit-2.html" } ]
nav_prev: { url: "../read.html", label: "&larr; Back to Read" }
nav_next: { url: "the-pursuit-2.html", label: "Part II &rarr;" }
```

The numbered part-nav row (0,1,2…) is generated automatically from `series`.

## Add a content page

Create `whatever.html` with `layout: default`, set `title_full`, `description`, and
`nav_active` (`world` / `characters` / `read` / `media`) to light up the nav item. If the
page needs its own styles, drop them in `css/pages/whatever.css` and reference it with
`page_css: /css/pages/whatever.css`.

## Deploying to GitHub Pages

This repo is served at `kitrivas.com/the-resonance-war/`, so `baseurl` is
`/the-resonance-war`. Two options:

- **Built-in Pages build** (Settings → Pages → *Deploy from a branch*). GitHub runs Jekyll
  for you. This site uses no custom plugins, so it works in Pages' safe mode as-is.
- **GitHub Actions** with the included `Gemfile` (Jekyll 4). Use the standard
  "Jekyll" starter workflow.

Internal links use `relative_url`, so they always include the `/the-resonance-war` base
automatically — you never hardcode it.
