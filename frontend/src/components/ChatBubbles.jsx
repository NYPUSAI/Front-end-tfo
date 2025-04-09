import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
// import WebSocketService from "../Websocket/websocket";
import useWebSocketStore from "../store/useWebSocketStore";
import { format } from "date-fns";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatJobPosting } from "../lib/utils";

const ChatBubbles = () => {
  const { chatId } = useChatStore();
  const {
    currentMessages,
    fetchChatMessages,
    fetchedMessages,
    responseIsThinking,
    sendMessage,
    isFetchMessagesLoading,
  } = useWebSocketStore();
  let lastDate = null;
  const chatEndRef = useRef(null); // Ref to track the last message

  const handleRetryButton = () => {
    let message = "retry";
    sendMessage({ action: "retry", message });
  };

  useEffect(() => {
    if (chatId) {
      fetchChatMessages(chatId);
    }
  }, [chatId, fetchChatMessages]);

  // Scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [fetchedMessages, currentMessages]);

  const parseBoxMessage = (message) => {
    try {
      return message ? JSON.parse(message) : null;
    } catch (error) {
      console.error("Error parsing box message:", error);
      return null;
    }
  };

  if (isFetchMessagesLoading) return <MessageSkeleton />;
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {fetchedMessages.length === 0 ? (
        <p className="text-center text-gray-500">No previous chat</p>
      ) : (
        fetchedMessages.map((msg, index) => {
          const msgDate = format(new Date(msg.timestamp), "yyyy-MM-dd");
          const showDateSeparator = lastDate !== msgDate;
          lastDate = msgDate;
          const parsedBoxMessage =
            msg.Type === "box" ? parseBoxMessage(msg.message) : null;

          return (
            <div key={msg._id || index}>
              {/* Date Separator */}
              {showDateSeparator && (
                <div className="text-center text-gray-400 text-sm my-2">
                  {format(new Date(msg.timestamp), "MMMM d, yyyy")}
                </div>
              )}

              {/* Chat Message */}
              <div
                className={`chat ${
                  msg.user === "AI" ? "chat-start" : "chat-end"
                }`}
              >
                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">
                    {format(new Date(msg.timestamp), "h:mm a")}
                  </time>
                </div>

                <div className="chat-bubble chat-bubble-primary flex flex-col">
                  {parsedBoxMessage ? (
                    <div className="flex flex-col gap-4">
                      <table className="w-full text-sm">
                        <thead></thead>
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
                      {msg.retry === "False" && (
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
                  ) : msg.Type === "text" ? (
                    <div
                      className="formatted-text"
                      dangerouslySetInnerHTML={{
                        __html: formatJobPosting(msg.message),
                      }}
                    />
                  ) : msg.message ? (
                    <p>{msg.message}</p>
                  ) : msg.form ? (
                    <div className="space-y-1">
                      {Object.entries(msg.form).map(([key, value]) => (
                        <p key={key}>
                          <strong>{key}:</strong> {value}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No content</p>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}

      {currentMessages.length === 0 ? (
        <p className="text-center text-gray-500">No current chat</p>
      ) : (
        <>
          {currentMessages.map((msg, index) => {
            const isActionMessage =
              msg.action === "retry" || msg.action === "chat_manually";
            const messageText =
              typeof msg.message === "object"
                ? msg.message.message
                : msg.message;
            const parsedBoxMessage =
              msg.message.Type === "box"
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
                  {!isActionMessage && (
                    <span className="font-bold">{msg.user}</span>
                  )}
                  <time className="text-xs opacity-50 ml-1">
                  {format(new Date(msg.timestamp), "h:mm a")}
                  </time>
                </div>

                <div className="chat-bubble chat-bubble-primary flex flex-col">
                  {parsedBoxMessage ? (
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
                      {msg.message.retry === "False" && (
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
                  ) : msg.message.Type === "text" ? (
                    <div
                      className="formatted-text"
                      dangerouslySetInnerHTML={{
                        __html: formatJobPosting(messageText),
                      }}
                    />
                  ) : msg.form ? (
                    <div className="space-y-1">
                      {Object.entries(msg.form).map(([key, value]) => (
                        <p key={key}>
                          <strong>{key}:</strong> {value}
                        </p>
                      ))}
                    </div>
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
              <div className="chat-bubble chat-bubble-primary flex flex-col">
                <p className="flex items-center">Thinking...</p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Empty div for auto scroll */}
      <div ref={chatEndRef}></div>
    </div>
  );
};

export default ChatBubbles;

// Type: "box";
// chat_message_id: "105";
// message: '{"Job Posting": "COMPLETED", "Sourcing Automation": "COMPLETED", "Application Tracking": "PENDING", "Resume Screening": "PENDING", "ATS Manager": "PENDING", "Candidate Outreach": "PENDING", "Interview Coordinator": "PENDING", "Interview Preparation": "PENDING", "Offer Letter Generator": "PENDING"}';
// message_number: 1189;
// session_id: "2";
// task_name: "RESULT";
// timestamp: "2025-02-14T15:29:21.578440";
// user: "AI";
// _id: "67acbb4fb34a0dce00220555";
