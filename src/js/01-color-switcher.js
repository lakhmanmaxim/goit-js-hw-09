const body = document.querySelector('body');
const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');

buttonStop.setAttribute('disabled', false);

const DELAY_CHANGE_BODY_COLOR = 1000;

let intervalIdChangeBodyColor = null;

buttonStart.addEventListener('click', startChangeBodyColor);
buttonStop.addEventListener('click', stopChangeBodyColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyColor(evt) {
  body.style.backgroundColor = getRandomHexColor();
}

function startChangeBodyColor(evt) {
  body.style.backgroundColor = getRandomHexColor();
  buttonStart.setAttribute('disabled', true);
  buttonStop.removeAttribute('disabled');
  intervalIdChangeBodyColor = setInterval(
    changeBodyColor,
    DELAY_CHANGE_BODY_COLOR
  );
}

function stopChangeBodyColor(evt) {
  clearInterval(intervalIdChangeBodyColor);
  buttonStart.removeAttribute('disabled');
  buttonStop.setAttribute('disabled', true);
}
