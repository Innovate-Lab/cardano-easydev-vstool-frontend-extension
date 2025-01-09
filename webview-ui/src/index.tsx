import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App";
import React from "react";
import { createRoot } from "react-dom/client";
import { Route, MemoryRouter, Routes } from "react-router-dom";
import { RootLayout } from "./RootLayout";

const queryClient = new QueryClient();

const root = createRoot(document.getElementById("root")!);
if (root) {
  root.render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<App />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}
