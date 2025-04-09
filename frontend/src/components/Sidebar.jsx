import React, { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import {
  Group,
  Briefcase,
  Users,
  ShoppingBag,
  Code,
  ClipboardList,
  DollarSign,
  Server,
  FlaskConical,
} from "lucide-react";
import { teamMap } from "../lib/utils";
import { useAuthStore } from "../store/useAuthStore";
import "../components/styles/scrollstyle.css";

const departmentIcons = {
  "HR Department": Users,
  SalesDepartment: ShoppingBag,
  "Marketing Department": Briefcase,
  "Software Development": Code,
  "Project Management": ClipboardList,
  Finance: DollarSign,
  Operations: Briefcase,
  "IT & Infrastructure": Server,
  "R&D": FlaskConical,
};

const additionalDepartments = [
  "Software Development",
  "Project Management",
  "Finance",
  "Operations",
  "IT & Infrastructure",
  "R&D",
];

const Sidebar = () => {
  const {
    setTeamSelected,
    getChatHistory,
    setDepartmentSelected,
    SetComingSoonDepartment,
  } = useChatStore();
  const { CompanyData } = useAuthStore();

  const DepartmentsTeams2 = CompanyData.package.features;

  const [selectedTeam, setSelectedTeamState] = useState(null);
  const [openDepartment, setOpenDepartment] = useState(null);

  const handleTeamSelection = (team) => {
    setSelectedTeamState(team);
    setTeamSelected(team);
    if (teamMap[team]) {
      getChatHistory(teamMap[team]);
    }
  };

  const handleToggle = (department) => {
    setOpenDepartment((prev) => (prev === department ? null : department));
  };

  const handleDepartmentClick = (department) => {
    setDepartmentSelected(department);
    SetComingSoonDepartment();
    setOpenDepartment(null); // Close any open department dropdown
  };

  return (
    <aside className="h-full w-75 border-r border-base-300 flex flex-col p-4">
      <div className="border-b border-base-300 w-full pb-4 mb-2">
        <div className="flex items-center gap-2">
          <Group className="size-6 text-primary" />
          <span className="font-medium">Departments</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full custom-scrollbar">
        {Object.entries(DepartmentsTeams2).map(([department, teams]) => {
          const Icon = departmentIcons[department] || Group; // Default icon if not mapped

          return (
            <div
              key={department}
              className="collapse collapse-arrow bg-base-200 mb-2"
            >
              <input
                type="checkbox"
                checked={openDepartment === department}
                onChange={() => handleToggle(department)}
                className="hidden"
              />
              <div
                className="collapse-title text-lg font-medium cursor-pointer flex items-center gap-3"
                onClick={() => handleToggle(department)}
              >
                <Icon className="size-5 text-primary" /> {/* Department icon */}
                {department}
              </div>
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
          );
        })}

        {/* Render additional departments as standalone buttons */}
        {additionalDepartments.map((department) => {
          const Icon = departmentIcons[department] || Group;
          return (
            <button
              key={department}
              onClick={() => handleDepartmentClick(department)}
              className="w-full bg-base-200 mb-2 p-3 flex items-center gap-3 hover:bg-base-300 transition-colors text-lg font-medium rounded-md"
            >
              <Icon className="size-5 text-primary" />
              {department}
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
