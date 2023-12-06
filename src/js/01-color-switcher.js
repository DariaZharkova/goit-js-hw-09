function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

let timerId;

startButton.addEventListener('click', onStartClick);
stopButton.addEventListener('click', onStopClick);

function onStartClick() {
  startButton.disabled = true;
  stopButton.disabled = false;
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopClick() {
  clearInterval(timerId);
  startButton.disabled = false;
  stopButton.disabled = true;
}
