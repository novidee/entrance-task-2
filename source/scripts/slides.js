class ScenariosSlider {
  constructor() {
    this.arrowPrev = "<img class='tns-controls-prev' src='images/arrow-left.svg' alt=''/>";
    this.arrowNext = "<img class='tns-controls-next' src='images/arrow-left.svg' alt=''/>";

    this.options = {
      container: ".scenarios__list",
      fixedWidth: 200,
      gutter: 15,
      nav: false,
      controlsText: [this.arrowPrev, this.arrowNext],
      mouseDrag: true,
      slideBy: "page",
      speed: 600,
      responsive: {
        320: {
          controls: false
        },
        768: {
          controls: true,
          items: 1,
          fixedWidth: 415
        },
        1280: {
          fixedWidth: 630
        }
      }
    };

    this.CARDS_PER_SLIDE = {
      "tablet-down": 1,
      "tablet-up": 4,
      "desktop-hd-up": 9
    };

    this.currentCardsPerSlide = this.getCardsPerSlide();
    this.items = Array.from(document.querySelectorAll(".scenarios__item"));
  }

  build() {
    this.sliderInfo = tns(this.options);
  }

  destroy() {
    this.sliderInfo.destroy();
  }

  create() {
    const { currentCardsPerSlide } = this;

    this.prepareMarkup(currentCardsPerSlide);
    this.build();

    window.addEventListener('resize', debounce(() => this.update(), 50));
  }

  update() {
    const { currentCardsPerSlide } = this;
    const cardsPerSlide = this.getCardsPerSlide();

    if (cardsPerSlide === currentCardsPerSlide) return;

    this.currentCardsPerSlide = cardsPerSlide;

    this.destroy();
    this.prepareMarkup(cardsPerSlide);
    this.build();
  }

  getCardsPerSlide() {
    const mediaQuery = getComputedStyle(document.querySelector(':root')).getPropertyValue('--media').trim();
    return this.CARDS_PER_SLIDE[mediaQuery];
  }

  prepareMarkup(cardsPerSlide) {
    console.log('cardsPerSlide', cardsPerSlide);
    const list = document.querySelector(".scenarios__list");
    const workedItems = this.items.slice();

    const lis = [];

    const slides = workedItems.length / cardsPerSlide;

    for (let i = 0; i < slides; i++) {
      lis[i] = workedItems.splice(0, cardsPerSlide);
    }

    const nodes = lis.map(slide => {
      const inner = slide.length === 1
        ? slide[0].innerHTML
        : `<ul class="slide-list">${slide.map(s => `<li class="slide-list__item">${s.innerHTML}</li>`).join('')}</ul>`;

      return `<li class="scenarios__item">${inner}</li>`
    }).join('');

    list.innerHTML = nodes;
  }
}

const dd = new ScenariosSlider();

dd.create();

const slider2 = tns({
  container: '.info__devices-list',
  axis: 'vertical',
  controls: false,
  items: 2,
  "gutter": 10,
  // fixedWidth: 200,
  nav: false,
  mouseDrag: true,
  // slideBy: 2,
  // autoHeight: true,
  // "swipeAngle": false,
});

function debounce(f, ms) {

  let timer = null;

  return function (...args) {
    const onComplete = () => {
      f.apply(this, args);
      timer = null;
    };

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(onComplete, ms);
  };
}
