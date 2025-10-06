// @ts-nocheck
import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type AlertContextType = {
  showAlert: () => void;
  hideAlert: () => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlert must be used within AlertProvider");
  return ctx;
};

export const AlertProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const showAlert = useCallback(() => setVisible(true), []);
  const hideAlert = useCallback(() => setVisible(false), []);

  const value = useMemo(() => ({ showAlert, hideAlert }), [showAlert, hideAlert]);

  return (
    <AlertContext.Provider value={value}>
      {children}
      {visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={(e) => e.stopPropagation()}>
          <div className="w-80 max-w-[85%] bg-white rounded-2xl overflow-hidden text-center">
            <div className="pt-4 px-4">
              <div className="text-lg font-semibold">Error</div>
              <div className="mt-2 mb-3 text-base text-gray-800">
                The Internet connection appears to be offline.
              </div>
            </div>
            <div className="h-px bg-gray-200" />
            <button
              className="w-full py-3 text-[#007AFF] font-semibold active:bg-gray-100"
              onClick={(e) => { e.stopPropagation(); hideAlert(); }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};


