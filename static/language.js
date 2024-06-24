document.addEventListener('DOMContentLoaded', function () {
    // Function to get the language from the URL path
    function getLanguageFromURL() {
        const path = window.location.pathname;
        const segments = path.split('/');
        return segments.includes('uz') ? 'uz' : segments.includes('ru') ? 'ru' : 'ru';
    }

    // Load JSON translations
    fetch('static/translations.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(translations => {
            const lang = getLanguageFromURL();
            const selectedTranslations = translations[lang];

            // Apply translations to the elements
            document.getElementById('promo_prize_1').innerText = selectedTranslations.promo_prize_1;
            document.getElementById('promo_prize_2').innerText = selectedTranslations.promo_prize_2;
            document.getElementById('promo_prize_3').innerText = selectedTranslations.promo_prize_3;
            document.getElementById('congratulations_title').innerText = selectedTranslations.congratulations_title;
            document.getElementById('congratulations_text').innerText = selectedTranslations.congratulations_text;
            document.getElementById('enter_code_placeholder').placeholder = selectedTranslations.enter_code_placeholder;
            document.getElementById('activate_code').innerText = selectedTranslations.activate_code;
            document.getElementById('my_history').innerText = selectedTranslations.my_history;
            document.getElementById('your_id').innerText = selectedTranslations.your_id;
            document.getElementById('number_of_caps').innerText = selectedTranslations.number_of_caps;
            document.getElementById('date').innerText = selectedTranslations.date;
            document.getElementById('points').innerText = selectedTranslations.points;
            document.getElementById('status').innerText = selectedTranslations.status;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});
