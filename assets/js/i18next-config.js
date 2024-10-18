// assets/js/i18next-config.js

// Register the i18next-http-backend
i18next
    .use(i18nextHttpBackend)
    .init({
        lng: 'en', // Default language
        fallbackLng: 'en', // Fallback language if the current language does not have the translation
        debug: true,
        backend: {
            loadPath: '../assets/js/locales/{{lng}}.json' // Path to the translation files
        }
    }, (err, t) => {
        if (err) {
            console.error('Error loading translations:', err);
            return;
        }
        // Initial translation
        updateContent();

        // Set the toggle state based on the current language
        const languageToggle = document.getElementById('languageToggle');
        languageToggle.checked = (i18next.language === 'gu'); // Set toggle state correctly

        // Debug: Log the initial language and toggle state
        console.log('Initialized Language:', i18next.language);
        console.log('Toggle checked:', languageToggle.checked);
    });
