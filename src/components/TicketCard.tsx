// @ts-nocheck
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
  subtitle?: string;
  dates?: string;
};

const TicketCard: React.FC<Props> = ({ title, subtitle, dates }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-[#F2F3F8] rounded-xl shadow-card p-3 mb-4 mx-3"
      onClick={(e) => { e.stopPropagation(); navigate("/tickets/active"); }}
    >
      <h3 className="text-3xl font-normal text-center">{title}</h3>
      {subtitle && <p className="text-center mt-2 text-lg font-light">{subtitle}</p>}
      {dates && <p className="text-center mt-1 text-lg text-black font-light">{dates}</p>}
    </div>
  );
};

export default TicketCard;
