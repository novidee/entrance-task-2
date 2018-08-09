var toggler = document.querySelector(".main-nav__toggler");
var nav = document.querySelector(".main-nav");

toggler.addEventListener("click", onMenuToggle);

function onMenuToggle() {
  nav.classList.toggle("main-nav--opened");
}
