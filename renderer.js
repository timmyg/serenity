window.addEventListener("DOMContentLoaded", () => {
  const eventDataElem = document.getElementById("event-data");

  ioHook.start();

  ioHook.on("keydown", (event) => {
    eventDataElem.textContent = ` Keydown event: ${event.keycode}`;
  });

  ioHook.on("mouseclick", (event) => {
    eventDataElem.textContent = `Mouseclick event: ${event.x}, ${event.y}`;
  });

  ioHook.on("mousemove", (event) => {
    eventDataElem.textContent = `Mousemove event: ${event.x}, ${event.y}`;
  });
});
