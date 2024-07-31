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


