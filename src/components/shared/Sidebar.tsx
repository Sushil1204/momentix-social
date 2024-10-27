import React from "react";
import { Link, useLocation } from "react-router-dom";
import momentix_logo_transparent from "@/assets/momentix_logo_transparent.svg";
import { Navlinks } from "@/constants";
import { CircleUserRound, LogOut } from "lucide-react";
import { useUserContext } from "@/context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useUserContext();
  console.log(location?.pathname?.includes("profile"));
  return (
    <div className="hidden md:flex px-6 py-10 flex-col justify-between min-w-[270px] bg-dark-2">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={momentix_logo_transparent}
            alt="logo"
            width={170}
            height={36}
          />
        </Link>

        <ul className="flex flex-col gap-2">
          {Navlinks?.map((link) => {
            return (
              <Link
                to={link?.href}
                key={link?.title}
                className={`flex items-center gap-3 p-4 hover:bg-gray-800 rounded-xl hover:text-white text-sm font-medium lg:text-base lg:font-medium ${
                  location?.pathname === link?.href
                    ? "bg-gray-800 text-white rounded-xl"
                    : ""
                } `}
              >
                {link?.icon}
                {link?.title}
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="space-y-5">
        <Link
          to={`/profile/${user?.id}`}
          className={`flex items-center gap-3 p-4 hover:bg-gray-800 rounded-xl hover:text-white text-sm font-medium lg:text-base lg:font-medium ${
            location?.pathname?.includes("profile")
              ? "bg-gray-800 text-white rounded-xl"
              : ""
          } `}
        >
          <CircleUserRound />
          <p className="text-sm font-medium lg:text-base lg:font-medium">
            Profile
          </p>
        </Link>
        <div className="flex items-center gap-3 p-4 hover:bg-gray-800 rounded-xl hover:text-white">
          <LogOut />
          <p className="text-sm font-medium lg:text-base lg:font-medium">
            Logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
