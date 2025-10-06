// @ts-nocheck
import React, { useState } from "react";
import TicketCard from "../components/TicketCard";
import { FaChevronDown } from "react-icons/fa";
import Img2 from "../assets/t-2.jpg";
import { useAlert } from "../components/Alert";

const MyTickets: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { showAlert } = useAlert();

  return (
    <main className="pt-3 pb-40" onClick={() => showAlert()}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-2 px-3">
          <h3 className="text-lg font-medium">Active (1)</h3>
          <FaChevronDown
            size={24}
            onClick={() => setCollapsed((s) => !s)}
            className={`cursor-pointer transform transition-transform duration-200 ${
              collapsed ? "rotate-180" : ""
            }`}
            aria-expanded={!collapsed}
          />
        </div>

        {!collapsed && (
          <TicketCard
            title="Monthly Season"
            subtitle={"Adult (1 Month): Zone 1"}
            dates={"28/09/2025 - 28/10/2025"}
          />
        )}

        <img src={Img2} alt="" />
      </div>
    </main>
  );
};

export default MyTickets;
