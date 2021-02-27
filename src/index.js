import './styles.css';

function pad (value) {
    return String(value).padStart(2, '0');
};

function getTimeFormat (time) {
    const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
};

function moment(time) {
    return getTimeFormat(time)
}
class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.timerId = null;
        this.targetDate = targetDate;
        this.refs = {
            $days: document.querySelector(`${selector} [data-value="days"]`),
            $hours: document.querySelector(`${selector} [data-value="hours"]`),
            $mins: document.querySelector(`${selector} [data-value="mins"]`),
            $secs:document.querySelector(`${selector} [data-value="secs"]`),
        }
    }
     start() {
         this.timerId = setInterval(() => { 
             const deltaTime = this.targetDate - Date.now()
         const time = moment(deltaTime)
         this.updInterface(time)
         }, 1000)
         
    };
    updInterface({ days, hours, mins, secs }) {
        const { $days, $hours, $mins, $secs } = this.refs
        $days.textContent = days
        $hours.textContent = hours
        $mins.textContent = mins
        $secs.textContent = secs 
        
    }
}

function initTimer (selector, targetDate) {
    const timer = new CountdownTimer({ selector, targetDate });
    timer.start()

}
initTimer('#timer-1', new Date('Jul 17, 2021'));


//second version (чистий копіпаст, просто в гуглі знайшла підходящий варіант таймера :) ) 
// function getTimeRemaining(endtime) {
//   var t = Date.parse(endtime) - Date.parse(new Date());
//   var seconds = Math.floor((t / 1000) % 60);
//   var minutes = Math.floor((t / 1000 / 60) % 60);
//   var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
//   var days = Math.floor(t / (1000 * 60 * 60 * 24));
//   return {
//     'total': t,
//     'days': days,
//     'hours': hours,
//     'minutes': minutes,
//     'seconds': seconds
//   };
// }

// function initializeClock(id, endtime) {
//   var clock = document.getElementById(id);
//   var daysSpan = clock.querySelector('.days');
//   var hoursSpan = clock.querySelector('.hours');
//   var minutesSpan = clock.querySelector('.minutes');
//   var secondsSpan = clock.querySelector('.seconds');

//   function updateClock() {
//     var t = getTimeRemaining(endtime);

//     daysSpan.innerHTML = t.days;
//     hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
//     minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
//     secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

//     if (t.total <= 0) {
//       clearInterval(timeinterval);
//     }
//   }

//   updateClock();
//   var timeinterval = setInterval(updateClock, 1000);
// }

// var deadline="July 17 2021 00:00:00 GMT+0300"; //for Ukraine
// initializeClock('countdown', deadline);