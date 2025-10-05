const buttons = document.querySelectorAll(".category-buttons button");
buttons.forEach(btn=>{
  btn.addEventListener("click", ()=>{
    localStorage.setItem("selectedCategory", btn.dataset.cat);
    window.location.href = "quiz.html";
  });
});

document.getElementById("back-btn").addEventListener("click", ()=>{
  window.location.href="index.html";
});
