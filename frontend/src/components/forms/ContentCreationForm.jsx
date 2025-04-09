import React, { useState, useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import useWebSocketStore from "../../store/useWebSocketStore";
import { Loader2 } from "lucide-react";

const ContentCreationForm = () => {
  const { sendMessage, formResponseIsLoading } = useWebSocketStore();
  const { formIsSubmitted } = useChatStore();

  const [topic, setTopic] = useState("");
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setTopic(e.target.value);
    setError(""); // Clear error when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      setError("Topic is required.");
      return;
    }

    const payload = {
      action: "form",
      form: { topic },
    };
    sendMessage(payload);
    setIsWaitingForResponse(true);
  };

  useEffect(() => {
    if (isWaitingForResponse && !formResponseIsLoading) {
      formIsSubmitted();
      setTopic("");
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
          Topic Submission in Content Creation
        </h2>

        {/* Input Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Topic</span>
          </label>
          <input
            type="text"
            name="topic"
            value={topic}
            onChange={handleChange}
            className="input input-sm input-bordered w-full"
            placeholder="Enter your topic..."
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
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
              "Submit Topic"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContentCreationForm;
