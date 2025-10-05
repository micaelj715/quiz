// Partículas animadas
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 60;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 4 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = `rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},0.7)`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if(this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
  }
}

for(let i=0;i<particleCount;i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ----------------- Botões do Hub -----------------
document.getElementById("play-btn").addEventListener("click", () => {
  localStorage.setItem("selectedCategory", "Random");
  window.location.href = "quiz.html";
});

document.getElementById("categories-btn").addEventListener("click", () => {
  window.location.href = "categories.html";
});

document.getElementById("profile-btn").addEventListener("click", () => {
  window.location.href = "profile.html";
});

document.getElementById("ranking-btn").addEventListener("click", () => {
  window.location.href = "ranking.html";
});

document.getElementById("settings-btn").addEventListener("click", () => {
  window.location.href = "settings.html";
});

// Mostrar avatar e recorde no Hub
const hubLogo = document.querySelector(".logo");
const highScore = localStorage.getItem("highScore") || 0;
const avatar = localStorage.getItem("avatar") || "🙂";
hubLogo.textContent = `${avatar} Quiz do Micael 🎯 (Recorde: ${highScore})`;
