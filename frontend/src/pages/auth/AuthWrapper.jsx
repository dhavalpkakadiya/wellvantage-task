import React from "react";
import { Outlet } from "react-router-dom";

const AuthWrapper = () => {
  return (
    <div className="w-900 md:flex md:min-h-screen overflow-y-auto w-full items-center justify-center">
      <div className="flex flex-col md:flex-row w-full min-h-screen">
        {/* Left side - Image */}
        <div className="md:w-auto h-full hidden md:block">
        </div>

        {/* Right side - Auth Components */}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthWrapper;
