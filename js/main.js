/* ============================================
   CLAWBOT — Main JavaScript
   Theme toggle, FAQ accordion, scroll animations
   ============================================ */

(function () {
    'use strict';

    // --- Theme toggle ---
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Load saved theme or respect system preference
    const saved = localStorage.getItem('clawbot-theme');
    if (saved) {
        html.setAttribute('data-theme', saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.setAttribute('data-theme', 'dark');
    }

    toggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('clawbot-theme', next);
    });

    // --- FAQ accordion ---
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isOpen = item.classList.contains('open');

            // Close all
            document.querySelectorAll('.faq-item.open').forEach(i => {
                i.classList.remove('open');
            });

            // Toggle clicked
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    // --- Scroll animations ---
    const fadeEls = document.querySelectorAll(
        '.feature-card, .integration-card, .arch-step, .security-col, ' +
        '.memory-type, .stack-item, .faq-item'
    );

    fadeEls.forEach(el => el.classList.add('fade-up'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger siblings
                const parent = entry.target.parentElement;
                const siblings = [...parent.children].filter(c => c.classList.contains('fade-up'));
                const idx = siblings.indexOf(entry.target);
                const delay = idx * 60;

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    fadeEls.forEach(el => observer.observe(el));

    // --- Smooth anchor scrolling (offset for sticky nav) ---
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - 70;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

})();
