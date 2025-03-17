import { Route, Routes } from "react-router";
import "./App.css";
import { Auth } from "@/pages/Auth";
import { Sidebar } from "@/pages/layouts/Sidebar";
import { RequireAuth } from "@/pages/layouts/RequireAuth";
import { RoleEnum } from "@/shared/constants/roleEnum";
import { Unauthorized } from "@/pages/Unauthorized";
import { NotFound } from "@/pages/NotFound";
import { Profile } from "@/pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route element={<Sidebar />}>
        <Route element={<RequireAuth allowedRoles={[RoleEnum.ADMIN]} />}>
          <Route path="/" element={<Profile />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
