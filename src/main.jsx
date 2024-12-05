import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import UserContextProvider from "./context/UserContext.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <BrowserRouter>

    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <ToastContainer autoClose={2000} closeOnClick />
        <App />
      </UserContextProvider>
    </QueryClientProvider>

  </BrowserRouter>
);
