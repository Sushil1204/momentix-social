import login_vector from "../assets/login_vector.png";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  // const isAuthenticated = false;
  return (
    <>
      <div className="w-full flex flex-col lg:flex-row items-center justify-evenly min-h-screen p-5 lg:space-x-4">
        <div className="hidden md:flex flex-col items-center  space-y-5 lg:w-1/2">
          <img
            src={login_vector}
            alt="login_vector"
            //   width={300}
            //   height={200}
            className="hidden lg:block"
          />
        </div>
        <div className="flex flex-col items-center space-y-5 w-full lg:w-1/2">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
