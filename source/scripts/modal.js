const layout = document.querySelector(`.layout`);
const footerButtons = document.querySelectorAll(`.footer-modal__btn`);

const modals = {
  heat: document.querySelector(`.modal[data-type=heat]`),
  temperature: document.querySelector(`.modal[data-type=temperature]`),
  lighting: document.querySelector(`.modal[data-type=lighting]`),
};

Object.keys(modals).forEach(type => modals[type].addEventListener(`click`, onModalClose));
Array.from(footerButtons).forEach(button => button.addEventListener(`click`, onModalClose));

document.addEventListener(`click`, event => {
  const clickedAtCard = event.target.closest(`.card`);

  if (clickedAtCard && !isSomeSliderMoving) {
    const type = clickedAtCard.dataset.type;

    onModalToggle(event, type);
  }
});

function onModalClose(event) {
  if (event.target !== this) return;

  onModalToggle(event, this.closest(`.modal`).dataset.type);
}

function onModalToggle(event, type) {
  event.preventDefault();

  const hiddenClass = `modal--hidden`;
  const hasModalOpen = modals[type].classList.contains(hiddenClass);

  if (hasModalOpen) animateModal(event);

  document.body.classList.toggle(`no-overflow`);
  modals[type].classList.toggle(hiddenClass);
  modals[type].classList.toggle(`modal--opened`);

  layout.classList.toggle(`layout--with-modal`);
}

function animateModal(event) {
  const { top, left, width, height } = event.target.closest(`.card`).getBoundingClientRect();
  const { clientWidth, clientHeight } = document.documentElement;

  const centerX = clientWidth / 2;
  const centerY = clientHeight / 2;

  const resultLeft = left + (width / 2) - centerX;
  const resultTop = top + (height / 2) - centerY;

  document.documentElement.style.setProperty('--modal-start-transform', `translate(${resultLeft}px, ${resultTop}px) scale(0.2)`);
}
