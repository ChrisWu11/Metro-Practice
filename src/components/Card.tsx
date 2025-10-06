// @ts-nocheck
import React from "react";

const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className = "",
}) => {
  return (
    // 只有左边和下有阴影，其他没有
    <div
      className={`bg-[#F2F3F8] rounded-xl shadow-[-3px_0_8px_-2px_rgba(0,0,0,0.15),0_3px_8px_-2px_rgba(0,0,0,0.15)] p-3 mb-3 max-w-3xl mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
