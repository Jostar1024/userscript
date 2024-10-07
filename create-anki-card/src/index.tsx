import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import styles from "./index.css?inline";
import App from "./App";
import { awaitElement, log, addLocationChangeCallback } from "./utils";

log("React script has successfully started");

// Do required initial work. Gets called every time the URL changes,
// so that elements can be re-inserted as a user navigates a page with
// different routes.
async function main() {
  // Find <body/>. This can be any element. We wait until
  // the page has loaded enough for that element to exist.
  const body = await awaitElement("body");
  const container = document.createElement("div");
  body.appendChild(container);

  const renderIn = createShadowRoot(container, styles);
  createRoot(renderIn).render(<App />);
}

// Call `main()` every time the page URL changes, including on first load.
addLocationChangeCallback(() => {
  // Greasemonkey doesn't bubble errors up to the main console,
  // so we have to catch them manually and log them
  main().catch((e) => {
    log(e);
  });
});

// TODO: maybe use ReactDOMserver.render to render the following declaratively.
const createShadowRoot = (container, styles) => {
  const shadow = container.attachShadow({ mode: "open" });
  const div = document.createElement("div");
  const style = document.createElement("style");
  style.innerHTML = styles;

  // create the element where we would render our app
  const renderIn = document.createElement("div");

  shadow.appendChild(div);
  div.appendChild(style);
  div.appendChild(renderIn);
  return renderIn;
};
