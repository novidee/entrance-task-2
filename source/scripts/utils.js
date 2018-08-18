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

function throttle(func, ms) {
  let isThrottled = false;
  let savedArgs = null;
  let savedThis = null;

  function wrapper() {

    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false;

      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

function listenWindowResize(delay, onResize) {
  let currentMediaArea = getCurrentMediaArea();

  window.addEventListener('resize', debounce(() => {
    const mediaArea = getCurrentMediaArea();
    const mediaAreaChanged = mediaArea !== currentMediaArea;
    currentMediaArea = mediaAreaChanged ? mediaArea : currentMediaArea;

    onResize({ mediaArea, mediaAreaChanged });
  }, delay));
}

function addMultipleEventListeners(node, events, listener, options) {
  events.forEach(eventName => {
    node.addEventListener(eventName, listener, options);
  });
}

function removeMultipleEventListeners(node, events, listener, options) {
  events.forEach(eventName => {
    node.removeEventListener(eventName, listener, options);
  });
}

function addSign(number) {
  if (number === 0) return 0;

  return number > 0 ? `+${number}` : `−${Math.abs(number)}`;
}
