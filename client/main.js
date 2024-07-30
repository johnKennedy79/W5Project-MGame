let toggleSideBarStatus = false;
const scoreBtn = document.getElementById("scoreBtn");

let toggleSideBar = function () {
  let getSideBar = document.querySelector(".sideBar");

  if (toggleSideBarStatus === false) {
    getSideBar.style.visibility = "visible";
    toggleSideBarStatus = true;
  } else if (toggleSideBarStatus === true) {
    getSideBar.style.visibility = "hidden";
    toggleSideBarStatus = false;
  }
};
scoreBtn.addEventListener("click", toggleSideBar);

const updateBestScores = (newTime) => {
  const bestScores = [
    parseInt(document.getElementById("ps1").innerText),
    parseInt(document.getElementById("ps2").innerText),
    parseInt(document.getElementById("ps3").innerText),
  ];

  bestScores.push(newTime);
  bestScores.sort((a, b) => a - b);
  bestScores.splice(3);

  document.getElementById("ps1").innerText = bestScores[0];
  document.getElementById("ps2").innerText = bestScores[1];
  document.getElementById("ps3").innerText = bestScores[2];
};