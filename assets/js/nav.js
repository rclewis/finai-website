// Mobile nav toggle — shared across all pages.
document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  var toggle = header.querySelector('.nav-toggle');
  var nav = header.querySelector('.site-nav');
  if (!toggle || !nav) return;

  function setOpen(open) {
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', function () {
    setOpen(!header.classList.contains('nav-open'));
  });

  // Close after tapping any link in the menu.
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  // Close on Escape.
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });

  // Reset state when resizing back up to the desktop layout.
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) setOpen(false);
  });
});
