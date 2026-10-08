# Vignesh portfolio

Next.js 16, React 19. No database, API keys or environment variables required.

## Local review

Use Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

For production testing:

```sh
npm run build
npm run start
```

## Public launch on Vercel

1. Review the portfolio, links and downloadable resume.
2. In `src/app/site-config.js`, change `INDEX_SITE = false` to `INDEX_SITE = true`.
3. Push this project to your own GitHub repository.
4. Import that repository in Vercel. Use the Next.js preset; no environment variables are needed.
5. Add `vigneshbs.xyz` in Vercel's domain settings and follow the DNS records Vercel gives you.
6. After deployment, check `/`, `/resume`, `/contact`, `/robots.txt` and `/sitemap.xml`, including on a phone.

The single `INDEX_SITE` flag controls metadata, robots.txt and sitemap. While false, all pages are noindex/nofollow, crawlers are disallowed and the sitemap is empty. Noindex is not access control: do not publicly deploy a review you want to keep private. Set the flag true and rebuild only at launch. Canonical URLs and share previews use `https://vigneshbs.xyz`.

## Content and assets

- Home content: `src/components/Portfolio.jsx`
- Design and motion: `src/app/globals.css`
- Site URL and indexing flag: `src/app/site-config.js`
- Public resume: `public/assets/resume-public.pdf` (phone removed for the website)
- Projects: Outsurance, GARUDA and Sparsh Mukthi, with the exact project bullets from the supplied resume.
- Outsurance and GARUDA use real project captures. Sparsh uses a clearly labelled concept illustration; its supplied project link is retained. Verify external links at launch.
- Experience: expandable paper timeline for Fidelity (upcoming), LessonPlan, GyanEdge and OpenIntervue.
- Project layouts and the timeline use locally authored components; no external design-repository code is bundled.
- Gemini-generated back-view portrait is based on the supplied reference. The figure is composited into a code-built scene.
- The supplied Fidelity internship is described as upcoming, without assumed dates.

The phone number is not shown or linked on the site, resume image or public PDF. Assets are local, with no analytics or data-collection form. Project links go to external sites. Reduced-motion settings keep content readable without the animated entrance. Projects and Experience work on phone layouts without a long desktop scroll sequence.

## Accessibility and performance

Keyboard navigation, visible focus, labelled project buttons, dialog focus restore, reduced motion and responsive layouts are included. Run a final browser check after your own deployment, since font rendering and external-link availability can differ. Do not upload `.next`, `node_modules`, private keys, credentials or unrelated files to your repository.

## Achievements and final review

The Achievements page now has 12 distinct competition entries matching the named events in the newer resume. Fidelity, Aventus and Hack Academia use their identifiable original photographs. Aventus links to its winner certificate and Grand Prize entry. Hack Academia links to its runner-up evidence and result post. Omnitrix and Pragyan use event-specific result posts and typographic cards. Five more results now use locally stored, credited official event imagery: Infinity, Google Maps Platform Awards, AETHRA, Yukesong and Hack-Vortex. Devpost lists the corresponding Infinity, AETHRA and HackVortex event award badges on the shared Sparsh project page; those exact event-badge links are used. Google and Yukesong link to their official winners announcements. Event art is explicitly labelled as event art, not a personal award photograph. Exact placings not given in the resume are not invented. Frostbyte, Codeveda, Omnitrix and Pragyan remain typographic because an exact official image mapping was not confirmed.

Nine original training/participation certificates are mapped individually. Google Cloud Skill Build AI / ML Labs is a tenth, resume-listed entry without an attached certificate. The IBM duplicate counts once. The OSCode / BIT certificate is labelled AI Workshop, matching the document rather than assuming an event name.

The home photograph pile retains 14 supplied images. Only identifiable photos get event names and event-specific links. Other photographs have neutral personal-archive labels and no claimed award. No generated award posters are used as evidence. Images enter the home pile slowly, 850 ms apart, with a soft 1.6-second landing. Reduced motion reveals them immediately. The archive-only AsterHacks entry is omitted pending confirmation because it is absent from the newer resume. Additional photos/results may be added after their mapping is confirmed.

Menu opens a single full overlay on phone and desktop, showing Projects, Experience, Achievements, Contact, Resume, GitHub and LinkedIn. It closes on link selection or Escape.

Search indexing remains false. No public deployment has been made. This is the actual Next.js source corresponding to private review generation 21. The homepage uses the paper project gallery; an older unused scene component is not rendered.
