import React from "react";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <div className="relative bg-[#0e0f0e] flex flex-col justify-between w-full min-h-screen">
      <Outlet />
    </div>
  );
};
