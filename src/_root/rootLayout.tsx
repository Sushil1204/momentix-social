import BottomNavigation from "@/components/shared/BottomNavigation";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Header />
      <Sidebar />
      <section className="flex  flex-1 h-full">
        <Outlet />
      </section>
      <BottomNavigation />
    </div>
  );
};

export default RootLayout;
