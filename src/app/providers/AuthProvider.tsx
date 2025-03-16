import { JwtDecodedType } from "@/shared/api/auth/types";
import { createContext, useState, Dispatch, SetStateAction } from "react";

interface AuthContextType {
  auth: JwtDecodedType | null;
  setAuth: Dispatch<SetStateAction<JwtDecodedType | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = React.PropsWithChildren;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<JwtDecodedType | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
