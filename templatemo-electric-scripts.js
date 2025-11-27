// -------------------------------------
// DARK & LIGHT MODE TOGGLE
// -------------------------------------

const toggleBtn = document.createElement("div");
toggleBtn.className = "toggle";
toggleBtn.innerText = "🌙 Dark Mode";
document.body.appendChild(toggleBtn);

// Load theme from localStorage
let currentTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", currentTheme);

if (currentTheme === "dark") {
    toggleBtn.innerText = "☀️ Light Mode";
}

// Toggle on click
toggleBtn.addEventListener("click", () => {
    let theme = document.documentElement.getAttribute("data-theme");

    if (theme === "light") {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        toggleBtn.innerText = "☀️ Light Mode";
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        toggleBtn.innerText = "🌙 Dark Mode";
    }
});

// -------------------------------------
// SMOOTH SCROLL (Optional if you add nav)
// -------------------------------------

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
