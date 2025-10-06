// @ts-nocheck
import React from "react";
import Card from "../components/Card";
import { FaUserCircle, FaInfoCircle } from "react-icons/fa";
import { PiWarningCircle } from "react-icons/pi";
import { useAlert } from "../components/Alert";
import { useNavigate } from "react-router-dom";

const Settings: React.FC = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  return (
    <main className="pt-3 pb-40 px-4">
      <div className="max-w-3xl mx-auto">
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <FaUserCircle size={28} />
            <h3 className="text-3xl font-light">Account</h3>
          </div>
          <ul
            className="space-y-4 text-lg font-extralight"
            onClick={(e) => {
              showAlert();
            }}
          >
            <li className="select-none">Edit details</li>
            <li>Logout</li>
            <li>Delete</li>
          </ul>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-4">
            <PiWarningCircle size={28} />
            <h3 className="text-3xl font-light">About</h3>
          </div>
          <ul
            className="space-y-4 text-lg font-extralight  "
            onClick={() => {
              showAlert();
            }}
          >
            <li>West Midlands Metro T&Cs</li>
            <li>Payment Service T&Cs</li>
            <li>Privacy Policy</li>
            <li>Service Information</li>
            <li>View Zone Map</li>
          </ul>
        </Card>

        <div
          className="text-right text-black mt-3"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.25)" }}
          onClick={() => {
            navigate("/profile/edit");
          }}
        >
          Version: 2.7.8 (1)
        </div>
      </div>
    </main>
  );
};

export default Settings;
