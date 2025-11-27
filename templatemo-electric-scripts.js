/* 
  Electric Xtra Template - JavaScript Effects
  Template: TemplateMo 596 Electric Xtra
*/

document.addEventListener("DOMContentLoaded", () => {
    /* Navigation Scroll Effect */
    const navbar = document.querySelector("nav");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    /* Mobile Menu Toggle */
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    /* Text Rotator Effect */
    const textSets = document.querySelectorAll(".text-set");
    let currentSet = 0;

    function rotateText() {
        textSets.forEach((set, index) => {
            set.classList.remove("active");
            if (index === currentSet) {
                set.classList.add("active");
                const glitchText = set.querySelector(".glitch-text");
                animateText(glitchText);
            }
        });
        currentSet = (currentSet + 1) % textSets.length;
    }

    function animateText(element) {
        const text = element.textContent;
        element.textContent = "";
        const chars = [];

        [...text].forEach((char, i) => {
            const span = document.createElement("span");
            span.className = "char";
            span.textContent = char;
            span.style.animationDelay = `${i * 0.05}s`;
            element.appendChild(span);
            chars.push(span);
        });

        setTimeout(() => {
            chars.forEach((span, i) => {
                span.classList.add("out");
                span.style.animationDelay = `${i * 0.03}s`;
            });
        }, 2500);
    }

    rotateText();
    setInterval(rotateText, 3500);

    /* Tab Switching in Features Section */
    const tabItems = document.querySelectorAll(".tab-item");
    const contentPanels = document.querySelectorAll(".content-panel");

    tabItems.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            tabItems.forEach((t) => t.classList.remove("active"));
            contentPanels.forEach((panel) => panel.classList.remove("active"));

            tab.classList.add("active");
            contentPanels[index].action = "active";
            contentPanels[index].classList.add("active");
        });
    });

    /* Particle Background Generation */
    function createParticles() {
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement("div");
            particle.classList.add("particle");

            const size = Math.random() * 3 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            particle.style.left = Math.random() * 100 + "vw";
            particle.style.animationDuration = Math.random() * 10 + 10 + "s";
            particle.style.opacity = Math.random();

            document.body.appendChild(particle);
        }
    }

    createParticles();
});
