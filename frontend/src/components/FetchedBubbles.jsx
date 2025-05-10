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

  // useEffect(() => {
  //   if (chatId) {
  //     fetchChatMessages(chatId);
  //   }
  // }, [chatId, fetchChatMessages]);

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

  // if (isFetchMessagesLoading) return <MessageSkeleton />;

  return (
    <>
      {fetchedMessages.length === 0 ? (
        <p className="text-center text-gray-500"></p>
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
                  {"  "}
                  {/* <span className="font-semibold">
                    {msg.user === "AI" ? "AI Assistant" : "You"}
                  </span> */}
                </div>

                <div className="chat-bubble chat-bubble-primary flex flex-col max-w-[60%]">
                  {/* Task Name Box - Top Right */}
                  {msg.user === "AI" &&
                    // msg?.Type !== "box" &&
                    msg.task_name && (
                      <div className="bg-white text-xs font-medium text-gray-700 px-2 py-1 rounded-md border border-gray-300 shadow-sm mb-2 self-start">
                        {msg.task_name}
                        {/* -{msg.Type} */}
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
                          className="p-4 border rounded-lg shadow-sm text-black bg-white mt-2"
                          dangerouslySetInnerHTML={{
                            __html: formatJobPosting(String(msg.content || "")),
                          }}
                        />
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
                  ) : msg.Type === "description" ? (
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
                                      {slide.testimonials.map(
                                        (testimonial, i) => (
                                          <li key={i}>{testimonial}</li>
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
                              <p className="mt-2 text-gray-700">
                                {post.caption}
                              </p>

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
                  ) : msg.Type === "Analysis report" ? (
                    <>
                      <div
                        className="formatted-text"
                        dangerouslySetInnerHTML={{
                          __html: formatJobPosting(String(msg.message || "")),
                        }}
                      />

                      {msg.content && (
                        <div className="mt-4 space-y-4 p-4 border rounded-lg shadow-sm text-black bg-white">
                          {/* Industry Sector */}
                          <h3 className="text-lg font-semibold text-gray-900">
                            Industry Sector: {msg.content.industry_sector}
                          </h3>

                          {/* Trends Summary */}
                          {Array.isArray(msg.content.trends_summary) &&
                            msg.content.trends_summary.length > 0 && (
                              <div className="mt-3">
                                <h4 className="text-md font-semibold text-gray-800">
                                  Trends Summary:
                                </h4>
                                <ul className="list-disc list-inside mt-1 text-gray-600">
                                  {msg.content.trends_summary.map(
                                    (trend, i) => (
                                      <li
                                        key={i}
                                        className="mb-2 p-2 border rounded bg-gray-100"
                                      >
                                        <strong>Trend:</strong> {trend.trend}{" "}
                                        <br />
                                        <strong>Impact:</strong> {trend.impact}{" "}
                                        <br />
                                        <strong>Confidence Level:</strong>{" "}
                                        {(trend.confidence_level * 100).toFixed(
                                          0
                                        )}
                                        %
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}

                          {/* Data Sources */}
                          {Array.isArray(msg.content.data_sources) &&
                            msg.content.data_sources.length > 0 && (
                              <div className="mt-3">
                                <h4 className="text-md font-semibold text-gray-800">
                                  Data Sources:
                                </h4>
                                <ul className="list-disc list-inside mt-1 text-gray-600">
                                  {msg.content.data_sources.map((source, i) => (
                                    <li key={i}>{source}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                        </div>
                      )}
                    </>
                  ) : msg.Type === "swot analysis" ? (
                    <>
                      <div
                        className="formatted-text"
                        dangerouslySetInnerHTML={{
                          __html: formatJobPosting(String(msg.message || "")),
                        }}
                      />

                      {msg.content && (
                        <div className="mt-4 space-y-4 p-4 border rounded-lg shadow-sm text-black bg-white">
                          {/* SWOT Analysis Sections */}
                          {[
                            "strengths",
                            "weaknesses",
                            "opportunities",
                            "threats",
                          ].map(
                            (category) =>
                              msg.content[category] &&
                              msg.content[category].length > 0 && (
                                <div key={category} className="mt-3">
                                  <h4 className="text-md font-semibold text-gray-800 capitalize">
                                    {category}:
                                  </h4>
                                  <ul className="list-disc list-inside mt-1 text-gray-600">
                                    {msg.content[category].map((item, i) => (
                                      <li
                                        key={i}
                                        className="mb-2 p-2 border rounded bg-gray-100"
                                      >
                                        <strong>{item.name}:</strong>{" "}
                                        {item.description}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )
                          )}

                          {/* Strategic Insights */}
                          {msg.content.strategic_insights && (
                            <div className="mt-3 p-4 border rounded-lg bg-gray-50">
                              <h4 className="text-md font-semibold text-gray-800">
                                Strategic Insights:
                              </h4>
                              <p className="mt-1 text-gray-700">
                                {msg.content.strategic_insights}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : msg.Type === "competitor analyst" ? (
                    <>
                      <div
                        className="formatted-text font-bold"
                        dangerouslySetInnerHTML={{
                          __html: formatJobPosting(String(msg.message || "")),
                        }}
                      />

                      {msg.content && (
                        <div className="mt-4 space-y-4 p-4 border rounded-lg shadow-sm text-black bg-white">
                          {/* Competitors Analysis */}
                          {Array.isArray(msg?.content?.competitors) &&
                            msg.content.competitors.length > 0 && (
                              <div className="mt-3">
                                <h4 className="text-md font-semibold text-gray-800">
                                  Competitor Analysis:
                                </h4>
                                <ul className="list-disc list-inside mt-1 text-gray-600">
                                  {msg.content.competitors.map(
                                    (competitor, i) => (
                                      <li
                                        key={i}
                                        className="mb-2 p-2 border rounded bg-gray-100"
                                      >
                                        {competitor?.competitor_name && (
                                          <>
                                            <strong>Competitor:</strong>{" "}
                                            {competitor.competitor_name}
                                            <br />
                                          </>
                                        )}
                                        {competitor?.competitor_link && (
                                          <>
                                            <strong>Website:</strong>{" "}
                                            <a
                                              href={competitor.competitor_link}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-blue-600 hover:underline"
                                            >
                                              {competitor.competitor_link}
                                            </a>
                                            <br />
                                          </>
                                        )}
                                        {competitor?.differentiating_strategy && (
                                          <>
                                            <strong>Strategy:</strong>{" "}
                                            {
                                              competitor.differentiating_strategy
                                            }
                                            <br />
                                          </>
                                        )}
                                        {competitor?.market_positioning && (
                                          <>
                                            <strong>Market Positioning:</strong>{" "}
                                            {competitor.market_positioning}
                                          </>
                                        )}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}

                          {/* Recommendations */}
                          {msg.content.recommendations && (
                            <div className="mt-3 p-4 border rounded-lg bg-gray-50">
                              <h4 className="text-md font-semibold text-gray-800">
                                Recommendations:
                              </h4>
                              <p className="mt-1 text-gray-700">
                                {msg.content.recommendations}
                              </p>
                            </div>
                          )}

                          {/* Risk Factors */}
                          {Array.isArray(msg.content.risk_factors) &&
                            msg.content.risk_factors.length > 0 && (
                              <div className="mt-3">
                                <h4 className="text-md font-semibold text-gray-800">
                                  Risk Factors:
                                </h4>
                                <ul className="list-disc list-inside mt-1 text-gray-600">
                                  {msg.content.risk_factors.map((risk, i) => (
                                    <li
                                      key={i}
                                      className="mb-2 p-2 border rounded bg-red-100"
                                    >
                                      {risk}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                        </div>
                      )}
                    </>
                  ) : msg.Type === "price report" ? (
                    <>
                      <div
                        className="formatted-text "
                        dangerouslySetInnerHTML={{
                          __html: formatJobPosting(String(msg.message || "")),
                        }}
                      />

                      {msg.content && (
                        <div className="mt-4 space-y-4 p-4 border rounded-lg shadow-sm text-black bg-white">
                          {/* Model Description */}
                          {msg.content.model_description && (
                            <div className="mt-3 p-4 border rounded-lg bg-gray-50">
                              <h4 className="text-md font-semibold text-gray-800">
                                Model Description:
                              </h4>
                              <p className="mt-1 text-gray-700">
                                {msg.content.model_description}
                              </p>
                            </div>
                          )}

                          {/* Factors Considered */}
                          {Array.isArray(msg.content.factors_considered) &&
                            msg.content.factors_considered.length > 0 && (
                              <div className="mt-3">
                                <h4 className="text-md font-semibold text-gray-800">
                                  Factors Considered:
                                </h4>
                                <ul className="list-disc list-inside mt-1 text-gray-600">
                                  {msg.content.factors_considered.map(
                                    (factor, i) => (
                                      <li
                                        key={i}
                                        className="mb-2 p-2 border rounded bg-gray-100"
                                      >
                                        <strong>Factor:</strong> {factor.factor}{" "}
                                        <br />
                                        <strong>Influence:</strong>{" "}
                                        {factor.influence}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}

                          {/* Pricing Strategy */}
                          {msg.content.pricing_strategy && (
                            <div className="mt-3 p-4 border rounded-lg bg-gray-50">
                              <h4 className="text-md font-semibold text-gray-800">
                                Pricing Strategy:
                              </h4>
                              <p className="mt-1 text-gray-700">
                                {msg.content.pricing_strategy}
                              </p>
                            </div>
                          )}

                          {/* Profitability Forecast */}
                          {msg.content.profitability_forecast && (
                            <div className="mt-3 p-4 border rounded-lg bg-green-50">
                              <h4 className="text-md font-semibold text-gray-800">
                                Profitability Forecast:
                              </h4>
                              <p className="mt-1 text-gray-700">
                                {msg.content.profitability_forecast}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : msg.Type === "sales pitch" ? (
                    <>
                      <div
                        className="formatted-text font-bold"
                        dangerouslySetInnerHTML={{
                          __html: formatJobPosting(String(msg.message || "")),
                        }}
                      />

                      {msg.content && (
                        <div className="mt-4 space-y-4 p-4 border rounded-lg shadow-sm text-black bg-white">
                          {/* Target Demographic */}
                          {msg.content.target_demographic && (
                            <div className="mt-3 p-4 border rounded-lg bg-gray-50">
                              <h4 className="text-md font-semibold text-gray-800">
                                Target Demographic:
                              </h4>
                              <p className="mt-1 text-gray-700">
                                {msg.content.target_demographic}
                              </p>
                            </div>
                          )}

                          {/* Pitch Content */}
                          {msg.content.pitch_content && (
                            <div className="mt-3 p-4 border rounded-lg bg-gray-50">
                              <h4 className="text-md font-semibold text-gray-800">
                                Sales Pitch:
                              </h4>
                              <p className="mt-1 text-gray-700">
                                {msg.content.pitch_content}
                              </p>
                            </div>
                          )}

                          {/* Key Persuasion Points */}
                          {Array.isArray(msg.content.key_persuasion_points) &&
                            msg.content.key_persuasion_points.length > 0 && (
                              <div className="mt-3">
                                <h4 className="text-md font-semibold text-gray-800">
                                  Key Persuasion Points:
                                </h4>
                                <ul className="list-disc list-inside mt-1 text-gray-600">
                                  {msg.content.key_persuasion_points.map(
                                    (point, i) => (
                                      <li
                                        key={i}
                                        className="mb-2 p-2 border rounded bg-gray-100"
                                      >
                                        <strong>Point:</strong> {point.point}{" "}
                                        <br />
                                        <strong>
                                          Supporting Evidence:
                                        </strong>{" "}
                                        {point.supporting_evidence}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}

                          {/* Call to Action */}
                          {msg.content.call_to_action && (
                            <div className="mt-3 p-4 border rounded-lg bg-blue-50">
                              <h4 className="text-md font-semibold text-gray-800">
                                Call to Action:
                              </h4>
                              <p className="mt-1 text-gray-700">
                                {msg.content.call_to_action}
                              </p>
                            </div>
                          )}

                          {/* Estimated Conversion Rate */}
                          {msg.content.estimated_conversion_rate && (
                            <div className="mt-3 p-4 border rounded-lg bg-green-50">
                              <h4 className="text-md font-semibold text-gray-800">
                                Estimated Conversion Rate:
                              </h4>
                              <p className="mt-1 text-gray-700">
                                {(
                                  msg.content.estimated_conversion_rate * 100
                                ).toFixed(0)}
                                %
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : msg.Type === "social media lead" ? (
                    <>
                      <div
                        className="formatted-text font-bold"
                        dangerouslySetInnerHTML={{
                          __html: formatJobPosting(String(msg.message || "")),
                        }}
                      />

                      {msg.content && (
                        <div className="mt-4 space-y-4 p-4 border rounded-lg shadow-sm text-black bg-white">
                          {/* Leads from Social Media */}
                          {Array.isArray(msg.content.leads_social_media) &&
                            msg.content.leads_social_media.length > 0 && (
                              <div className="mt-3">
                                <h4 className="text-md font-semibold text-gray-800">
                                  Leads from Social Media:
                                </h4>
                                <ul className="list-disc list-inside mt-1 text-gray-600">
                                  {msg.content.leads_social_media.map(
                                    (lead, i) => (
                                      <li
                                        key={i}
                                        className="mb-2 p-2 border rounded bg-gray-100"
                                      >
                                        <strong>Platform:</strong>{" "}
                                        {lead.platform} <br />
                                        <strong>Profile URL:</strong>{" "}
                                        <a
                                          href={lead.profile_url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-500 underline"
                                        >
                                          {lead.profile_url}
                                        </a>
                                        {lead.engagement_score !== null && (
                                          <>
                                            <br />
                                            <strong>
                                              Engagement Score:
                                            </strong>{" "}
                                            {lead.engagement_score}
                                          </>
                                        )}
                                        {lead.activity_summary !== null && (
                                          <>
                                            <br />
                                            <strong>
                                              Activity Summary:
                                            </strong>{" "}
                                            {lead.activity_summary}
                                          </>
                                        )}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}
                        </div>
                      )}
                    </>
                  ) : msg.Type === "survey out" ? (
                    <>
                      <div
                        className="formatted-text font-bold"
                        dangerouslySetInnerHTML={{
                          __html: formatJobPosting(String(msg.message || "")),
                        }}
                      />

                      {msg.content && (
                        <div className="mt-4 space-y-4 p-4 border rounded-lg shadow-sm text-black bg-white">
                          {/* Survey Title */}
                          <h3 className="text-lg font-semibold text-gray-900">
                            {msg.content.survey_title}
                          </h3>

                          {/* Topic */}
                          <p className="mt-2 text-gray-700">
                            <strong>Topic:</strong> {msg.content.topic}
                          </p>

                          {/* Target Audience */}
                          <p className="mt-2 text-gray-700">
                            <strong>Target Audience:</strong>{" "}
                            {msg.content.target_audience}
                          </p>

                          {/* Survey Questions */}
                          {Array.isArray(msg.content.questions) &&
                            msg.content.questions.length > 0 && (
                              <div className="mt-3">
                                <h4 className="text-md font-semibold text-gray-800">
                                  Survey Questions:
                                </h4>
                                <ul className="list-disc list-inside mt-1 text-gray-600">
                                  {msg.content.questions.map((question, i) => (
                                    <li
                                      key={i}
                                      className="mb-2 p-2 border rounded bg-gray-100"
                                    >
                                      <strong>Question:</strong>{" "}
                                      {question.question} <br />
                                      <strong>Type:</strong>{" "}
                                      {question.question_type}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                          {/* Deployment Plan */}
                          <div className="mt-3">
                            <h4 className="text-md font-semibold text-gray-800">
                              Deployment Plan:
                            </h4>
                            <p className="mt-1 text-gray-600">
                              {msg.content.deployment_plan}
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  ) : msg.Type === "Unknown agent type." ? (
                    <>
                      <div className=" text-red-700">
                        I can’t handle this task yet, but we’re working on
                        improving my capabilities for the future!
                      </div>
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
                            className="btn btn-accent"
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
