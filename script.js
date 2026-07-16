const menuToggle = document.getElementById("menuToggle");
const sideMenu = document.getElementById("sideMenu");
const closeMenu = document.getElementById("closeMenu");
const mobileOverlay = document.getElementById("mobileOverlay");

const openMenuFromSidebar = document.getElementById("openMenuFromSidebar");
const fullscreenMenu = document.getElementById("fullscreenMenu");
const closeFullscreenMenu = document.getElementById("closeFullscreenMenu");

function openSideMenu() {
  sideMenu.classList.add("active");
  menuToggle.classList.add("active");
  document.body.classList.add("menu-open");

  if (mobileOverlay) {
    mobileOverlay.classList.add("active");
  }
}

function closeSideMenu() {
  sideMenu.classList.remove("active");
  menuToggle.classList.remove("active");
  document.body.classList.remove("menu-open");

  if (mobileOverlay) {
    mobileOverlay.classList.remove("active");
  }
}

function openRestaurantMenu() {
  if (!fullscreenMenu) return;

  closeSideMenu();

  fullscreenMenu.classList.add("active");
  document.body.classList.add("menu-open");
}

function closeRestaurantMenu() {
  if (!fullscreenMenu) return;

  fullscreenMenu.classList.remove("active");
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  if (sideMenu.classList.contains("active")) {
    closeSideMenu();
  } else {
    openSideMenu();
  }
});

if (closeMenu) {
  closeMenu.addEventListener("click", closeSideMenu);
}

if (mobileOverlay) {
  mobileOverlay.addEventListener("click", closeSideMenu);
}

/* Linkurile normale din sidebar închid meniul lateral */
document.querySelectorAll(".side-nav a:not(#openMenuFromSidebar)").forEach(link => {
  link.addEventListener("click", closeSideMenu);
});

/* Butonul Menu din sidebar deschide meniul restaurantului */
if (openMenuFromSidebar) {
  openMenuFromSidebar.addEventListener("click", event => {
    event.preventDefault();
    openRestaurantMenu();
  });
}

if (closeFullscreenMenu) {
  closeFullscreenMenu.addEventListener("click", closeRestaurantMenu);
}

/* Închide meniul fullscreen când se apasă în afara conținutului */
if (fullscreenMenu) {
  fullscreenMenu.addEventListener("click", event => {
    if (event.target === fullscreenMenu) {
      closeRestaurantMenu();
    }
  });
}

/* Închide meniurile cu tasta Escape */
document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;

  if (fullscreenMenu?.classList.contains("active")) {
    closeRestaurantMenu();
  } else if (sideMenu?.classList.contains("active")) {
    closeSideMenu();
  }
});