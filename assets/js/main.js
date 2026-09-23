// "Show all projects" toggle in the sidebar
(() => {
  const sidebar = document.querySelector('.sidebar');
  const toggle = document.querySelector('.toggle');
  if (!sidebar || !toggle) return;

  const label = toggle.querySelector('.toggle__label');
  const KEY = 'all-projects-open';

  const set = (open) => {
    sidebar.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    label.textContent = open ? 'Hide all projects' : 'Show all projects';
    try { sessionStorage.setItem(KEY, open ? '1' : '0'); } catch (e) {}
  };

  let initial = false;
  try { initial = sessionStorage.getItem(KEY) === '1'; } catch (e) {}
  set(initial);

  toggle.addEventListener('click', () => set(!sidebar.classList.contains('is-open')));
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
