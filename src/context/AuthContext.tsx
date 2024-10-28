import { getCurrentAccount } from "@/lib/appwrite/api";
import { IContextType, IUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const INITIAL_USER: IUser = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const navigate = useNavigate();
  const checkAuthUser = async () => {
    try {
      const currentAccount = await getCurrentAccount();
      if (currentAccount) {
        setUser({
          id: currentAccount?.$id,
          name: currentAccount?.name,
          email: currentAccount?.email,
          username: currentAccount?.username,
          bio: currentAccount?.bio,
          imageUrl: currentAccount?.imageUrl,
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Authentication Error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const authCheck = async () => {
      setIsLoading(true);
      const result = await checkAuthUser();
      const cookieFallback = localStorage?.getItem("cookieFallback");
      console.log(result);
      if (!result || cookieFallback == null) {
        navigate("/login"); // Redirect to login if not authenticated
      }
    };

    authCheck(); // Run authentication check on component mount
  }, [navigate]);

  const values = {
    user,
    isLoading,
    isAuthenticated,
    setUser,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export const useUserContext = () => useContext(AuthContext);

export default AuthProvider;
