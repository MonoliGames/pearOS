document.addEventListener("DOMContentLoaded", () => {
    const windows = document.querySelectorAll(".window");

let highestZIndex = 0;

windows.forEach((windowEl) => {
  const handle = windowEl.querySelector(".controls");

  windowEl.addEventListener("mousedown", () => {
    highestZIndex++;
    windowEl.style.zIndex = highestZIndex;
  });

  // No handle = no dragging
  if (!handle) return;

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  handle.addEventListener("mousedown", (e) => {
    isDragging = true;

    offsetX = e.clientX - windowEl.offsetLeft;
    offsetY = e.clientY - windowEl.offsetTop;


    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);

    e.preventDefault();
  });

  function mouseMoveHandler(e) {
    if (!isDragging) return;

    windowEl.style.left = `${e.clientX - offsetX}px`;
    windowEl.style.top = `${e.clientY - offsetY}px`;
  }

  function mouseUpHandler() {
    isDragging = false;

    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  }
});
});

// BUG! if one clicks on the  window enough, it can cause it to appear OVER the dock. my "fix" is making it so that you would need to click the window 1000000000 times...
// just  don't do that

