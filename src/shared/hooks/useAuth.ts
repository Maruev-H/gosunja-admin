import AuthContext from "@/app/providers/AuthProvider";
import { useContext } from "react";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth должен использоваться внутри AuthProvider");
  }
  return context;
};

export default useAuth;
