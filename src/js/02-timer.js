import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const date = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysToEnd = document.querySelector('[data-days]');
const hoursToEnd = document.querySelector('[data-hours]');
const minutesToEnd = document.querySelector('[data-minutes]');
const secondsToEnd = document.querySelector('[data-seconds]');

const timer = document.querySelector('.timer');
const fields = document.querySelectorAll('.field');
const values = document.querySelectorAll('.value');

timer.style.display = 'flex';
timer.style.justifyContent = 'space-between';
timer.style.marginTop = '20px';
timer.style.width = '215px';
fields.forEach(item => {
  item.style.display = 'flex';
  item.style.flexDirection = 'column';
  item.style.alignItems = 'center';
  item.style.fontWeight = '500';
  item.style.fontSize = '12px';
  item.style.textTransform = 'uppercase';
});
values.forEach(item => {
  item.style.fontSize = '28px';
});

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
      return;
    }
    Notiflix.Notify.success('super!Click on start');
    startBtn.disabled = false;
  },
};

flatpickr(date, options);

startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  startBtn.disabled = true;
  date.disabled = true;

  const timerId = setInterval(() => {
    const currentDate = new Date();
    const selectedDate = new Date(date.value);
    const timeToEnd = selectedDate - currentDate;
    const { days, hours, minutes, seconds } = convertMs(timeToEnd);

    daysToEnd.textContent = addLeadingZero(days);
    hoursToEnd.textContent = addLeadingZero(hours);
    minutesToEnd.textContent = addLeadingZero(minutes);
    secondsToEnd.textContent = addLeadingZero(seconds);

    if (timeToEnd < 1000) {
      Notiflix.Notify.success('Time is over!');
      clearInterval(timerId);
      date.disabled = false;
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
