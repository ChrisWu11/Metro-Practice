// @ts-nocheck
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { useAlert } from "../components/Alert";

const PROFILE_STORAGE_KEY = "metro.profile";
const readStoredProfile = () => {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw)
      return { name: "Eric", avatar: "https://picsum.photos/64/64" };
    const parsed = JSON.parse(raw);
    return {
      name: parsed.name || "Eric",
      avatar: parsed.avatar || "https://picsum.photos/64/64",
    };
  } catch {
    return { name: "Eric", avatar: "https://picsum.photos/64/64" };
  }
};

const CounterBlock: React.FC<{ value: string; label: string }> = ({
  value,
  label,
}) => (
  <div className="flex flex-col items-center">
    <div className="flex items-center gap-0.5 mb-1">
      {value.split("").map((digit, index) => (
        <div key={index} className="flex flex-col">
          <div className="w-7 h-11 bg-[#2E2E2E] flex items-center justify-center rounded-md ">
            <span className="text-white text-3xl font-extralight">{digit}</span>
          </div>
          {index === 1 && <div className="w-1"></div>}
        </div>
      ))}
    </div>
    <div className="text-lg font-light text-black">{label}</div>
  </div>
);

const TicketDetails: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 23,
    hours: 7,
    minutes: 32,
    seconds: 47,
  });
  const { showAlert } = useAlert();

  useEffect(() => {
    // 票生效时间 = 当前时间的7天前（同一时刻）
    const nowTs = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const activatedAt = nowTs - 7 * dayMs;

    // 剩余天数 = 30天票有效期 - 已经过的天数
    const validityDays = 30;
    const elapsedDays = Math.max(0, Math.floor((nowTs - activatedAt) / dayMs));
    const remainingDays = Math.max(0, validityDays - elapsedDays);

    // 倒计时从 剩余天数 的 7h32m46s 开始
    const offsetMs = (7 * 60 * 60 + 32 * 60 + 46) * 1000; // 7:32:46
    const targetTime = nowTs + remainingDays * dayMs + offsetMs;

    const timer = setInterval(() => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / dayMs);
        const hours = Math.floor((difference % dayMs) / (1000 * 60 * 60));
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  const formatCurrentDateTime = (d: Date) => {
    const datePart = new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
    const timePart = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(d);
    return `${datePart} ${timePart}`;
  };

  const [profile, setProfile] = useState(readStoredProfile());

  useEffect(() => {
    setProfile(readStoredProfile());
  }, []);

  return (
    <main className="pt-3 pb-40 px-4">
      <div className="max-w-3xl mx-auto">
        <Card>
          <div className="">
            <div className="text-3xl font-light mb-4">Account Information</div>
            <div className="flex items-center gap-2">
              <img
                src={profile.avatar}
                alt="Profile avatar"
                className="w-24 h-24 rounded-full object-cover ml-3 mb-1"
              />
              <div className="text-normal text-black">{profile.name}</div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-3xl font-light mb-6">Ticket Information</h3>
          <div className="text-3xl font-light ml-4">Monthly Season</div>
          <div className="text-3xl font-light mb-6 ml-4">
            Adult (1 Month): Zone 1
          </div>
          <div className="text-xs text-gray-700 mb-6">Current date/time</div>
          <div className="text-base font-semibold ml-4 mb-6">
            {formatCurrentDateTime(new Date())}
          </div>

          <div className="text-xs text-gray-700 mb-6">Expires</div>
          <div className="flex gap-2 justify-center">
            <CounterBlock value={formatNumber(timeLeft.days)} label="days" />
            <CounterBlock value={formatNumber(timeLeft.hours)} label="hrs" />
            <CounterBlock value={formatNumber(timeLeft.minutes)} label="mins" />
            <CounterBlock value={formatNumber(timeLeft.seconds)} label="secs" />
          </div>
        </Card>
        <Card>
          <button
            className="w-full bg-[#0175CA] text-white py-2 rounded-md"
            onClick={() => {
              showAlert();
            }}
          >
            RE-PURCHASE TICKET
          </button>
          <div className="text-center text-xs text-gray-800 mt-6">0enhx57m</div>
        </Card>
      </div>
    </main>
  );
};

export default TicketDetails;
