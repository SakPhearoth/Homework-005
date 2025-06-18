const toggleBtn = document.getElementById('theme-toggle') as HTMLElement;
const html = document.documentElement;

// Force light mode as default
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

function applyTheme(theme: string) {
  if (theme === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const isDark = html.classList.contains('dark');
  applyTheme(isDark ? 'light' : 'dark');
}

toggleBtn?.addEventListener('click', toggleTheme);
console.log("Theme toggle script loaded");
