const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const nav = document.querySelector('[data-nav]');

const syncHeader = () => header?.classList.toggle('scrolled', window.scrollY > 16);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('open', !open);
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const planCanvas = document.querySelector('.plan-canvas');
const planName = document.querySelector('#plan-name');
const planNames = { hilera: 'Hilera', lateral: 'Jardín lateral', franjas: 'Dos franjas' };

document.querySelectorAll('[data-plan-tab]').forEach((tab) => {
  tab.addEventListener('click', () => {
    const nextPlan = tab.dataset.planTab;
    planCanvas.dataset.plan = nextPlan;
    planName.textContent = planNames[nextPlan];
    document.querySelectorAll('[data-plan-tab]').forEach((item) => {
      item.setAttribute('aria-selected', String(item === tab));
    });
  });
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
}
