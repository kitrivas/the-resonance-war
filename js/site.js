/* ═══════════════════════════════════════
   site.js — Shared JS for all pages
   ═══════════════════════════════════════ */

// Nav shrink on scroll
var nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// Mobile menu toggle
var menuToggle = document.getElementById('menuToggle');
var navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('open');
    menuToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      navLinks.classList.remove('open');
      menuToggle.textContent = '☰';
    });
  });
}

// Scroll reveal for sections
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('section').forEach(function(s) {
  s.style.opacity = '0';
  s.style.transform = 'translateY(20px)';
  s.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(s);
});
