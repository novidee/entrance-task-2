const modal = document.querySelector(".modal");
const cards = document.querySelectorAll(".card");

modal.addEventListener("click", onModalClose);

document.addEventListener('click',function(e) {
  const clickedAtCard = e.path.some(el => el.classList && el.classList.contains("card"));
  if(clickedAtCard && !isSomeSliderMoving) {
    onModalToggle(e);
  }
});

function onModalClose(event) {
  if (event.target !== this) return;

  onModalToggle(event);
}

function onModalToggle(event) {
  event.preventDefault();

  const hiddenClass = "modal--hidden";
  const hasModalOpen = modal.classList.contains(hiddenClass);

  document.body.style.overflow = hasModalOpen ? "hidden" : "auto";
  modal.classList.toggle(hiddenClass);
}
