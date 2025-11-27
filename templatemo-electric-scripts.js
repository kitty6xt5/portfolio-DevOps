/* ============================================================
   templatemo-electric-scripts.js — Updated (floating toggle removed)
   - Single navbar toggle controls theme (emoji inside thumb)
   - Preserves all other features: rotator, tabs, mobile menu, particles, scroll highlight
   ============================================================ */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    /* -------------------------------
       THEME HANDLING (nav toggle only)
    ---------------------------------- */

    const prefersLightQuery = window.matchMedia("(prefers-color-scheme: light)");
    const prefersLight = prefersLightQuery.matches;
    const savedTheme = localStorage.getItem("theme");

    function applyThemeClass(isLight) {
      if (isLight) document.body.classList.add("light-mode");
      else document.body.classList.remove("light-mode");
    }

    // Initial theme: saved > system
    if (savedTheme === "light") applyThemeClass(true);
    else if (savedTheme === "dark") applyThemeClass(false);
    else applyThemeClass(prefersLight);

    // helper for animation transition
    function animateBackgroundTransition() {
      document.body.classList.add("theme-transitioning");
      window.setTimeout(() => document.body.classList.remove("theme-transitioning"), 800);
    }

    // NAVBAR toggle elements
    const navToggleElem = document.getElementById("themeSwitchNav"); // outer control (div role=button)
    const navThumb = document.getElementById("toggleThumbNav"); // inner thumb that contains emoji

    // safe guard
    function setNavThumbEmoji(isLight) {
      if (!navThumb) return;
      navThumb.textContent = isLight ? "☀️" : "🌙";
    }

    // Generic handler for the nav toggle (supports div role=button)
    if (navToggleElem) {
      // Ensure keyboard accessibility
      navToggleElem.setAttribute("role", "button");
      if (!navToggleElem.hasAttribute("tabindex")) navToggleElem.setAttribute("tabindex", "0");
      navToggleElem.setAttribute("aria-pressed", document.body.classList.contains("light-mode") ? "true" : "false");

      function toggleActionFromNav() {
        const isLight = document.body.classList.contains("light-mode");
        const next = !isLight;
        animateBackgroundTransition();
        applyThemeClass(next);
        localStorage.setItem("theme", next ? "light" : "dark");
        navToggleElem.setAttribute("aria-pressed", next ? "true" : "false");
        setNavThumbEmoji(next);
      }

      navToggleElem.addEventListener("click", toggleActionFromNav);
      navToggleElem.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleActionFromNav();
        }
      });

      // sync thumb on load
      setNavThumbEmoji(document.body.classList.contains("light-mode"));
    } else {
      // if nav toggle doesn't exist, try to keep initial emoji in thumb (if present)
      setNavThumbEmoji(document.body.classList.contains("light-mode"));
    }

    // respond to system theme changes only when user has not explicitly set a theme
    prefersLightQuery.addEventListener?.("change", (e) => {
      if (!localStorage.getItem("theme")) {
        applyThemeClass(e.matches);
        setNavThumbEmoji(e.matches);
      }
    });

    /* -------------------------------
       NAVBAR SCROLL EFFECT (debounced)
    ---------------------------------- */
    const navbar = document.getElementById("navbar");
    let ticking = false;
    function onScroll() {
      if (!navbar) return;
      if (window.scrollY > 50) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    }
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
    onScroll();

    /* -------------------------------
       MOBILE MENU TOGGLE
    ---------------------------------- */
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle) {
      if (menuToggle.tagName !== "BUTTON") {
        menuToggle.setAttribute("role", "button");
        if (!menuToggle.hasAttribute("tabindex")) menuToggle.setAttribute("tabindex", "0");
      }

      function setMenuOpen(isOpen) {
        menuToggle.classList.toggle("active", isOpen);
        if (navLinks) navLinks.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      }

      menuToggle.addEventListener("click", () => setMenuOpen(!menuToggle.classList.contains("active")));
      menuToggle.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setMenuOpen(!menuToggle.classList.contains("active"));
        } else if (e.key === "Escape") {
          setMenuOpen(false);
        }
      });

      document.querySelectorAll(".nav-link").forEach((link) =>
        link.addEventListener("click", () => setMenuOpen(false))
      );

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setMenuOpen(false);
      });
    }

    /* -------------------------------
       SECTION HIGHLIGHT ON SCROLL (optimized)
    ---------------------------------- */
    const sections = Array.from(document.querySelectorAll("section")).filter((s) => s.id);
    const navItems = Array.from(document.querySelectorAll(".nav-link"));

    function updateActiveNavOnScroll() {
      const scrollPos = window.scrollY + 150;
      let found = null;

      for (const sec of sections) {
        const top = sec.offsetTop;
        const bottom = top + sec.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) {
          found = sec.id;
          break;
        }
      }

      navItems.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${found}`);
      });
    }

    let scrollTick = false;
    window.addEventListener("scroll", () => {
      if (!scrollTick) {
        window.requestAnimationFrame(() => {
          updateActiveNavOnScroll();
          scrollTick = false;
        });
        scrollTick = true;
      }
    });
    updateActiveNavOnScroll();

    /* -------------------------------
       HERO TEXT ROTATOR (safe)
    ---------------------------------- */
    const textSets = Array.from(document.querySelectorAll(".text-set"));
    let currentTextIndex = 0;
    let textRotatorInterval = null;
    if (textSets.length > 0) {
      textSets.forEach((t, i) => t.classList.toggle("active", i === 0));
      textRotatorInterval = setInterval(() => {
        textSets[currentTextIndex].classList.remove("active");
        currentTextIndex = (currentTextIndex + 1) % textSets.length;
        textSets[currentTextIndex].classList.add("active");
      }, 3500);
    }

    /* -------------------------------
       SKILLS / PROJECTS TABS (data-tab -> panel id)
    ---------------------------------- */
    const tabItems = Array.from(document.querySelectorAll(".tab-item"));
    const contentPanels = Array.from(document.querySelectorAll(".content-panel"));

    if (tabItems.length > 0 && contentPanels.length > 0) {
      function activateTab(tab) {
        const targetId = tab.dataset.tab;
        tabItems.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        contentPanels.forEach((panel) => panel.classList.remove("active"));
        if (targetId) {
          const panel = document.getElementById(targetId);
          if (panel) panel.classList.add("active");
        } else {
          const index = tabItems.indexOf(tab);
          if (contentPanels[index]) contentPanels[index].classList.add("active");
        }
      }

      tabItems.forEach((tab) => {
        tab.addEventListener("click", () => activateTab(tab));
        tab.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            activateTab(tab);
          }
        });
      });
    }

    /* -------------------------------
       PARTICLES BACKGROUND
    ---------------------------------- */
    const particlesContainer = document.getElementById("particles") || document.body;
    let particleIntervalId = null;

    function createParticle() {
      const particle = document.createElement("div");
      particle.className = "particle";

      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = String(0.2 + Math.random() * 0.8);

      particlesContainer.appendChild(particle);

      setTimeout(() => {
        if (particle && particle.parentNode) particle.parentNode.removeChild(particle);
      }, 15000);
    }

    particleIntervalId = setInterval(createParticle, 600);

    /* -------------------------------
       SMOOTH SCROLL FOR INTERNAL LINKS
    ---------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (!href || href === "#" || !href.startsWith("#")) return;
        const targetEl = document.querySelector(href);
        if (!targetEl) return;
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth" });
      });
    });

    /* -------------------------------
       CLEANUP on unload
    ---------------------------------- */
    window.addEventListener("beforeunload", () => {
      if (textRotatorInterval) clearInterval(textRotatorInterval);
      if (particleIntervalId) clearInterval(particleIntervalId);
    });

  }); // DOMContentLoaded
})();