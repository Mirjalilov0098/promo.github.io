document.addEventListener('DOMContentLoaded', function () {
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    fetch('static/translations.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(translations => {
            const lang = getQueryParam('lang') || 'uz';
            console.log('Language:', lang);

            const selectedTranslations = translations[lang];

            document.getElementById('promo_prize_1').innerText = selectedTranslations.promo_prize_1;
            document.getElementById('promo_prize_2').innerText = selectedTranslations.promo_prize_2;
            document.getElementById('promo_prize_3').innerText = selectedTranslations.promo_prize_3;
            document.getElementById('congratulations_title').innerText = selectedTranslations.congratulations_title;
            document.getElementById('congratulations_text').innerText = selectedTranslations.congratulations_text;

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

            window.messages = {
                "success": selectedTranslations.success || "Tabriklaymiz, kodingiz ro‘yxatdan o‘tkazildi. Iltimos, qopqoqlarni saqlab qo‘ying va Telegram botimizdagi yangiliklarni kuzatib borishni unutmang.",
                "conflict": selectedTranslations.conflict || "Afsuski, ushbu код avval ro‘yxatdan o‘tkazilgan. Iltimos, ro‘yxatdan o‘tkazilmagan kodlarni kirgizing.",
                "wrong": selectedTranslations.wrong || "Afsuski, noto‘g‘ri код kirgizildi. Iltimos, tekshiring va qaytadan urinib ko‘ring. Eslatib o‘tamiz, noto‘g‘ri kodlar kirgizishda cheklov mavjud va siz cheklovni buzsangiz bloklanishingiz mumkin.",
                "warning": selectedTranslations.warning || "Afsuski, noto‘g‘ri kodlar kirgizishda cheklovni buzganligingiz uchun bloklangansiz. Iltimos, blokdan chiqishingizni kuting.",
                "accept": selectedTranslations.accept || "Davom ettirish",
                "failed": selectedTranslations.failed || "Kutish",
                "retry": selectedTranslations.retry || "Qayta urinish",
            };
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});
