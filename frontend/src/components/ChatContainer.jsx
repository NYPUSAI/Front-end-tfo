import React, { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useChatStore } from "../store/useChatStore";
// import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
// import { formatMessageTime } from "../lib/utils";
import OnboardingForm from "./forms/OnboardingForm";
import RecruitmentForm from "./forms/RecruitmentForm";
import ContentCreationForm from "./forms/ContentCreationForm";
import LeadGenerationForm from "./forms/LeadGenerationForm";
import MarketingResearchForm from "./forms/MarketingResearchForm";
import SalesStrategyForm from "./forms/SalesStrategyForm";
import SeoForm from "./forms/SeoForm";
import SocialMediaForm from "./forms/SocialMediaForm";
import CustomerRelationsForm from "./forms/CustomerRelationsForm";
import WelcomeChat from "./WelcomeChat";
import ChatBubbles from "./ChatBubbles";
import useWebSocketStore from "../store/useWebSocketStore";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import NoChatBubbles from "./NoChatBubbles";
// import Teams from "./Teams";

const ChatContainer = () => {
  const {
    teamSelected,
    chatHistory,
    newChatButtonClicked,
    formButtonClicked,
    hasChatHistory,
    chatManuallyButtonClicked,
    chatId,
    isChatHistoryLoading,
    SendButtonInWelcomeChat,
    newChatIdLoading,
  } = useChatStore();
  // console.log(teamSelected, "hehe");
  const { authUser } = useAuthStore();

  const { connect, isFetchMessagesLoading, currentMessages, fetchedMessages } =
    useWebSocketStore();

  useEffect(() => {
    if (chatId) {
      connect(chatId);
    }
  }, [chatId, connect]);

  const formComponents = {
    "Recruitment Team": RecruitmentForm,
    "Onboarding Team": OnboardingForm,
    "SEO Team": SeoForm,
    "Marketing Research Team": MarketingResearchForm,
    "Social Media Team": SocialMediaForm,
    "Content Creation": ContentCreationForm,
    "Customer Relationship Management": CustomerRelationsForm,
    "Sales Strategy": SalesStrategyForm,
    "Lead Generation": LeadGenerationForm,
  };

  const formRenderContent = () => {
    if (
      // formButtonClicked &&
      teamSelected
    ) {
      const SelectedForm = formComponents[teamSelected];
      if (SelectedForm) {
        // console.log(`Rendering form for: ${teamSelected}`);
        return <SelectedForm />;
      }
    }
    return null;
  };

  return (
    // chatheader should be shown regardless
    // chatbubbles and chat input shouldbe shown if there is no form or there is no newchat ui shown
    // form should be shown if the form button in the newUi is clicked
    // newUi should be shpwn if the user gets in and he has no prevous chat in the team or he has clicked the newChat button



    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader /> {/* Always Visible */}
      {newChatIdLoading ? (
        // <LoaderComponent /> // Replace with your actual loader component
        <div className="flex items-center justify-center flex-1">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : formButtonClicked ? (
        formRenderContent() // Show form when form button is clicked
      ) : !hasChatHistory || newChatButtonClicked ? (
        isFetchMessagesLoading || isChatHistoryLoading ? (
          <MessageSkeleton />
        ) : SendButtonInWelcomeChat ? ( // Add this condition
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {fetchedMessages.length === 0 && currentMessages.length === 0 ? (
                <NoChatBubbles />
              ) : (
                <ChatBubbles />
              )}
            </div>
            <MessageInput />
          </>
        ) : (
          <WelcomeChat />
        )
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {fetchedMessages.length === 0 && currentMessages.length === 0 ? (
              <NoChatBubbles />
            ) : (
              <ChatBubbles />
            )}
          </div>
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default ChatContainer;
