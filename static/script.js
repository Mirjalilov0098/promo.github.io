function fetchAndPopulateCodes() {
    // const telegramIdElement = document.getElementById('telegramId');
    const urlParams = new URLSearchParams(window.location.search);
    const id_params = urlParams.get('telegram_id');
    // const telegramId = telegramIdElement.textContent.trim();
    const apiUrl = `/participant_code/amount/${id_params}/`;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYXNpY191c2VyIn0.2JJYmnhewgMCvIX2g2HXSXwos_MS4alJpQIXUV_5DEs',
        },
        redirect: 'follow',
    })
        .then(response => response.json())
        .then(data => {
            const countSpan = document.getElementById('countPlaceholder');
            if (data.hasOwnProperty('number')) {
                countSpan.textContent = data.number;
            } else {
                console.warn('Number property not found in data:', data);
            }
            const tableBody = document.getElementById('codesTableBody');
            tableBody.innerHTML = '';
            if (data.hasOwnProperty('codes')) {
                data.codes.forEach(foo => {
                    const row = document.createElement('div');
                    row.className = 'storyTwo__info';
                    row.innerHTML = `
                    <span>${foo.created_at}</span>
                    <span>${foo.code}</span>
                    <span>${foo.status}</span>
                `;
                    tableBody.appendChild(row);
                });
            } else {
                console.warn('Codes property not found in data:', data);
            }

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    sessionStorage.removeItem('warningState');
    fetchAndPopulateCodes();
});

function enterCode() {
    const enteredCode = document.getElementById("codeInput").value;
    if (enteredCode === '') {
        console.log('Please enter a code.');
        return;
    }

    // const telegramIdElement = document.getElementById('telegramId');
    // const telegramId = telegramIdElement.textContent.trim();
    const urlParams = new URLSearchParams(window.location.search);
    const id_params = urlParams.get('telegram_id');

    const apiUrl = `/participant_code/${id_params}/codes/`;
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYXNpY191c2VyIn0.2JJYmnhewgMCvIX2g2HXSXwos_MS4alJpQIXUV_5DEs',
        },
        redirect: 'follow',
        body: JSON.stringify({
            'code': enteredCode
        }),
    })
        .then(response => {
            if (response.status === 201) {
                openInfoModal("Sizning Kodingiz ro'yxatdan o'tdi, u kevotgan oyinda ishtrok etadi qopqoqni saqlab qoying");
                sessionStorage.setItem('warningState', 'true');
            } else if (response.status === 404) {
                openInfoModal("Siz noto'g'ri ko'dni kritdingiz, tekshirib boshidan urunib koring");
                sessionStorage.setItem('warningState', 'true');
            } else if (response.status === 409) {
                openInfoModal("Siz kritgan ko'd royxatdan otgan");
                sessionStorage.setItem('warningState', 'true');
            } else if (response.status === 403) {
                openInfoModal("Siz blocklandingiz ertaga urinib koring");
                sessionStorage.setItem('warningState', 'true');
            } else {
                openInfoModal('An error occurred. Please try again later.');
            }
            fetchAndPopulateCodes();
        })
        .catch(error => {
            console.error('Error:', error);
            openInfoModal('An error occurred. Please try again later.');
        });
}

function openInfoModal(message) {
    $('#infoModalBody').html(message);
    $('#infoModal').modal('show');
}