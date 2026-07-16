const menuToggle = document.getElementById("menuToggle");
const sideMenu = document.getElementById("sideMenu");
const closeMenu = document.getElementById("closeMenu");
const mobileOverlay = document.getElementById("mobileOverlay");

const openFullscreenMenu = document.getElementById("openFullscreenMenu");
const fullscreenMenu = document.getElementById("fullscreenMenu");
const closeFullscreenMenu = document.getElementById("closeFullscreenMenu");

function openMenu() {
  sideMenu.classList.add("active");
  menuToggle.classList.add("active");
  document.body.classList.add("menu-open");
  if (mobileOverlay) mobileOverlay.classList.add("active");
}

function closeMenuFn() {
  sideMenu.classList.remove("active");
  menuToggle.classList.remove("active");
  document.body.classList.remove("menu-open");
  if (mobileOverlay) mobileOverlay.classList.remove("active");
}

menuToggle.addEventListener("click", () => {
  sideMenu.classList.contains("active") ? closeMenuFn() : openMenu();
});

if (closeMenu) closeMenu.addEventListener("click", closeMenuFn);
if (mobileOverlay) mobileOverlay.addEventListener("click", closeMenuFn);

document.querySelectorAll(".side-nav a").forEach(link => {
  link.addEventListener("click", closeMenuFn);
});

if (openFullscreenMenu && fullscreenMenu && closeFullscreenMenu) {
  openFullscreenMenu.addEventListener("click", () => {
    fullscreenMenu.classList.add("active");
    document.body.classList.add("menu-open");
  });

  closeFullscreenMenu.addEventListener("click", () => {
    fullscreenMenu.classList.remove("active");
    document.body.classList.remove("menu-open");
  });
}

