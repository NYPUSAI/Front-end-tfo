import React from "react";
import { useWebSocketStore } from "../store/useWebSocketStore";
import { formatMessageTime, formatJobPosting } from "../lib/utils";
import { motion } from "framer-motion";
import "./styles/animations.css";

const CurrentBubbles = () => {
  const { currentMessages, responseIsThinking, sendMessage, ThinkingMessage } =
    useWebSocketStore();

  const handleRetryButton = () => {
    sendMessage({ action: "retry", message: "retry" });
  };

  const parseBoxMessage = (message) => {
    try {
      return message ? JSON.parse(message) : null;
    } catch (error) {
      console.error("Error parsing box message:", error);
      return null;
    }
  };

  return (
    <>
      {currentMessages.length === 0 ? (
        <p className="text-center text-gray-500">No current chat</p>
      ) : (
        <>
          {currentMessages.map((msg, index) => {
            const isUserMessage = msg.user !== undefined;
            const parsedBoxMessage = msg.Type === "box" ? parseBoxMessage(msg.message) : null;

            return (
              <div key={index} className={`chat ${isUserMessage ? "chat-end" : "chat-start"}`}>
                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">
                    {formatMessageTime(msg.timestamp)}
                  </time>
                </div>

                <div className="chat-bubble chat-bubble-primary flex flex-col max-w-[60%]">
                  {/* Task Name Box */}
                  {!isUserMessage && msg.task_name && (
                    <div className="bg-white text-xs font-medium text-gray-700 px-2 py-1 rounded-md border border-gray-300 shadow-sm mb-2 self-start">
                      {msg.task_name}-{msg.Type}
                    </div>
                  )}

                  {msg.message?.error ? (
                    <p className="text-red-500">{msg.message.error}</p>
                  ) : msg.Type === "text" ? (
                    <div
                      className="formatted-text"
                      dangerouslySetInnerHTML={{ __html: formatJobPosting(msg.message) }}
                    />
                  ) : msg.Type === "brochure" ? (
                    <>
                      <div
                        className="formatted-text"
                        dangerouslySetInnerHTML={{ __html: formatJobPosting(msg.message) }}
                      />
                      {msg.content && (
                        <div
                          className="p-4 border rounded-lg shadow-sm bg-white mt-2"
                          dangerouslySetInnerHTML={{ __html: formatJobPosting(msg.content) }}
                        />
                      )}
                    </>
                  ) : parsedBoxMessage ? (
                    <div className="flex flex-col gap-4">
                      <table className="w-full text-sm">
                        <tbody>
                          {Object.entries(parsedBoxMessage).map(([key, value]) => (
                            <tr key={key}>
                              <td className="px-2 py-1">{key}</td>
                              <td
                                className={`px-2 py-1 font-bold ${
                                  value === "COMPLETED" ? "text-green-500" :
                                  value === "PENDING" ? "text-red-500" : ""
                                }`}
                              >
                                {value}
                              </td>
                            </tr>
                          ))}
                        </tbody>a
                      </table>
                      {msg.retry === "False" && (
                        <div className="flex justify-center">
                          <button className="btn btn-primary" onClick={handleRetryButton}>
                            Retry
                          </button>
                        </div>
                      )}
                    </div>
                  ) : msg.Type === "form" && msg.form ? (
                    <div className="space-y-1">
                      {Object.entries(msg.form).map(([key, value]) => (
                        <p key={key}>
                          <strong>{key}:</strong> {value}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p>{msg.message}</p>
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
  );
};

export default CurrentBubbles;
