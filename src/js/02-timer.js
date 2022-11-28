import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const buttonStart = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
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
    const selectedDate = selectedDates[0].getTime();
    const currentDate = Date.now();
    const timerTime = selectedDate - currentDate;
    // console.log(timerTime);
    if (timerTime <= 0) {
      window.alert('Please choose a date in the future');
    }
  },
};

flatpickr('#datetime-picker', options);
