class CircularRange {
  constructor({ onChange }) {
    this.node = document.querySelector(`.circular-range`);
    this.current = this.node.querySelector(`.circular-scale__current`);
    this.arrow = this.node.querySelector(`.circular-range__arrow`);
    this.valueNode = this.node.querySelector(`.circular-range__value`);

    this.radius = 99.5;
    this.circumference = this.radius * 2 * Math.PI;
    this.startAngle = 60;
    this.endAngle = 300;
    this.MIN_MANIPULATION_RADIUS = 40;

    this.start = 12;
    this.min = -10;
    this.max = 30;

    this.onChange = onChange;

    this.handleChange = throttle(this.handleChange.bind(this), 50);
    this.handleDown = this.handleDown.bind(this);
    this.handleUp = this.handleUp.bind(this);
  }

  getCenter() {
    const { left, top, width, height } = this.node.getBoundingClientRect();

    return {
      x: left + width / 2,
      y: top + height / 2,
    };
  }

  getAngle(point, center) {
    const { startAngle } = this;
    const deg = Math.atan2(point.y - center.y, center.x - point.x);
    let angle = (-deg / (Math.PI / 180));
    if (angle < 0) angle += 360;
    if (angle + startAngle > 360) angle -= 360;

    return angle + startAngle;
  }

  getXY(event) {
    let eventData = event;
    if (event.type.indexOf(`touch`) !== -1) eventData = (event.originalEvent || event).changedTouches[0];

    return {
      x: eventData.pageX,
      y: eventData.pageY
    };
  }

  getDistance(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  }

  init() {
    this.subscribeListeners();
    this.create();
  }

  subscribeListeners() {
    const { node } = this;

    node.addEventListener(`click`, this.handleChange);
    addMultipleEventListeners(node, [`mousedown`, `touchstart`], this.handleDown);
    addMultipleEventListeners(document, [`mouseup`, `touchend`, `touchcancel`], this.handleUp);
  }

  create() {
    const { start, min, max } = this;
    const scaleWidth = max - min;
    const angle = 360 * (start / scaleWidth);

    this.render({
      angle,
      activeRatio: (start / scaleWidth),
      resultValue: start
    });

    this.onChange(start);
  }

  render({ angle, activeRatio, resultValue }) {
    const { circumference, startAngle, valueNode } = this;

    this.current.style.strokeDashoffset = circumference * activeRatio;
    this.arrow.style.transform = `scale(-1, -1) rotate(${angle + (startAngle / 2)}deg)`;

    valueNode.innerHTML = addSign(resultValue);
  }

  getResultValue(angle) {
    const { endAngle, min, max } = this;
    const scaleWidth = max - min;
    const valueFromMin = scaleWidth * (angle / endAngle);

    return Math.round(min + valueFromMin);
  }

  handleChange(event) {
    event.preventDefault();

    const { endAngle, MIN_MANIPULATION_RADIUS } = this;

    const center = this.getCenter();
    const point = this.getXY(event);
    const angle = Math.round(this.getAngle(point, center));
    const distance = this.getDistance(center, point);

    if (angle > endAngle || distance < MIN_MANIPULATION_RADIUS) return;

    const resultValue = this.getResultValue(angle);
    this.render({ angle, activeRatio: (angle / 360), resultValue });

    this.onChange(resultValue);
  }

  preventDefault(event) {
    event.preventDefault();
  }

  handleDown() {
    addMultipleEventListeners(document, [`mousemove`, `touchmove`], this.handleChange);
    this.node.addEventListener(`touchmove`, this.preventDefault, { capture: true, passive: false });
  }

  handleUp() {
    removeMultipleEventListeners(document, [`mousemove`, `touchmove`], this.handleChange);
    this.node.removeEventListener(`touchmove`, this.preventDefault);
  }
}

const temperatureIndicator = document.querySelector(`.temperature-indicator__value`);
const circularRange = new CircularRange({
  onChange: value => temperatureIndicator.innerHTML = addSign(value)
});
circularRange.init();

