const rankingList = document.getElementById("ranking-list");
const backBtn = document.getElementById("back-btn");

// Simula um ranking local Top 5 usando localStorage
let highScore = parseInt(localStorage.getItem("highScore")||0);
let avatar = localStorage.getItem("avatar")||"🙂";

let ranking = JSON.parse(localStorage.getItem("ranking")||"[]");

// Adiciona o jogador atual se não estiver
ranking.push({avatar: avatar, score: highScore});

// Ordena por score decrescente e mantém top 5
ranking = ranking.sort((a,b)=>b.score-a.score).slice(0,5);

// Salva de volta
localStorage.setItem("ranking", JSON.stringify(ranking));

// Renderiza lista
rankingList.innerHTML = "";
ranking.forEach((player,i)=>{
  rankingList.innerHTML += `<li>${player.avatar} - ${player.score} pontos</li>`;
});

backBtn.addEventListener("click", ()=>{
  window.location.href="index.html";
});
