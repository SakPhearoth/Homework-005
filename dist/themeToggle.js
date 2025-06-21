"use strict";
const toggleBtn = document.getElementById('theme-toggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);
function applyTheme(theme) {
    if (theme === 'dark') {
        html.classList.add('dark');
    }
    else {
        html.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
}
function toggleTheme() {
    const isDark = html.classList.contains('dark');
    applyTheme(isDark ? 'light' : 'dark');
}
toggleBtn === null || toggleBtn === void 0 ? void 0 : toggleBtn.addEventListener('click', toggleTheme);
console.log("✅ Theme toggle loaded");
