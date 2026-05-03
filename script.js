// ===== TYPED TEXT ANIMATION =====
const phrases = [
  'Automation Test Engineer',
  'SDET — Java | Selenium',
  'Cucumber BDD Specialist',
  'Bug Hunter 🐛',
  'Quality Advocate'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.querySelector('.typed-text');

function type() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex--);
  } else {
    typedEl.textContent = current.substring(0, charIndex++);
  }
  let speed = isDeleting ? 50 : 100;
  if (!isDeleting && charIndex === current.length + 1) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 500;
  }
  setTimeout(type, speed);
}
type();

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

// Close on overlay click
mobileMenu.addEventListener('click', (e) => {
  if (e.target === mobileMenu) closeMenu();
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Animate skill bars when they come into view
      const fills = entry.target.querySelectorAll('.bar-fill');
      fills.forEach(fill => {
        const w = fill.getAttribute('data-width');
        fill.style.width = w + '%';
      });
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active-link');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active-link');
    }
  });

  // Navbar shadow
  const nav = document.querySelector('.navbar');
  nav.style.boxShadow = window.scrollY > 50 ? '0 5px 30px rgba(0,0,0,0.5)' : 'none';
});

// ===== CONTACT FORM =====
function sendMessage(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
  btn.style.background = 'var(--wa)';
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}

// ===== TOOL CHIP HOVER COLORS =====
const toolChips = document.querySelectorAll('.tool-chip');
const colors = ['#8b5cf6', '#06b6d4', '#f472b6', '#10b981', '#f59e0b'];
toolChips.forEach((chip, i) => {
  const color = colors[i % colors.length];
  chip.style.setProperty('--chip-color', color);
  chip.querySelector('i').style.color = color;
});
