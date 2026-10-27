# Portfolio

Next.js (App Router) version of the **SATC Analyst Portfolio** mockup.

## Develop

```bash
npm install
npm run dev   # http://localhost:3000
```

## Edit content

All copy (name, projects, skills, jobs, links) lives in `lib/content.ts`.
Image placeholders are the `<Slot />` component — replace them with `next/image` once you have photos (put files in `public/`).
Add your résumé as `public/resume.pdf`.

## Routes

| Route      | Mockup screen |
| ---------- | ------------- |
| `/`        | Column        |
| `/work`    | Case files    |
| `/closet`  | The closet    |
| `/about`   | About         |
| `/contact` | Correspondence |

## Deploy to Vercel

Option A — Git: push this folder to a GitHub repo, then "Add New → Project" on vercel.com and import it. Framework preset is detected as Next.js; no settings needed.

Option B — CLI:

```bash
npx vercel        # preview deploy
npx vercel --prod # production
```
