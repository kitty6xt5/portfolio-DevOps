/* ------------------------------- */
/*  PORTFOLIO MAIN SCRIPT (FULL)   */
/* ------------------------------- */

// -------------------------------
// THEME TOGGLE (Dark / Light)
// -------------------------------
const toggleBtn = document.querySelector(".toggle");

// Load saved theme
if (localStorage.getItem("theme")) {
    document.documentElement.setAttribute("data-theme", localStorage.getItem("theme"));
}

// Button click toggle
if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        const newTheme = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });
}

// -------------------------------
// SCROLL REVEAL ANIMATION
// -------------------------------
const fadeElements = document.querySelectorAll(".fade");

function revealOnScroll() {
    fadeElements.forEach(el => {
        const position = el.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        if (position < screenHeight - 100) {
            el.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// -------------------------------
// SMOOTH SCROLLING
// -------------------------------
const links = document.querySelectorAll("a[href^='#']");

links.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 40,
                behavior: "smooth"
            });
        }
    });
});

// -------------------------------
// NAVBAR ACTIVE HIGHLIGHT
// -------------------------------
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});

// -------------------------------
// PARALLAX HERO (Smooth Framer Style)
// -------------------------------
const hero = document.querySelector(".hero");

if (hero) {
    window.addEventListener("scroll", () => {
        const offset = window.scrollY;
        hero.style.transform = `translateY(${offset * 0.3}px)`;
    });
}

// -------------------------------
// BUTTON CLICK RIPPLE EFFECT
// -------------------------------
const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {
    btn.addEventListener("click", function(e) {
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");
        ripple.style.left = `${e.clientX - btn.offsetLeft}px`;
        ripple.style.top = `${e.clientY - btn.offsetTop}px`;
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});
