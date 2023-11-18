const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

let intervalId = null;
let lastColor = null;

function changeColor() {
  const newColor = getRandomHexColor();
  body.style.backgroundColor = newColor;
  lastColor = newColor;
}

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  intervalId = setInterval(changeColor, 1000);
  
  // При старті забезпечуємо, щоб кнопка "Stop" була повністю прозорою
  stopButton.style.opacity = '1';
});

stopButton.addEventListener('click', () => {
  startButton.disabled = false;
  clearInterval(intervalId);
  if (lastColor) {
    body.style.backgroundColor = lastColor;
  }
  
  // Змінюємо прозорість кнопки "Stop" при натисканні
  const opacity = parseFloat(stopButton.style.opacity);
  stopButton.style.opacity = opacity === 1 ? '0.6' : '1';
});
