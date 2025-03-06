import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { Route, MemoryRouter, Routes } from "react-router-dom";
import { RootLayout } from "./RootLayout";
import { Home } from "./pages/Home";
import { UserWallet } from "./pages/UserWallet";
import { Development } from "./pages/Development";
import { CreateDapp } from "./pages/CreateDapp";

const queryClient = new QueryClient();

const root = createRoot(document.getElementById("root")!);
if (root) {
  root.render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/wallet" element={<UserWallet />} />
            <Route path="/development" element={<Development />} />
            <Route path="/create-dapp" element={<CreateDapp />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}
