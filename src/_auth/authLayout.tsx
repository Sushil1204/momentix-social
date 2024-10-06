import momentix_transparent_logo from "../assets/momentix_logo_transparent.svg";
import login_vector from "../assets/login_vector.png";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (
        <Navigate to={"/"} />
      ) : (
        <div className="w-full flex flex-col lg:flex-row items-center justify-evenly min-h-screen p-5 lg:space-x-4">
          <div className="flex flex-col items-center  space-y-5 lg:w-1/2">
            <img
              src={momentix_transparent_logo}
              alt="logo"
              width={250}
              height={150}
            />
            <h1 className="text-lg font-semibold text-gray-800 text-center lg:text-left">
              Connecting People
            </h1>
            <img
              src={login_vector}
              alt="login_vector"
              width={300}
              height={200}
              className="hidden lg:block"
            />
          </div>

          <div className="flex flex-col items-center space-y-5 w-full lg:w-1/2">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default AuthLayout;
