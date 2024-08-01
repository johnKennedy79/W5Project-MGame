const resetBtn = document.getElementById("restartBtn");

const flexBoxCardOverlay = document.querySelector(".flexboxcardoverlay");
flexBoxCardOverlay.style.display = "block";

resetBtn.addEventListener("click", function () {
  flexBoxCardOverlay.style.display = "block";
});

const goBtn = document.getElementById("goBtn");
goBtn.addEventListener("click", function () {
  flexBoxCardOverlay.style.display = "none";
});
