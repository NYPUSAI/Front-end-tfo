import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Mail, MessageSquare, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLogginIn, fetchHome } = useAuthStore();

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for valid email format
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!emailRegex.test(formData.email))
      return toast.error("Please enter a valid email address");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 1)
      return toast.error("Password must be at least 6 characters");
    console.log("Form submitted successfully:", formData);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success) {
      console.log("insideSuccessCondition");
      // Trigger login action with form data
      const response = await login(formData); // Make sure login returns the tokens
      console.log(response, "bhjvghv");
      console.log("accessTokenInHandleSubmit:", response.access_token);
      console.log("refreshTokenInHandleSubmit:", response.refresh_token);
      // Store tokens upon successful login

      if (response.access_token && response.refresh_token) {
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("refresh_token", response.refresh_token);

        //  // Optionally, call fetchHome here
        await fetchHome(response.access_token);

        // Optionally, redirect or show user a success message
        navigate("/"); // Redirect after successful login
      } else {
        // Handle failure case or error if tokens aren't returned
        console.error("Token missing after login");
      }
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col justify-center items-center p-6 sm:p-12 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/botAi.hjpg')" }}
    >
      {/* Semi-transparent overlay to ensure form visibility */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      
      {/* Content on top of background */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo and Heading */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div
              className="size-20 rounded-xl bg-primary/10 flex items-center justify-center 
            group-hover:bg-primary/20 transition-colors"
            >
              <img
                src="/SmartTeams.jpg"
                alt="Logo"
                className="size-12 text-primary"
              />
            </div>
            <h1 className="text-2xl font-bold mt-2 text-white">Log In</h1>
          </div>
        </div>

        {/* Form with background for better readability */}
        <div className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-lg shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
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
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
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
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLogginIn}
            >
              {isLogginIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;