import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { X } from "lucide-react";

const ChatHistoryDrawer = ({ onClose }) => {
  const { chatHistory, isChatHistoryLoading, updateChatId } = useChatStore();

  useEffect(() => {
    // console.log(chatHistory, "inside chat history drawer");
  }, [chatHistory]);

  return (
    <div className="drawer drawer-end open">
      <input id="chat-history-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Invisible trigger */}
      </div>
      <div className="drawer-side">
        <label htmlFor="chat-history-drawer" className="drawer-overlay" onClick={onClose}></label>
        <div className="p-4 w-80 bg-base-100 text-base-content">
          {/* Close Button */}
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            <X size={30} />
          </button>
          <h3 className="font-bold text-lg text-center">Chat History</h3>
          <ul className="space-y-2 mt-4">
            {isChatHistoryLoading ? (
              <p className="text-sm text-gray-500">Loading chat history...</p>
            ) : chatHistory.length > 0 ? (
              chatHistory.slice().reverse().map((chat) => (
                <li
                  key={chat.id}
                  onClick={() => {
                    updateChatId(chat.id);
                    onClose();
                  }}
                  className="p-3 bg-base-200 rounded-md shadow-sm hover:bg-base-300 transition cursor-pointer"
                >
                  <p><strong>Chat ID:</strong> {chat.id}</p>
                  <p><strong>Created At:</strong> {new Date(chat.created_at).toLocaleString()}</p>
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500">No chats available.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatHistoryDrawer;
