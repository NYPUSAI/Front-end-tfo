import React, { useEffect, useState } from "react";
import { Linkedin, Mail, BarChart2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSettingsStore } from "../store/useSettingsStore";

const SettingsPage = () => {
  const {
    FetchSettingsData,
    SettingsData,
    isSettingsDataLoading,
    EditSettingsData,
  } = useSettingsStore();
  const navigate = useNavigate();

  // Local state for form inputs
  const [formData, setFormData] = useState({
    linkedin_api: { access_token: "" },
    smtp_config: { smtp_host: "", smtp_port: "", sender_email: "" },
    eod_config: { email_address: "", enable: false },
  });

  useEffect(() => {
    FetchSettingsData();
  }, []);

  useEffect(() => {
    if (SettingsData) {
      setFormData({
        linkedin_api: {
          access_token: SettingsData.linkedin_api?.access_token || "",
        },
        smtp_config: {
          smtp_host: SettingsData.smtp_config?.smtp_host || "",
          smtp_port: SettingsData.smtp_config?.smtp_port || "",
          sender_email: SettingsData.smtp_config?.sender_email || "",
        },
        eod_config: {
          email_address: SettingsData.eod_config?.email_address || "",
          enable: SettingsData.eod_config?.enable || false,
        },
      });
    }
  }, [SettingsData]);

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
  const handleUpdate = (section) => {
    EditSettingsData({ [section]: formData[section] });
  };

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-3xl space-y-6">
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
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text font-medium">Access Token</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={formData.linkedin_api.access_token}
                  onChange={(e) =>
                    handleChange("linkedin_api", "access_token", e.target.value)
                  }
                />
                <button
                  className="btn btn-primary"
                  onClick={() => handleUpdate("linkedin_api")}
                >
                  Update
                </button>
              </div>
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
                    className="input input-bordered w-full"
                    value={formData.smtp_config.smtp_host}
                    onChange={(e) =>
                      handleChange("smtp_config", "smtp_host", e.target.value)
                    }
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">SMTP Port</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={formData.smtp_config.smtp_port}
                    onChange={(e) =>
                      handleChange("smtp_config", "smtp_port", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text font-medium">Sender Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  value={formData.smtp_config.sender_email}
                  onChange={(e) =>
                    handleChange("smtp_config", "sender_email", e.target.value)
                  }
                />
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
                  className="input input-bordered w-full"
                  value={formData.eod_config.email_address}
                  onChange={(e) =>
                    handleChange("eod_config", "email_address", e.target.value)
                  }
                />
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
    </div>
  );
};

export default SettingsPage;
