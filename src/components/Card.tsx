// @ts-nocheck
import React from "react";

const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className = "",
}) => {
  return (
    // 只有左边和下有阴影，其他没有
    <div
      className={`bg-[#F2F3F8] rounded-xl shadow-[-3px_0_0_0_rgba(0,0,0,0.12),0_3px_0_0_rgba(0,0,0,0.12)] p-3 mb-3 max-w-3xl mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
