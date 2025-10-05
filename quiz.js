const questionEl = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const timerEl = document.getElementById("timer");
const progressFill = document.getElementById("progress-fill");
const categoryTitle = document.getElementById("category-title");
const levelXP = document.getElementById("level-xp");
const coinsEl = document.getElementById("coins");

const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const bgMusic = document.getElementById("bg-music");
const backHubBtn = document.getElementById("back-hub");

let questions = [
  { category: "Ciência", question: "Qual é o símbolo químico da água?", answers: [{text:"H2O",correct:true},{text:"CO2",correct:false},{text:"O2",correct:false},{text:"NaCl",correct:false}] },
  { category: "História", question: "Quem foi o primeiro imperador romano?", answers: [{text:"Júlio César",correct:false},{text:"Augusto",correct:true},{text:"Nero",correct:false},{text:"César Augusto",correct:false}] },
  { category: "Esportes", question: "Quantos jogadores tem um time de futebol?", answers: [{text:"11",correct:true},{text:"10",correct:false},{text:"12",correct:false},{text:"9",correct:false}] },
  { category: "Curiosidades", question: "Qual animal é conhecido por dormir em pé?", answers: [{text:"Cavalo",correct:true},{text:"Leão",correct:false},{text:"Elefante",correct:false},{text:"Girafa",correct:false}] }
];

let currentQuestionIndex = 0;
let score = 0;
let timer = 10;
let timerInterval = null;
let coins = parseInt(localStorage.getItem("coins")||"0");
let xp = parseInt(localStorage.getItem("xp")||"0");
let level = parseInt(localStorage.getItem("level")||"1");

if(localStorage.getItem("soundEnabled") !== "false"){ bgMusic.play(); }

// Partículas de fundo
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particles = [];
for(let i=0;i<50;i++) particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,s:Math.random()*4+1,sx:Math.random()*2-1,sy:Math.random()*2-1});
function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x+=p.sx;p.y+=p.sy;
    if(p.x>canvas.width||p.x<0)p.sx*=-1;
    if(p.y>canvas.height||p.y<0)p.sy*=-1;
    ctx.fillStyle=`rgba(255,255,255,0.7)`;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.s,0,Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ---------------- Eventos ----------------
backHubBtn.addEventListener("click", () => {
  if(confirm("Deseja realmente voltar ao Hub? O progresso atual será perdido.")){
    window.location.href = "index.html";
  }
});

// ---------------- Funções do Quiz ----------------
function startQuiz(){
  score = 0;
  currentQuestionIndex = 0;

  const selectedCategory = localStorage.getItem("selectedCategory") || "Random";
  if(selectedCategory === "Random"){
    questions = questions.sort(() => Math.random() - 0.5);
  } else {
    questions = questions.filter(q => q.category === selectedCategory)
                         .sort(() => Math.random() - 0.5);
  }

  showQuestion();
  updateStats();
}

function showQuestion(){
  const q = questions[currentQuestionIndex];
  categoryTitle.textContent = "Categoria: " + q.category;
  questionEl.textContent = q.question;
  answerButtons.innerHTML="";
  q.answers.forEach(a=>{
    const btn=document.createElement("button");
    btn.textContent=a.text;
    btn.addEventListener("click",()=>selectAnswer(a,btn));
    answerButtons.appendChild(btn);
  });
  timer = 10;
  timerEl.textContent = "⏱️ " + timer;
  clearInterval(timerInterval);
  timerInterval = setInterval(()=>{
    timer--;
    timerEl.textContent = "⏱️ " + timer;
    if(timer<=0){
      clearInterval(timerInterval);
      selectAnswer({correct:false},null);
    }
  },1000);
  progressFill.style.width = ((currentQuestionIndex)/questions.length)*100 + "%";
}

function selectAnswer(answer, btn){
  clearInterval(timerInterval);
  if(answer.correct){
    score++;
    coins++;
    xp+=10;
    if(localStorage.getItem("soundEnabled")!=="false") correctSound.play();
    if(btn) btn.classList.add("correct");
    for(let i=0;i<30;i++){
      const conf = document.createElement('div');
      conf.classList.add('confetti');
      conf.style.left = Math.random()*100 + '%';
      conf.style.background = `hsl(${Math.random()*360},70%,60%)`;
      document.body.appendChild(conf);
      setTimeout(()=>conf.remove(),1000);
    }
  } else {
    if(btn) btn.classList.add("wrong");
    if(localStorage.getItem("soundEnabled")!=="false") wrongSound.play();
  }
  updateStats();
  setTimeout(()=>{
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
      showQuestion();
    }else{
      showScore();
    }
  },700);
}

function updateStats(){
  coinsEl.textContent = "💰 Moedas: " + coins;
  levelXP.textContent = "Nível: " + level + " | XP: " + xp;
}

function showScore(){
  questionEl.textContent = `Você acertou ${score} de ${questions.length} perguntas! 🎉`;
  answerButtons.innerHTML = "";
  progressFill.style.width = "100%";
  localStorage.setItem("coins",coins);
  localStorage.setItem("xp",xp);
  localStorage.setItem("level",level);
  let highScore = parseInt(localStorage.getItem("highScore")||"0");
  if(score>highScore) localStorage.setItem("highScore",score);
  const btn=document.createElement("button");
  btn.textContent = "⬅️ Voltar ao Hub";
  btn.addEventListener("click",()=>window.location.href="index.html");
  answerButtons.appendChild(btn);
}

startQuiz();
