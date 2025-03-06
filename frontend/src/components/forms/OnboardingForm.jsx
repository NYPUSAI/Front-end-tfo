import React, { useState, useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import useWebSocketStore from "../../store/useWebSocketStore";
import { Loader2 } from "lucide-react";

const OnboardingForm = () => {
  const { chatId, formIsSubmitted } = useChatStore();
  const { sendMessage, formResponseIsLoading } = useWebSocketStore();
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: "",
    first_name: "",
    email: "",
    department: "",
    position: "",
    startDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!chatId) {
      console.error("❌ No chat ID available.");
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
          New Employee Onboarding
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Employee ID */}
          <div className="form-control">
            <label className="label-text">Employee ID</label>
            <input
              type="text"
              name="employee_id"
              placeholder="Enter Employee ID"
              value={formData.employee_id}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
              required
            />
          </div>

          {/* Employee Name */}
          <div className="form-control">
            <label className="label-text">Employee Name</label>
            <input
              type="text"
              name="first_name"
              placeholder="Enter Employee Name"
              value={formData.first_name}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
              required
            />
          </div>

          {/* Email */}
          <div className="form-control md:col-span-2">
            <label className="label-text">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
              required
            />
          </div>

          {/* Department */}
          <div className="form-control">
            <label className="label-text">Department</label>
            <input
              type="text"
              name="department"
              placeholder="Enter Department"
              value={formData.department}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
              required
            />
          </div>

          {/* Position */}
          <div className="form-control">
            <label className="label-text">Position</label>
            <input
              type="text"
              name="position"
              placeholder="Enter Position"
              value={formData.position}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
              required
            />
          </div>

          {/* Start Date */}
          <div className="form-control md:col-span-2">
            <label className="label-text">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
              required
            />
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

export default OnboardingForm;
