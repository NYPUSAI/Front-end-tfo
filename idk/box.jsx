<>
{currentMessages.length === 0 ? (
  <p className="text-center text-gray-500">No current chat</p>
) : (
  <>
    {currentMessages.map((msg, index) => {
      const isActionMessage =
        msg.action === "retry" ||
        msg.action === "chat_manually" ||
        msg.action === "form";

      const messageText =
        typeof msg.message === "object"
          ? msg.message.message
          : msg.message;

      const parsedBoxMessage =
        msg.message?.Type === "box"
          ? parseBoxMessage(msg.message.message)
          : null;

      return (
        <div
          key={index}
          className={`chat ${
            isActionMessage ? "chat-end" : "chat-start"
          }`}
        >
          <div className="chat-header mb-1">
            <time className="text-xs opacity-50 ml-1">
              {formatMessageTime(
                msg.message.user ? msg.message.timestamp : msg.timestamp
              )}
            </time>
          </div>

          <div className="chat-bubble chat-bubble-primary flex flex-col max-w-[60%]">
            {msg.message?.error ? ( // Directly show error messages
              <p className="text-red-500">{msg.message.error}</p>
            ) : parsedBoxMessage ? (
              <div className="flex flex-col gap-4">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(parsedBoxMessage).map(
                      ([key, value]) => (
                        <tr key={key}>
                          <td className="px-2 py-1">{key}</td>
                          <td className="px-2 py-1">{value}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
                {msg.message?.retry === "False" && (
                  <div className="flex justify-center">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={handleRetryButton}
                    >
                      Retry
                    </button>
                  </div>
                )}
              </div>
            ) : msg.action === "form" && msg.form ? (
              <div className="space-y-1">
                {Object.entries(msg.form).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key}:</strong> {value}
                  </p>
                ))}
              </div>
            ) : msg.message?.Type === "text" ? (
              <div
                className="formatted-text"
                dangerouslySetInnerHTML={{
                  __html: formatJobPosting(messageText),
                }}
              />
            ) : (
              <p>{messageText}</p>
            )}
          </div>
        </div>
      );
    })}

    {/* Show "Thinking..." bubble when responseIsThinking is true */}
    {responseIsThinking && (
      <div className="chat chat-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="chat-bubble chat-bubble-primary flex flex-col max-w-[60%]"
        >
          <p className="flex items-center">
            {ThinkingMessage.length > 0 && ThinkingMessage[0]?.message
              ? ThinkingMessage[0].message
              : "We are working on it"}
            <span className="dot-animation ml-1"></span>
          </p>
        </motion.div>
      </div>
    )}
  </>
)}
</>