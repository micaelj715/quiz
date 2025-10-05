const soundToggle = document.getElementById("sound-toggle");
const themeSelect = document.getElementById("theme-select");
const resetBtn = document.getElementById("reset-data");
const backBtn = document.getElementById("back-btn");

// Inicializa com preferências salvas
soundToggle.checked = localStorage.getItem("soundEnabled") !== "false";
themeSelect.value = localStorage.getItem("theme") || "default";

// Alterar som
soundToggle.addEventListener("change", () => {
  localStorage.setItem("soundEnabled", soundToggle.checked);
});

// Alterar tema
themeSelect.addEventListener("change", () => {
  localStorage.setItem("theme", themeSelect.value);
  alert("Tema alterado para: " + themeSelect.value);
});

// Resetar progresso
resetBtn.addEventListener("click", () => {
  if(confirm("Deseja realmente resetar todo o progresso?")) {
    localStorage.clear();
    alert("Progresso resetado!");
  }
});

backBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});
