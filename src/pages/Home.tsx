// @ts-nocheck
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { FaCircle } from "react-icons/fa";
import Img1 from "../assets/h-1.jpg";
import Img2 from "../assets/h-2.jpg";
import Img3 from "../assets/h-3.jpg";
import { useAlert } from "../components/Alert";

const Home: React.FC = () => {
  const [now, setNow] = useState<Date>(new Date());
  const { showAlert } = useAlert();
  // const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30 * 1000); // 每30秒更新一次
    return () => clearInterval(timer);
  }, []);

  const formatNow = (d: Date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const dayName = days[d.getDay()];
    const dayNum = d.getDate();
    const monthName = months[d.getMonth()];
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${dayName} ${dayNum} ${monthName} ${hours}:${minutes}`;
  };

  return (
    <main className="pt-3 pb-40" onClick={() => showAlert()}>
      <div className="max-w-3xl mx-auto">
        <img src={Img1} className="mb-1" />
        <div className="pos-relative">
          <img src={Img2} alt="" />
          <div style={{ color: '#277DCB', bottom: '22rem' }} className="absolute z-5 bg-[#F2F3F8] left-8 text-lg font-medium">
            {formatNow(now)}
          </div>
        </div>
        <img src={Img3} alt="" />
      </div>
    </main>
  );
};

export default Home;