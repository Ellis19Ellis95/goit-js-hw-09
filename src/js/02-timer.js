import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      window.alert("Please choose a date in the future");
      return;
    }
    const startButton = document.querySelector('[data-start]');
    startButton.disabled = false;
  },
};

flatpickr("#datetime-picker", options);

const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdown;

startButton.addEventListener('click', () => {
  const selectedDate = flatpickr.parseDate(document.querySelector('#datetime-picker').value, 'Y-m-d H:i');
  const now = new Date().getTime();
  const distance = selectedDate - now;

  if (distance < 0) {
    window.alert("Please choose a date in the future");
    return;
  }

  startButton.disabled = true;

  clearInterval(countdown);

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = selectedDate - now;

    if (distance <= 0) {
      clearInterval(countdown);
      startButton.disabled = false;
    } else {
      const time = convertMs(distance);
      daysElement.textContent = addLeadingZero(time.days);
      hoursElement.textContent = addLeadingZero(time.hours);
      minutesElement.textContent = addLeadingZero(time.minutes);
      secondsElement.textContent = addLeadingZero(time.seconds);
    }
  }

  updateCountdown();
  countdown = setInterval(updateCountdown, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}
 
