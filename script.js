/**
 * script.js — Test_Solution_Landing
 * Menu burger + GSAP ScrollTrigger animations
 * Respecte prefers-reduced-motion
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ──────────────────────────────────────────
     MOBILE MENU (Burger)
     ────────────────────────────────────────── */
  const burgerBtn = document.getElementById('burger-btn');
  const mainNav = document.getElementById('main-nav');

  if (burgerBtn && mainNav) {
    burgerBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      burgerBtn.classList.toggle('is-active');
      burgerBtn.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on link click
    mainNav.querySelectorAll('.header__nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        burgerBtn.classList.remove('is-active');
        burgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        mainNav.classList.remove('is-open');
        burgerBtn.classList.remove('is-active');
        burgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ──────────────────────────────────────────
     SMOOTH SCROLL (for anchors)
     ────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ──────────────────────────────────────────
     GSAP SCROLL ANIMATIONS
     Respecte prefers-reduced-motion
     ────────────────────────────────────────── */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    // Select elements to animate
    const revealElements = [
      '.about__text',
      '.about__images',
      '.service-card',
      '.box-cta',
      '.features__content',
      '.features__image',
      '.portfolio__header',
      '.portfolio__item',
      '.interior__content',
      '.interior__image',
      '.interior .feature-box',
      '.solutions__box',
      '.logos__item',
      '.testimonials__header',
      '.testimonial-card',
      '.blog__header',
      '.blog-card',
      '.footer__col'
    ];

    // Add reveal class to all elements
    revealElements.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.classList.add('reveal');
      });
    });

    // Animate each reveal element
    document.querySelectorAll('.reveal').forEach((el, index) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        delay: (index % 4) * 0.1  // Stagger effect for items in the same row
      });
    });

    // Hero-specific animations (no scroll trigger — plays on load)
    gsap.from('.hero__text', {
      opacity: 0,
      x: -60,
      duration: 1,
      ease: 'power3.out',
      delay: 0.3
    });

    gsap.from('.hero__image', {
      opacity: 0,
      x: 60,
      duration: 1,
      ease: 'power3.out',
      delay: 0.5
    });


  } else {
    // If GSAP not loaded or reduced motion, make all elements visible
    document.querySelectorAll('.reveal').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }
});


// Keep the desktop artboard proportions; smaller screens use the mobile layout.
function fitDesign() {
  document.documentElement.style.setProperty('--design-scale', Math.min(window.innerWidth / 1920, 1));
}
fitDesign();
window.addEventListener('resize', fitDesign);
