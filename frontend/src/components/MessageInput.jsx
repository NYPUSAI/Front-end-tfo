import React, { useState, useEffect, useCallback } from "react";
import { useChatStore } from "../store/useChatStore";
import { Plus, Paperclip, Send, Wifi, WifiOff } from "lucide-react";
// import WebSocketService from "../Websocket/websocket";

import useWebSocketStore from "../store/useWebSocketStore";

const MessageInput = () => {
  const { teamSelcted, setNewChatButtonClicked, chatId } = useChatStore();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const { sendMessage, isConnected } = useWebSocketStore();
  // const [isConnected, setIsConnected] = useState(false);
  // const [isThinking, setIsThinking] = useState(false);
  // const [wsService, setWsService] = useState(null);
  // const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage({ action: "chat_manually", message });
      setMessage("");
    }
  };

  return (
    <div className="p-4 w-full">
      <form className="flex items-center gap-2">
        <button
          onClick={() => setNewChatButtonClicked()}
          type="button"
          className="hidden sm:flex btn btn-circle text-zinc-400"
        >
          <Plus size={20} />
        </button>

        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="button"
            className="hidden sm:flex btn btn-circle text-zinc-400"
          >
            <Paperclip size={20} />
          </button>
        </div>

        <div className="flex items-center">
          {isConnected ? (
            <Wifi size={16} className="text-success" />
          ) : (
            <WifiOff size={16} className="text-error" />
          )}
        </div>

        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!message.trim()}
          onClick={handleSendMessage}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
