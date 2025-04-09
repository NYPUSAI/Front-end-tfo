    // <div className="flex-1 flex flex-col overflow-auto">
    //   <ChatHeader /> {/* Always Visible */}
    //   {formButtonClicked ? (
    //     formRenderContent() // Show form when form button is clicked
    //   ) : !hasChatHistory || newChatButtonClicked ? (
    //     isFetchMessagesLoading || isChatHistoryLoading ? (
    //       <MessageSkeleton />
    //     ) : SendButtonInWelcomeChat ? ( // Add this condition
    //       <>
    //         <div className="flex-1 overflow-y-auto p-4 space-y-4">
    //           {fetchedMessages.length === 0 && currentMessages.length === 0 ? (
    //             <NoChatBubbles />
    //           ) : (
    //             <ChatBubbles />
    //           )}
    //         </div>
    //         <MessageInput />
    //       </>
    //     ) : (
    //       <WelcomeChat />
    //     )
    //   ) : (
    //     <>
    //       <div className="flex-1 overflow-y-auto p-4 space-y-4">
    //         {fetchedMessages.length === 0 && currentMessages.length === 0 ? (
    //           <NoChatBubbles />
    //         ) : (
    //           <ChatBubbles />
    //         )}
    //       </div>
    //       <MessageInput />
    //     </>
    //   )}
    // </div>