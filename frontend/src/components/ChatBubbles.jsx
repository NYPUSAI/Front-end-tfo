import React, { useEffect, useRef } from "react";
import useWebSocketStore from "../store/useWebSocketStore";
import FetchedBubbles from "./FetchedBubbles";
import CurrentBubbles from "./CurrentBubbles";
import NoChatBubbles from "./NoChatBubbles";

const ChatBubbles = () => {
  const { currentMessages, fetchedMessages } = useWebSocketStore();
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [fetchedMessages
    // , currentMessages
  ]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {/* {fetchedMessages.length === 0 && currentMessages.length === 0 && <NoChatBubbles />} */}
      <FetchedBubbles />
      <CurrentBubbles />
      {/* Empty div for auto scroll */}
      <div ref={chatEndRef}></div>
    </div>
  );
};

export default ChatBubbles;