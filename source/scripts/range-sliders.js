class RangeSlider {
  constructor(container) {
    this.workedContainer = document.querySelector(container);
    this.clonedContainer = this.workedContainer.cloneNode(true);
    this.value = 0;
  }

  build(vertical) {
    rangeSlider(this.workedContainer, {
      value: 0,
      vertical,
      drag: newValue => this.value = newValue
    });
  }

  init() {
    this.build(getCurrentMediaArea() === "tablet-down");

    this.subscribeListeners();
  }

  subscribeListeners() {
    listenWindowResize(50, ({ mediaArea, mediaAreaChanged }) => {
      if (!mediaAreaChanged) return;

      this.rebuild(mediaArea === "tablet-down");
    });
  }

  rebuild(vertical) {
    const parent = this.workedContainer.parentNode;
    parent.removeChild(this.workedContainer);
    this.workedContainer = this.clonedContainer.cloneNode(true);
    parent.appendChild(this.workedContainer);

    this.build(vertical);
  }
}

const lightingRange = new RangeSlider("#lighting-range");
lightingRange.init();
