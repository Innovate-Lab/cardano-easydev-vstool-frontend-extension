import React from "react";
import { Outlet } from "react-router-dom";
import { Background } from "./components/Background";
import { Logo } from "./components/Logo";

export const RootLayout = () => {
  return (
    <Background>
      <Logo />
      <Outlet />
    </Background>
  );
};
