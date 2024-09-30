// Function to update content based on language
function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.innerText = i18next.t(key);
        
        // Check if the current language is Gujarati
        if (i18next.language === 'gu') {
            element.classList.add('gujarati-text'); // Add the class for Gujarati
        } else {
            element.classList.remove('gujarati-text'); // Remove the class for other languages
        }
    });
    
    // Update the language label
    const languageLabel = document.getElementById('languageLabel');
    languageLabel.innerText = i18next.language === 'en' ? 'English' : 'ગુજરાતી';
    
    // Add or remove the class for the language label
    if (i18next.language === 'gu') {
        languageLabel.classList.add('gujarati-text'); // Add class for Gujarati
    } else {
        languageLabel.classList.remove('gujarati-text'); // Remove class for other languages
    }
}

// Language toggle function
document.getElementById('languageToggle').addEventListener('change', (event) => {
    const lang = event.target.checked ? 'gu' : 'en'; // Gujarati if checked, English if unchecked
    i18next.changeLanguage(lang, () => {
        updateContent(); // Call updateContent after changing the language
    });
});

// Initialize content on page load
document.addEventListener('DOMContentLoaded', () => {
    updateContent(); // Call updateContent on initial load
});
