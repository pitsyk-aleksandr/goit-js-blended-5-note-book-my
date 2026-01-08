// theme-switcher.js - для зміни теми

export function onThemeToggle(event) {}

// Встановлення кольорів згідно поточної теми
// color = 'theme-dark' / 'theme-light';
export function setColorTheme(curTheme) {
  if (curTheme === 'theme-dark') {
    document.body.classList.remove('theme-light');
    document.body.classList.add('theme-dark');
  } else {
    document.body.classList.remove('theme-dark');
    document.body.classList.add('theme-light');
  }
}
