import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./context/UserContext.jsx";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserContextProvider>
      <ToastContainer autoClose={2000} closeOnClick />
      <App />
    </UserContextProvider>
  </BrowserRouter>
);
