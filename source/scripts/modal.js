// const layout = document.querySelector(".layout");
// const footerButtons = document.querySelectorAll(".footer-modal__btn");
//
// const modals = {
//   heat: document.querySelector(".modal[data-type=heat]"),
//   temperature: document.querySelector(".modal[data-type=temperature]"),
//   lighting: document.querySelector(".modal[data-type=lighting]"),
// };
//
// Object.keys(modals).forEach(type => modals[type].addEventListener("click", onModalClose));
// Array.from(footerButtons).forEach(button => button.addEventListener("click", onModalClose));
//
// document.addEventListener('click', event => {
//   const clickedAtCard = event.target.closest(".card");
//
//   if (clickedAtCard && !isSomeSliderMoving) {
//     const type = clickedAtCard.dataset.type;
//
//     onModalToggle(event, type);
//   }
// });
//
// function onModalClose(event) {
//   if (event.target !== this) return;
//
//   onModalToggle(event, this.closest(".modal").dataset.type);
// }
//
// function onModalToggle(event, type) {
//   event.preventDefault();
//
//   const hiddenClass = "modal--hidden";
//   const hasModalOpen = modals[type].classList.contains(hiddenClass);
//
//   document.body.style.overflow = hasModalOpen ? "hidden" : "auto";
//   modals[type].classList.toggle(hiddenClass);
//   modals[type].classList.toggle("modal--opened");
//
//   layout.classList.toggle("layout--with-modal");
// }
