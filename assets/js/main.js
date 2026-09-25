// "Show all projects" toggle in the sidebar
(() => {
  const sidebar = document.querySelector('.sidebar');
  const toggle = document.querySelector('.toggle');
  if (!sidebar || !toggle) return;

  const label = toggle.querySelector('.toggle__label');

  // Always starts closed on each page, like the original
  const set = (open) => {
    sidebar.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    label.textContent = open ? 'Hide all projects' : 'Show all projects';
  };

  const isOpen = () => sidebar.classList.contains('is-open');
  const area = toggle.closest('.sidebar__bottom');

  toggle.addEventListener('click', () => set(!isOpen()));

  // Close on a click anywhere outside the toggle and the list
  document.addEventListener('click', (e) => {
    if (isOpen() && !area.contains(e.target)) set(false);
  });

  // Close on Escape, keeping keyboard focus on the toggle
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !isOpen()) return;
    if (area.contains(document.activeElement)) toggle.focus();
    set(false);
  });

  // Pages restored from the back/forward cache keep their DOM state
  window.addEventListener('pageshow', (e) => { if (e.persisted) set(false); });
})();

// Play videos only while they are on screen
(() => {
  const videos = document.querySelectorAll('video[data-autoplay]');
  if (!videos.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window)) {
    if (!reduced) videos.forEach((v) => v.play().catch(() => {}));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting && !reduced) target.play().catch(() => {});
      else target.pause();
    });
  }, { rootMargin: '200px 0px' });

  videos.forEach((v) => io.observe(v));
})();
