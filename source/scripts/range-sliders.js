class RangeSlider {
  constructor({ container, onChange, min, max }) {
    this.workedContainer = document.querySelector(container);
    this.clonedContainer = this.workedContainer.cloneNode(true);
    this.value = 0;
    this.min = min;
    this.max = max;

    this.onChange = onChange;

    this.onDrag = this.onDrag.bind(this);
  }

  onDrag(value) {
    const { min = 0, max = 100, onChange } = this;

    const finalValue = Math.round(((value / 100) * (max - min)) + min);

    typeof onChange === "function" && onChange(finalValue);
  }

  build(vertical) {
    rangeSlider(this.workedContainer, {
      value: 0,
      vertical,
      drag: this.onDrag
    });

    this.writeMarkup();
  }

  writeMarkup() {
    const { workedContainer, min, max } = this;
    const track = workedContainer.querySelector(".range-slider-track");

    const setAttribute = (attribute, value) => {
      Number.isFinite(value) && track.setAttribute(attribute, addSign(value));
    };

    setAttribute("data-min", min);
    setAttribute("data-max", max);
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

const lightingRange = new RangeSlider({ container: "#lighting-range" });
lightingRange.init();

const temperatureNode = document.querySelector(".temperature-indicator--js .temperature-indicator__value");

const temperatureRange = new RangeSlider({
  container: "#temperature-range",
  onChange: onTemperatureChange,
  min: -10,
  max: 30
});
temperatureRange.init();

function onTemperatureChange(value) {
  temperatureNode.innerHTML = addSign(value);
}
