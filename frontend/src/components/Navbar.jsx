import React, { useState } from "react";
import {
  ChartColumnBig,
  Settings,
  HelpingHand,
  UserCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import SmartTeams from "../assets/SmartTeams.jpg";

const Navbar = ({ onOpenTicket }) => {
  const { userAuth, CompanyData } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const userInitial = CompanyData?.name ? CompanyData.name.charAt(0).toUpperCase() : "U";

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      {/* <p>DontForget To Edit App.jsx</p> */}
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
              onClick={closeDropdown}
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <img src={SmartTeams} alt="Logo" className="w-15 h-15" />
              </div>
              <h1 className="text-lg font-bold">Smart Teams</h1>
            </Link>
          </div>

          <div className="relative dropdown dropdown-end">
            {userAuth && (
              <div>
                <label
                  tabIndex={0}
                  className="btn btn-sm btn-ghost flex items-center gap-2 hover:bg-primary/20 rounded-full transition"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-md hover:shadow-lg transition">
                    {userInitial}
                  </div>
                </label>
                {isDropdownOpen && (
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box w-52"
                  >
                    <li className="rounded-full hover:bg-primary/20 transition">
                      <Link to="/graphs" onClick={closeDropdown} className="rounded-full flex items-center gap-2 p-2">
                        <ChartColumnBig className="w-4 h-4" /> Usage
                      </Link>
                    </li>
                    <li className="rounded-full hover:bg-primary/20 transition">
                      <Link to="/resources" onClick={closeDropdown} className="rounded-full flex items-center gap-2 p-2">
                        <HelpingHand className="w-4 h-4" /> Resources
                      </Link>
                    </li>
                    <li className="rounded-full hover:bg-primary/20 transition">
                      <Link to="/settings" onClick={closeDropdown} className="rounded-full flex items-center gap-2 p-2">
                        <Settings className="w-4 h-4" /> Settings
                      </Link>
                    </li>
                    <li className="rounded-full hover:bg-primary/20 transition">
                      <button onClick={() => { onOpenTicket(); closeDropdown(); }} className="rounded-full flex items-center gap-2 p-2">Raise A Ticket</button>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
