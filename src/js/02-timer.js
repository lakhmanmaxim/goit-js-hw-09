import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const buttonStart = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

buttonStart.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  minDate: 'today',
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    buttonStart.removeAttribute('disabled');
    let requestDate = selectedDates[0];
    requestedDate = selectedDates[0].getTime();

    const timerTime = selectedDates[0].getTime() - Date.now();
    console.log(convertMs(timerTime));

    if (timerTime <= 0) {
      Notiflix.Report.warning(
        'Wrong Date',
        'Please choose a date in the future',
        'I understand, Thanks'
      );
    }
  },
};

flatpickr('#datetime-picker', options);

buttonStart.addEventListener('click', onStartButtonClick);

const timer = {
  intervalId: null,
  countdownIsActive: false,

  onClose() {
    if (this.countdownIsActive) {
      return;
    }

    this.countdownIsActive = true;

    let countdown = requestedDate - Date.now();

    intervalId = setInterval(() => {
      countdown = countdown -= 1000;
      const timerComponents = convertMs(countdown);
      updateTimeText(timerComponents);
      if (countdown <= 1000) {
        stopInterval(this.intervalId);
      }
    }, 1000);
  },
};

function onStartButtonClick() {
  timer.onClose();
  buttonStart.setAttribute('disabled', true);
}

function stopInterval(interval) {
  clearInterval(interval);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimeText({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
}
