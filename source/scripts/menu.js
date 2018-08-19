const toggler = document.querySelector(`.main-nav__toggler`);
const nav = document.querySelector(`.main-nav`);

toggler.addEventListener(`click`, onMenuToggle);

function onMenuToggle() {
  nav.classList.toggle(`main-nav--opened`);
}
