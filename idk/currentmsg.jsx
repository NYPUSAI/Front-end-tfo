{currentMessages.length === 0 ? (
    <p className="text-center text-gray-500">No current chat</p>
  ) : (
    <>
      {currentMessages.map((msg, index) => {
        // const isAgentMessage = msg.user === "AI";
        const isActionMessage =
          msg.action === "retry" || msg.action === "chat_manually";
        const messageText =
          typeof msg.message === "object"
            ? msg.message.message
            : msg.message;

        return (
          <div
            key={index}
            className={`chat ${
              isActionMessage ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-header mb-1">
              {!isActionMessage && (
                <span className="font-bold">{msg.user}</span>
              )}
              <time className="text-xs opacity-50 ml-1">
                timestampNotGiven
              </time>
            </div>
            <div className="chat-bubble chat-bubble-primary flex flex-col">
              <p>{messageText}</p>
            </div>
          </div>
        );
      })}

      {/* Show "Thinking..." bubble when responseIsThinking is true */}
      {responseIsThinking && (
        <div className="chat chat-start">
          <div className="chat-bubble chat-bubble-primary flex flex-col">
            <p className="flex items-center">Thinking...</p>
          </div>
        </div>
      )}
    </>
  )}