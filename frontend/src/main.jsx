import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import TodoContextProvider from "./context/TodoContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <TodoContextProvider>
      <App />
    </TodoContextProvider>
  </BrowserRouter>
);
