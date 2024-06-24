document.addEventListener('DOMContentLoaded', function () {
    // Function to get the value of a query parameter
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
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
            // Get the 'lang' parameter from the URL or default to 'ru' (Russian)
            const lang = getQueryParam('lang') || 'ru';

            // Access translations based on the selected language
            const selectedTranslations = translations[lang];

            // Apply translations to the elements
            document.getElementById('promo_prize_1').innerText = selectedTranslations.promo_prize_1;
            document.getElementById('promo_prize_2').innerText = selectedTranslations.promo_prize_2;
            document.getElementById('promo_prize_3').innerText = selectedTranslations.promo_prize_3;
            document.getElementById('congratulations_title').innerText = selectedTranslations.congratulations_title;
            document.getElementById('congratulations_text').innerText = selectedTranslations.congratulations_text;

            // Check if the element exists before setting placeholder
            const codeInput = document.getElementById('codeInput');
            if (codeInput) {
                codeInput.placeholder = selectedTranslations.enter_code_placeholder;
            } else {
                console.error('Element with id "codeInput" not found.');
            }

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
