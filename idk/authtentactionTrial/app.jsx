import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { Toaster } from "react-hot-toast";
import RaiseATicketModal from "../../frontend/src/components/RaiseATicketModal";

const App = () => {
  const { userAuth, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    checkAuth(); // Check authentication status on page load & route changes
  }, [location.pathname]);

  if (isCheckingAuth) {
    return <div>Loading...</div>; // Show a loading state while checking auth
  }

  return (
    <div data-theme={theme}>
      <Navbar onOpenTicket={() => setIsModalOpen(true)} />
      <RaiseATicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <Routes>
        {/* Redirect to login if user is not authenticated */}
        {!userAuth ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/login" element={<Navigate to="/" />} />{" "}
            {/* Redirect logged-in users away from login */}
          </>
        )}
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
