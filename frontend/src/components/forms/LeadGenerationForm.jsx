import React, { useState, useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import useWebSocketStore from "../../store/useWebSocketStore";
import { Loader2 } from "lucide-react";

const LeadGenerationForm = () => {
  const { sendMessage, formResponseIsLoading } = useWebSocketStore();
  const { formIsSubmitted } = useChatStore();
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    target_industry: "",
    company_size_range: "",
    geographic_focus: "",
    lead_source_channels: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    if (!formData.target_industry.trim()) newErrors.target_industry = "Target Industry is required.";
    if (!formData.company_size_range.trim()) newErrors.company_size_range = "Company Size Range is required.";
    if (!formData.geographic_focus.trim()) newErrors.geographic_focus = "Geographic Focus is required.";
    if (!formData.lead_source_channels.trim()) newErrors.lead_source_channels = "Lead Source Channels are required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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
        target_industry: "",
        company_size_range: "",
        geographic_focus: "",
        lead_source_channels: "",
      });
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
          Lead Generation Form
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control md:col-span-2">
            <label className="label-text">Target Industry</label>
            <input
              type="text"
              name="target_industry"
              placeholder="Enter Target Industry"
              value={formData.target_industry}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
            />
            {errors.target_industry && (
              <p className="text-red-500 text-xs mt-1">{errors.target_industry}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label-text">Company Size Range</label>
            <input
              type="text"
              name="company_size_range"
              placeholder="Enter Company Size Range"
              value={formData.company_size_range}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
            />
            {errors.company_size_range && (
              <p className="text-red-500 text-xs mt-1">{errors.company_size_range}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label-text">Geographic Focus</label>
            <input
              type="text"
              name="geographic_focus"
              placeholder="Enter Geographic Focus"
              value={formData.geographic_focus}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
            />
            {errors.geographic_focus && (
              <p className="text-red-500 text-xs mt-1">{errors.geographic_focus}</p>
            )}
          </div>

          <div className="form-control md:col-span-2">
            <label className="label-text">Lead Source Channels</label>
            <input
              type="text"
              name="lead_source_channels"
              placeholder="Enter Lead Source Channels"
              value={formData.lead_source_channels}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
            />
            {errors.lead_source_channels && (
              <p className="text-red-500 text-xs mt-1">{errors.lead_source_channels}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="btn btn-primary btn-sm w-full flex items-center justify-center"
            disabled={formResponseIsLoading}
          >
            {formResponseIsLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Submit Form"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadGenerationForm;
