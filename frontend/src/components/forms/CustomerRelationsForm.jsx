import React, { useState, useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import useWebSocketStore from "../../store/useWebSocketStore";
import { Loader2 } from "lucide-react";

const CustomerRelationsForm = () => {
  const { sendMessage, formResponseIsLoading } = useWebSocketStore();
  const { formIsSubmitted } = useChatStore();
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    company_product: "",
    customer_type: "",
    interaction_channel: "",
    feedback_source: "",
    purchase_history_depth: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields with custom messages
    const newErrors = {};
    if (!formData.company_product.trim()) newErrors.company_product = "Company Product is required.";
    if (!formData.customer_type.trim()) newErrors.customer_type = "Customer Type is required.";
    if (!formData.interaction_channel.trim()) newErrors.interaction_channel = "Interaction Channel is required.";
    if (!formData.feedback_source.trim()) newErrors.feedback_source = "Feedback Source is required.";
    if (!formData.purchase_history_depth.trim()) newErrors.purchase_history_depth = "Purchase History Depth is required.";

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
        company_product: "",
        customer_type: "",
        interaction_channel: "",
        feedback_source: "",
        purchase_history_depth: "",
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
          Customer Relations Form
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control md:col-span-2">
            <label className="label-text">Company Product</label>
            <input
              type="text"
              name="company_product"
              placeholder="Enter Company Product"
              value={formData.company_product}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
            />
            {errors.company_product && (
              <p className="text-red-500 text-xs mt-1">{errors.company_product}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label-text">Customer Type</label>
            <input
              type="text"
              name="customer_type"
              placeholder="Enter Customer Type"
              value={formData.customer_type}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
            />
            {errors.customer_type && (
              <p className="text-red-500 text-xs mt-1">{errors.customer_type}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label-text">Interaction Channel</label>
            <input
              type="text"
              name="interaction_channel"
              placeholder="Enter Interaction Channel"
              value={formData.interaction_channel}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
            />
            {errors.interaction_channel && (
              <p className="text-red-500 text-xs mt-1">{errors.interaction_channel}</p>
            )}
          </div>

          <div className="form-control md:col-span-2">
            <label className="label-text">Feedback Source</label>
            <input
              type="text"
              name="feedback_source"
              placeholder="Enter Feedback Source"
              value={formData.feedback_source}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
            />
            {errors.feedback_source && (
              <p className="text-red-500 text-xs mt-1">{errors.feedback_source}</p>
            )}
          </div>

          <div className="form-control md:col-span-2">
            <label className="label-text">Purchase History Depth</label>
            <input
              type="text"
              name="purchase_history_depth"
              placeholder="Enter Purchase History Depth"
              value={formData.purchase_history_depth}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
            />
            {errors.purchase_history_depth && (
              <p className="text-red-500 text-xs mt-1">{errors.purchase_history_depth}</p>
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

export default CustomerRelationsForm;
