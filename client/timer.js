let timer;
let seconds = 0;
let isRunning = false;
let bestScores = JSON.parse(localStorage.getItem('bestScores')) || [];

const minutesDisplay = document.getElementById('counterDisplayMin');
const secondsDisplay = document.getElementById('counterDisplaySec');
const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const resetButton = document.getElementById('restartBtn');
const ps1 = document.getElementById('ps1');
const ps2 = document.getElementById('ps2');
const ps3 = document.getElementById('ps3');
const na1 = document.getElementById('na1');
const na2 = document.getElementById('na2');
const na3 = document.getElementById('na3');

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
        promptForName();
    }
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    updateTimerDisplay();
}

resetButton.addEventListener('click', resetTimer);

function promptForName() {
    let name = prompt("Enter your initials (max 3 letters):", "");
    if (name) {
        name = name.substring(0, 3).toUpperCase();
        recordTime(name);
    }
}

function recordTime(name) {
    bestScores.push({ name: name, time: seconds });
    bestScores.sort((a, b) => a.time - b.time);
    if (bestScores.length > 3) {
        bestScores.pop();
    }
    localStorage.setItem('bestScores', JSON.stringify(bestScores));
    updateScoreboard();
}

function updateScoreboard() {
    const entries = bestScores.map(entry => {
        const minutes = String(Math.floor(entry.time / 60)).padStart(2, '0');
        const secs = String(entry.time % 60).padStart(2, '0');
        return { name: entry.name, time: `${minutes}:${secs}` };
    });
    [na1, na2, na3].forEach((element, index) => {
        element.textContent = entries[index] ? entries[index].name : '---';
    });
    [ps1, ps2, ps3].forEach((element, index) => {
        element.textContent = entries[index] ? entries[index].time : '0';
    });
}
document.addEventListener('DOMContentLoaded', updateScoreboard);

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
