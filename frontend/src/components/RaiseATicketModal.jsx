import React, { useState } from "react";
import { useSettingsStore } from "../store/useSettingsStore";
import { toast } from "react-hot-toast";

const RaiseATicketModal = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState("");
  const { PostTicket, isPostingTicket } = useSettingsStore();

  const handleSubmitButton = async () => {
    try {
      const response = await PostTicket({ message });
      if (response?.message) {
        toast.success(response.message);
      }
    } catch (error) {
      toast.error("Failed to raise a ticket.");
    } finally {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-base-100 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Raise a Ticket</h2>

        <textarea
          className="textarea textarea-secondary w-full h-32"
          placeholder="Describe your issue..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button className="btn btn-outline" onClick={onClose} disabled={isPostingTicket}>
            Cancel
          </button>
          <button
            className={`btn btn-primary ${isPostingTicket ? "btn-disabled" : ""}`}
            onClick={handleSubmitButton}
            disabled={isPostingTicket}
          >
            {isPostingTicket ? <span className="loading loading-spinner"></span> : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RaiseATicketModal;

