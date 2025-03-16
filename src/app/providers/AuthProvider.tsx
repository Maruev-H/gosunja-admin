import { createContext, useState, useEffect } from "react";
import { JwtDecodedType } from "@/shared/api/auth/types";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  auth: JwtDecodedType | null;
  setAuth: (user: JwtDecodedType | null) => void;
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [auth, setAuth] = useState<JwtDecodedType | null>(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      try {
        const decodedUser = jwtDecode<JwtDecodedType>(accessToken);
        setAuth(decodedUser);
      } catch (error) {
        console.error("Ошибка декодирования токена:", error);
        setAuth(null);
      }
    }
    setIsLoading(false)
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
