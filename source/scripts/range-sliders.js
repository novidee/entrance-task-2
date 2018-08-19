class RangeSlider {
  constructor({ container, start, min = 0, max = 100, onChange }) {
    this.container = document.querySelector(container);
    this.value = start;
    this.min = min;
    this.max = max;

    this.changeHandler = onChange;

    this.onChange = this.onChange.bind(this);
  }

  build(vertical) {
    const { container, value, min, max } = this;

    noUiSlider.create(container, {
      start: value,
      direction: vertical ? `rtl` : `ltr`,
      step: 1,
      range: { min, max },
      orientation: vertical ? `vertical` : `horizontal`
    });

    container.noUiSlider.on(`update`, this.onChange);
  }

  init() {
    this.build(getCurrentMediaArea() === `tablet-down`);
    this.resizeHandle();
  }

  rebuild(vertical) {
    const { container } = this;
    container.noUiSlider.destroy();

    this.build(vertical);
  }

  resizeHandle() {
    listenWindowResize(50, ({ mediaArea, mediaAreaChanged }) => {
      if (!mediaAreaChanged) return;

      this.rebuild(mediaArea === `tablet-down`);
    });
  }

  onChange(values, handle) {
    const { changeHandler, min, max, container } = this;
    const value = Number(values[handle]);

    this.value = value;
    typeof changeHandler === `function` && changeHandler(value);

    const setAttribute = (attribute, value) => {
      Number.isFinite(value) && container.setAttribute(attribute, addSign(value));
    };

    setAttribute(`data-min`, min);
    setAttribute(`data-max`, max);
  }
}

const temperatureNode = document.querySelector(`.temperature-indicator--js .temperature-indicator__value`);

const temperatureRange = new RangeSlider({
  container: `#temperature-range`,
  start: 23,
  min: -10,
  max: 30,
  onChange: value => temperatureNode.innerHTML = addSign(value)
});
temperatureRange.init();


const lightingRange = new RangeSlider({
  container: `#lighting-range`,
  start: 30
});

lightingRange.init();
