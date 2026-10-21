const themeToggle = document.querySelector('.theme-toggle');
const page = document.querySelector('.newspaper-page');

if (themeToggle && page) {
  themeToggle.addEventListener('click', () => {
    const isDark = page.classList.toggle('dark-mode');
    themeToggle.textContent = isDark ? '☀' : '☾';
  });
}
