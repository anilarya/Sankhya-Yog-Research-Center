# Sankhya Yog Research Center

A React, Vite, and Tailwind CSS site for articles and PDF research papers. It is designed for static hosting on GitHub Pages.

## Run locally

Requires Node.js 22 or later.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. Run `npm run build` to create `dist/`, or `npm run preview` to inspect the production build.

## Publish an article

Create a Markdown file in `src/content/articles/`, for example `understanding-sankhya.md`:

```md
---
title: Understanding Sāṅkhya
description: A short summary shown in the article listing.
author: Author Name
date: 2026-09-27
category: Sāṅkhya
readingTime: 5 min read
---

Write the article here. Use Markdown headings, lists, and links.
```

The filename becomes its link, such as `#/articles/understanding-sankhya`. Commit and push to publish. The `welcome.md` article explains the center; it is not presented as a research paper.

## Publish a PDF paper

1. Place the final PDF in `public/papers/`, using a URL-safe filename such as `paper-title.pdf`.
2. Add an object to the `papers` array in `src/content/papers.js`:

```js
{
  slug: 'paper-title',
  title: 'The title of the paper',
  authors: 'Author Name',
  date: '2026-09-27',
  category: 'Yoga Darśana',
  language: 'English',
  abstract: 'An accurate summary of the paper.',
  pdf: 'papers/paper-title.pdf',
}
```

The paper will appear in the searchable archive at `#/papers`; its reader URL will be `#/papers/paper-title`. Readers can view it in an iframe, open it directly, or download it. Do not add an entry before its PDF is present. The archive intentionally starts empty because no papers were supplied for this build.

## Publish on GitHub Pages

1. Create a **public** GitHub repository, for example `sankhya-yog-research-center`, with `main` as its default branch. Upload the files in this directory to its root, including `.github/workflows/deploy.yml` and `package-lock.json`. Do not upload `node_modules` or `dist`.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
3. Push to `main`. The **Deploy to GitHub Pages** workflow builds and publishes the site. The deployed URL will be `https://<github-username>.github.io/<repository-name>/`.

The site uses relative asset paths and hash URLs so it also works when served under a project repository path. If you change a repository name, links continue to work without a hardcoded Vite base path.

## Editorial notes

The founders’ biographical details came from the project brief and should be reviewed by the people concerned before a public launch. The supplied portrait images have been compressed into WebP files in `public/portraits/`. The [historical photograph of Swami Dayanand Saraswati](https://commons.wikimedia.org/wiki/File:Dayananda_Saraswati.jpg) is sourced from Wikimedia Commons and marked public domain there. The center accepts the ten principles of Arya Samaj as its core principles but operates independently from Arya Samaj branches and Arya Pratinidhi Sabhas. The center is based in Bengaluru, India; its public contact email is anilarya280@gmail.com. Cite primary sources and distinguish a scholar’s interpretation from established scholarly consensus when adding publications.
