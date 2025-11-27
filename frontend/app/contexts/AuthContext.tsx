import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import api from "~/lib/api";

interface AuthContextType {
  token: string | null | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  login: async () => {},
  logout: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>();

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setToken(token);
      api.setSecurityData(token);
    } else {
        setToken(null)
    }
  }, []);

  async function login(email: string, password: string) {
      
      try{
          const { data } = await api.seller.loginSeller({
            username: email,
            password,
          });
          
          if (data?.access_token) {
            setToken(data.access_token);
            api.setSecurityData(data.access_token);
      
            localStorage.setItem("token", data.access_token);
      
            navigate("/dashboard")
        }
        
    } catch(error) {
         toast.error("Login failed. Please check credentials")
    }
}

  function logout() {
    api.seller.logoutSeller();
    setToken(null);
    api.setSecurityData(null);

    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {token === undefined ? <h1>Loading...</h1> : children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider, type AuthContextType}
