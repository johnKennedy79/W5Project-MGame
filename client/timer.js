let timer;
let seconds = 0;
let isRunning = false;
let times = [];

const minutesDisplay = document.getElementById('counterDisplayMin');
const secondsDisplay = document.getElementById('counterDisplaySec');
const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const resetButton = document.getElementById('restartBtn');
const ps1 = document.getElementById('ps1');
const ps2 = document.getElementById('ps2');
const ps3 = document.getElementById('ps3');

function updateTimerDisplay() {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    minutesDisplay.textContent = minutes;
    secondsDisplay.textContent = secs;
}

function startTimer() {
    if (!isRunning) {
        timer = setInterval(() => {
            seconds++;
            updateTimerDisplay();
        }, 1000);
        isRunning = true;
    }
}

function stopTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        recordTime();
    }
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    updateTimerDisplay();
}

function recordTime() {
    times.push(seconds);
    times.sort((a, b) => a - b);
    if (times.length > 3) {
        times.pop();
    }
    updateScoreboard();
}

function updateScoreboard() {
    const formattedTimes = times.map(time => {
        const minutes = String(Math.floor(time / 60)).padStart(2, '0');
        const secs = String(time % 60).padStart(2, '0');
        return `${minutes}:${secs}`;
    });
    ps1.textContent = formattedTimes[0] || '0';
    ps2.textContent = formattedTimes[1] || '0';
    ps3.textContent = formattedTimes[2] || '0';
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
