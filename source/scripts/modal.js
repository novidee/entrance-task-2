const layout = document.querySelector(".layout");

const modals = {
  heat: document.querySelector(".modal[data-type=heat]"),
  temperature: document.querySelector(".modal[data-type=temperature]"),
  lighting: document.querySelector(".modal[data-type=lighting]"),
};

Object.keys(modals).forEach(type => modals[type].addEventListener("click", onModalClose));

document.addEventListener('click', event => {
  const clickedAtCard = event.target.closest(".card");

  if (clickedAtCard && !isSomeSliderMoving) {
    const type = clickedAtCard.dataset.type;

    onModalToggle(event, type);
  }
});

function onModalClose(event) {
  if (event.target !== this) return;

  onModalToggle(event, this.dataset.type);
}

function onModalToggle(event, type) {
  event.preventDefault();

  const { clientX, clientY, offsetX, offsetY } = event;
  const left = clientX - offsetX;
  const top = clientY - offsetY;

  const hiddenClass = "modal--hidden";
  const hasModalOpen = modals[type].classList.contains(hiddenClass);

  if (hasModalOpen) document.documentElement.style.setProperty('--start-point', `translate(${left}px, ${top}px) scale(0.2)`);

  document.body.style.overflow = hasModalOpen ? "hidden" : "auto";
  modals[type].classList.toggle(hiddenClass);
  modals[type].classList.toggle("modal--opened");

  layout.classList.toggle("layout--with-modal");
}
