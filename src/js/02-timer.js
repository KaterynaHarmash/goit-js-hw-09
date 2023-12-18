import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startTimerBtn = document.querySelector('button[data-start');
const timerDaysRef = document.querySelector('.value[data-days]');
const timerHoursRef = document.querySelector('.value[data-hours]');
const timerMinutesRef = document.querySelector('.value[data-minutes]');
const timerSecondsRef = document.querySelector('.value[data-seconds]');

startTimerBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        
        if (selectedDates[0]<Date.now()) {
            Notiflix.Notify.failure("Please choose a date in the future");
            return;
        }
        startTimerBtn.addEventListener('click', () => {
            startTimerBtn.disabled = true;
            const intervalId = setInterval(() => {
                    const currentTime = Date.now();
                    const deltaTime = selectedDates[0] - currentTime;
                    if (deltaTime<1000) {
                        clearInterval(intervalId);
                    }
                    const time = convertMs(deltaTime);
                    updateTimerClock(time);
                }, 1000);
        })
        startTimerBtn.disabled = false;
        console.log(selectedDates[0]);
    },
};


flatpickr("#datetime-picker", options);

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
function updateTimerClock({ days, hours, minutes, seconds }) {
    timerDaysRef.textContent = addLeadingZero(days);
    timerHoursRef.textContent = addLeadingZero(hours);
    timerMinutesRef.textContent = addLeadingZero(minutes);
    timerSecondsRef.textContent = addLeadingZero(seconds);
}