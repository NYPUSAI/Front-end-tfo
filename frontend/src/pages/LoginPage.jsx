import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  MessageSquare,
  Lock,
  ChartColumnBig,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SmartTeams from "../assets/SmartTeams.jpg";
import AiBots from "../assets/AiBots.jpg";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, fetchHome, ForgotPassword } = useAuthStore();

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for valid email format
    if (!formData.email.trim()) {
      setIsLoggingIn(false);
      return toast.error("Email is required");
    }
    if (!emailRegex.test(formData.email)) {
      setIsLoggingIn(false);
      return toast.error("Please enter a valid email address");
    }
    if (!formData.password.trim()) {
      setIsLoggingIn(false);
      return toast.error("Password is required");
    }
    // console.log("Form submitted successfully:", formData);
    return true;
  };

  const handleSubmit = async (e) => {
    setIsLoggingIn(true);
    e.preventDefault();
    const success = validateForm();
    if (success) {
      // console.log("inside Success Condition In HandleSubmit");
      // Trigger login action with form data

      const response = await login(formData);
      // console.log(response);
      if (response == "Login failed. Please check your credentials.") {
        setIsLoggingIn(false);
        toast.error("Invalid email, password, or user role");
      }

      if (response.access_token && response.refresh_token) {
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("refresh_token", response.refresh_token);

        await fetchHome(response.access_token);
        toast.success("Logged In Successfully");

        // Optionally, redirect or show user a success message
        navigate("/");
      } else {
        console.error("Token missing after login");
      }
    }
    setIsLoggingIn(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // console.log("Inside handleResetPassword function in login page");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!resetEmail.trim()) {
      return toast.error("Email is required");
    }
    if (!emailRegex.test(resetEmail)) {
      return toast.error("Please enter a valid email address");
    }

    setIsResettingPassword(true);

    const data = { email: resetEmail };

    const response = await ForgotPassword(data);
    // console.log(response);
    if (response.success) {
      setIsResettingPassword(false); // Start loading state
      toast.success(response.message);
      setShowForgotModal(false); // Close modal on success
    } else {
      setIsResettingPassword(false); // Start loading state
      toast.error(response.message);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center p-6 sm:p-12 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${AiBots})` }}
    >
      {/* Top Right Logo */}
      <div className="absolute top-4 left-4 size-10 rounded-lg bg-primary/10 flex items-center justify-center z-10 shadow-lg">
        <img src={SmartTeams} alt="Logo" className="w-10 h-10" />
      </div>
      {/* Improved overlay that works better with both light and dark themes */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/30 backdrop-blur-sm"></div>

      {/* Content on top of background */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo and Heading */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div
              className="size-20 rounded-xl bg-white/20 dark:bg-primary/10 flex items-center justify-center 
              group-hover:bg-white/30 dark:group-hover:bg-primary/20 transition-colors shadow-lg"
            >
              <img
                src={SmartTeams}
                alt="Logo"
                className="size-12 text-primary"
              />
            </div>
            <h1 className="text-2xl font-bold mt-2 text-white drop-shadow-md">
              Smart Teams
            </h1>
          </div>
        </div>

        {/* Form with improved background for better readability in both themes */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium dark:text-gray-200">
                  Email
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium dark:text-gray-200">
                  Password
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <Eye className="size-5 text-gray-500 dark:text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Help and Forgot Password Links */}
            <div className="flex justify-between items-center">
              <Link to="/help" className="text-sm text-white hover:underline">
                Need help?
              </Link>
              <button
                type="button"
                className="text-sm text-white hover:underline"
                onClick={() => setShowForgotModal(true)}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center text-white bg-[#F5BD02] hover:bg-[#e6a818] px-4 py-2 rounded-lg transition disabled:opacity-50 "
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin  " />
                </>
              ) : (
                "Log In"
              )}
            </button>

            {/* <Link to="/graphs" className="btn btn-sm gap-2 transition-colors">
              <ChartColumnBig className="w-4 h-4" />
              <span className="hidden sm:inline">Usage</span>
            </Link> */}
          </form>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <dialog
        id="forgot_password_modal"
        className={`modal ${showForgotModal ? "modal-open" : ""}`}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Reset Password</h3>
          <p className="mb-4">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
          <form onSubmit={handleResetPassword}>
            <div className="form-control mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setShowForgotModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isResettingPassword}
                // onClick={handleResetPassword}
              >
                {isResettingPassword ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setShowForgotModal(false)}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default LoginPage;
