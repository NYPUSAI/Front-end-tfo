{
  fetchedMessages.length === 0 ? (
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
            className={`chat ${msg.user === "AI" ? "chat-start" : "chat-end"}`}
          >
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {format(new Date(msg.timestamp), "h:mm a")}
              </time>
            </div>

            <div className="chat-bubble chat-bubble-primary flex flex-col max-w-[60%]">
              {/* Task Name Box - Top Right */}
              {msg.user === "AI" && msg.task_name && msg?.Type !== "box" && (
                <div className="bg-white text-xs font-medium text-gray-700 px-2 py-1 rounded-md border border-gray-300 shadow-sm mb-2 self-end">
                  {msg.task_name}
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
                  {/* {msg.content && (
                        <div
                          className="formatted-text mt-2 text-gray-600"
                          dangerouslySetInnerHTML={{ __html: formatJobPosting(String(msg.content || "")) }}
                        />
                      )} */}

                  {msg.content && (
                    <div
                      className="border border-base-300 p-2 rounded-lg bg-secondary mt-2"
                      dangerouslySetInnerHTML={{
                        __html: formatJobPosting(String(msg.content || "")),
                      }}
                    />
                    // </div>
                  )}

                  {/* Copy Button */}
                  {/* <button
                        className="btn btn-xs btn-outline absolute top-2 right-2"
                        onClick={() =>
                          navigator.clipboard.writeText(
                            msg.content || msg.message
                          )
                        }
                      >
                        Copy
                      </button> */}
                </>
              ) : msg.Type === "email templates" ? (
                <>
                  <div
                    className="formatted-text"
                    dangerouslySetInnerHTML={{
                      __html: formatJobPosting(String(msg.message || "")),
                    }}
                  />
                  {Array.isArray(msg.content) && msg.content.length > 0 && (
                    <div className="mt-4 space-y-4">
                      {msg.content.map((template, index) => (
                        <div
                          key={index}
                          className="p-4 border rounded-lg shadow-sm bg-white"
                        >
                          <h3 className="text-lg font-semibold text-gray-900">
                            {template.subject}
                          </h3>
                          <p className="mt-2 text-gray-700 whitespace-pre-line">
                            {template.body}
                          </p>
                          <p className="mt-2 text-blue-600 font-medium">
                            {template.call_to_action}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : msg.Type === "discription" ? (
                <>
                  <div
                    className="formatted-text"
                    dangerouslySetInnerHTML={{
                      __html: formatJobPosting(String(msg.message || "")),
                    }}
                  />

                  {Array.isArray(msg.content) && msg.content.length > 0 && (
                    <div className="mt-4 space-y-4">
                      {msg.content.map((item, index) => (
                        <div
                          key={index}
                          className="p-4 border rounded-lg shadow-sm bg-white"
                        >
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.product_name}
                          </h3>
                          <p className="mt-2 text-gray-700">
                            {item.description}
                          </p>

                          {/* Key Features Section */}
                          {item.key_features &&
                            item.key_features.length > 0 && (
                              <div className="mt-3">
                                <h4 className="text-md font-semibold text-gray-800">
                                  Key Features:
                                </h4>
                                <ul className="list-disc list-inside mt-1 text-gray-600">
                                  {item.key_features.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                          {/* Pain Points Addressed Section */}
                          {item.pain_points_addressed &&
                            item.pain_points_addressed.length > 0 && (
                              <div className="mt-3">
                                <h4 className="text-md font-semibold text-gray-800">
                                  Pain Points Addressed:
                                </h4>
                                <ul className="list-disc list-inside mt-1 text-gray-600">
                                  {item.pain_points_addressed.map(
                                    (point, i) => (
                                      <li key={i}>{point}</li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : msg.Type === "slides" ? (
                <>
                  <div
                    className="formatted-text"
                    dangerouslySetInnerHTML={{
                      __html: formatJobPosting(String(msg.message || "")),
                    }}
                  />

                  {Array.isArray(msg.content) && msg.content.length > 0 && (
                    <div className="mt-4 space-y-4">
                      {msg.content.map((slide, index) => (
                        <div
                          key={index}
                          className="p-4 border rounded-lg shadow-sm bg-white"
                        >
                          <h3 className="text-lg font-semibold text-gray-900">
                            {slide.title}
                          </h3>
                          <p className="mt-2 text-gray-700 whitespace-pre-line">
                            {slide.content}
                          </p>

                          {/* Display Testimonials if available */}
                          {slide.testimonials &&
                            slide.testimonials.length > 0 && (
                              <div className="mt-3">
                                <h4 className="text-md font-semibold text-gray-800">
                                  Testimonials:
                                </h4>
                                <ul className="list-disc list-inside mt-1 text-gray-600">
                                  {slide.testimonials.map((testimonial, i) => (
                                    <li key={i}>{testimonial}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : msg.Type === "posts" ? (
                <>
                  <div
                    className="formatted-text"
                    dangerouslySetInnerHTML={{
                      __html: formatJobPosting(String(msg.message || "")),
                    }}
                  />

                  {Array.isArray(msg.content) && msg.content.length > 0 && (
                    <div className="mt-4 space-y-4">
                      {msg.content.map((post, index) => (
                        <div
                          key={index}
                          className="p-4 border rounded-lg shadow-sm bg-white"
                        >
                          <h3 className="text-lg font-semibold text-gray-900">
                            {post.post_title}
                          </h3>
                          <p className="mt-2 text-gray-700">{post.caption}</p>

                          {/* Hashtags Section */}
                          {post.hashtags && post.hashtags.length > 0 && (
                            <div className="mt-2 text-blue-600 font-medium">
                              {post.hashtags.join(" ")}
                            </div>
                          )}

                          {/* Call to Action */}
                          <p className="mt-2 text-green-600 font-semibold">
                            {post.call_to_action}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : // other types are in the sidebarJSX in the idk folder should put it just after closing bracket in the next like before parsedBox
              parsedBoxMessage ? (
                <div className="flex flex-col gap-4">
                  <table className="w-full text-sm">
                    <tbody>
                      {Object.entries(parsedBoxMessage).map(([key, value]) => (
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
                      ))}
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
  );
}

{
  currentMessages.length === 0 ? (
    <p className="text-center text-gray-500">No current chat</p>
  ) : (
    <>
      {currentMessages.map((msg, index) => {
        const isActionMessage =
          msg.action === "retry" ||
          msg.action === "chat_manually" ||
          msg.action === "form";

        const messageText =
          typeof msg.message === "object" ? msg.message.message : msg.message;

        const parsedBoxMessage =
          msg.message?.Type === "box"
            ? parseBoxMessage(msg.message.message)
            : null;

        return (
          <div
            key={index}
            className={`chat ${isActionMessage ? "chat-end" : "chat-start"}`}
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
                      {Object.entries(parsedBoxMessage).map(([key, value]) => (
                        <tr key={key}>
                          <td className="px-2 py-1">{key}</td>
                          <td className="px-2 py-1">{value}</td>
                        </tr>
                      ))}
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
  );
}
