import React from "react";
import { Pencil, Users, TrendingUp, Target } from "lucide-react";

const teams = [
  {
    name: "Content Creation",
    description: "Responsible for crafting engaging and high-quality content to attract and retain customers.",
    icon: <Pencil size={32} className="text-primary" />
  },
  {
    name: "Customer Relationship Management",
    description: "Ensures strong customer relationships through personalized interactions and support.",
    icon: <Users size={32} className="text-primary" />
  },
  {
    name: "Sales Strategy",
    description: "Develops innovative sales tactics and market analysis to boost revenue and growth.",
    icon: <TrendingUp size={32} className="text-primary" />
  },
  {
    name: "Lead Generation",
    description: "Focuses on identifying and nurturing potential customers for business expansion.",
    icon: <Target size={32} className="text-primary" />
  }
];

const Teams = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-6xl">
        {teams.map((team, index) => (
          <div key={index} className="card bg-base-100 shadow-xl border border-base-300 p-6 flex items-center text-center">
            <div className="card-body flex flex-col items-center">
              {team.icon}
              <h2 className="card-title text-primary mt-4">{team.name}</h2>
              <p className="text-secondary mt-2">{team.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
