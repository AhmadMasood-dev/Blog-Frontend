import { createContext, useState, useEffect } from "react";
import { logoutApi, getMeApi } from "../services/users";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMeApi();
        if (res && res.data) {
          setUser(res.data);
          setIsAuthenticated(true);
          
        } else {
          setUser(null);
          setIsAuthenticated(false);
          
        }
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await logoutApi();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        loading,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = () => useContext(AuthContext);
