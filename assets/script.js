/* Brian's Bulk Pickup - Enhanced script.js (vanilla, accessible) */
(function () {
  'use strict';

  /*** Helpers ***/
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /*** Mobile Menu Toggle (accessible) ***/
  const menuBtn = $('#menu-btn');
  const menu = $('#menu');
  if (menuBtn && menu) {
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-controls', 'menu');

    const toggleMenu = () => {
      const open = menu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      if (open) {
        menu.style.display = 'flex';
        const firstLink = $('a', menu);
        if (firstLink) firstLink.focus({ preventScroll: true });
      } else {
        menu.style.display = '';
        menuBtn.focus({ preventScroll: true });
      }
    };

    menuBtn.addEventListener('click', toggleMenu);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) toggleMenu();
    });
    menu.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (a && menu.classList.contains('open')) {
        menu.classList.remove('open');
        menu.style.display = '';
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /*** Smooth Scroll with header offset ***/
  const HEADER_OFFSET = 72;
  const smoothScrollTo = (el) => {
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
    window.scrollTo({ top: Math.max(y, 0), behavior: 'smooth' });
  };

  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        smoothScrollTo(target);
        history.pushState(null, '', `#${id}`);
      }
    });
  });

  window.addEventListener('load', () => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.substring(1));
      const el = document.getElementById(id);
      if (el) setTimeout(() => smoothScrollTo(el), 0);
    }
  });

  /*** Footer Year ***/
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /*** Lazy-load images using data-src ***/
  const lazyImages = $$('img[data-src]');
  if ('IntersectionObserver' in window && lazyImages.length) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '200px 0px' });
    lazyImages.forEach((img) => io.observe(img));
  } else {
    lazyImages.forEach((img) => {
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
    });
  }

  /*** Telephone auto-format (US) ***/
  const telInputs = $$('input[type="tel"]');
  const formatPhone = (val) => {
    const digits = (val || '').replace(/\D/g, '').slice(0, 10);
    const parts = [];
    if (digits.length > 0) parts.push('(' + digits.slice(0, 3));
    if (digits.length >= 4) parts[0] += ') ' + digits.slice(3, 6);
    if (digits.length >= 7) parts.push(digits.slice(6, 10));
    return parts.join('-');
  };
  telInputs.forEach((input) => {
    input.addEventListener('input', () => {
      input.value = formatPhone(input.value);
    });
  });

  /*** Basic form validation + friendly fallback ***/
  const forms = $$('form');
  forms.forEach((form) => {
    form.addEventListener('submit', async (e) => {
      if (!form.checkValidity()) return;
      if (!form.hasAttribute('action')) {
        e.preventDefault();
        try {
          await new Promise((res) => setTimeout(res, 300));
          alert('Thanks. Your request was captured. Connect this form to your email or CRM for production.');
          form.reset();
        } catch {
          alert('Sorry, something went wrong. Please try again or call us.');
        }
      }
    });
  });

  /*** Scroll to top button ***/
  const addScrollTop = () => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'Top';
    btn.setAttribute('aria-label', 'Scroll to top');
    Object.assign(btn.style, {
      position: 'fixed',
      right: '16px',
      bottom: '16px',
      padding: '10px 14px',
      borderRadius: '999px',
      border: '1px solid #222',
      background: '#0f0f0f',
      color: 'inherit',
      opacity: '0',
      pointerEvents: 'none',
      transition: 'opacity .2s ease',
      zIndex: '60'
    });
    document.body.appendChild(btn);

    const onScroll = () => {
      if (window.scrollY > 400) {
        btn.style.opacity = '0.9';
        btn.style.pointerEvents = 'auto';
      } else {
        btn.style.opacity = '0';
        btn.style.pointerEvents = 'none';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  };
  addScrollTop();
})();