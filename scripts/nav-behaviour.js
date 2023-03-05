


/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function mobileNavExpand() {
  let links = document.querySelectorAll(".nav-link");
  links.forEach(function(link, index) {
    if (link.classList.contains("main-link"))
      return;

    if (link.style.display === "block") {
      link.style.display = "";
    } else {
      link.style.display = "block";
    }
  });
} 