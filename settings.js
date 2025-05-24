(function () {
  const cloakerEnabled = localStorage.getItem('classgames-tab-cloaker') === 'true';
  const mainPages = ['index.html', 'games.html', 'settings.html', 'emulators.html'];

  const isMainPage = mainPages.some(page => window.location.pathname.endsWith(page));

  // Apply text color and theme (only on main pages)
  if (isMainPage) {
    const textColor = localStorage.getItem('classgames-text-color');
    if (textColor) {
      document.documentElement.style.setProperty('--text-color', textColor);
    }

    const theme = localStorage.getItem('classgames-theme');
    document.body.classList.add(theme === 'light' ? 'light' : 'dark');
  }

  // Apply tab cloaker on all pages
  if (cloakerEnabled) {
    // Set favicon
    const schoologyFavicon = 'https://asset-cdn.schoology.com/sites/all/themes/schoology_theme/favicon.ico';
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = schoologyFavicon;
    document.head.appendChild(link);

    // Set and lock tab title
    const cloakedTitle = 'Home | Schoology';
    document.title = cloakedTitle;

    // Monitor and reset if changed (to block dynamic changes from games)
    const observer = new MutationObserver(() => {
      if (document.title !== cloakedTitle) {
        document.title = cloakedTitle;
      }
    });

    observer.observe(document.querySelector('title'), { childList: true });
  }
})();
