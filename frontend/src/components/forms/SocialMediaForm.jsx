import React, { useState, useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import useWebSocketStore from "../../store/useWebSocketStore";
import { Loader2 } from "lucide-react";

const SocialMediaForm = () => {
  const { sendMessage, formResponseIsLoading } = useWebSocketStore();
  const { formIsSubmitted } = useChatStore();

  const [formData, setFormData] = useState({
    competitors: "",
    campaign_theme: "",
    target_audience: "",
    platform: "",
    goal: "",
  });

  const [errors, setErrors] = useState({});
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = "This field is required.";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      action: "form",
      form: formData,
    };

    sendMessage(payload);
    setIsWaitingForResponse(true);
  };

  useEffect(() => {
    if (isWaitingForResponse && !formResponseIsLoading) {
      formIsSubmitted();
      setFormData({
        competitors: "",
        campaign_theme: "",
        target_audience: "",
        platform: "",
        goal: "",
      });
      setErrors({});
      setIsWaitingForResponse(false);
    }
  }, [formResponseIsLoading, isWaitingForResponse, formIsSubmitted]);

  return (
    <div className="flex justify-center mt-4 pt-10">
      <form
        className="p-4 border-gray-50 rounded-lg shadow max-w-lg w-full bg-base-100"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-semibold mb-4 text-center">
          Social Media Campaign Setup
        </h2>

        {[
          { name: "competitors", label: "Competitors", placeholder: "Enter Competitor Name" },
          { name: "campaign_theme", label: "Campaign Theme", placeholder: "Enter Campaign Theme" },
          { name: "target_audience", label: "Target Audience", placeholder: "Enter Target Audience" },
          { name: "platform", label: "Platform", placeholder: "Enter Platform" },
          { name: "goal", label: "Goal", placeholder: "Enter Goal" },
        ].map(({ name, label, placeholder }) => (
          <div key={name} className="form-control">
            <label className="label-text">{label}</label>
            <input
              type="text"
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
            />
            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
          </div>
        ))}

        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            className="btn btn-primary btn-sm w-full flex items-center justify-center"
            disabled={formResponseIsLoading}
          >
            {formResponseIsLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Submit Campaign"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SocialMediaForm;
