import { X } from "lucide-react";

const ChatHistorySkeleton = ({ onClose }) => {
  return (
    <div className="modal modal-open">
      <div className="modal-box w-96 relative">
        {/* Fixed Header */}
        <div className="sticky top-0 bg-base-100 z-10 p-4 flex justify-between items-center">
          <h3 className="font-bold text-lg text-center flex-1">Chat History</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={30} />
          </button>
        </div>

        {/* Skeleton List */}
        <ul className="space-y-2 mt-2 max-h-60 overflow-y-auto">
          {[...Array(5)].map((_, index) => (
            <li
              key={index}
              className="p-3 bg-base-200 rounded-md shadow-sm animate-pulse"
            >
              <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatHistorySkeleton;
