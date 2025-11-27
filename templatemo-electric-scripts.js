/* ============================================================
   templatemo-electric-scripts.js (Full Rewritten Version)
   Includes:
   ✔ Auto-detect system theme
   ✔ Dark/Light sliding toggle (Navbar + Floating)
   ✔ Animated background transition
   ✔ LocalStorage theme persistence
   ✔ Original template animations preserved
   ✔ Rotating hero text
   ✔ Tabs for skills/projects
   ✔ Mobile menu
   ✔ Scroll highlighting
   ✔ Particles
   ============================================================ */

/* -------------------------------
   THEME INITIALIZATION
---------------------------------- */

// Detect system theme
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

// Load saved theme OR use system theme
let savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light-mode");
} else if (savedTheme === "dark") {
    document.body.classList.remove("light-mode");
} else {
    // Use system theme
    if (prefersLight) document.body.classList.add("light-mode");
}

// Elements for theme toggle
const navToggle = document.getElementById("themeToggleNav");
const floatToggle = document.getElementById("themeToggleFloating");

// Sync toggle thumb positions on load
function syncToggles() {
    const isLight = document.body.classList.contains("light-mode");

    if (navToggle) navToggle.checked = isLight;
    if (floatToggle) floatToggle.checked = isLight;
}
syncToggles();

// Animated background transition helper
function animateBackgroundTransition() {
    document.body.classList.add("theme-transitioning");
    setTimeout(() => {
        document.body.classList.remove("theme-transitioning");
    }, 800);
}

// Toggle theme function
function toggleTheme(isLight) {
    animateBackgroundTransition();

    if (isLight) {
        document.body.classList.add("light-mode");
        localStorage.setItem("theme", "light");
    } else {
        document.body.classList.remove("light-mode");
        localStorage.setItem("theme", "dark");
    }

    syncToggles();
}

// Add listeners
if (navToggle) {
    navToggle.addEventListener("change", (e) => toggleTheme(e.target.checked));
}
if (floatToggle) {
    floatToggle.addEventListener("change", (e) => toggleTheme(e.target.checked));
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

/* Close menu on nav click (mobile) */
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
    });
});

/* -------------------------------
   SECTION HIGHLIGHT ON SCROLL
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
let currentTextIndex = 0;

function rotateText() {
    textSets[currentTextIndex].classList.remove("active");
    currentTextIndex = (currentTextIndex + 1) % textSets.length;
    textSets[currentTextIndex].classList.add("active");
}
setInterval(rotateText, 3500);

/* -------------------------------
   SKILLS / PROJECTS TABS
---------------------------------- */
const tabItems = document.querySelectorAll(".tab-item");
const contentPanels = document.querySelectorAll(".content-panel");

tabItems.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        tabItems.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        contentPanels.forEach(c => c.classList.remove("active"));
        contentPanels[index].classList.add("active");
    });
});

/* -------------------------------
   PARTICLES BACKGROUND ANIMATION
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
   SMOOTH SCROLL FOR INTERNAL LINKS
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

/* -------------------------------
   END OF FULL JS FILE
---------------------------------- */