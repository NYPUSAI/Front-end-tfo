{
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
    </div>
  ) : (
    <p className="text-gray-500">No content</p>
  );
}

/* Move retry button outside the bubble */
{
  msg.retry === "False" && (
    <div className="flex justify-center mt-2">
      <button className="btn btn-accent" onClick={handleRetryButton}>
        Retry
      </button>
    </div>
  );
}
