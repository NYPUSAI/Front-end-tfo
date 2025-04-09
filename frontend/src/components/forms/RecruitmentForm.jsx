import React, { useState, useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import useWebSocketStore from "../../store/useWebSocketStore";
import { Loader2 } from "lucide-react";

const RecruitmentForm = () => { 
  const { chatId, formIsSubmitted } = useChatStore();
  const { sendMessage, formResponseIsLoading } = useWebSocketStore();
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  const [formData, setFormData] = useState({
    job_title: "",
    location: "",
    company_name: "",
    job_requirement: "",
    expected_reach_out: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors on input
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.job_title.trim()) newErrors.job_title = "Job title is required.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";
    if (!formData.company_name.trim()) newErrors.company_name = "Company name is required.";
    if (!formData.job_requirement.trim()) newErrors.job_requirement = "Job requirement is required.";
    if (!formData.expected_reach_out || formData.expected_reach_out < 1) {
      newErrors.expected_reach_out = "Expected reach out must be at least 1.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    sendMessage({ action: "form", form: formData });
    setIsWaitingForResponse(true);
  };

  useEffect(() => {
    if (isWaitingForResponse && !formResponseIsLoading) {
      formIsSubmitted();
      setIsWaitingForResponse(false);
    }
  }, [formResponseIsLoading, isWaitingForResponse]);

  return (
    <div className="flex justify-center mt-4 pt-10">
      <form
        className="p-4 border-gray-50 rounded-lg shadow max-w-lg w-full bg-base-100"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-semibold mb-4 text-center">
          New Recruitment Request
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Job Title */}
          <div className="form-control">
            <label className="label-text">Job Title</label>
            <input
              type="text"
              name="job_title"
              placeholder="Enter job title"
              value={formData.job_title}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
            />
            {errors.job_title && <p className="text-red-500 text-xs mt-1">{errors.job_title}</p>}
          </div>

          {/* Location */}
          <div className="form-control">
            <label className="label-text">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter job location"
              value={formData.location}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
          </div>

          {/* Company Name */}
          <div className="form-control md:col-span-2">
            <label className="label-text">Company Name</label>
            <input
              type="text"
              name="company_name"
              placeholder="Enter company name"
              value={formData.company_name}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
            />
            {errors.company_name && <p className="text-red-500 text-xs mt-1">{errors.company_name}</p>}
          </div>

          {/* Job Requirement */}
          <div className="form-control md:col-span-2">
            <label className="label-text">Job Requirement</label>
            <textarea
              name="job_requirement"
              placeholder="List required skills"
              value={formData.job_requirement}
              onChange={handleChange}
              className="textarea textarea-sm input-bordered w-full"
              rows={2}
            ></textarea>
            {errors.job_requirement && <p className="text-red-500 text-xs mt-1">{errors.job_requirement}</p>}
          </div>

          {/* Expected Reach Out */}
          <div className="form-control md:col-span-2">
            <label className="label-text">Expected Reach Out</label>
            <input
              type="number"
              name="expected_reach_out"
              placeholder="Enter expected reach out count"
              value={formData.expected_reach_out}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
              // min="1"
            />
            {errors.expected_reach_out && <p className="text-red-500 text-xs mt-1">{errors.expected_reach_out}</p>}
          </div>
        </div>
        
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
              "Submit Request"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecruitmentForm;
