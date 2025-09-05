import Header from "../components/header";
import React from "react";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="w-full">
      <div className="w-full">
        <Header />
      </div>
      <div className="flex-1 min-h-screen">
        <Outlet />
      </div>

      <div className="footer">
        <p className="text-center text-gray-600">
          © 2025 MyApp. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default MainPage;
