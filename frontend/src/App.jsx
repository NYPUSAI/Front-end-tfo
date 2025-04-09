import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import GraphPage from "./pages/GraphPage";
import Resources from "./pages/Resources";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import RaiseATicketModal from "./components/RaiseATicketModal";
import NotFoundPage from "./pages/NotFoundPage";
import HelpPage from "./pages/HelpPage";

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
      {/* Hide Navbar on the login page */}
      {location.pathname !== "/login" && (
        <Navbar onOpenTicket={() => setIsModalOpen(true)} />
      )}

      <RaiseATicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Routes>
        {!userAuth ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/graphs" element={<GraphPage />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/login" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
