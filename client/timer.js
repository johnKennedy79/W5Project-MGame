const startButton = document.getElementById("startBtn");
const stopButton = document.getElementById("stopBtn");
const restartButton = document.getElementById("restartBtn");

const counterDisplayMin = document.getElementById("counterDisplayMin");
const counterDisplaySec = document.getElementById("counterDisplaySec");

let stopWatchSec = 0;
let stopWatchMin = 1;

let counterMinuteInterval;
let counterSecondInterval;
counterDisplayMin.textContent = "00";
counterDisplaySec.textContent = "00";

startButton.addEventListener("click", startTimer);

function startTimer() {
  counterSecondInterval = setInterval(function () {
    if (stopWatchSec < 9) {
      counterDisplaySec.textContent = "0" + ++stopWatchSec;
    } else {
      counterDisplaySec.textContent = ++stopWatchSec;
    }
    if (stopWatchSec == 60) {
      stopWatchSec = 0;
      if (stopWatchMin < 10) {
        counterDisplayMin.textContent = "0" + stopWatchMin++;
      } else {
        counterDisplayMin.textContent = stopWatchMin++;
      }
    }
  }, 1000);
}

restartButton.addEventListener("click", restartTimer);

function restartTimer() {
  counterDisplayMin.textContent = "00";
  counterDisplaySec.textContent = "00";
  stopWatchMin = 0;
  stopWatchSec = 0;
  clearInterval(counterSecondInterval);
}

stopButton.addEventListener("click", stopTimer);

function stopTimer() {
  clearInterval(counterSecondInterval);
}
