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