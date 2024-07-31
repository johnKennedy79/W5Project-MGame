let toggleSideBarStatus = false;
const scoreBtn = document.getElementById("scoreBtn");

let toggleSideBar = function () {
  let getSideBar = document.querySelector(".sideBar");

  if (toggleSideBarStatus === false) {
    getSideBar.style.translate = "0%";
    toggleSideBarStatus = true;
  } else if (toggleSideBarStatus === true) {
    getSideBar.style.translate = "-100%";
    toggleSideBarStatus = false;
  }
};

scoreBtn.addEventListener("click", toggleSideBar);

async function fetchGames() {
  // talk to the server and ask for the array of games
  const result = await fetch(`http://localhost:8080/cards`);
  // how to read the incoming data
  const cards = await result.json();
  console.log(cards);
}

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

let cardstotal = [];

function double(array) {
  for (let i = 0; i < array.length; i++) {
    cardstotal.push(X[i]);
    cardstotal.push(X[i]);
  }
}

function resetcards() {
  while (cardstotal.length > 0) {
    cardstotal.pop();
  }
}


async function leaderboardscores() {
  const lbresults = await fetch("http://localhost:8080/leaderboard");
  const lbdata = await lbresults.json();
  console.log(lbdata);
  const lbp = document.getElementById("lbp");
  lbp.innerHTML = "";
  for (let i = 0; i < lbdata.length; i++) {
    const lbrow = document.createElement("tr");
    const lbu = document.createElement("td");
    lbu.textContent = lbdata[i].username;
    lbrow.appendChild(lbu);

    const lbm = document.createElement("td");
    lbm.textContent = lbdata[i].timemin + " : ";
    lbrow.appendChild(lbm);

    const lbs = document.createElement("td");
    lbs.textContent = lbdata[i].timesec;
    lbrow.appendChild(lbs);

    lbp.appendChild(lbrow);
  }
}

leaderboardscores();

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