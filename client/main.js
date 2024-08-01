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
  displaycards();
}
fetchcards();

let cardstotal = [];

function double(array) {
  for (let i = 0; i < array.length; i++) {
    cardstotal.push(array[i]);
    cardstotal.push(array[i]);
  }
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

function displaycards() {
  shuffle(cardstotal);
  for (let i = 0; i < cardstotal.length; i++) {
    const x = document.getElementById("card" + i);
    x.src = cardstotal[i].cardimage;
    const y = document.getElementById("cardname" + i);
    y.innerText = cardstotal[i].cardname;
  }
}
console.log(cardstotal);
let card0 = document.getElementById("flip-card");
let card1 = document.getElementById("flip-card1");
let card2 = document.getElementById("flip-card2");
let card3 = document.getElementById("flip-card3");
let card4 = document.getElementById("flip-card4");
let card5 = document.getElementById("flip-card5");
let card6 = document.getElementById("flip-card6");
let card7 = document.getElementById("flip-card7");
let card8 = document.getElementById("flip-card8");
let card9 = document.getElementById("flip-card9");
let card10 = document.getElementById("flip-card10");
let card11 = document.getElementById("flip-card11");
let cardcheck = null;
let cardpick1 = null;
let cardpick2 = null;
let cardpick1index = null;
let cardpick2index = null;
let score = 0;
const allcards = [
  card0,
  card1,
  card2,
  card3,
  card4,
  card5,
  card6,
  card7,
  card8,
  card9,
  card10,
  card11,
];
for (let i = 0; i < allcards.length; i++) {
  allcards[i].addEventListener("click", function () {
    console.log(cardstotal[i].cardname);
    if (cardpick1 === null) {
      cardpick1 = cardstotal[i].cardname;
      cardpick1index = i;
    } else {
      cardpick2 = cardstotal[i].cardname;
      cardpick2index = i;
      if (cardpick1 === cardpick2) {
        console.log("Match");
        score++;
        wincheck();
      } else {
        console.log("No Match");
        seconds += 5;
        setTimeout(function () {
          allcards[cardpick1index].classList.toggle("flipped");
          allcards[cardpick2index].classList.toggle("flipped");
        }, 1000);
      }
      cardpick1 = null;
      cardpick2 = null;
    }
  });
}

function wincheck() {
  if (score === 6) {
    console.log("win");
    stopTimer();
  } else if (score !== 6) {
    let remaining = 6 - score;
    console.log("you need " + remaining + " more matches to win");
  }
}

// timer functions
let timer;
let seconds = 0;
let isRunning = false;
let bestScores = JSON.parse(localStorage.getItem("bestScores")) || [];
const minutesDisplay = document.getElementById("counterDisplayMin");
const secondsDisplay = document.getElementById("counterDisplaySec");
const goBtn = document.getElementById("goBtn");
const stopButton = document.getElementById("stopBtn");
const resetButton = document.getElementById("restartBtn");
const ps1 = document.getElementById("ps1");
const ps2 = document.getElementById("ps2");
const ps3 = document.getElementById("ps3");
const na1 = document.getElementById("na1");
const na2 = document.getElementById("na2");
const na3 = document.getElementById("na3");
const flexBoxCardOverlay = document.querySelector(".flexboxcardoverlay");
flexBoxCardOverlay.style.display = "block";

//start game time with go button
goBtn.addEventListener("click", function startTimer() {
  if (!isRunning) {
    timer = setInterval(() => {
      seconds++;
      updateTimerDisplay();
    }, 1000);
    isRunning = true;
    flexBoxCardOverlay.style.display = "none";
  }
});

function updateTimerDisplay() {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  minutesDisplay.textContent = minutes;
  secondsDisplay.textContent = secs;
}

//Stop Timer function to be used when all matches completed
function stopTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    promptForName();
  }
}

//restart button function resets time without recording in local storgage and resets go page
resetButton.addEventListener("click", function resetTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    seconds = 0;
    updateTimerDisplay();
    flexBoxCardOverlay.style.display = "block";
  }
});

// on stop timer makes a prompt for name and passes to record time function
function promptForName() {
  let name = prompt("Enter your initials (max 3 letters):", "");
  if (name) {
    name = name.substring(0, 3).toUpperCase();
    recordTime(name);
  }
}
//records name and time passes to update scoreboard and updateleaderboard
function recordTime(name) {
  const userScore = { name: name, time: seconds };
  bestScores.push({ name: name, time: seconds });
  bestScores.sort((a, b) => a.time - b.time);
  if (bestScores.length > 3) {
    bestScores.pop();
  }
  localStorage.setItem("bestScores", JSON.stringify(bestScores));
  updateScoreboard();
  updateLeaderBoard(userScore);
}
//updates local scoreboard and memory
function updateScoreboard() {
  const entries = bestScores.map((entry) => {
    const minutes = String(Math.floor(entry.time / 60)).padStart(2, "0");
    const secs = String(entry.time % 60).padStart(2, "0");
    return { name: entry.name, time: `${minutes}:${secs}` };
  });
  [na1, na2, na3].forEach((element, index) => {
    element.textContent = entries[index] ? entries[index].name : "---";
  });
  [ps1, ps2, ps3].forEach((element, index) => {
    element.textContent = entries[index] ? entries[index].time : "0";
  });
}
document.addEventListener("DOMContentLoaded", updateScoreboard);

// posts score to leaderboard database and restarts the page after 2 secounds so leaderboard on page is updated
async function updateLeaderBoard(entry) {
  const minutes = String(Math.floor(entry.time / 60)).padStart(2, "0");
  const secs = String(entry.time % 60).padStart(2, "0");
  const scoreToSend = { userName: entry.name, timeMin: minutes, timeSec: secs };
  console.log(scoreToSend);
  const res = await fetch("http://localhost:8080/leaderboard", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(scoreToSend),
  });
  setTimeout(function () {
    location.reload();
  }, 2000);
}
//pulls leader board top 3 scores from database and displayes in leaderboard on page
async function leaderboardscores() {
  const lbresults = await fetch("http://localhost:8080/leaderboard");
  const lbdata = await lbresults.json();
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
