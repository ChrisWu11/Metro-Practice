// @ts-nocheck
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import TopBar from "./components/TopBar";
import BottomNav from "./components/BottomNav";
import { AlertProvider } from "./components/Alert";
import Home from "./pages/Home";
import Purchase from "./pages/Purchase";
import MyTickets from "./pages/MyTickets";
import Settings from "./pages/Settings";
import TicketDetails from "./pages/TicketDetails";
import EditProfile from "./pages/EditProfile";

const TitleWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // derive title from location
  const loc = useLocation();
  const map: Record<string, string> = {
    "/": "Home",
    "/purchase": "Purchase",
    "/tickets": "My Tickets",
    "/settings": "Settings",
    "/tickets/active": "Active",
    "/profile/edit": "Edit Profile",
  };
  const title = map[loc.pathname] || "My Metro";
  return (
    <div>
      <TopBar title={title} />
      {children}
    </div>
  );
};

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/purchase" element={<Purchase />} />
    <Route path="/tickets" element={<MyTickets />} />
    <Route path="/tickets/active" element={<TicketDetails />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/profile/edit" element={<EditProfile />} />
    <Route path="*" element={<Home />} />
  </Routes>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AlertProvider>
        <TitleWrapper>
          <div className="min-h-screen bg-white">
            <AppRoutes />
            <BottomNav />
          </div>
        </TitleWrapper>
      </AlertProvider>
    </BrowserRouter>
  );
};

export default App;
