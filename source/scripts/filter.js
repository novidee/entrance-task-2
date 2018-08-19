const filter = document.querySelector(`.filter__current`);
const filtersList = document.querySelector(`.filter__list`);

filter.addEventListener(`click`, onFilterPopupOpen);

function onFilterPopupOpen() {
  filtersList.classList.toggle(`filter__list--opened`);
}
