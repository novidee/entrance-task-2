const MEDIA_AREA = {
  tabletDown: "tablet-down",
  tabletUp: "tablet-up",
  desktopHDUp: "desktop-hd-up"
};

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
      loop: false,
      slideBy: "page",
      speed: 600,
      responsive: {
        320: {
          controls: false
        },
        768: {
          controls: true,
          gutter: 0,
          items: 1,
          fixedWidth: 429
        },
        1280: {
          fixedWidth: 644
        }
      }
    };

    this.CARDS_PER_SLIDE = {
      [MEDIA_AREA.tabletDown]: 1,
      [MEDIA_AREA.tabletUp]: 6,
      [MEDIA_AREA.desktopHDUp]: 9
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
    const mediaArea = getCurrentMediaArea();
    return this.CARDS_PER_SLIDE[mediaArea];
  }

  prepareMarkup(cardsPerSlide) {
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

const scenariosSlider = new ScenariosSlider();
scenariosSlider.create();

class InfoDevicesSlider {
  constructor() {
    this.options = {
      horizontal: {
        container: ".info__devices-list",
        controls: false,
        edgePadding: 20,
        fixedWidth: 220,
        loop: false,
        nav: false,
        mouseDrag: true
      },
      vertical: {
        container: ".info__devices-list",
        controls: false,
        items: 2,
        gutter: 15,
        axis: "vertical",
        edgePadding: 20,
        loop: false,
        nav: false,
        mouseDrag: true
      }
    };

    this.currentMediaArea = getCurrentMediaArea();
  }

  build(type) {
    this.sliderInfo = tns(this.options[type]);
  }

  destroy() {
    this.sliderInfo.destroy();
  }

  rebuild() {
    const mediaArea = getCurrentMediaArea();
    if (mediaArea === this.currentMediaArea) return;
    this.currentMediaArea = mediaArea;

    this.destroy();
    this.build(mediaArea === MEDIA_AREA.desktopHDUp ? "vertical" : "horizontal");
  }

  create() {
    this.build(this.currentMediaArea === MEDIA_AREA.desktopHDUp ? "vertical" : "horizontal");
    window.addEventListener('resize', debounce(() => this.rebuild(), 50));
  }
}

const infoDevicesSlider = new InfoDevicesSlider();
infoDevicesSlider.create();

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

function getCurrentMediaArea() {
  return getComputedStyle(document.querySelector(':root')).getPropertyValue('--media').trim();
}
