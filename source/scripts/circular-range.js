const circularScale = document.querySelector(".circular-range");

function handleMove(event) {
  event.preventDefault();

  const point = {
    x: event.pageX,
    y: event.pageY
  };

  const { left, top, width, height } = circularScale.getBoundingClientRect();
  const center = {
    x: left + width / 2,
    y: top + height / 2,
  };

  console.log('angle', getAngle(point, center));
}

function getAngle(point, center) {
  const deg = Math.atan2(point.y - center.y, center.x - point.x);
  let angle = (-deg / (Math.PI / 180));
  if (angle < 0) angle += 360;
  if (angle + 60 > 360) angle -= 360;

  return angle + 60;
}

circularScale.addEventListener("mousemove", handleMove);
