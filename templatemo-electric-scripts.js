/* ============================================================
templatemo-electric-scripts.js (FULL VERSION WITH GLITCH TEXT)
Floating toggle removed
============================================================ */

/* -------------------------------
THEME INITIALIZATION
---------------------------------- */

const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
let savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light-mode");
} else if (savedTheme === "dark") {
    document.body.classList.remove("light-mode");
} else {
    if (prefersLight) document.body.classList.add("light-mode");
}

const navToggle = document.getElementById("themeToggleNav");

function syncToggles() {
    const isLight = document.body.classList.contains("light-mode");
    if (navToggle) navToggle.checked = isLight;
}
syncToggles();

function animateBackgroundTransition() {
    document.body.classList.add("theme-transitioning");
    setTimeout(() => {
        document.body.classList.remove("theme-transitioning");
    }, 800);
}

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

document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
    });
});

/* -------------------------------
SCROLL ACTIVE SECTION
---------------------------------- */
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let scrollPos = window.scrollY + 150;

    sections.forEach((sec) => {
        if (
            scrollPos > sec.offsetTop &&
            scrollPos < sec.offsetTop + sec.offsetHeight
        ) {
            navItems.forEach((link) => link.classList.remove("active"));
            const activeLink = document.querySelector(`a[href="#${sec.id}"]`);
            if (activeLink) activeLink.classList.add("active");
        }
    });
});

/* ============================================================
GLITCH ANIMATION SYSTEM FOR HERO TEXT (ADDED)
============================================================ */

const textSets = document.querySelectorAll(".text-set");
let currentIndex = 0;
let isAnimating = false;

function wrapTextInSpans(element) {
    const text = element.textContent;
    element.innerHTML = text
        .split("")
        .map(
            (char, i) =>
                `<span class="char" style="animation-delay:${i * 0.05}s">${
                    char === " " ? "&nbsp;" : char
                }</span>`
        )
        .join("");
}

function animateTextIn(textSet) {
    const glitchText = textSet.querySelector(".glitch-text");
    const subtitle = textSet.querySelector(".subtitle");

    wrapTextInSpans(glitchText);
    glitchText.setAttribute("data-text", glitchText.textContent);

    setTimeout(() => {
        subtitle.classList.add("visible");
    }, 800);
}

function animateTextOut(textSet) {
    const chars = textSet.querySelectorAll(".char");
    const subtitle = textSet.querySelector(".subtitle");

    chars.forEach((char, i) => {
        char.style.animationDelay = `${i * 0.02}s`;
        char.classList.add("out");
    });

    subtitle.classList.remove("visible");
}

function rotateGlitchText() {
    if (isAnimating) return;
    isAnimating = true;

    const currentSet = textSets[currentIndex];
    const nextIndex = (currentIndex + 1) % textSets.length;
    const nextSet = textSets[nextIndex];

    animateTextOut(currentSet);

    setTimeout(() => {
        currentSet.classList.remove("active");
        nextSet.classList.add("active");
        animateTextIn(nextSet);
        currentIndex = nextIndex;
        isAnimating = false;
    }, 600);
}

textSets[0].classList.add("active");
animateTextIn(textSets[0]);

setTimeout(() => {
    setInterval(rotateGlitchText, 5000);
}, 4000);

/* Random glitch flicker */
setInterval(() => {
    const glitchTexts = document.querySelectorAll(".glitch-text");
    glitchTexts.forEach((text) => {
        if (Math.random() > 0.95) {
            text.style.animation = "none";
            setTimeout(() => {
                text.style.animation = "";
            }, 200);
        }
    });
}, 3000);

/* -------------------------------
TABS
---------------------------------- */
const tabItems = document.querySelectorAll(".tab-item");
const contentPanels = document.querySelectorAll(".content-panel");

tabItems.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        tabItems.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        contentPanels.forEach((c) => c.classList.remove("active"));
        contentPanels[index].classList.add("active");
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
SMOOTH SCROLL
---------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
        });
    });
});