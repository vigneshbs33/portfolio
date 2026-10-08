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

Search indexing remains false. No public deployment has been made. This is the actual Next.js source corresponding to private review generation 24. The homepage uses the paper project gallery; an older unused scene component is not rendered.

## Face favicon

The favicon is a tight face crop of the supplied portrait cutout. Includes favicon.ico (16/32/48), favicon-32x32.png, favicon-192.png and apple-touch-icon.png (180). Icons are declared in app metadata. No other site content or indexing settings changed. Redeploy this source to update the public site; browser favicon caches may need a refresh.

## Restored project room (v5.3)

The original Three.js back-view project room is restored before the full case studies, with Outsurance, GARUDA and Sparsh Mukthi and their resume-grounded descriptions. On desktop with WebGL and normal motion, scroll moves the camera from the back-view figure through each project board. Smaller screens and reduced-motion use readable static cards. The private hosted review includes an actual recording because its host cannot bundle Three.js; this source uses the real interactive scene. Menu, achievement imagery, slower photo pile, face favicon and indexing settings are preserved.

## v5.4 phone motion and playback

- PhoneRoom: original CSS/React phone scroll room, no WebGL. Back-view figure and project boards,320-820px. Reduced-motion uses static cards.
- HeroWalk: original muted inline playback controller. Waits for real playback; retries on interaction and visibility changes; animated WebP backup while loading/stalled; still poster for reduced motion. Play walk button when playback is blocked. Autoplay remains subject to browser and device policy.
- VisionIntro: original illustrated finger tracking,1.75 seconds once per session, skips reduced motion, no camera permissions. The scan viewport contracts into the real hero portrait frame.
- WorkExperience: original scroll-drawn timeline, pin highlights and hand-drawn icon strokes.
- Case studies: original scroll settling/scale animation on art and blueprint drawings.
- Page thread: original scroll progress strip.
- Only the main projects are listed; GitHub link points to https://github.com/vigneshbs33.

### Design inspiration and licensing

All new component code is authored for this portfolio. No third-party component code, install scripts or new packages were copied or run; no third-party component license is bundled or required for these original implementations. Existing dependencies retain their own package licenses.

- PhoneRoom and case art: container scroll/expansion pattern seen in21st.dev community gallery, https://21st.dev/community/components. Inspiration only; no code reused, third-party license not applicable.
- WorkExperience tracing: Aceternity Tracing Beam pattern, https://ui.aceternity.com/components/tracing-beam. Inspiration only; no code reused, third-party license not applicable.
- Page scroll thread: Magic UI Scroll Progress, https://magicui.design/docs/components/scroll-progress. Inspiration only; no code reused, third-party license not applicable.
- HeroWalk and VisionIntro: original implementation and SVG illustration; no external component source.

Checked in Chromium with phone/touch emulation at320/390/412px, reduced-motion, delayed video loading and simulated rejected play(). Not a physical iPhone/Safari test. Node>=20.9 and Vercel config from the deployed v5.3repo are preserved, as is Upcoming Intern wording. Indexing remains OFF.

## v5.5 opt-in camera hand control

Enable hand control is offered on the opening screen, then remains available near the hero's social links. The hand drawing fades away when not used. The intro now holds for roughly4.2seconds, with skip and reduced-motion bypass. Hover/focus pauses its exit so the offer is usable.

- MediaPipe Tasks Vision0.10.20, not OpenCV. Browser-only CPU inference in a separate worker.
- Camera starts only after an explicit Enable hand control tap. Audio is never requested. Video is not recorded, stored or uploaded. No analytics or upload pipeline was added.
- Runtime, SIMD/non-SIMD WASM and model are served from your own site. Only the selected WASM is downloaded after opt-in. No CDN requests or external model requests at runtime. First opt-in costs about18MB uncompressed; all bundled variants total27MB. None is requested during normal page viewing.
- Uses480x360ideal input, one hand, capped15fps camera and adaptive4-12fps inference. Actual camera resolution depends on the device. Workers keep inference off the main thread; transfer of frames still has a cost.
- Point index finger to move the cursor; pinch thumb/index to click portfolio buttons and same-origin links. External links and camera controls need a normal tap. Open palm above/below centre scrolls. The control panel suppresses gestures to prevent accidental actions.
- Escape, Turn off camera, hidden tab and unmount stop camera tracks and terminate the worker. No automatic re-enable. No hand for60seconds stops the camera; the hand graphic fades after800ms without detection.
- Permission denial, unavailable camera/browser, load timeout and worker error fall back to normal navigation. HTTPS or localhost required.

### Third-party licenses

MediaPipe Tasks Vision package0.10.20 is Apache-2.0. Model card for the full hand-tracking model states Apache License2.0. Local runtime and model assets are unmodified; Apache LICENSE and Google's model card are included in public/hand-control. Original portfolio/gesture UI code is separate from the vendored library.

Sources:
- https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker/web_js
- https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker
- https://registry.npmjs.org/@mediapipe/tasks-vision/0.10.20
- https://github.com/google-ai-edge/mediapipe/blob/master/LICENSE
- https://storage.googleapis.com/mediapipe-assets/Model%20Card%20Hand%20Tracking%20(Lite_Full)%20with%20Fairness%20Oct%202021.pdf
- https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia

### Verification limits

