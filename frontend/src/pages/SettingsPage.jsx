import React, { useEffect, useState } from "react";
import { THEMES } from "../constants/index";
import { useThemeStore } from "../store/useThemeStore";
import { useAuthStore } from "../store/useAuthStore";
import {
  CreditCard,
  LogOut,
  Package,
  Shield,
  User,
  Users,
  Bot,
  Linkedin,
  Mail,
  BarChart2,
  EyeOff,
  Eye,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSettingsStore } from "../store/useSettingsStore";
import toast from "react-hot-toast";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const { logout, CompanyData } = useAuthStore();
  const {
    FetchSettingsData,
    SettingsData,
    isSettingsDataLoading,
    EditSettingsData,
  } = useSettingsStore();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showAccessToken, setShowAccessToken] = useState(false);
  // Local state for form inputs
  const [formData, setFormData] = useState({
    linkedin_api: { access_token: "", auth_head: "" },
    smtp_config: {
      smtp_host: "",
      smtp_port: "",
      sender_email: "",
      password: "",
    },
    eod_config: { email_address: "", enable: false },
  });

  // Validation state
  const [errors, setErrors] = useState({
    linkedin_api: { access_token: "", auth_head: "" },
    smtp_config: {
      smtp_host: "",
      smtp_port: "",
      sender_email: "",
      password: "",
    },
    eod_config: { email_address: "" },
  });

  useEffect(() => {
    FetchSettingsData();
  }, []);

  function capitalizeFirstLetter(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleLogout = () => {
    // console.log("Logging out...");
    logout();
    navigate("/login"); // Redirect user to login page
  };

  useEffect(() => {
    if (SettingsData) {
      setFormData({
        linkedin_api: {
          access_token: SettingsData.linkedin_api?.access_token || "",
          auth_head: SettingsData.linkedin_api?.auth_head || "",
        },
        smtp_config: {
          smtp_host: SettingsData.smtp_config?.smtp_host || "",
          smtp_port: SettingsData.smtp_config?.smtp_port || "",
          sender_email: SettingsData.smtp_config?.sender_email || "",
          password: SettingsData.smtp_config?.password || "",
        },
        eod_config: {
          email_address: SettingsData.eod_config?.email_address || "",
          enable: SettingsData.eod_config?.enable || false,
        },
      });
    }
  }, [SettingsData]);

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate form section
  const validateSection = (section) => {
    const newErrors = { ...errors };
    let isValid = true;

    if (section === "linkedin_api") {
      if (!formData.linkedin_api.access_token.trim()) {
        newErrors.linkedin_api.access_token = "Access token cannot be empty";
        isValid = false;
      } else {
        newErrors.linkedin_api.access_token = "";
      }
      if (!formData.linkedin_api.auth_head.trim()) {
        newErrors.linkedin_api.auth_head = "Header cannot be empty";
        isValid = false;
      } else {
        newErrors.linkedin_api.auth_head = "";
      }
    }

    if (section === "smtp_config") {
      if (!formData.smtp_config.smtp_host.trim()) {
        newErrors.smtp_config.smtp_host = "SMTP host cannot be empty";
        isValid = false;
      } else {
        newErrors.smtp_config.smtp_host = "";
      }

      if (!formData.smtp_config.smtp_port.trim()) {
        newErrors.smtp_config.smtp_port = "SMTP port cannot be empty";
        isValid = false;
      } else {
        newErrors.smtp_config.smtp_port = "";
      }

      if (!formData.smtp_config.sender_email.trim()) {
        newErrors.smtp_config.sender_email = "Sender email cannot be empty";
        isValid = false;
      } else if (!isValidEmail(formData.smtp_config.sender_email)) {
        newErrors.smtp_config.sender_email = "Please enter a valid email";
        isValid = false;
      } else {
        newErrors.smtp_config.sender_email = "";
      }

      if (!formData.smtp_config.password.trim()) {
        newErrors.smtp_config.password = "Password cannot be empty";
        isValid = false;
      } else {
        newErrors.smtp_config.password = "";
      }
    }

    if (section === "eod_config") {
      if (
        formData.eod_config.enable &&
        !formData.eod_config.email_address.trim()
      ) {
        newErrors.eod_config.email_address =
          "Email address cannot be empty when EOD is enabled";
        isValid = false;
      } else if (
        formData.eod_config.email_address.trim() &&
        !isValidEmail(formData.eod_config.email_address)
      ) {
        newErrors.eod_config.email_address = "Please enter a valid email";
        isValid = false;
      } else {
        newErrors.eod_config.email_address = "";
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle input change
  const handleChange = (section, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  // Handle update button click
  const handleUpdate = async (section) => {
    if (validateSection(section)) {
      try {
        await EditSettingsData({ [section]: formData[section] });
        toast.success("Data updated successfully!");
      } catch (error) {
        toast.error("Failed to update data.");
      }
    }
  };

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-3xl space-y-6">
      {/* User Info Card */}
      <div className="card bg-base-200 shadow-lg rounded-xl overflow-hidden">
        <div className="bg-primary text-primary-content p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="avatar placeholder">
                <div className="bg-primary-focus text-primary-content rounded-full w-12">
                  <span className="text-xl">
                    {CompanyData.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {capitalizeFirstLetter(CompanyData.name)}
                </h2>
                <p className="text-sm opacity-80">Account Profile</p>
              </div>
            </div>
            <button
              className="btn btn-error btn-sm flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Details */}
            <div className="flex-1">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                <User size={18} /> Profile Details
              </h3>
              <div className="bg-base-100 p-6 rounded-lg shadow-inner">
                <div className="flex items-center gap-2 mb-2">
                  <div className="badge badge-secondary">Username</div>
                  <span>{CompanyData.user_details[0].username}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="badge badge-accent">Email</div>
                  <span>{CompanyData.user_details[0].email}</span>
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div className="flex-1">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                <Package size={18} /> Package Details
              </h3>
              <div className="stats shadow bg-base-100 w-full">
                <div className="stat">
                  <div className="stat-title flex items-center gap-2">
                    <Shield size={14} /> Package
                  </div>
                  <div className="stat-value text-lg">
                    {capitalizeFirstLetter(CompanyData.package.name)}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title flex items-center gap-2">
                    <CreditCard size={14} /> Price
                  </div>
                  <div className="stat-value text-lg text-accent">
                    ₹{CompanyData.package.price}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Package Limits */}
          <div className="mt-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Shield size={18} /> Package Limits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card bg-base-100 shadow-sm">
                <div className="card-body p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="avatar placeholder">
                        <div className="bg-primary text-primary-content rounded w-8 h-8">
                          <span>
                            <Users size={16} />
                          </span>
                        </div>
                      </div>
                      <span className="font-medium">AI Teams</span>
                    </div>
                    <div className="badge badge-lg">
                      {CompanyData.package.max_ai_teams}
                    </div>
                  </div>
                  {/* <progress 
                    className="progress progress-primary mt-2" 
                    value="70" 
                    max="100"
                  ></progress> */}
                </div>
              </div>

              <div className="card bg-base-100 shadow-sm">
                <div className="card-body p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="avatar placeholder">
                        <div className="bg-secondary text-secondary-content rounded w-8 h-8">
                          <span>
                            <Bot size={16} />
                          </span>
                        </div>
                      </div>
                      <span className="font-medium">IVAs</span>
                    </div>
                    <div className="badge badge-lg badge-secondary">
                      {CompanyData.package.max_ivas}
                    </div>
                  </div>
                  {/* <progress 
                    className="progress progress-secondary mt-2" 
                    value="50" 
                    max="100"
                  ></progress> */}
                </div>
              </div>

              <div className="card bg-base-100 shadow-sm">
                <div className="card-body p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="avatar placeholder">
                        <div className="bg-accent text-accent-content rounded w-8 h-8">
                          <span>
                            <Shield size={16} />
                          </span>
                        </div>
                      </div>
                      <span className="font-medium">Agents</span>
                    </div>
                    <div className="badge badge-lg badge-accent">
                      {CompanyData.package.max_agents}
                    </div>
                  </div>
                  {/* <progress 
                    className="progress progress-accent mt-2" 
                    value="30" 
                    max="100"
                  ></progress> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LinkedIn API Configuration */}
      <div className="card bg-base-200 shadow-lg rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Linkedin size={20} /> LinkedIn API
        </h2>
        <p className="text-sm text-base-content/70">
          Manage your LinkedIn API integration settings
        </p>
        <div className="divider"></div>
        <div className="bg-base-100 p-6 rounded-lg shadow-inner flex justify-center items-center min-h-[100px]">
          {isSettingsDataLoading ? (
            <span className="loading loading-spinner loading-lg"></span>
          ) : (
            <div className="form-control w-full space-y-4">
              {/* Access Token */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Access Token</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type={showAccessToken ? "text" : "password"}
                    className={`input input-bordered w-full ${
                      errors.linkedin_api.access_token ? "input-error" : ""
                    }`}
                    value={formData.linkedin_api.access_token}
                    onChange={(e) =>
                      handleChange(
                        "linkedin_api",
                        "access_token",
                        e.target.value
                      )
                    }
                  />
                  <button
                    type="button"
                    className="btn btn-ghost p-2"
                    onClick={() => setShowAccessToken((prev) => !prev)}
                  >
                    {showAccessToken ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.linkedin_api.access_token && (
                  <div className="text-error text-xs flex items-center mt-1">
                    <AlertCircle size={12} className="mr-1" />
                    {errors.linkedin_api.access_token}
                  </div>
                )}
              </div>
              {/* Auth Header */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Header</span>
                </label>
                <div className="relative w-full">
                  <input
                    type="text"
                    className={`input input-bordered w-full ${
                      errors.linkedin_api.auth_head ? "input-error" : ""
                    }`}
                    value={formData.linkedin_api.auth_head}
                    onChange={(e) =>
                      handleChange(
                        "linkedin_api",
                        "auth_head",
                        e.target.value
                      )
                    }
                  />
                  {errors.linkedin_api.auth_head && (
                    <div className="text-error text-xs flex items-center mt-1">
                      <AlertCircle size={12} className="mr-1" />
                      {errors.linkedin_api.auth_head}
                    </div>
                  )}
                </div>
              </div>
              <button
                className="btn btn-primary w-full"
                onClick={() => handleUpdate("linkedin_api")}
              >
                Update
              </button>
            </div>
          )}
        </div>
      </div>

      {/* SMTP Configuration */}
      <div className="card bg-base-200 shadow-lg rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Mail size={20} /> SMTP Configuration
        </h2>
        <p className="text-sm text-base-content/70">
          Configure your email server settings
        </p>
        <div className="divider"></div>
        <div className="bg-base-100 p-6 rounded-lg shadow-inner min-h-[200px] flex justify-center items-center">
          {isSettingsDataLoading ? (
            <span className="loading loading-spinner loading-lg"></span>
          ) : (
            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">SMTP Host</span>
                  </label>
                  <input
                    type="text"
                    className={`input input-bordered w-full ${
                      errors.smtp_config.smtp_host ? "input-error" : ""
                    }`}
                    value={formData.smtp_config.smtp_host}
                    onChange={(e) =>
                      handleChange("smtp_config", "smtp_host", e.target.value)
                    }
                  />
                  {errors.smtp_config.smtp_host && (
                    <div className="text-error text-xs flex items-center mt-1">
                      <AlertCircle size={12} className="mr-1" />
                      {errors.smtp_config.smtp_host}
                    </div>
                  )}
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">SMTP Port</span>
                  </label>
                  <input
                    type="text"
                    className={`input input-bordered w-full ${
                      errors.smtp_config.smtp_port ? "input-error" : ""
                    }`}
                    value={formData.smtp_config.smtp_port}
                    onChange={(e) =>
                      handleChange("smtp_config", "smtp_port", e.target.value)
                    }
                  />
                  {errors.smtp_config.smtp_port && (
                    <div className="text-error text-xs flex items-center mt-1">
                      <AlertCircle size={12} className="mr-1" />
                      {errors.smtp_config.smtp_port}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-control w-full relative">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`input input-bordered w-full pr-10 ${
                      errors.smtp_config.password ? "input-error" : ""
                    }`}
                    value={formData.smtp_config.password}
                    placeholder="Type Password"
                    onChange={(e) =>
                      handleChange("smtp_config", "password", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.smtp_config.password && (
                  <div className="text-error text-xs flex items-center mt-1">
                    <AlertCircle size={12} className="mr-1" />
                    {errors.smtp_config.password}
                  </div>
                )}
              </div>

              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text font-medium">Sender Email</span>
                </label>
                <input
                  type="email"
                  className={`input input-bordered w-full ${
                    errors.smtp_config.sender_email ? "input-error" : ""
                  }`}
                  value={formData.smtp_config.sender_email}
                  onChange={(e) =>
                    handleChange("smtp_config", "sender_email", e.target.value)
                  }
                />
                {errors.smtp_config.sender_email && (
                  <div className="text-error text-xs flex items-center mt-1">
                    <AlertCircle size={12} className="mr-1" />
                    {errors.smtp_config.sender_email}
                  </div>
                )}
              </div>

              <button
                className="btn btn-primary w-full"
                onClick={() => handleUpdate("smtp_config")}
              >
                Save SMTP Settings
              </button>
            </div>
          )}
        </div>
      </div>

      {/* EOD Configuration */}
      <div className="card bg-base-200 shadow-lg rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <BarChart2 size={20} /> EOD Reports Configuration
        </h2>
        <p className="text-sm text-base-content/70">
          Configure end-of-day reporting settings
        </p>
        <div className="divider"></div>
        <div className="bg-base-100 p-6 rounded-lg shadow-inner min-h-[150px] flex justify-center items-center">
          {isSettingsDataLoading ? (
            <span className="loading loading-spinner loading-lg"></span>
          ) : (
            <div className="w-full">
              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text font-medium">Email Address</span>
                </label>
                <input
                  type="email"
                  className={`input input-bordered w-full ${
                    errors.eod_config.email_address ? "input-error" : ""
                  }`}
                  value={formData.eod_config.email_address}
                  onChange={(e) =>
                    handleChange("eod_config", "email_address", e.target.value)
                  }
                />
                {errors.eod_config.email_address && (
                  <div className="text-error text-xs flex items-center mt-1">
                    <AlertCircle size={12} className="mr-1" />
                    {errors.eod_config.email_address}
                  </div>
                )}
              </div>

              <div className="form-control mb-4">
                <label className="label cursor-pointer justify-start gap-4">
                  <span className="label-text font-medium">
                    Enable EOD Reports
                  </span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary toggle-lg"
                    checked={formData.eod_config.enable}
                    onChange={(e) =>
                      handleChange("eod_config", "enable", e.target.checked)
                    }
                  />
                </label>
              </div>

              <button
                className="btn btn-primary w-full"
                onClick={() => handleUpdate("eod_config")}
              >
                Save EOD Settings
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Theme Selection */}
      <div className="card bg-base-200 shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold">Theme</h2>
        <p className="text-sm text-base-content/70">
          Choose a theme for your chat interface
        </p>
        <div className="divider"></div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all  
              ${
                theme === t
                  ? "bg-primary text-primary-content"
                  : "hover:bg-base-300"
              }`}
              onClick={() => setTheme(t)}
            >
              <div
                className="relative h-10 w-full rounded-md overflow-hidden"
                data-theme={t}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-xs font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
