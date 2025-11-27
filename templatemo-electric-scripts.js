/* ============================================================
   FINAL FIXED JS — ONLY THEME SWITCH UPDATED
============================================================ */

/* THEME INIT */
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
let savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") document.body.classList.add("light-mode");
else if (savedTheme === "dark") document.body.classList.remove("light-mode");
else if (prefersLight) document.body.classList.add("light-mode");

/* THEME SWITCH */
const themeSwitchNav = document.getElementById("themeSwitchNav");
const toggleThumbNav = document.getElementById("toggleThumbNav");

function updateThumb() {
    toggleThumbNav.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
}
updateThumb();

themeSwitchNav.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("light-mode") ? "light" : "dark"
    );

    updateThumb();
});

/* MOBILE MENU */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

/* ROTATING TEXT */
let textSets = document.querySelectorAll(".text-set");
let currentTextIndex = 0;
setInterval(() => {
    textSets[currentTextIndex].classList.remove("active");
    currentTextIndex = (currentTextIndex + 1) % textSets.length;
    textSets[currentTextIndex].classList.add("active");
}, 3000);

/* TABS */
const tabItems = document.querySelectorAll(".tab-item");
const contentPanels = document.querySelectorAll(".content-panel");

tabItems.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        tabItems.forEach(t => t.classList.remove("active"));
        contentPanels.forEach(c => c.classList.remove("active"));

        tabItems[index].classList.add("active");
        contentPanels[index].classList.add("active");
    });
});

/* SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});