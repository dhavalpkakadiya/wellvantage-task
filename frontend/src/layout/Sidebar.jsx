import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import dashboardIcon from "../assets/svg/dashboard.svg";
import recruiterIcon from "../assets/svg/recruiter.svg";
import logoutIcon from "../assets/svg/logout.svg";
import personIcon from "../assets/svg/person.svg";
import logo02 from "../assets/svg/logo02.svg";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: dashboardIcon },
    { name: "Lead Management", path: "/lead-management", icon: recruiterIcon },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <button
        className="lg:hidden relative top-4 h-10 left-4 z-50 bg-[#28A745] text-white p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 h-screen bg-[#D6E2D9] border-r border-gray-300 p-6 
          flex flex-col justify-between z-40 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:w-64 w-64
        `}
      >
        <div>
          <div className="flex flex-col items-center mb-10">
            <img src={logo02} alt="logo" className="w-[130px] h-[130px] mb-2" />
          </div>

          <nav className="space-y-3">
            {menuItems.map((item) => (
              <div
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${isActive(item.path)
                    ? "bg-[#28A745] text-white"
                    : "text-gray-700 hover:bg-[#B7D5C0]"
                  }`}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-5 h-5"
                  style={{
                    filter: isActive(item.path)
                      ? "brightness(0) invert(1)"
                      : "none",
                  }}
                />
                <span className="font-medium">{item.name}</span>
              </div>
            ))}
          </nav>
        </div>

        <div className="space-y-4">
          <div
            className="bg-[#B7D5C0] rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:bg-[#a8c9b3] transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#BBBBBB] flex items-center justify-center">
              <img src={personIcon} alt="profile" className="w-5 h-5" style={{
                filter: isActive("/profile")
                  ? "brightness(0) invert(1)"
                  : "none",
              }} />
            </div>
            <span className="font-medium text-gray-800">Profile</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-700 hover:text-black w-full transition-colors"
          >
            <img src={logoutIcon} alt="logout" className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      <div className="hidden lg:block w-64" />
    </>
  );
};

export default Sidebar;
