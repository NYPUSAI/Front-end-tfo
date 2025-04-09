: msg.Type === "emailtemplate" ? (
  <>
    <div
      className="formatted-text"
      dangerouslySetInnerHTML={{
        __html: formatJobPosting(String(msg.message || "")),
      }}
    />
    {msg.content && (
      <p className="mt-2 text-gray-600">{msg.content}</p>
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
    {msg.content && (
      <p className="mt-2 text-gray-600">{msg.content}</p>
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
    {msg.content && (
      <p className="mt-2 text-gray-600">{msg.content}</p>
    )}
  </>
) : msg.Type === "post" ? (
  <>
    <div
      className="formatted-text"
      dangerouslySetInnerHTML={{
        __html: formatJobPosting(String(msg.message || "")),
      }}
    />
    {msg.content && (
      <p className="mt-2 text-gray-600">{msg.content}</p>
    )}
  </>
)