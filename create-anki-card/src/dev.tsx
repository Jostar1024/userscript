import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { getSentence } from "./utils.js"

const container = document.getElementById("root")
createRoot(container).render(
  <StrictMode>
    <App container={container} sentence={getSentence()} />
  </StrictMode>
)
