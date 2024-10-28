import BottomNavigation from "@/components/shared/BottomNavigation";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import AuthProvider from "@/context/AuthContext";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <AuthProvider>
      <div className="w-full md:flex">
        <Header />
        <Sidebar />
        <section className="flex  flex-1 h-full">
          <Outlet />
        </section>
        <BottomNavigation />
      </div>
    </AuthProvider>
  );
};

export default RootLayout;
