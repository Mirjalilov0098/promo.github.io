async function fetchAndPopulateCodes() {
    const urlParams = new URLSearchParams(window.location.search);
    const TelegramId = urlParams.get('telegram_id');
    console.log(TelegramId);

    const apiUrl = `https://api-client.nich.uz/participant_code/amount/${TelegramId}/`;
    console.log('Fetching data from:', apiUrl);

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYXNpY191c2VyIn0.2JJYmnhewgMCvIX2g2HXSXwos_MS4alJpQIXUV_5DEs',
            },
            redirect: 'follow',
        });
        const data = await response.json();
        console.log('Response data:', data);

        const countSpan = document.getElementById('countPlaceholder');
        const telegramIdElem = document.getElementById('telegramId');
        const tableBody = document.getElementById('codesTableBody');

        if (countSpan) {
            if (data.hasOwnProperty('number')) {
                countSpan.innerHTML = data.number;
                console.log('Setting count span to:', data.number);
            } else {
                console.warn('Number property not found in data:', data);
            }
        } else {
            console.error('countSpan element not found.');
        }

        if (telegramIdElem) {
            if (TelegramId) {
                telegramIdElem.innerHTML = TelegramId;
                console.log('Setting telegram ID to:', TelegramId);
            } else {
                console.warn('telegramId property not found in data:', data);
            }
        } else {
            console.error('telegramIdElem element not found.');
        }

        if (tableBody) {
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
        } else {
            console.error('Element with id "codesTableBody" not found.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('Document loaded, initializing...');
    sessionStorage.removeItem('warningState');
    fetchAndPopulateCodes();
});

async function enterCode() {
    const enteredCode = document.getElementById("codeInput").value;
    if (enteredCode === '') {
        console.log('Please enter a code.');
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const id_params = urlParams.get('telegram_id');
    const lang = urlParams.get('lang') || 'uz';

    console.log('Language:', lang);

    const apiUrl = `https://api-client.nich.uz/participant_code/${id_params}/codes/`;
    console.log('Entering code:', enteredCode);

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYXNpY191c2VyIn0.2JJYmnhewgMCvIX2g2HXSXwos_MS4alJpQIXUV_5DEs',
            },
            redirect: 'follow',
            body: JSON.stringify({'code': enteredCode}),
        });

        switch (response.status) {
            case 201:
                console.log('Code entered successfully.');
                openInfoModal(window.messages.success, window.messages.accept);
                sessionStorage.setItem('warningState', 'true');
                break;
            case 404:
                console.log('Code not found.');
                openInfoModal(window.messages.wrong, window.messages.retry);
                sessionStorage.setItem('warningState', 'true');
                break;
            case 409:
                console.log('Code already registered.');
                openInfoModal(window.messages.conflict, window.messages.accept);
                sessionStorage.setItem('warningState', 'true');
                break;
            case 403:
                console.log('User is blocked.');
                openInfoModal(window.messages.warning, window.messages.failed);
                sessionStorage.setItem('warningState', 'true');
                break;
            default:
                console.error('Unknown response status:', response.status);
                openInfoModal('An error occurred. Please try again later.');
                break;
        }
        fetchAndPopulateCodes();
    } catch (error) {
        console.error('Error entering code:', error);
        openInfoModal('An error occurred. Please try again later.');
    }
}

function openInfoModal(message, button_message) {
    console.log('Opening info modal with message:', message, button_message);
    $('#infoModalBody').html(message);
    $('#action_button').html(button_message);
    $('#infoModal').modal('show');
}
