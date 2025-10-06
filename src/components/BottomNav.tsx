// @ts-nocheck
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTrain, FaShoppingCart, FaTicketAlt, FaCog } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

const tabs = [
  { to: "/", label: "Home", icon: <FaTrain size={20} /> },
  { to: "/purchase", label: "Purchase", icon: <FaShoppingCart size={20} /> },
  { to: "/tickets", label: "My Tickets", icon: <FaTicketAlt size={20} /> },
  { to: "/settings", label: "Settings", icon: <IoSettingsOutline size={20} /> },
];

const BottomNav: React.FC = () => {
  const loc = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white z-30 shadow-inner">
      <div className="max-w-3xl mx-auto px-2 pt-1 pb-7 flex justify-between">
        {tabs.map((t) => {
          const active = loc.pathname === t.to;
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`flex-1 flex flex-col items-center justify-center text-sm gap-1 py-1 px-2 transition-opacity ${
                active ? "opacity-100" : "opacity-60"
              }`}
            >
              <div className="mb-0.5">{t.icon}</div>
              <div className="leading-none text-xs">{t.label}</div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
