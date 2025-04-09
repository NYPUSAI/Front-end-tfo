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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors on input
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.employee_id.trim()) newErrors.employee_id = "Employee ID is required.";
    if (!formData.first_name.trim()) newErrors.first_name = "Employee Name is required.";
    if (!formData.department.trim()) newErrors.department = "Department is required.";
    if (!formData.position.trim()) newErrors.position = "Position is required.";
    if (!formData.startDate.trim()) newErrors.startDate = "Start Date is required.";

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!chatId) {
      console.error("❌ No chat ID available.");
      return;
    }
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
            />
            {errors.employee_id && <p className="text-red-500 text-xs mt-1">{errors.employee_id}</p>}
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
            />
            {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
          </div>

          {/* Email */}
          <div className="form-control md:col-span-2">
            <label className="label-text">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
            />
            {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
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
            />
            {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
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
            />
            {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
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
