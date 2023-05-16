window.addEventListener("DOMContentLoaded", () => {
  const eventDataElem = document.getElementById("event-data") as HTMLElement;

  (window as any).ioHook.start();

  (window as any).ioHook.on("keydown", (event: any) => {
    eventDataElem.textContent = ` Keydown event: ${event.keycode}`;
  });

  (window as any).ioHook.on("mouseclick", (event: any) => {
    eventDataElem.textContent = `Mouseclick event: ${event.x}, ${event.y}`;
  });

  (window as any).ioHook.on("mousemove", (event: any) => {
    eventDataElem.textContent = `Mousemove event: ${event.x}, ${event.y}`;
  });
});
