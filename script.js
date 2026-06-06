// Mobile Navigation dengan Accessibility
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.focus();
        }
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
        }
    });
});

// Navbar on scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.style.background = window.scrollY > 50
            ? 'rgba(10, 15, 30, 0.98)'
            : 'rgba(10, 15, 30, 0.85)';
    });
}

// Active nav link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.project-card, .service-card, .stat-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Dynamic year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Floating nav button
const sectionOrder = ['home', 'about', 'services', 'projects', 'contact', 'footer'];
const floatBtn = document.getElementById('floatBtn');
const floatIcon = floatBtn.querySelector('i');

function getCurrentSection() {
    let current = 'home';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 150) {
            current = section.getAttribute('id');
        }
    });
    return current;
}

window.addEventListener('scroll', () => {
    const current = getCurrentSection();
    const currentIndex = sectionOrder.indexOf(current);
    const isFooter = window.scrollY + window.innerHeight >= document.body.offsetHeight - 100;
    
    if (isFooter) {
        floatBtn.href = '#home';
        floatIcon.className = 'fas fa-chevron-up';
        floatBtn.classList.add('visible');
    } else if (current === 'home' && window.scrollY < 300) {
        floatBtn.classList.remove('visible');
    } else {
        const nextSection = sectionOrder[currentIndex + 1];
        if (nextSection) {
            floatBtn.href = `#${nextSection}`;
            floatIcon.className = 'fas fa-chevron-down';
            floatBtn.classList.add('visible');
        }
    }
});

// Console
console.log('%c CleftProjects — Finding gaps. Building solutions. ',
    'background: linear-gradient(135deg, #00b8a9, #1a56db); color: white; font-size: 14px; padding: 10px 20px; border-radius: 5px;'
);

// Formspree
window.formspree = window.formspree || function () { (formspree.q = formspree.q || []).push(arguments); };
formspree('initForm', { formElement: '#contactForm', formId: 'xqeozlyk' });