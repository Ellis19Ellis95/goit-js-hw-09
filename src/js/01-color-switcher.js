// Отримання посилань на кнопки та body
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;

// Функція для генерації випадкового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

let intervalId = null;

// Функція для зміни кольору фону
function changeColor() {
  body.style.backgroundColor = getRandomHexColor();
}

// Обробник подій для кнопки "Start"
startButton.addEventListener('click', () => {
  // Вимкнення кнопки "Start"
  startButton.disabled = true;
  
  // Запуск інтервалу зі зміною кольору кожну секунду
  intervalId = setInterval(changeColor, 1000);
});

// Обробник подій для кнопки "Stop"
stopButton.addEventListener('click', () => {
  // Включення кнопки "Start"
  startButton.disabled = false;
  
  // Зупинка інтервалу зі зміною кольору
  clearInterval(intervalId);
  // Скидання кольору на початковий
  body.style.backgroundColor = '';
});
