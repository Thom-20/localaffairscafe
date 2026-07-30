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

function showMenuSelector() {
  const menuSelector = document.getElementById("menuSelector");
  document.querySelectorAll(".menu-detail").forEach(detail => {
    detail.hidden = true;
  });

  if (menuSelector) {
    menuSelector.hidden = false;
  }
}

function openRestaurantMenu() {
  if (!fullscreenMenu) return;

  closeSideMenu();
  showMenuSelector();

  fullscreenMenu.classList.add("active");
  fullscreenMenu.setAttribute("aria-hidden", "false");
  document.body.classList.add("menu-open");
}

function closeRestaurantMenu() {
  if (!fullscreenMenu) return;

  fullscreenMenu.classList.remove("active");
  fullscreenMenu.setAttribute("aria-hidden", "true");
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

/* Selectează categoria de meniu fără a închide fereastra fullscreen */
document.querySelectorAll("[data-menu-target]").forEach(button => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.menuTarget);
    const menuSelector = document.getElementById("menuSelector");

    if (!target || !menuSelector) return;

    menuSelector.hidden = true;
    document.querySelectorAll(".menu-detail").forEach(detail => {
      detail.hidden = detail !== target;
    });

    fullscreenMenu.scrollTo({ top: 0, behavior: "smooth" });
  });
});

document.querySelectorAll(".menu-back").forEach(button => {
  button.addEventListener("click", () => {
    showMenuSelector();
    fullscreenMenu.scrollTo({ top: 0, behavior: "smooth" });
  });
});

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