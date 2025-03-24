// Инициализация Flatpickr для выбора времени
flatpickr("#timePicker", {
    enableTime: true, // Включаем выбор времени
    noCalendar: true, // Отключаем календарь (только время)
    dateFormat: "H:i", // Формат времени (24-часовой)
    time_24hr: true, // Используем 24-часовой формат
    minuteIncrement: 1, // Шаг выбора минут
    defaultHour: 12, // Начальное значение часов
    defaultMinute: 0, // Начальное значение минут
});

flatpickr("#contactTimePicker", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true,
    minuteIncrement: 1,
    defaultHour: 12,
    defaultMinute: 0,
});

// Функция для открытия формы
function openForm() {
    document.getElementById('formOverlay').style.display = 'flex';
}

// Функция для закрытия формы
function closeForm() {
    document.getElementById('formOverlay').style.display = 'none';
}

// Функция для отправки данных в Telegram
async function sendToTelegram(marketplace, time) {
    const token = '8042509322:AAF0qY-KPT2G38Ow8uZ3KCY-KtppGYGS8bA'; // Ваш токен
    const chatIds = ['1323961884']; // Массив с chat_id

    const message = `Ура! Марина хочет!:\nМагазин: ${marketplace}\nВремя: ${time}`;

    // Отправляем сообщение каждому пользователю
    for (const chatId of chatIds) {
        const url = `https://api.telegram.org/bot${token}/sendMessage`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                }),
            });

            const result = await response.json();
            console.log('Ответ от сервера для chat_id', chatId, ':', result);

            if (!result.ok) {
                console.error('Ошибка для chat_id', chatId, ':', result);
            }
        } catch (error) {
            console.error('Ошибка для chat_id', chatId, ':', error);
        }
    }

    alert('Ваша заявка успешно отправлена!');
    closeForm();
}

// Обработка отправки формы (всплывающее окно)
document.getElementById('applicationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const marketplace = document.getElementById('marketplace').value;
    const time = document.getElementById('timePicker').value; 
    sendToTelegram(marketplace, time);
});

// Обработка отправки формы в разделе контактов
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const marketplace = document.getElementById('contactMarketplace').value;
    const time = document.getElementById('contactTimePicker').value; 
    sendToTelegram(marketplace, time);
});
