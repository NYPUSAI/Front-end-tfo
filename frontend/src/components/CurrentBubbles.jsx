import React from "react";
import useWebSocketStore from "../store/useWebSocketStore";
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
        <p className="text-center text-gray-500"></p>
      ) : (
        <>
          {currentMessages.map((msg, index) => {
            const isUserMessage = msg?.message?.user == undefined;
            const parsedBoxMessage =
              msg?.message?.Type === "box"
                ? parseBoxMessage(msg.message.message)
                : null;

            return (
              <div
                key={index}
                className={`chat ${isUserMessage ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">
                    {msg?.message?.user
                      ? formatMessageTime(msg.message.timestamp)
                      : formatMessageTime(msg.timestamp)}
                  </time>
                  {"  "}
                  {/* <span className="font-semibold">
                    {msg.message.user === "AI" ? "AI Assistant" : "You"}
                  </span> */}
                </div>

                <div className="chat-bubble chat-bubble-primary flex flex-col max-w-[60%]">
                  {msg?.message?.user === "AI" &&
                    // msg?.Type !== "box" &&
                    msg.message.task_name && (
                      <div className="bg-white text-xs font-medium text-gray-700 px-2 py-1 rounded-md border border-gray-300 shadow-sm mb-2 self-start">
                        {msg.message.task_name}
                        {/* -{msg.message.Type} */}
                      </div>
                    )}

                  {msg.message?.error ? (
                    <p className="text-red-500">{msg.message.error}</p>
                  ) : msg?.message?.Type === "text" ? (
                    <div
                      className="formatted-text"
                      dangerouslySetInnerHTML={{
                        __html: formatJobPosting(msg.message.message),
                      }}
                    />
                  ) : msg?.message?.Type === "brochure" ? (
                    <>
                      <div
                        className="formatted-text "
                        dangerouslySetInnerHTML={{
                          __html: formatJobPosting(msg.message.message),
                        }}
                      />
                      {msg.message.content && (
                        <div
                          className="p-4 border rounded-lg shadow-sm text-black bg-white mt-2"
                          dangerouslySetInnerHTML={{
                            __html: formatJobPosting(msg.message.content),
                          }}
                        />
                      )}
                    </>
                  ) : msg?.message?.Type === "email templates" ? (
                    <>
                      <div
                        className="formatted-text "
                        dangerouslySetInnerHTML={{
                          __html: formatJobPosting(
                            String(msg.message.message || "")
                          ),
                        }}
                      />
                      {Array.isArray(msg.message.content) &&
                        msg.message.content.length > 0 && (
                          <div className="mt-4 space-y-4">
                            {msg.message.content.map((template, index) => (
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
                  ) : msg?.message?.Type === "discription" ? (
                    <>
                      <div
                        className="formatted-text "
                        dangerouslySetInnerHTML={{
                          __html: formatJobPosting(
                            String(msg.message.message || "")
                          ),
                        }}
                      />

                      {Array.isArray(msg.message.content) &&
                        msg.message.content.length > 0 && (
                          <div className="mt-4 space-y-4">
                            {msg.message.content.map((item, index) => (
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
                  ) : msg?.message?.Type === "slides" ? (
                    <>
                      <div
                        className="formatted-text "
                        dangerouslySetInnerHTML={{
                          __html: formatJobPosting(
                            String(msg.message.message || "")
                          ),
                        }}
                      />

                      {Array.isArray(msg.message.content) &&
                        msg.message.content.length > 0 && (
                          <div className="mt-4 space-y-4">
                            {msg.message.content.map((slide, index) => (
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
                  ) : msg?.message?.Type === "posts" ? (
                    <>
                      <div
                        className="formatted-text "
                        dangerouslySetInnerHTML={{
                          __html: formatJobPosting(
                            String(msg.message.message || "")
                          ),
                        }}
                      />

                      {Array.isArray(msg.message.content) &&
                        msg.message.content.length > 0 && (
                          <div className="mt-4 space-y-4">
                            {msg.message.content.map((post, index) => (
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
                  ) : msg?.message?.Type === "Analysis report" ? (
                    <>
                      <div
                        className="formatted-text "
                        dangerouslySetInnerHTML={{
                          __html: formatJobPosting(
                            String(msg.message.message || "")
                          ),
                        }}
                      />

                      {msg.message.content && (
                        <div className="mt-4 space-y-4 p-4 border rounded-lg shadow-sm text-black bg-white">
                          {/* Industry Sector */}
                          <h3 className="text-lg font-semibold text-gray-900">
                            Industry Sector:{" "}
                            {msg.message.content.industry_sector}
                          </h3>

                          {/* Trends Summary */}
                          {Array.isArray(msg.message.content.trends_summary) &&
                            msg.message.content.trends_summary.length > 0 && (
                              <div className="mt-3">
                                <h4 className="text-md font-semibold text-gray-800">
                                  Trends Summary:
                                </h4>
                                <ul className="list-disc list-inside mt-1 text-gray-600">
                                  {msg.message.content.trends_summary.map(
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
                          {Array.isArray(msg.message.content.data_sources) &&
                            msg.message.content.data_sources.length > 0 && (
                              <div className="mt-3">
                                <h4 className="text-md font-semibold text-gray-800">
                                  Data Sources:
                                </h4>
                                <ul className="list-disc list-inside mt-1 text-gray-600">
                                  {msg.message.content.data_sources.map(
                                    (source, i) => (
                                      <li key={i}>{source}</li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}
                        </div>
                      )}
                    </>
                  ) : msg?.message?.Type === "swot analysis" ? (
                    <>
                      <div
                        className="formatted-text "
                        dangerouslySetInnerHTML={{
                          __html: formatJobPosting(
                            String(msg.message.message || "")
                          ),
                        }}
                      />

                      {msg.message.content && (
                        <div className="mt-4 space-y-4 p-4 border rounded-lg shadow-sm text-black bg-white">
                          {/* SWOT Analysis Sections */}
                          {[
                            "strengths",
                            "weaknesses",
                            "opportunities",
                            "threats",
                          ].map(
                            (category) =>
                              msg.message.content[category] &&
                              msg.message.content[category].length > 0 && (
                                <div key={category} className="mt-3">
                                  <h4 className="text-md font-semibold text-gray-800 capitalize">
                                    {category}:
                                  </h4>
                                  <ul className="list-disc list-inside mt-1 text-gray-600">
                                    {msg.message.content[category].map(
                                      (item, i) => (
                                        <li
                                          key={i}
                                          className="mb-2 p-2 border rounded bg-gray-100"
                                        >
                                          <strong>{item.name}:</strong>{" "}
                                          {item.description}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )
                          )}

                          {/* Strategic Insights */}
                          {msg.message.content.strategic_insights && (
                            <div className="mt-3 p-4 border rounded-lg bg-gray-50">
                              <h4 className="text-md font-semibold text-gray-800">
                                Strategic Insights:
                              </h4>
                              <p className="mt-1 text-gray-700">
                                {msg.message.content.strategic_insights}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : msg?.message?.Type === "competitor analyst" ? (
                    <>
                      <div
                        className="formatted-text"
                        dangerouslySetInnerHTML={{
                          __html: formatJobPosting(
                            String(msg.message.message || "")
                          ),
                        }}
                      />

                      {msg.message.content && (
                        <div className="mt-4 space-y-4 p-4 border rounded-lg shadow-sm text-black bg-white">
                          {/* Competitors Analysis */}
                          {Array.isArray(msg.message.content.competitors) &&
                            msg.message.content.competitors.length > 0 && (
                              <div className="mt-3">
                                <h4 className="text-md font-semibold text-gray-800">
                                  Competitor Analysis:
                                </h4>
                                <ul className="list-disc list-inside mt-1 text-gray-600">
                                  {msg.message.content.competitors.map(
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
                          {msg.message.content.recommendations && (
                            <div className="mt-3 p-4 border rounded-lg bg-gray-50">
                              <h4 className="text-md font-semibold text-gray-800">
                                Recommendations:
                              </h4>
                              <p className="mt-1 text-gray-700">
                                {msg.message.content.recommendations}
                              </p>
                            </div>
                          )}

                          {/* Risk Factors */}
                          {Array.isArray(msg.message.content.risk_factors) &&
                            msg.message.content.risk_factors.length > 0 && (
                              <div className="mt-3">
                                <h4 className="text-md font-semibold text-gray-800">
                                  Risk Factors:
                                </h4>
                                <ul className="list-disc list-inside mt-1 text-gray-600">
                                  {msg.message.content.risk_factors.map(
                                    (risk, i) => (
                                      <li
                                        key={i}
                                        className="mb-2 p-2 border rounded bg-red-100"
                                      >
                                        {risk}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}
                        </div>
                      )}
                    </>
                  ) : msg?.message?.Type === "price report" ? (
                    <>
                      <div
                        className="formatted-text "
                        dangerouslySetInnerHTML={{
                          __html: formatJobPosting(
                            String(msg.message.message || "")
                          ),
                        }}
                      />

                      {msg.message.content && (
                        <div className="mt-4 space-y-4 p-4 border rounded-lg shadow-sm text-black bg-white">
                          {/* Model Description */}
                          {msg.message.content.model_description && (
                            <div className="mt-3 p-4 border rounded-lg bg-gray-50">
                              <h4 className="text-md font-semibold text-gray-800">
                                Model Description:
                              </h4>
                              <p className="mt-1 text-gray-700">
                                {msg.message.content.model_description}
                              </p>
                            </div>
                          )}

                          {/* Factors Considered */}
                          {Array.isArray(
                            msg.message.content.factors_considered
                          ) &&
                            msg.message.content.factors_considered.length >
                              0 && (
                              <div className="mt-3">
                                <h4 className="text-md font-semibold text-gray-800">
                                  Factors Considered:
                                </h4>
                                <ul className="list-disc list-inside mt-1 text-gray-600">
                                  {msg.message.content.factors_considered.map(
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
                          {msg.message.content.pricing_strategy && (
                            <div className="mt-3 p-4 border rounded-lg bg-gray-50">
                              <h4 className="text-md font-semibold text-gray-800">
                                Pricing Strategy:
                              </h4>
                              <p className="mt-1 text-gray-700">
                                {msg.message.content.pricing_strategy}
                              </p>
                            </div>
                          )}

                          {/* Profitability Forecast */}
                          {msg.message.content.profitability_forecast && (
                            <div className="mt-3 p-4 border rounded-lg bg-green-50">
                              <h4 className="text-md font-semibold text-gray-800">
                                Profitability Forecast:
                              </h4>
                              <p className="mt-1 text-gray-700">
                                {msg.message.content.profitability_forecast}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : msg?.message?.Type === "sales pitch" ? (
                    <>
                      <div
                        className="formatted-text "
                        dangerouslySetInnerHTML={{
                          __html: formatJobPosting(
                            String(msg.message.message || "")
                          ),
                        }}
                      />

                      {msg.message.content && (
                        <div className="mt-4 space-y-4 p-4 border rounded-lg shadow-sm text-black bg-white">
                          {/* Target Demographic */}
                          {msg.message.content.target_demographic && (
                            <div className="mt-3 p-4 border rounded-lg bg-gray-50">
                              <h4 className="text-md font-semibold text-gray-800">
                                Target Demographic:
                              </h4>
                              <p className="mt-1 text-gray-700">
                                {msg.message.content.target_demographic}
                              </p>
                            </div>
                          )}

                          {/* Pitch Content */}
                          {msg.message.content.pitch_content && (
                            <div className="mt-3 p-4 border rounded-lg bg-gray-50">
                              <h4 className="text-md font-semibold text-gray-800">
                                Sales Pitch:
                              </h4>
                              <p className="mt-1 text-gray-700">
                                {msg.message.content.pitch_content}
                              </p>
                            </div>
                          )}

                          {/* Key Persuasion Points */}
                          {Array.isArray(
                            msg.message.content.key_persuasion_points
                          ) &&
                            msg.message.content.key_persuasion_points.length >
                              0 && (
                              <div className="mt-3">
                                <h4 className="text-md font-semibold text-gray-800">
                                  Key Persuasion Points:
                                </h4>
                                <ul className="list-disc list-inside mt-1 text-gray-600">
                                  {msg.message.content.key_persuasion_points.map(
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
                          {msg.message.content.call_to_action && (
                            <div className="mt-3 p-4 border rounded-lg bg-blue-50">
                              <h4 className="text-md font-semibold text-gray-800">
                                Call to Action:
                              </h4>
                              <p className="mt-1 text-gray-700">
                                {msg.message.content.call_to_action}
                              </p>
                            </div>
                          )}

                          {/* Estimated Conversion Rate */}
                          {msg.message.content.estimated_conversion_rate && (
                            <div className="mt-3 p-4 border rounded-lg bg-green-50">
                              <h4 className="text-md font-semibold text-gray-800">
                                Estimated Conversion Rate:
                              </h4>
                              <p className="mt-1 text-gray-700">
                                {(
                                  msg.message.content
                                    .estimated_conversion_rate * 100
                                ).toFixed(0)}
                                %
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : msg?.message?.Type === "social media lead" ? (
                    <>
                      <div
                        className="formatted-text"
                        dangerouslySetInnerHTML={{
                          __html: formatJobPosting(
                            String(msg.message.message || "")
                          ),
                        }}
                      />

                      {msg.message.content && (
                        <div className="mt-4 space-y-4 p-4 border rounded-lg shadow-sm text-black bg-white">
                          {/* Leads from Social Media */}
                          {Array.isArray(
                            msg.message.content.leads_social_media
                          ) &&
                            msg.message.content.leads_social_media.length >
                              0 && (
                              <div className="mt-3">
                                <h4 className="text-md font-semibold text-gray-800">
                                  Leads from Social Media:
                                </h4>
                                <ul className="list-disc list-inside mt-1 text-gray-600">
                                  {msg.message.content.leads_social_media.map(
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
                  ) : msg?.message?.Type === "survey out" ? (
                    <>
                      <div
                        className="formatted-text "
                        dangerouslySetInnerHTML={{
                          __html: formatJobPosting(
                            String(msg.message.message || "")
                          ),
                        }}
                      />

                      {msg.message.content && (
                        <div className="mt-4 space-y-4 p-4 border rounded-lg shadow-sm text-black bg-white">
                          {/* Survey Title */}
                          <h3 className="text-lg font-semibold text-gray-900">
                            {msg.message.content.survey_title}
                          </h3>

                          {/* Topic */}
                          <p className="mt-2 text-gray-700">
                            <strong>Topic:</strong> {msg.message.content.topic}
                          </p>

                          {/* Target Audience */}
                          <p className="mt-2 text-gray-700">
                            <strong>Target Audience:</strong>{" "}
                            {msg.message.content.target_audience}
                          </p>

                          {/* Survey Questions */}
                          {Array.isArray(msg.message.content.questions) &&
                            msg.message.content.questions.length > 0 && (
                              <div className="mt-3">
                                <h4 className="text-md font-semibold text-gray-800">
                                  Survey Questions:
                                </h4>
                                <ul className="list-disc list-inside mt-1 text-gray-600">
                                  {msg.message.content.questions.map(
                                    (question, i) => (
                                      <li
                                        key={i}
                                        className="mb-2 p-2 border rounded bg-gray-100"
                                      >
                                        <strong>Question:</strong>{" "}
                                        {question.question} <br />
                                        <strong>Type:</strong>{" "}
                                        {question.question_type}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}

                          {/* Deployment Plan */}
                          <div className="mt-3">
                            <h4 className="text-md font-semibold text-gray-800">
                              Deployment Plan:
                            </h4>
                            <p className="mt-1 text-gray-600">
                              {msg.message.content.deployment_plan}
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  ) : msg?.message?.Type === "Unknown agent type." ? (
                    <>
                      <div className=" text-red-700">
                        I can’t handle this task yet, but we’re working on
                        improving my capabilities for the future!
                      </div>
                    </>
                  ) : parsedBoxMessage ? (
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
                      {msg.message.retry === "False" && (
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
                  ) : msg.action === "form" && msg.form ? (
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
