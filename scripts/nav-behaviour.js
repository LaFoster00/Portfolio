const ham = document.querySelector(".ham");
const nav = document.querySelector("nav");
ham.addEventListener("click", toggle);
nav.addEventListener("click", toggle);

function toggle() {
  nav.classList.toggle("show");
}