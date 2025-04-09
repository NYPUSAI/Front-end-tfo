import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { X } from "lucide-react";
import ChatHistorySkeleton from "./skeletons/ChatHistorySkeleton";

const ChatHistoryModal = ({ chats, onClose }) => {
  const { chatHistory, isChatHistoryLoading, updateChatId } = useChatStore();

  useEffect(() => {
    // console.log(chatHistory, "inside chat history modal");
  }, [chatHistory]);

  return (
    isChatHistoryLoading ? (
      <ChatHistorySkeleton />
    ) : (
      <div className="modal modal-open">
        <div className="modal-box w-96 relative">
          {/* Fixed Header */}
          <div className="sticky top-0 bg-base-100 z-10 p-4 flex justify-between items-center">
            <h3 className="font-bold text-lg text-center flex-1">Chat History</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={30} />
            </button>
          </div>
  
          {/* Scrollable List */}
          <ul className="space-y-2 mt-2 max-h-60 overflow-y-auto">
            {chatHistory.length > 0 ? (
              chatHistory
                .slice()
                .reverse()
                .map((chat) => (
                  <li
                    onClick={() => {
                      onClose();
                      updateChatId(chat.id);
                    }}
                    key={chat.id}
                    className="p-3 bg-base-200 rounded-md shadow-sm hover:bg-base-300 transition"
                  >
                    <p>
                      <strong>Chat ID:</strong> {chat.id}
                    </p>
                    <p>
                      <strong>Created At:</strong>{" "}
                      {new Date(chat.created_at).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </li>
                ))
            ) : (
              <p className="text-sm text-gray-500">No chats available.</p>
            )}
          </ul>
        </div>
      </div>
    )
  );  
};

export default ChatHistoryModal;
