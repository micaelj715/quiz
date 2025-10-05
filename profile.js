const avatarEl = document.getElementById("avatar");
const totalGamesEl = document.getElementById("total-games");
const highscoreEl = document.getElementById("highscore");
const accuracyEl = document.getElementById("accuracy");
const coinsEl = document.getElementById("coins");
const levelEl = document.getElementById("level");
const xpEl = document.getElementById("xp");
const achievementsEl = document.getElementById("achievements");
const changeAvatarBtn = document.getElementById("change-avatar");
const backBtn = document.getElementById("back-btn");

function updateProfile(){
  let totalGames = parseInt(localStorage.getItem("totalGames")||"0");
  let highscore = parseInt(localStorage.getItem("highScore")||"0");
  let correctAnswers = parseInt(localStorage.getItem("correctAnswers")||"0");
  let totalAnswers = parseInt(localStorage.getItem("totalAnswers")||"0");
  let avatar = localStorage.getItem("avatar")||"🙂";
  let coins = parseInt(localStorage.getItem("coins")||"0");
  let xp = parseInt(localStorage.getItem("xp")||"0");
  let level = parseInt(localStorage.getItem("level")||"1");

  avatarEl.textContent = avatar;
  totalGamesEl.textContent = totalGames;
  highscoreEl.textContent = highscore;
  const accuracy = totalAnswers>0 ? Math.round((correctAnswers/totalAnswers)*100) : 0;
  accuracyEl.textContent = accuracy + "%";
  coinsEl.textContent = coins;
  levelEl.textContent = level;
  xpEl.textContent = xp;

  achievementsEl.innerHTML = "";
  if(highscore>=4) achievementsEl.innerHTML += "<li>🏅 Mestre do Quiz!</li>";
  if(totalGames>=5) achievementsEl.innerHTML += "<li>🎖️ Jogador Persistente</li>";
  if(xp>=50) achievementsEl.innerHTML += "<li>⭐ Ganha Experiência!</li>";
}

changeAvatarBtn.addEventListener("click", ()=>{
  const newAvatar = prompt("Digite um emoji para seu avatar:", avatarEl.textContent);
  if(newAvatar){
    localStorage.setItem("avatar",newAvatar);
    updateProfile();
  }
});

backBtn.addEventListener("click", ()=>{
  window.location.href="index.html";
});

updateProfile();
