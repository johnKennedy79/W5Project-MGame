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
fetchcards();

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

card0.addEventListener("click", function () {
  if (cardcheck === null) {
    cardcheck = cardstotal[0];
    cardpick1 = card0;
  } else {
    cardpick2 = card0;
    if (cardpick1 === cardpick2) {
      cardpick1.classList.toggle("flipped");
      cardpick1 = null;
      cardpick2.classList.toggle("flipped");
      cardpick2 = null;
      cardcheck = null;
    } else if (cardcheck === cardstotal[0]) {
      score++;
      cardpick1 = null;
      cardpick2 = null;
      cardcheck = null;
    } else if (cardcheck !== cardstotal[0]) {
      seconds + 5;
      cardpick1 = null;
      cardpick2 = null;
      cardcheck = null;
    }
  }
});

card1.addEventListener("click", function () {
  if (cardcheck === null) {
    cardcheck = cardstotal[1];
    cardpick1 = card1;
  } else {
    cardpick2 = card1;
    if (cardpick1 === cardpick2) {
      cardpick1.classList.toggle("flipped");
      cardpick1 = null;
      cardpick2.classList.toggle("flipped");
      cardpick2 = null;
      cardcheck = null;
    } else if (cardcheck === cardstotal[1]) {
      score++;
      cardpick1 = null;
      cardpick2 = null;
      cardcheck = null;
    } else if (cardcheck !== cardstotal[1]) {
      seconds + 5;
      cardpick1 = null;
      cardpick2 = null;
      cardcheck = null;
    }
  }
});

card2.addEventListener("click", function () {
  if (cardcheck === null) {
    cardcheck = cardstotal[2];
    cardpick1 = card2;
  } else {
    cardpick2 = card2;
    if (cardpick1 === cardpick2) {
      cardpick1.classList.toggle("flipped");
      cardpick1 = null;
      cardpick2.classList.toggle("flipped");
      cardpick2 = null;
      cardcheck = null;
    } else if (cardcheck === cardstotal[2]) {
      score++;
      cardpick1 = null;
      cardpick2 = null;
      cardcheck = null;
    } else if (cardcheck !== cardstotal[2]) {
      seconds + 5;
      cardpick1 = null;
      cardpick2 = null;
      cardcheck = null;
    }
  }
});

card3.addEventListener("click", function () {
  if (cardcheck === null) {
    cardcheck = cardstotal[3];
    cardpick1 = card3;
  } else {
    cardpick2 = card3;
    if (cardpick1 === cardpick2) {
      cardpick1.classList.toggle("flipped");
      cardpick1 = null;
      cardpick2.classList.toggle("flipped");
      cardpick2 = null;
      cardcheck = null;
    } else if (cardcheck === cardstotal[3]) {
      score++;
      cardpick1 = null;
      cardpick2 = null;
      cardcheck = null;
    } else if (cardcheck !== cardstotal[3]) {
      seconds + 5;
      cardpick1 = null;
      cardpick2 = null;
      cardcheck = null;
    }
  }
});

card4.addEventListener("click", function () {
  if (cardcheck === null) {
    cardcheck = cardstotal[4];
    cardpick1 = card4;
  } else {
    cardpick2 = card4;
    if (cardpick1 === cardpick2) {
      cardpick1.classList.toggle("flipped");
      cardpick1 = null;
      cardpick2.classList.toggle("flipped");
      cardpick2 = null;
      cardcheck = null;
    } else if (cardcheck === cardstotal[4]) {
      score++;
      cardpick1 = null;
      cardpick2 = null;
      cardcheck = null;
    } else if (cardcheck !== cardstotal[4]) {
      seconds + 5;
      cardpick1 = null;
      cardpick2 = null;
      cardcheck = null;
    }
  }
});

card5.addEventListener("click", function () {
  if (cardcheck === null) {
    cardcheck = cardstotal[5];
    cardpick1 = card5;
  } else {
    cardpick2 = card5;
    if (cardpick1 === cardpick2) {
      cardpick1.classList.toggle("flipped");
      cardpick1 = null;
      cardpick2.classList.toggle("flipped");
      cardpick2 = null;
      cardcheck = null;
    } else if (cardcheck === cardstotal[5]) {
      score++;
      cardpick1 = null;
      cardpick2 = null;
      cardcheck = null;
    } else if (cardcheck !== cardstotal[5]) {
      seconds + 5;
      cardpick1 = null;
      cardpick2 = null;
      cardcheck = null;
    }
  }
});

