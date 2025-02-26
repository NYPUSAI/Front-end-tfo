import React, { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Group } from "lucide-react";
import { teamMap } from "../lib/utils";

const Sidebar = () => {
  const {
    setDepartmentSelected,
    setTeamSelected,
    getChatHistory,
  } = useChatStore();
  
  const [selectedTeam, setSelectedTeamState] = useState(null);

  const handleTeamSelection = (team) => {
    setSelectedTeamState(team);
    setTeamSelected(team);
    if (teamMap[team]) {
      getChatHistory(teamMap[team]);
    }
  };

  return (
    <aside className="h-full w-72 border-r border-base-300 flex flex-col p-4">
      <div className="border-b border-base-300 w-full pb-4 mb-2">
        <div className="flex items-center gap-2">
          <Group className="size-6" />
          <span className="font-medium">Departments</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full">
        {[
          {
            department: "HR Department",
            teams: ["Recruitment Team", "Onboarding Team"],
          },
          {
            department: "Marketing Department",
            teams: ["SEO Team", "Marketing Research Team", "Social Media Team"],
          },
          {
            department: "Sales Department",
            teams: ["Content Creation", "Customer Relations", "Sales Strategy", "Lead Generation"],
          },
        ].map(({ department, teams }, index) => (
          <div key={department} className="collapse collapse-arrow bg-base-200 mb-2">
            <input type="radio" name="sidebar-accordion" />
            <div className="collapse-title text-lg font-medium">{department}</div>
            <div className="collapse-content">
              {teams.map((team) => (
                <button
                  key={team}
                  onClick={() => handleTeamSelection(team)}
                  className={`w-full p-2 flex items-center gap-3 hover:bg-base-300 transition-colors text-sm rounded-md ${
                    selectedTeam === team ? "bg-base-300" : ""
                  }`}
                >
                  {team}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
