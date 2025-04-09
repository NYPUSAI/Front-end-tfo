import React from "react";
import { Sun, Sunrise, Moon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
// import SmartTeams from '../assets/SmartTeams.jpg';

const NoChatSelected = () => {
  const { CompanyData } = useAuthStore();

  const hours = new Date().getHours();
  // const hours = 2
  // console.log(hours);
  let greeting = "Good evening";
  let Icon = Moon;

  if (hours < 12) {
    greeting = "Good morning";
    Icon = Sunrise;
  } else if (hours < 18) {
    greeting = "Good afternoon";
    Icon = Sun;
  }

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-8">
        {/* Icon Display */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-primary/20">
              <Icon className="w-12 h-12 text-primary" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-4xl font-bold">Welcome to Smart Teams!</h2>
        <h3 className="text-2xl font-semibold">
          {greeting}, {CompanyData.user_details[0].username}!
        </h3>
        <p className="text-lg text-base-content/60">Select a Team</p>
      </div>
    </div>
  );
};

export default NoChatSelected;

/* 
  Removed Section (Logo):
  -----------------------
  <div className="flex justify-center gap-6 mb-6">
    <div className="relative">
      <div
        className="w-50 h-50 rounded-2xl flex items-center
        justify-center animate-bounce"
      >
        <img
          src={SmartTeams}
          alt="Logo"
          className="w-40 h-40 text-primary"
        />
      </div>
    </div>
  </div>
*/
