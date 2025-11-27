```javascript
// JavaScript Document - Fixed & Cleaned for Kausthubh's Portfolio

function createParticles() {
    const container = document.getElementById('particles');
    const count = 40;

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 15 + 's';
        p.style.animationDuration = (Math.random() * 15 + 15) + 's';
        container.appendChild(p);
    }
}

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Active nav on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// Tabs functionality
document.querySelectorAll('.tab-item').forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Text rotator
const textSets = document.querySelectorAll('.text-set');
let current = 0;
function rotate() {
    textSets[current].classList.remove('active');
    current = (current + 1) % textSets.length;
    textSets[current].classList.add('active');
}
setInterval(rotate, 4500);

// Initialize
createParticles();
textSets[0].classList.add('active');
