// ===== Smooth scroll =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== AOS init (animations au scroll) =====
AOS.init({ duration: 900, once: true, easing: 'ease-out' });

// ===== Barre de progression du scroll =====
const progress = document.querySelector('.scroll-progress');
const onScroll = () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
  progress.style.width = (scrolled * 100).toFixed(2) + '%';
};
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Machine à écrire centrée (longueur dynamique) =====
const typingEl = document.getElementById('typing');
if (typingEl) {
  const txt = (typingEl.dataset.text || typingEl.textContent || '').trim();
  // Fixe la variable CSS --n à la longueur exacte du texte -> caret bien aligné
  typingEl.style.setProperty('--n', String(txt.length));
}

// ===== Micro-effet "tilt" sur les cartes (avec la position de la souris) =====
const cards = document.querySelectorAll('[data-tilt]');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((y / r.height) - 0.5) * -6; // inclinaison X
    const ry = ((x / r.width) - 0.5) * 6;   // inclinaison Y
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.02)`;
    // éclat radial qui suit la souris
    card.style.setProperty('--mx', (x / r.width) * 100 + '%');
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== Accent du header au scroll (légère ombre) =====
const nav = document.querySelector('.nav');
let lastY = window.scrollY;
const onScrollNav = () => {
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
