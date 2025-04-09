import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Mail, MessageSquare, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, fetchHome } = useAuthStore();

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
    // if (formData.password.length < 6) {
    //   setIsLoggingIn(false);
    //   return toast.error("Password must be at least 6 characters");
    // }
    console.log("Form submitted successfully:", formData);
    return true;
  };

  const handleSubmit = async (e) => {
    setIsLoggingIn(true);
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
    setIsLoggingIn(false);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column - Login Form */}
          <div className="card-body p-8 text-center">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-primary">
                <img
                  src="/nypusAi.jpg"
                  alt="AiBots"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* <h2 className="card-title text-2xl  font-bold mt-4">LOGIN</h2> */}
            <h2 className="card-title text-2xl font-bold mt-4 justify-center">
              LOGIN
            </h2>
            {/* <p className="text-base-content/60 text-sm mb-6">
              How do I get started? Learn ipsum dolor sit amet.
            </p> */}

            <form onSubmit={handleSubmit} className="w-full space-y-6">
              {/* Email */}
              <div className="form-control">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type="email"
                    className="input input-bordered w-full pl-10"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-control">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full pl-10"
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

              <button
                type="submit"
                className="btn btn-primary w-full rounded-full"
              >
                {isLoggingIn ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Log In"
                )}
              </button>

              <p className="text-center mt-4 text-sm">
                Need help?{" "}
                <Link
                  to={"/help"}
                  className="text-secondary font-medium hover:underline"
                >
                  Click here
                </Link>
              </p>
            </form>
          </div>

          {/* Right Column - Image */}
          <div className="hidden md:block bg-primary relative w-full h-full">
            <img
              src="/AiBots.jpg"
              alt="AiBots"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
