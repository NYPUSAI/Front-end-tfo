import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, fetchHome, ForgotPassword } = useAuthStore();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!validateEmail(formData.email))
      return toast.error("Invalid email address");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    if (!validateForm()) {
      setIsLoggingIn(false);
      return;
    }

    const response = await login(formData);
    if (response.access_token && response.refresh_token) {
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);
      await fetchHome(response.access_token);
      navigate("/");
    } else {
      toast.error("Login failed. Please check your credentials.");
    }
    setIsLoggingIn(false);
  };

  const handleResetPassword = async () => {
    if (!resetEmail.trim()) return toast.error("Email is required");
    if (!validateEmail(resetEmail)) return toast.error("Invalid email address");

    setIsResettingPassword(true);
    try {
      await ForgotPassword(resetEmail);
      toast.success("Password reset link sent to your email");
      setShowForgotModal(false);
      setResetEmail("");
    } catch (error) {
      toast.error("Failed to send reset email. Please try again.");
    } finally {
      setIsResettingPassword(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center p-6 sm:p-12 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/AiBots.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white drop-shadow-md">
            Log In
          </h1>
        </div>
        <div className="bg-white/95 dark:bg-gray-800/95 p-6 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <div className="flex justify-between items-center">
              <Link to="/help" className="text-sm text-primary hover:underline">
                Need help?
              </Link>
              <button
                type="button"
                className="text-sm text-primary hover:underline"
                onClick={() => setShowForgotModal(true)}
              >
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? <Loader2 className="animate-spin" /> : "Log In"}
            </button>
          </form>
        </div>
      </div>
      {showForgotModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Reset Password</h3>
            <p>Enter your email to receive a reset link.</p>
            <input
              type="email"
              className="input input-bordered w-full my-4"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setShowForgotModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleResetPassword}
                disabled={isResettingPassword}
              >
                {isResettingPassword ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
