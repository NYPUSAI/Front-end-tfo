import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import useWebSocketStore from "../store/useWebSocketStore";
import { format } from "date-fns";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatJobPosting } from "../lib/utils";

const FetchedBubbles = () => {
  const { chatId } = useChatStore();
  const {
    fetchChatMessages,
    fetchedMessages,
    sendMessage,
    isFetchMessagesLoading,
  } = useWebSocketStore();

  let lastDate = null;

  useEffect(() => {
    if (chatId) {
      fetchChatMessages(chatId);
    }
  }, [chatId, fetchChatMessages]);

  const parseBoxMessage = (message) => {
    try {
      return message ? JSON.parse(message) : null;
    } catch (error) {
      console.error("Error parsing box message:", error);
      return null;
    }
  };

  const handleRetryButton = () => {
    sendMessage({ action: "retry", message: "retry" });
  };

  if (isFetchMessagesLoading) return <MessageSkeleton />;

  return (
    <>
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

              {/* Chat Bubble */}
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

                <div className="chat-bubble chat-bubble-primary flex flex-col max-w-[60%]">
                  {/* Task Name Box - Top Right */}
                  {msg.user === "AI" &&
                    // msg?.Type !== "box" &&
                    msg.task_name && (
                      <div className="bg-white text-xs font-medium text-gray-700 px-2 py-1 rounded-md border border-gray-300 shadow-sm mb-2 self-start">
                        {msg.task_name}-{msg.Type}
                      </div>
                    )}

                  {msg.user === "user" ? (
                    msg.message ? (
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
                    )
                  ) : msg.message?.error ? (
                    <p className="text-red-500">{msg.message.error}</p>
                  ) : msg.Type === "text" ? (
                    <div
                      className="formatted-text"
                      dangerouslySetInnerHTML={{
                        __html: formatJobPosting(String(msg.message || "")),
                      }}
                    />
                  ) : msg.Type === "brochure" ? (
                    <>
                      <div
                        className="formatted-text"
                        dangerouslySetInnerHTML={{
                          __html: formatJobPosting(String(msg.message || "")),
                        }}
                      />
                      {msg.content && (
                        <div
                          className="p-4 border rounded-lg shadow-sm bg-white mt-2"
                          dangerouslySetInnerHTML={{
                            __html: formatJobPosting(String(msg.content || "")),
                          }}
                        />
                      )}
                    </>
                  ) : // other types are in the sidebarJSX in the idk folder should put it just after closing bracket in the next like before parsedBox
                  parsedBoxMessage ? (
                    <div className="flex flex-col gap-4">
                      <table className="w-full text-sm">
                        <tbody>
                          {Object.entries(parsedBoxMessage).map(
                            ([key, value]) => (
                              <tr key={key}>
                                <td className="px-2 py-1">{key}</td>
                                <td
                                  className={`px-2 py-1 font-bold ${
                                    value === "COMPLETED"
                                      ? "text-green-500"
                                      : value === "PENDING"
                                      ? "text-red-500"
                                      : ""
                                  }`}
                                >
                                  {value}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                      {msg.retry === "False" && (
                        <div className="flex justify-center">
                          <button
                            className="btn btn-primary"
                            onClick={handleRetryButton}
                          >
                            Retry
                          </button>
                        </div>
                      )}
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
    </>
  );
};

export default FetchedBubbles;
