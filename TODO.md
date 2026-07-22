# TODO - Home mobile scroll snapping

- [ ] Update `Portfolio/home/index.html`:
  - [ ] Wrap home content into a mobile-only scroll-snap container
  - [ ] Add sections inside home page: Hero, Skills (preview), Projects (preview), About (preview), Contact (preview)
  - [ ] Add mobile-only CSS: `scroll-snap-type: y mandatory`, `scroll-snap-align: start`, and `min-height: 100svh` for each section
  - [ ] Keep existing fixed nav + hamburger overlay unchanged
  - [ ] Ensure clicking nav links still navigates to other pages normally
- [ ] Manual test in browser (mobile viewport) to confirm snapping
