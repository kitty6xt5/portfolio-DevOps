/* templatemo-electric-scripts.js
   Final complete JS — theme toggle (sun → moon), mobile menu, rotator, tabs, scroll highlight, particles.
*/

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    /* ---------------------------
       ELEMENTS
    ----------------------------*/
    const body = document.body;
    const themeSwitch = document.getElementById("themeSwitchNav");
    const thumb = document.getElementById("toggleThumbNav");
    const menuToggle = document.getElementById("menuToggle");
    const navLinksContainer = document.getElementById("navLinks");
    const navLinks = navLinksContainer ? Array.from(navLinksContainer.querySelectorAll("a")) : [];
    const navbar = document.getElementById("navbar");
    const textSets = Array.from(document.querySelectorAll(".text-set"));
    const tabItems = Array.from(document.querySelectorAll(".tab-item"));
    const contentPanels = Array.from(document.querySelectorAll(".content-panel"));
    const particlesContainer = document.getElementById("particles");

    /* ---------------------------
       THEME: default = LIGHT (☀️) unless user set in localStorage
       NOTE: CSS uses .light-theme class (see CSS provided earlier)
    ----------------------------*/
    const STORAGE_KEY = "theme"; // "light" or "dark"
    const LIGHT_CLASS = "light-theme";

    function isLight() {
      return body.classList.contains(LIGHT_CLASS);
    }

    function setThumbEmoji(light) {
      if (!thumb) return;
      thumb.textContent = light ? "☀️" : "🌙";
    }

    // Initialize theme: prefer saved, else default to light (user requested initial sun)
    (function initTheme() {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light") {
        body.classList.add(LIGHT_CLASS);
      } else if (saved === "dark") {
        body.classList.remove(LIGHT_CLASS);
      } else {
        // No saved preference -> default to light (☀️)
        body.classList.add(LIGHT_CLASS);
      }
      setThumbEmoji(isLight());
    })();

    // Toggle theme handler
    function toggleTheme() {
      const nextIsLight = !isLight();
      if (nextIsLight) body.classList.add(LIGHT_CLASS);
      else body.classList.remove(LIGHT_CLASS);
      setThumbEmoji(nextIsLight);
      localStorage.setItem(STORAGE_KEY, nextIsLight ? "light" : "dark");
    }

    // Attach handlers to the theme switch (div used as button)
    if (themeSwitch) {
      // Ensure accessible focus/tab
      themeSwitch.setAttribute("role", "button");
      if (!themeSwitch.hasAttribute("tabindex")) themeSwitch.setAttribute("tabindex", "0");
      themeSwitch.setAttribute("aria-pressed", isLight() ? "true" : "false");

      themeSwitch.addEventListener("click", (e) => {
        e.preventDefault();
        toggleTheme();
        themeSwitch.setAttribute("aria-pressed", isLight() ? "true" : "false");
      });

      themeSwitch.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleTheme();
          themeSwitch.setAttribute("aria-pressed", isLight() ? "true" : "false");
        }
      });
    }

    /* ---------------------------
       MOBILE MENU
    ----------------------------*/
    function setMenuOpen(open) {
      if (!navLinksContainer || !menuToggle) return;
      navLinksContainer.classList.toggle("show", open);
      menuToggle.classList.toggle("active", open);
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        // prevent body scrolling when menu open
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }
    }

    if (menuToggle) {
      menuToggle.setAttribute("role", "button");
      if (!menuToggle.hasAttribute("tabindex")) menuToggle.setAttribute("tabindex", "0");
      menuToggle.setAttribute("aria-expanded", "false");

      menuToggle.addEventListener("click", (e) => {
        e.preventDefault();
        setMenuOpen(!menuToggle.classList.contains("active"));
      });

      menuToggle.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setMenuOpen(!menuToggle.classList.contains("active"));
        } else if (e.key === "Escape") {
          setMenuOpen(false);
        }
      });

      // Close menu when a nav link clicked (mobile)
      navLinks.forEach((a) => {
        a.addEventListener("click", () => setMenuOpen(false));
      });
    }

    /* ---------------------------
       SCROLL: highlight active section (anchors inside #navLinks)
    ----------------------------*/
    const sections = Array.from(document.querySelectorAll("section")).filter(s => s.id);
    function updateActiveLink() {
      const pos = window.scrollY + 150;
      let currentId = null;
      for (const sec of sections) {
        if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
          currentId = sec.id;
          break;
        }
      }
      navLinks.forEach(a => {
        const href = a.getAttribute("href");
        if (!href || !href.startsWith("#")) return;
        a.classList.toggle("active", href === `#${currentId}`);
      });
    }

    // Debounce w/ requestAnimationFrame
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveLink();
          // small navbar style change (optional): add .scrolled when >50
          if (navbar) {
            if (window.scrollY > 50) navbar.classList.add("scrolled");
            else navbar.classList.remove("scrolled");
          }
          ticking = false;
        });
        ticking = true;
      }
    });
    updateActiveLink();

    /* ---------------------------
       HERO TEXT ROTATOR
    ----------------------------*/
    if (textSets.length > 0) {
      let idx = 0;
      textSets.forEach((t, i) => t.classList.toggle("active", i === 0));
      setInterval(() => {
        textSets[idx].classList.remove("active");
        idx = (idx + 1) % textSets.length;
        textSets[idx].classList.add("active");
      }, 3000);
    }

    /* ---------------------------
       TABS (Skills etc.)
    ----------------------------*/
    if (tabItems.length && contentPanels.length) {
      tabItems.forEach((tab) => {
        tab.addEventListener("click", () => {
          const id = tab.dataset.tab;
          tabItems.forEach(t => t.classList.remove("active"));
          tab.classList.add("active");
          contentPanels.forEach(panel => panel.classList.remove("active"));
          const panel = document.getElementById(id);
          if (panel) panel.classList.add("active");
        });
        // keyboard
        tab.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            tab.click();
          }
        });
      });
    }

    /* ---------------------------
       SMOOTH SCROLL for internal links
    ----------------------------*/
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        // close mobile menu if open
        setMenuOpen(false);
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    /* ---------------------------
       PARTICLES (lightweight)
    ----------------------------*/
    let particleInterval = null;
    function createParticle() {
      if (!particlesContainer) return;
      const p = document.createElement("div");
      p.className = "particle";
      const size = (Math.random() * 3) + 2;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.position = "absolute";
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      p.style.opacity = String(0.15 + Math.random() * 0.6);
      p.style.pointerEvents = "none";
      particlesContainer.appendChild(p);
      setTimeout(() => {
        try { particlesContainer.removeChild(p); } catch (err) {}
      }, 12000);
    }

    // start creating particles, but keep light to reduce CPU
    particleInterval = setInterval(createParticle, 700);

    /* ---------------------------
       CLEANUP ON UNLOAD
    ----------------------------*/
    window.addEventListener("beforeunload", () => {
      if (particleInterval) clearInterval(particleInterval);
    });

    /* ---------------------------
       Accessibility helpers: ensure toggle visible on desktop (in case CSS tries to hide)
    ----------------------------*/
    (function ensureToggleVisible() {
      if (themeSwitch) themeSwitch.style.display = ""; // allow CSS to control but unclamp inline hide
      if (thumb) thumb.style.display = "flex"; // we need emoji visible
    })();

    /* ---------------------------
       Final sync: set thumb emoji according to current theme
    ----------------------------*/
    setTimeout(() => setThumbEmoji(isLight()), 10);

  }); // DOMContentLoaded
})();