// @ts-nocheck
import React from "react";
import logo from "../assets/logo.png";
import arrowLeft from "../assets/left-arrow.png";
import { useNavigate } from "react-router-dom";

type Props = {
  title?: string;
};

const TopBar: React.FC<Props> = ({ title = "Home" }) => {
  const navigate = useNavigate();
  return (
    <header className="bg-[#2E2E2E] text-white py-2 px-2 pt-16 shadow-md sticky top-0 z-20 h-39">
      <div className="max-w-3xl mx-auto flex justify-between">
        <div>
          {title === "Active" ? (
            <div
              className="flex items-center mb-2"
              onClick={() => navigate(-1)}
            >
              <img
                src={arrowLeft}
                alt="arrow left"
                className="w-6 h-6 object-contain"
              />
              <div className="w-6 h-6 rounded-full text-white text-lg font-extralight whitespace-nowrap leading-6">
                My Tickets
              </div>
            </div>
          ) : (
            <div className="flex h-8"></div>
          )}
          <h1 className="text-4xl font-medium tracking-tight ml-3">{title}</h1>
        </div>
        <img
          src={logo}
          alt="My Metro logo"
          className="w-20 h-10 object-contain mr-2"
        />
      </div>
    </header>
  );
};

export default TopBar;
