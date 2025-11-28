/* ============================================================
   templatemo-electric-scripts.js (Clean Fixed Version)
   Includes:
   ✔ Auto-detect system theme
   ✔ Single Navbar Toggle (🌙 / ☀️)
   ✔ Animated background transition
   ✔ LocalStorage theme persistence
   ✔ All template animations preserved
   ============================================================ */

/* -------------------------------
   THEME INITIALIZATION
---------------------------------- */

// Detect system theme preference
const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

// Load saved theme from storage
let savedTheme = localStorage.getItem("theme");

// Elements
const navToggle = document.getElementById("themeToggleNav");

// Apply theme on load
if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    if (navToggle) navToggle.checked = true;
} else if (savedTheme === "dark") {
    document.body.classList.remove("light-mode");
    if (navToggle) navToggle.checked = false;
} else {
    // No saved theme → use system theme
    if (systemPrefersLight) {
        document.body.classList.add("light-mode");
        if (navToggle) navToggle.checked = true;
    }
}

/* -------------------------------
   ANIMATED BACKGROUND TRANSITION
---------------------------------- */
function animateBackgroundTransition() {
    document.body.classList.add("theme-transitioning");
    setTimeout(() => {
        document.body.classList.remove("theme-transitioning");
    }, 800);
}

/* -------------------------------
   THEME TOGGLE (NAVBAR ONLY)
---------------------------------- */
function toggleTheme(isLight) {
    animateBackgroundTransition();

    if (isLight) {
        document.body.classList.add("light-mode");
        localStorage.setItem("theme", "light");
    } else {
        document.body.classList.remove("light-mode");
        localStorage.setItem("theme", "dark");
    }
}

if (navToggle) {
    navToggle.addEventListener("change", (e) => toggleTheme(e.target.checked));
}

/* -------------------------------
   NAVBAR SCROLL EFFECT
---------------------------------- */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
});

/* -------------------------------
   MOBILE MENU TOGGLE
---------------------------------- */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
});

/* Close mobile menu on nav click */
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
    });
});

/* -------------------------------
   SCROLL-BASED NAV HIGHLIGHT
---------------------------------- */
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let scrollPos = window.scrollY + 150;

    sections.forEach(sec => {
        if (scrollPos > sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
            navItems.forEach(link => link.classList.remove("active"));
            let activeLink = document.querySelector(`a[href="#${sec.id}"]`);
            if (activeLink) activeLink.classList.add("active");
        }
    });
});

/* -------------------------------
   HERO TEXT ROTATOR
---------------------------------- */
let textSets = document.querySelectorAll(".text-set");
let currentIndex = 0;

function rotateText() {
    textSets[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % textSets.length;
    textSets[currentIndex].classList.add("active");
}
setInterval(rotateText, 3500);

/* -------------------------------
   SKILLS TABS
---------------------------------- */
const tabItems = document.querySelectorAll(".tab-item");
const contentPanels = document.querySelectorAll(".content-panel");

tabItems.forEach((tab, idx) => {
    tab.addEventListener("click", () => {
        tabItems.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        contentPanels.forEach(c => c.classList.remove("active"));
        contentPanels[idx].classList.add("active");
    });
});

/* -------------------------------
   PARTICLES
---------------------------------- */
function createParticle() {
    let particle = document.createElement("div");
    particle.classList.add("particle");

    let size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 15000);
}
setInterval(createParticle, 500);

/* -------------------------------
   SMOOTH INTERNAL SCROLL
---------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        if (!this.getAttribute("href").startsWith("#")) return;
        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});
/* ====== GLITCH TEXT LETTER SPLIT ====== */
function applyGlitchEffect() {
    const glitchElements = document.querySelectorAll(".glitch-text");

    glitchElements.forEach(el => {
        let text = el.innerText.trim();
        el.setAttribute("data-text", text);

        let html = "";

        for (let i = 0; i < text.length; i++) {
            let delay = (i * 0.025).toFixed(3);
            html += `<span style="animation-delay:${delay}s">${text[i]}</span>`;
        }

        el.innerHTML = html;
    });
}

document.addEventListener("DOMContentLoaded", applyGlitchEffect);

/* -------------------------------
   END OF FILE
---------------------------------- */
