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