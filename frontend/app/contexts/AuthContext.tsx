import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import api from "~/lib/api";


type UserType = "seller" | "partner"

interface AuthContextType {
  token?: string | null;
  user?: UserType
  login: (userType: UserType, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  login: async () => {},
  logout: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>();
  const [user, setUser] = useState<UserType>()

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setToken(token);
      setUser(localStorage.getItem("user") as UserType)
      api.setSecurityData(token);
    } else {
        setToken(null)
    }
  }, []);

  async function login(userType: UserType, email: string, password: string) {
      
      try{
          const loginUser = userType === "seller" ? api.seller.loginSeller : api.partner.loginDeliveryPartner
          const { data } = await loginUser({
            username: email,
            password,
          });
          
          if (data?.access_token) {
            setToken(data.access_token);
            setUser(userType)
            api.setSecurityData(data.access_token);
      
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("user ", userType)
      
            navigate("/dashboard")
        }
        
    } catch(error) {
         toast.error("Login failed. Please check credentials")
    }
}

  function logout() {
    api.seller.logoutSeller();
    setToken(null);
    setUser(undefined);
    api.setSecurityData(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {token === undefined ? <h1>Loading...</h1> : children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider, type AuthContextType, type UserType}
