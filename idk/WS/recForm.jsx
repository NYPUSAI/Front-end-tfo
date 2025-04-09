import React, { useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import useWebSocketStore from "../../store/useWebSocketStore";

const RecruitmentForm = () => {
  const { sendMessage } = useWebSocketStore();

  const [formData, setFormData] = useState({
    job_title: "",
    location: "",
    company_name: "",
    job_requirement: "",
    expected_reach_out: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage({ action: "form", form: formData });
    console.log("📤 Form data sent via WebSocket:", formData);
  };

  return (
    <div className="flex justify-center mt-4 pt-10">
      <form className="p-4 border-gray-50 rounded-lg shadow max-w-lg w-full bg-base-100" onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold mb-4 text-center">New Recruitment Request</h2>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(formData).map((key) => (
            <div key={key} className="form-control md:col-span-2">
              <label className="label-text">{key.replace("_", " ")}</label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="input input-sm input-bordered w-full"
                required
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button type="submit" className="btn btn-primary btn-sm w-full">Submit Request</button>
        </div>
      </form>
    </div>
  );
};

export default RecruitmentForm;
