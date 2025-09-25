document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

if (window.AOS) {
  AOS.init({ duration: 900, once: true, easing: 'ease-out' });
}

const progress = document.querySelector('.scroll-progress');
const onScroll = () => {
  if (!progress) return;
  const h = document.documentElement;
  const scrolled = (window.scrollY) / (h.scrollHeight - h.clientHeight);
  progress.style.width = (scrolled * 100).toFixed(2) + '%';
};
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const typingEl = document.getElementById('typing');
if (typingEl) {
  const txt = (typingEl.dataset.text || typingEl.textContent || '').trim();
  typingEl.style.setProperty('--n', String(txt.length));
}

const cards = document.querySelectorAll('[data-tilt]');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((y / r.height) - 0.5) * -6;
    const ry = ((x / r.width) - 0.5) * 6;
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.02)`;
    card.style.setProperty('--mx', (x / r.width) * 100 + '%');
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.setProperty('--mx', '50%');
  });
});

const nav = document.querySelector('.nav');
let lastY = window.scrollY;
const onScrollNav = () => {
  if (!nav) return;
  const y = window.scrollY;
  if (y > 8 && lastY <= 8) {
    nav.style.boxShadow = '0 6px 20px rgba(0,0,0,.35)';
  } else if (y <= 8 && lastY > 8) {
    nav.style.boxShadow = 'none';
  }
  lastY = y;
};
document.addEventListener('scroll', onScrollNav, { passive: true });
onScrollNav();