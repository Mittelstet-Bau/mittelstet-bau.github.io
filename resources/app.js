// Shared chrome behaviour used by every page (index + standalone legal pages).
// Each IIFE guards on element existence, so loading it on a page that lacks
// the drawer/header is a harmless no-op.

// --- nav shadow on scroll ---
(function () {
  var header = document.getElementById('site-header');
  if (!header) return;
  var onScroll = function () {
    if (window.scrollY > 16) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// --- hamburger + drawer ---
(function () {
  var btn = document.getElementById('hamburger-btn');
  var drawer = document.getElementById('mobile-drawer');
  var overlay = document.getElementById('mobile-overlay');
  var closeBtn = document.getElementById('drawer-close');
  if (!btn || !drawer || !overlay) return;

  function openDrawer() {
    document.body.classList.add('drawer-open');
    btn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
  }

  function closeDrawer() {
    document.body.classList.remove('drawer-open');
    btn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
  }

  btn.addEventListener('click', openDrawer);
  overlay.addEventListener('click', closeDrawer);
  if (closeBtn) { closeBtn.addEventListener('click', closeDrawer); }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.classList.contains('drawer-open')) {
      closeDrawer();
      btn.focus();
    }
  });

  drawer.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', closeDrawer);
  });
})();
