import React, { useState, useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import useWebSocketStore from "../../store/useWebSocketStore";
import { Loader2 } from "lucide-react";

const SeoForm = () => {
  const { sendMessage, formResponseIsLoading } = useWebSocketStore();
  const { formIsSubmitted } = useChatStore();
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    website_name: "",
    competitors: "",
    target_audience: "",
    ad_budget: "",
    primary_goals: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
    const newErrors = {};
    if (!formData.website_name.trim()) newErrors.website_name = "Website Name is required.";
    if (!formData.competitors.trim()) newErrors.competitors = "Competitors field is required.";
    if (!formData.target_audience.trim()) newErrors.target_audience = "Target Audience is required.";
    if (!formData.primary_goals.trim()) newErrors.primary_goals = "Primary Goals are required.";

    const adBudgetValue = parseFloat(formData.ad_budget);
    if (!formData.ad_budget.trim() || isNaN(adBudgetValue) || adBudgetValue <= 0) {
      newErrors.ad_budget = "Ad Budget must be greater than 0.";
    }

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
        website_name: "",
        competitors: "",
        target_audience: "",
        ad_budget: "",
        primary_goals: "",
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
        <h2 className="text-lg font-semibold mb-4 text-center">SEO Form</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control md:col-span-2">
            <label className="label-text">Website Name</label>
            <input
              type="text"
              name="website_name"
              placeholder="Enter Website Name"
              value={formData.website_name}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
            />
            {errors.website_name && <p className="text-red-500 text-xs mt-1">{errors.website_name}</p>}
          </div>

          <div className="form-control">
            <label className="label-text">Competitors</label>
            <input
              type="text"
              name="competitors"
              placeholder="Enter Competitors"
              value={formData.competitors}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
            />
            {errors.competitors && <p className="text-red-500 text-xs mt-1">{errors.competitors}</p>}
          </div>

          <div className="form-control">
            <label className="label-text">Target Audience</label>
            <input
              type="text"
              name="target_audience"
              placeholder="Enter Target Audience"
              value={formData.target_audience}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
            />
            {errors.target_audience && <p className="text-red-500 text-xs mt-1">{errors.target_audience}</p>}
          </div>

          <div className="form-control md:col-span-2">
            <label className="label-text">Ad Budget (₹)</label>
            <input
              type="number"
              name="ad_budget"
              placeholder="Enter Ad Budget"
              value={formData.ad_budget}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
            />
            {errors.ad_budget && <p className="text-red-500 text-xs mt-1">{errors.ad_budget}</p>}
          </div>

          <div className="form-control md:col-span-2">
            <label className="label-text">Primary Goals</label>
            <input
              type="text"
              name="primary_goals"
              placeholder="Enter Primary Goals"
              value={formData.primary_goals}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
            />
            {errors.primary_goals && <p className="text-red-500 text-xs mt-1">{errors.primary_goals}</p>}
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
              "Submit Request"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SeoForm;
