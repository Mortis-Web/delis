const nav = document.querySelector("#navbar");
const navContainer = document.querySelector("#nav_container");
const langChanger = document.querySelector("#lang_changer");
const langChangerList = document.querySelectorAll("#lang_changer span");
const lang = document.querySelector("#lang");
const activeLang = document.querySelector("#active_lang");
const servicesHolder = document.querySelector("#servicesHolder");
const allServices = document.querySelector("#allServices");
// Scroll effect
window.addEventListener("scroll", () => {
  if (!nav) return;
  if (window.scrollY > 125) {
    nav.classList.add("floating_nav");
    navContainer.style.padding = "10px 1rem";
  } else {
    nav.classList.remove("floating_nav");
    window.innerWidth > 1024
      ? (navContainer.style.padding = "8px 2rem")
      : (navContainer.style.padding = "8px 1rem");
  }
});

// lang

lang.addEventListener("click", (e) => {
  e.stopPropagation();
  langChanger.classList.toggle("hide_lang_changer");
});

langChangerList.forEach((option) => {
  option.addEventListener("click", (e) => {
    e.stopPropagation();
    activeLang.textContent = option.textContent;
    langChanger.classList.add("hide_lang_changer");
  });
});

document.addEventListener("click", () => {
  langChanger.classList.add("hide_lang_changer");
});

// services
servicesHolder.addEventListener("click", (e) => {
  e.stopPropagation();
  allServices.classList.toggle("hide_lang_changer");
});

document.addEventListener("click", () => {
  if (allServices) allServices.classList.add("hide_lang_changer");
});

const menu = document.querySelector("#menu");
const dropdown = document.querySelector("#navigation_dropdown");
const menuDropDownHolder = document.querySelector("#menuDropDownHolder");
const menuDropDown = document.querySelector("#menuDropDown");
const arrow = document.querySelector("#arrowDownUp");
menu.addEventListener("click", () => {
  menu.style.pointerEvents = "none";
  menu.style.opacity = "0.75";

  setTimeout(() => {
    menu.style.pointerEvents = "all";
  menu.style.opacity = "1";

  }, 700);

  if (dropdown.classList.contains("show_dropdown")) {
    dropdown.style.overflow = "hidden";
    setTimeout(() => {
      dropdown.classList.remove("show_dropdown");
    }, 100);
  } else {
    dropdown.classList.add("show_dropdown");
    setTimeout(() => {
      dropdown.style.overflow = "visible";
    }, 700);
  }
});

menuDropDownHolder.addEventListener("click", () => {
  if (menuDropDown.classList.contains("show_dropdown")) {
    menuDropDown.style.overflow = "hidden";
    arrow.classList.remove("arrowDownUp");

    setTimeout(() => {
      menuDropDown.classList.remove("show_dropdown");
    }, 100);
  } else {
    menuDropDown.classList.add("show_dropdown");
    arrow.classList.add("arrowDownUp");
    setTimeout(() => {
      menuDropDown.style.overflow = "visible";
    }, 500);
  }
});

// const sections = document.querySelectorAll("section,header");
// const navLinks = document.querySelectorAll(
//   "#navbar .navLink, #footer_navLinks a"
// );

// navLinks.forEach((link) => {
//   link.addEventListener("click", (e) => {
//     e.preventDefault();
//     dropdown.style.overflow = "hidden";
//     setTimeout(() => {
//       dropdown.classList.remove("show_dropdown");
//     }, 100);
//     const targetId = link.getAttribute("href").replace("#", "");
//     const targetEl = document.getElementById(targetId);

//     if (targetEl) {
//       lenis.scrollTo(targetEl);
//     }

//     // تحديث الـ active
//     navLinks.forEach((i) => i.classList.remove("active"));
//     link.classList.add("active");

//     if (typeof dropdown !== "undefined" && dropdown) {
//       dropdown.classList.remove("show_dropdown");
//     }
//   });
// });

// // Scroll spy logic
// window.addEventListener("scroll", () => {
//   let current = "";
//   sections.forEach((section) => {
//     const sectionTop = section.offsetTop;
//     const sectionHeight = section.offsetHeight;

//     if (window.scrollY >= sectionTop - sectionHeight / 3) {
//       current = section.getAttribute("id");
//     }
//   });

//   navLinks.forEach((link) => {
//     link.classList.remove("active");
//     if (link.getAttribute("href") === `#${current}`) {
//       link.classList.add("active");
//     }
//   });
// });
