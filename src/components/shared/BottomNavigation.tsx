import { MobileNavlinks } from "@/constants";

import { Link, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const { pathname } = useLocation();
  return (
    <section className="z-50 flex items-center justify-between w-full sticky bottom-0 rounded-t-[20px] px-5 py-4 md:hidden bg-white">
      {MobileNavlinks?.map((link) => {
        return (
          <Link
            to={link?.href}
            // key={link?.title}
            className={`flex flex-col items-center justify-between p-4 hover:bg-gray-800 rounded-xl hover:text-white text-sm font-medium lg:text-base lg:font-medium ${
              pathname === link?.href ? "bg-gray-800 text-white rounded-xl" : ""
            } `}
          >
            {link?.icon}
            {link?.title}
          </Link>
        );
      })}
    </section>
  );
};

export default BottomNavigation;
