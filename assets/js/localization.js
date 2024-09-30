// localization.js

import { translations } from './translations.js';

// Function to switch the language
export function switchLanguage(lang) {
    const elementsToTranslate = {
        'site-title': 'title',
        'welcome-message': 'welcome',
        'services-title': 'services',
        'testimonial-title': 'testimonial',
        // Add more elements as needed
    };

    for (const [elementId, translationKey] of Object.entries(elementsToTranslate)) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = translations[lang][translationKey];
        }
    }
}

// Language toggle functionality
export function initializeLanguageToggle() {
    document.getElementById('language-toggle').addEventListener('click', function() {
        const currentLanguage = this.textContent;

        if (currentLanguage === 'English') {
            this.textContent = 'ગુજરાતી'; // Change button text to Gujarati
            switchLanguage('gu'); // Switch to Gujarati
        } else {
            this.textContent = 'English'; // Change button text back to English
            switchLanguage('en'); // Switch to English
        }
    });
}
