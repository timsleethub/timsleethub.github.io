let year = 2021;
const newYears = new Date(year + "-01-01T00:00:00Z").getTime();

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');


function countdown() {
  const currentDate = new Date();

  const distance = newYears - currentDate;

  if (distance <= 0) {
    year = year++;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24 ));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysEl.innerHTML = formatTime(days);
  hoursEl.innerHTML = formatTime(hours);
  minutesEl.innerHTML = formatTime(minutes);
  secondsEl.innerHTML = formatTime(seconds);
}

function formatTime(time) {
  return time < 10 ? (`0${time}`) : time;
}

countdown();

setInterval(countdown, 1000)