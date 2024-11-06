import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import styles from "./index.css?inline";
import App from "./App";
import { awaitElement, log, addLocationChangeCallback } from "./utils";

log("React script has successfully started");

const globalContainerId = "GLOBAL-CONTAINER-ID";

// Do required initial work. Gets called every time the URL changes,
// so that elements can be re-inserted as a user navigates a page with
// different routes.
async function main() {
  // Find <body/>. This can be any element. We wait until
  // the page has loaded enough for that element to exist.
  const body = await awaitElement("body");

  /* const container = createContainer();
   * body.appendChild(container);

   * createRoot(container).render(<App/>); */
  const container = findContainer();

  if (container == null) {
    const container = createContainer();
    body.appendChild(container);

    /* const renderIn = createShadowRoot(container, styles); */
    createRoot(container).render(<App container={container}/>);
  } else {
    createRoot(container).render(<App container={container}/>);
  }
}

// Call `main()` every time the page URL changes, including on first load.
addLocationChangeCallback(() => {
  // Greasemonkey doesn't bubble errors up to the main console,
  // so we have to catch them manually and log them
  main().catch((e) => {
    log(e);
  });
});

const findContainer = () => {
  return document.getElementById(globalContainerId);
};
const createContainer = () => {
  const container = document.createElement("div");
  container.setAttribute("id", globalContainerId);
  return container;
};

