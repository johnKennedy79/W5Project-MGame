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

async function fetchcards() {
  // talk to the server and ask for the array of games
  const result = await fetch(`http://localhost:8080/cards`);
  // how to read the incoming data
  const cards = await result.json();
  double(cards);
}
fetchGames();

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


//add in card flip functions

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});

// timer functions
let timer;
let seconds = 0;
let isRunning = false;
let times = [];

const minutesDisplay = document.getElementById("counterDisplayMin");
const secondsDisplay = document.getElementById("counterDisplaySec");
const startButton = document.getElementById("startBtn");
const stopButton = document.getElementById("stopBtn");
const resetButton = document.getElementById("restartBtn");
const ps1 = document.getElementById("ps1");
const ps2 = document.getElementById("ps2");
const ps3 = document.getElementById("ps3");

function updateTimerDisplay() {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
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

function displaycards() {
  shuffle(cardstotal);
  for (let i = 0; i < cardstotal.length; i++) {
    x = document.getElementById("card" + i);
    x.src = cardstotal.cardImage[i];
    y = document.getElementById("cardname" + i);
    y.innerText = cardstotal.cardName[i];
  }
}
displaycards();



function recordTime() {
  times.push(seconds);
  times.sort((a, b) => a - b);
  if (times.length > 3) {
    times.pop();
  }
  updateScoreboard();
}

function updateScoreboard() {
  const formattedTimes = times.map((time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const secs = String(time % 60).padStart(2, "0");
    return `${minutes}:${secs}`;
  });
  ps1.textContent = formattedTimes[0] || "0";
  ps2.textContent = formattedTimes[1] || "0";
  ps3.textContent = formattedTimes[2] || "0";
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

// async function (){
//     const res = await fetch ("http://localhost:8080/leaderboard")
// }

//leader board
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

