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
    let requestedDate = selectedDates[0].getTime();
    const timerTime = requestedDate - Date.now();
    console.log(timerTime);

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
  intervalID: null,

  onClose() {
    const currentTime = Date.now();
    const requestedDate = selectedDates[0].getTime();

    let countdown = requestedDate - currentTime;

    this.intervalID = setInterval(() => {
      countdown = countdown -= 1000;
      const timerComponents = convertMs(countdown);
      updateTimeText(timerComponents);
      if (countdown <= 1000) {
        stopInterval(this.intervalID);
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
  console.log(`Interval with id ${interval} has stopped!`);
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
