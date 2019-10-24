const backdrop = document.querySelector(".backdrop");
const sideDrawer = document.querySelector(".mobile-nav");
const menuToggle = document.querySelector("#side-menu-toggle");

function menuToggleClickHandler() {
  //   alert("Pop it up");
  backdrop.style.display = "block";
  sideDrawer.style.transform = "translateX(0%)";
}

function backdropClickHandler() {
  backdrop.style.display = "none";
  sideDrawer.style.transform = "translateX(-100%)";
}

backdrop.addEventListener("click", backdropClickHandler);
menuToggle.addEventListener("click", menuToggleClickHandler);
