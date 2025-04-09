import React, { useState, useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import useWebSocketStore from "../../store/useWebSocketStore";
import { Loader2 } from "lucide-react";

const SalesStrategyForm = () => {
  const { sendMessage, formResponseIsLoading } = useWebSocketStore();
  const { formIsSubmitted } = useChatStore();
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    industry_sector: "",
    target_market: "",
    timeframe: "",
    data_source: "",
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
    if (!formData.industry_sector.trim()) newErrors.industry_sector = "Industry Sector is required.";
    if (!formData.target_market.trim()) newErrors.target_market = "Target Market is required.";
    if (!formData.timeframe.trim()) newErrors.timeframe = "Timeframe is required.";
    if (!formData.data_source.trim()) newErrors.data_source = "Data Source is required.";

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
        industry_sector: "",
        target_market: "",
        timeframe: "",
        data_source: "",
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
          Sales Strategy Form
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control md:col-span-2">
            <label className="label-text">Industry Sector</label>
            <input
              type="text"
              name="industry_sector"
              placeholder="Enter Industry Sector"
              value={formData.industry_sector}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
            />
            {errors.industry_sector && (
              <p className="text-red-500 text-xs mt-1">{errors.industry_sector}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label-text">Target Market</label>
            <input
              type="text"
              name="target_market"
              placeholder="Enter Target Market"
              value={formData.target_market}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
            />
            {errors.target_market && (
              <p className="text-red-500 text-xs mt-1">{errors.target_market}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label-text">Timeframe</label>
            <input
              type="text"
              name="timeframe"
              placeholder="Enter Timeframe"
              value={formData.timeframe}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
            />
            {errors.timeframe && (
              <p className="text-red-500 text-xs mt-1">{errors.timeframe}</p>
            )}
          </div>

          <div className="form-control md:col-span-2">
            <label className="label-text">Data Source</label>
            <input
              type="text"
              name="data_source"
              placeholder="Enter Data Source"
              value={formData.data_source}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
            />
            {errors.data_source && (
              <p className="text-red-500 text-xs mt-1">{errors.data_source}</p>
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
              "Submit Request"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SalesStrategyForm;
