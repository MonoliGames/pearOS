const lightColors = {
  '--blue': '#007AFF',
  '--brown': '#A2845E',
  '--cyan': '#32ADE6',
  '--green': '#34C759',
  '--indigo': '#5856D6',
  '--mint': '#00C7BE',
  '--orange': '#FF9500',
  '--pink': '#FF2D55',
  '--purple': '#AF52DE',
  '--red': '#FF3B30',
  '--teal': '#30B0C7',
  '--yellow': '#FFCC00',
  '--gray-1': '#8E8E93',
  '--gray-2': '#AEAEB2',
  '--gray-3': '#C7C7CC',
  '--gray-4': '#D1D1D6',
  '--gray-5': '#E5E5EA',
  '--gray-6': '#F2F2F7',
  '--label': '#000000',
  '--secondary-label': '#8A8A8E',
  '--tertiary-label': '#C4C4C6',
  '--quaternary-label': '#DCDCDD',
  '--system-fill': '#E4E4E6',
  '--secondary-system-fill': '#E9E9EA',
  '--tertiary-system-fill': '#EEEEEF',
  '--quaternary-system-fill': '#F4F4F5',
  '--placeholder-text': '#C4C4C6',
  '--system-background': '#FFFFFF',
  '--secondary-system-background': '#F2F2F7',
  '--tertiary-system-background': '#FFFFFF',
  '--grouped-system-background': '#F2F2F7',
  '--secondary-grouped-system-background': '#FFFFFF',
  '--tertiary-grouped-system-background': '#F2F2F7',
  '--separator': '#C6C6C8',
  '--opaque-separator': '#C5C5C8',
  '--link': '#007AFF',
  '--nonadaptable-light-text': '#FFFFFF',
  '--nonadaptable-dark-text': '#000000',
};

const darkColors = {
  '--blue': '#0A84FF',
  '--brown': '#AC8E68',
  '--cyan': '#64D2FF',
  '--green': '#30D158',
  '--indigo': '#5E5CE6',
  '--mint': '#66D4CF',
  '--orange': '#FF9F0A',
  '--pink': '#FF375F',
  '--purple': '#BF5AF2',
  '--red': '#FF453A',
  '--teal': '#40C8E0',
  '--yellow': '#FFD60A',
  '--gray-1': '#8E8E93',
  '--gray-2': '#636366',
  '--gray-3': '#48484A',
  '--gray-4': '#3A3A3C',
  '--gray-5': '#2C2C2E',
  '--gray-6': '#1C1C1E',
  '--label': '#FFFFFF',
  '--secondary-label': '#F3F3F8',
  '--tertiary-label': '#F8F8FC',
  '--quaternary-label': '#FBFBFD',
  '--system-fill': '#CECED1',
  '--secondary-system-fill': '#D3D3D6',
  '--tertiary-system-fill': '#DEDEE1',
  '--quaternary-system-fill': '#E6E6E8',
  '--placeholder-text': '#F8F8FC',
  '--system-background': '#000000',
  '--secondary-system-background': '#1C1C1E',
  '--tertiary-system-background': '#2C2C2E',
  '--grouped-system-background': '#000000',
  '--secondary-grouped-system-background': '#1C1C1E',
  '--tertiary-grouped-system-background': '#2C2C2E',
  '--separator': '#98989B',
  '--opaque-separator': '#38383A',
  '--link': '#0B84FF',
  '--nonadaptable-light-text': '#FFFFFF',
  '--nonadaptable-dark-text': '#000000',
};

function hexToRgbString(hex) {
  hex = hex.replace(/^#/, '');

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(c => c + c)
      .join('');
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `${r}, ${g}, ${b}`;
}

function applyThemeColors(colorMap) {
  const root = document.documentElement;

  for (const [varName, hex] of Object.entries(colorMap)) {
    root.style.setProperty(varName, hexToRgbString(hex));
  }
}

// Detect the OS/browser theme.
const darkModeMediaQuery = window.matchMedia(
  '(prefers-color-scheme: dark)'
);

// Store the current theme state.
let isDarkMode = darkModeMediaQuery.matches;

function applyTheme(isDark) {
  isDarkMode = Boolean(isDark);

  applyThemeColors(
    isDarkMode ? darkColors : lightColors
  );

  // Optional: expose the state on the document.
  document.documentElement.dataset.theme = isDarkMode
    ? 'dark'
    : 'light';
}

Object.defineProperty(window, 'dark', {
  configurable: true,

  get() {
    return isDarkMode;
  },

  set(value) {
    applyTheme(Boolean(value));
  }
});

// Initial theme detection.
applyTheme(isDarkMode);

// Automatically update when the OS/browser theme changes.
function handleThemeChange(event) {
  applyTheme(event.matches);
}

if (typeof darkModeMediaQuery.addEventListener === 'function') {
  darkModeMediaQuery.addEventListener('change', handleThemeChange);
} else {
  // Older browser support.
  darkModeMediaQuery.addListener(handleThemeChange);
}
