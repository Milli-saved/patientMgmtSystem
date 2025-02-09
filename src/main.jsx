import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/index.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@fontsource/work-sans/400.css"; // Defaults to weight 400
import { ThemeProvider } from "@mui/material";
import theme from "./Pages/utils/theme.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Layout />
        </QueryClientProvider>
      </BrowserRouter>
      </ThemeProvider>
  </StrictMode>
);
