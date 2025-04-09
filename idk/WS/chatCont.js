import React, { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useChatStore } from "../store/useChatStore";
import { useWebSocketStore } from "../store/useWebSocketStore"; // ✅ Import WebSocket Store
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import OnboardingForm from "./forms/OnboardingForm";
import RecruitmentForm from "./forms/RecruitmentForm";
import WelcomeChat from "./WelcomeChat";
import ChatBubbles from "./ChatBubbles";

const ChatContainer = () => {
  const {
    teamSelcted,
    chatHistory,
    newChatButtonClicked,
    formButtonClicked,
    hasChatHistory,
    chatManuallyButtonClicked,
    chatId, // ✅ Get chatId from store
  } = useChatStore();
  
  const { authUser } = useAuthStore();
  const { connect } = useWebSocketStore(); // ✅ Extract connect function

  // ✅ Connect WebSocket when chatId changes
  useEffect(() => {
    if (chatId) {
      connect(chatId);
    }
  }, [chatId, connect]);

  const formRenderContent = () => {
    if (teamSelcted === "Recruitment Team") {
      return <RecruitmentForm />;
    } else if (teamSelcted === "Onboarding Team") {
      return <OnboardingForm />;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      {!hasChatHistory || newChatButtonClicked ? (
        <WelcomeChat />
      ) : formButtonClicked ? (
        formRenderContent()
      ) : chatManuallyButtonClicked || hasChatHistory ? (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <ChatBubbles />
          </div>
          <MessageInput />
        </>
      ) : null}
    </div>
  );
};

export default ChatContainer;
