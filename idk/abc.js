// access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQxOTUzMDAyLCJpYXQiOjE3NDE5NDk0MDIsImp0aSI6IjAyMTIxOGIwMjhmYjRlZDRhYWZmNTI1NDc0ZGMyNjRhIiwidXNlcl9pZCI6IjQ2MmRlNTcxLWJhOGMtNGY2MC1iNDA3LWM0NmY3MGJhMjNlMCIsInJvbGUiOiJvcmdhbml6YXRpb25fYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSJ9.J7N6ttHyZ5KxlEEgpK_bktANrhiskMZuo9IJKivfSUI"
// refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0MjU1NDIwMiwiaWF0IjoxNzQxOTQ5NDAyLCJqdGkiOiJiNDM0OGZlNjZjNjM0ZjAzODE2OWM4OTdjM2YyZmY5MSIsInVzZXJfaWQiOiI0NjJkZTU3MS1iYThjLTRmNjAtYjQwNy1jNDZmNzBiYTIzZTAifQ.wawIvaSZawTBeLAOUcBUz6ZUOLjokpwrNbjNeoMuo6o"
// role: "organization_admin"
// user_id: "462de571-ba8c-4f60-b407-c46f70ba23e0",



// {
//     "id": "96733e68-4241-4892-8028-2ccc820d2659",
//     "name": "nypus",
//     "package": {
//         "id": "592e137f-df57-4162-bd0d-29ed63a27579",
//         "name": "tier1",
//         "description": "",
//         "price": "500.00",
//         "max_ai_teams": 1,
//         "max_ivas": 2,
//         "max_agents": 5,
//         "features": {
//             "hr_dept": [
//                 "Recruitment Team",
//                 "Onboarding Team"
//             ],
//             "sales_dept": [
//                 "Content Creation",
//                 "Customer Relationship Management",
//                 "Sales Strategy",
//                 "Lead Generation"
//             ],
//             "marketing_dept": [
//                 "SEO Team",
//                 "Marketing Research Team",
//                 "Social Media Team"
//             ]
//         }
//     }
// }

import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import RaiseATicketModal from "./components/RaiseATicketModal";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
    const { theme } = useThemeStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div data-theme={theme}>
            <Navbar onOpenTicket={() => setIsModalOpen(true)} />
            <RaiseATicketModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Toaster />
        </div>
    );
};

export default App;