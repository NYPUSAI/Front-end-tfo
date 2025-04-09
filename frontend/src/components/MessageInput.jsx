import React, { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Plus, Send, Wifi, WifiOff } from "lucide-react";
import useWebSocketStore from "../store/useWebSocketStore";
import { SuggestionsMap } from "../lib/suggestions";

const MessageInput = () => {
  const { teamSelected, setNewChatButtonClicked, chatId, getNewChat } =
    useChatStore();
  const [message, setMessage] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { sendMessage, isConnected, responseIsThinking } = useWebSocketStore();

  const allSuggestions = SuggestionsMap[teamSelected] || [];

  const filteredSuggestions = allSuggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(message.toLowerCase())
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage({ action: "chat_manually", message });
      setMessage("");
      setShowSuggestions(false);
    }
  };

  const handleNewChatButton = () => {
    setNewChatButtonClicked();
    getNewChat(teamSelected);
  };

  return (
    <div className="p-4 w-full relative">
      <form className="flex items-center gap-2" onSubmit={handleSendMessage}>
        <button
          onClick={handleNewChatButton}
          type="button"
          className="hidden sm:flex btn btn-circle"
        >
          <Plus size={20} />
        </button>

        <div className="flex-1 flex gap-2 relative">
          {/* Show filtered suggestions only when there are matches */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <ul className="absolute bottom-full left-0 w-full bg-base-100 border border-base-300 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-base-200"
                  onClick={() => {
                    setMessage(suggestion);
                    setShowSuggestions(false);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}

          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => {
              const inputValue = e.target.value;
              setMessage(inputValue);
              setShowSuggestions(
                inputValue.length > 0 && filteredSuggestions.length > 0
              );
            }}
          />
        </div>

        <div className="hidden sm:flex btn btn-circle">
          {isConnected ? (
            <Wifi size={16} className="text-success" />
          ) : (
            <WifiOff size={16} className="text-error" />
          )}
        </div>

        <button
          type="submit"
          className="hidden sm:flex btn btn-circle"
          disabled={!message.trim() || responseIsThinking}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