Chromium fake camera runs initialized the real model/WASM pipeline at320/390/412px and desktop. No model/runtime requests before opt-in. Permission denial and unsupported browser checks passed; stopped tracks returned ended. Injected synthetic landmarks tested cursor, scrolling and pinch-to-open-menu independently of visual detection. A fake-camera test does not prove real hand detection, lighting robustness or usable real-device FPS. Physical camera, iPhone/Safari and weak-phone CPU/battery behaviour are untested. Best treated as an optional experimental demo. Normal controls always remain available.

The private review host shows the hand-control UI only, with a source-only-camera limitation. The actual Next.js source contains the full local camera pipeline.

## v5.6 signal-to-work intro and room study

Original new intro, inspired by the supplied hand-loader idea only. No supplied implementation copied or bundled: that archive supplied no license.21locally drawn landmark dots settle into a hand, bones trace in, thumb/index pinch, then a circular opening grows out from the fingertip and drifts toward the hero portrait. Full name and optional camera choice remain. No camera during the illustration. Once per session, reduced-motion bypass and Enter portfolio skip. About4.85seconds rather than a progress bar; no artificial claim that assets are loading. Hover over the choice buttons or keyboard focus pauses exit.

Desktop project room study: figure30%larger with the same floor contact, grid and panel floor rings replaced by soft radial contact shadows. Original camera/boards/scroll route retained. Portal arcs remain as room architecture, not a floor grid. Radial texture shadows avoid an extra shadow-map render pass. Phone scene is unchanged. Original v5.5 Observatory and intro are saved in design-history/v5.5, unused by runtime.

Checked Chromium320/390/412px and1356px screenshots, full intro capture, once-per-session, reduced motion, skip and opt-in denial. Desktop before/after at the same scroll coordinates, room chapters and source production build verified. Existing camera real-hardware/Safari and desktop-review-recording limits still apply. No public deploy.

## v5.7 free-floating dark hand

Removed orbit, corner frame and pinch ring. Original hand proportions revised: longer middle finger, naturally shorter little finger, palm width and thumb angle; shaded hand volume/wrist and joint creases under subtle21landmarks. It remains a stylized anatomical SVG, not a photographic hand. Staggered landmark arrival, bones drawing, thumb/index pinch and soft36px-feather fingertip reveal. Dark ink/lilac intro matches the hero opening; light paper still arrives on scroll.

Inspected the supplied hand-loader reference code for staging, finger flexion and timing only. No reference code or coordinates copied. Camera remains opt-in via Enable hand control.

Interpreted board-to-screen as both intro-to-hero and project-board transitions: softened intro reveal; desktop project boards now ease their opacity by distance rather than jump between1and0.08. Phone board opacity overlap increased to avoid the dim gap. Original room route/larger figure/shadow floor retained. Existing verification limitations still apply.

## v5.8: owner's loader, unchanged visual defaults
The hand-loader.js supplied by the owner is now used byte-for-byte. The React adapter imports it only after mounting to avoid its window reference during server rendering. Only the name option is set to Vignesh B S; the owner's default paper background, ink, orange accent, geometry, timings, pinch ring and fingertip reveal remain. Any key skips, reduced motion skips, and once-per-session behavior come from the supplied code. No camera is accessed by this loader. Use the existing Hand control button after the intro for optional camera gestures. The v5.7 room and board changes remain.

## v5.9: side-button camera cursor
A quiet 44px side button starts camera permission on tap. The local model starts only then. On detection, original screen-scattered dots assemble into the tracked 21-landmark shape in about 900ms, compacted to 82px around the index fingertip. The orange fingertip is the exact hit-test point; ink bones/dots are the cursor, not a second decorative watermark. First-assembly clicks are suppressed. Lost hands disperse after 800ms without detection; stopping disperses immediately. Reduced motion shows/hides the landmarks without flight. Existing gesture, privacy and camera shutdown protections remain. Intro loader remains unchanged from v5.8.

Loader-to-background handoff: the unchanged loader's DOM landmarks are sampled in the React adapter before onDone. Those 21 indexed screen positions disperse to fixed deterministic screen destinations and stay as quiet background points. Tracking reuses those same indices and stored positions, so top points return from the top. Loss/off returns them to the same ambient positions. Actual landmark recognizer unchanged. Capture tests use fake camera and synthetic landmarks; physical hand recognition untested.

### v5.9 revision: content-anchored dot homes
The ambient screen-fixed dots have been removed. The 21dots rest in a small dot-pattern strip immediately after the hero, inside normal document flow. They scroll with that section and appear nowhere else while idle. The same indexed dots lift from the strip's measured client rectangles to become the cursor and return to those exact DOM slots on loss/off. Returning destinations are re-measured while scrolling. Offscreen destinations stay offscreen. Intro dot handoff remains.

## v5.10
The resting21nodes now live inside the hero section itself, in a quiet narrow node strip beneath its main layout. They scroll with the hero, not the viewport. No ambient screen overlay remains. They lift from and return to their own measured hero slots.

## v5.11
Resting nodes are scattered over the hero instead of a zigzag strip. Positions use random samples generated once per mount, with rejection of text/controls/portrait/sticker bounds plus10px clearance and24px inter-node distance. Responsive resize reuses the same samples, recalculating valid homes. Nodes stay at those homes until tracking; home bounds still re-measured for return after scroll. Nothing is viewport-fixed while resting.
