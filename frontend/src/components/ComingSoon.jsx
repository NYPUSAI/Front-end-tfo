import React from "react";
import { Construction } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const ComingSoon = () => {
  const { deaprtmentSelected } = useChatStore();

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="flex flex-col items-center space-y-4">
        <span className="text-6xl text-secondary">
          <Construction size={80} strokeWidth={1.5} />
        </span>
        <h1 className="text-4xl font-bold text-primary">Coming Soon</h1>
        <p className="text-lg text-primary">
          The{" "}
          <span className="font-semibold text-secondary">
            {deaprtmentSelected} Department
          </span>{" "}
          is on its way!
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
