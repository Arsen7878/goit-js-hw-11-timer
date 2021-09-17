const refs = {
  days: document.querySelector(' [data-value="days"]'),
  hours: document.querySelector(' [data-value="hours"]'),
  mins: document.querySelector(' [data-value="mins"]'),
  secs: document.querySelector(' [data-value="secs"]'),
  btnStart: document.querySelector('[ data-action="start"]'),
  btnStop: document.querySelector('[ data-action="stop"]'),
  inputRef: document.querySelector('[data-action="input"]'),
};

const CountdownTimer = {
  intervalId: null,
  isActive: false,

  start() {
    if (this.isActive) {
      return;
    }
    if (refs.inputRef.valueAsDate === null) {
      alert('Выберете дату');
    }
    const targetData = refs.inputRef.valueAsDate.valueOf();
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const time = targetData - currentTime;
      if (time < 0) {
        time = 0;
      }
      const timeComponents = getTime(time);
      updateTime(timeComponents);
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
    clearTime();
    this.isActive = false;
    refs.inputRef.value = '';
  },
};

function pad(num) {
  return String(num).padStart(2, 0);
}

function getTime(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
  return { days, hours, mins, secs };
}

function updateTime({ days, hours, mins, secs }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.mins.textContent = mins;
  refs.secs.textContent = secs;
}
function clearTime() {
  refs.days.textContent = '00';
  refs.hours.textContent = '00';
  refs.mins.textContent = '00';
  refs.secs.textContent = '00';
}

refs.btnStart.addEventListener('click', () => {
  CountdownTimer.start();
  console.dir(refs.inputRef.valueAsDate.valueOf());
});

refs.btnStop.addEventListener('click', () => {
  CountdownTimer.stop();
});

// new CountdownTimer({
//   selector: '#timer-1',
//   targetDate: new Date('Jul 17, 2019'),
// });
