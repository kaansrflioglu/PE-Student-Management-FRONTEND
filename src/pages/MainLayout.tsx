import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="py-4">
        {children || <Outlet />}
      </main>
    </>
  );
};

export default MainLayout;