card6.addEventListener("click", function () {
  if (cardcheck === null) {
    cardcheck = cardstotal[6];
    cardpick1 = card6;
  } else {
    cardpick2 = card6;
    if (cardpick1 === cardpick2) {
      cardpick1.classList.toggle("flipped");
      cardpick1 = null;
      cardpick2.classList.toggle("flipped");
      cardpick2 = null;
      cardcheck = null;
    } else if (cardcheck === cardstotal[6]) {
      score++;
      cardpick1 = null;
      cardpick2 = null;
      cardcheck = null;
    } else if (cardcheck !== cardstotal[6]) {
      seconds + 5;
      cardpick1 = null;
      cardpick2 = null;
      cardcheck = null;
    }
  }
});

card7.addEventListener("click", function () {
  if (cardcheck === null) {
    cardcheck = cardstotal[7];
    cardpick1 = card7;
  } else {
    cardpick2 = card7;
    if (cardpick1 === cardpick2) {
      cardpick1.classList.toggle("flipped");
      cardpick1 = null;
      cardpick2.classList.toggle("flipped");
      cardpick2 = null;
      cardcheck = null;
    } else if (cardcheck === cardstotal[7]) {
      score++;
      cardpick1 = null;
      cardpick2 = null;
      cardcheck = null;
    } else if (cardcheck !== cardstotal[7]) {
      seconds + 5;
      cardpick1 = null;
      cardpick2 = null;
      cardcheck = null;
    }
  }
});

card8.addEventListener("click", function () {
  if (cardcheck === null) {
    cardcheck = cardstotal[8];
    cardpick1 = card8;
  } else {
    cardpick2 = card8;
    if (cardpick1 === cardpick2) {
      cardpick1.classList.toggle("flipped");
      cardpick1 = null;
      cardpick2.classList.toggle("flipped");
      cardpick2 = null;
      cardcheck = null;
    } else if (cardcheck === cardstotal[8]) {
      score++;
      cardpick1 = null;
      cardpick2 = null;
      cardcheck = null;
    } else if (cardcheck !== cardstotal[8]) {
      seconds + 5;
      cardpick1 = null;
      cardpick2 = null;
      cardcheck = null;
    }
  }
});

card9.addEventListener("click", function () {
  if (cardcheck === null) {
    cardcheck = cardstotal[9];
    cardpick1 = card9;
  } else {
    cardpick2 = card9;
    if (cardpick1 === cardpick2) {
      cardpick1.classList.toggle("flipped");
      cardpick1 = null;
      cardpick2.classList.toggle("flipped");
      cardpick2 = null;
      cardcheck = null;
    } else if (cardcheck === cardstotal[9]) {
      score++;
      cardpick1 = null;
      cardpick2 = null;
      cardcheck = null;
    } else if (cardcheck !== cardstotal[9]) {
      seconds + 5;
      cardpick1 = null;
      cardpick2 = null;
      cardcheck = null;
    }
  }
});

card10.addEventListener("click", function () {
  if (cardcheck === null) {
    cardcheck = cardstotal[10];
    cardpick1 = card10;
  } else {
    cardpick2 = card10;
    if (cardpick1 === cardpick2) {
      cardpick1.classList.toggle("flipped");
      cardpick1 = null;
      cardpick2.classList.toggle("flipped");
      cardpick2 = null;
      cardcheck = null;
    } else if (cardcheck === cardstotal[10]) {
      score++;
      cardpick1 = null;
      cardpick2 = null;
      cardcheck = null;
    } else if (cardcheck !== cardstotal[10]) {
      seconds + 5;
      cardpick1 = null;
      cardpick2 = null;
      cardcheck = null;
    }
  }
});

card11.addEventListener("click", function () {
  if (cardcheck === null) {
    cardcheck = cardstotal[11];
    cardpick1 = card11;
  } else {
    cardpick2 = card11;
    if (cardpick1 === cardpick2) {
      cardpick1.classList.toggle("flipped");
      cardpick1 = null;
      cardpick2.classList.toggle("flipped");
      cardpick2 = null;
      cardcheck = null;
    } else if (cardcheck === cardstotal[11]) {
      score++;
      cardpick1 = null;
      cardpick2 = null;
      cardcheck = null;
    } else if (cardcheck !== cardstotal[11]) {
      seconds + 5;
      cardpick1 = null;
      cardpick2 = null;
      cardcheck = null;
    }
  }
});
