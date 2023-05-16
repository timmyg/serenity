// The renderer script runs in the renderer process and is
// responsible for everything that happens in the window (or windows)
// of your application, such as rendering HTML, running your frontend
// JavaScript, handling user interactions, and updating the DOM. It
// is just like a normal web page running in a browser, but it can
// also use a subset of Node.js and Electron APIs (those that you
// expose through the preload script). In the context of a React
// application, this is where you would mount your React app.

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
