import { Route, Routes } from "react-router";
import "./App.css";
import { Auth } from "@/pages/Auth";
import { Sidebar } from "@/pages/layouts/Sidebar";
import { RequireAuth } from "@/pages/layouts/RequireAuth";
import { RoleEnum } from "@/shared/constants/roleEnum";
import { Unauthorized } from "@/pages/Unauthorized";
import { NotFound } from "@/pages/NotFound";
import { Profile } from "@/pages/Profile";
import { Accounts } from "@/pages/Accounts";
import { Gallery } from "@/pages/Gallery";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />

      <Route
        element={
          <RequireAuth
            allowedRoles={[RoleEnum.ADMIN, RoleEnum.ESTABLISHMENT]}
          />
        }
      >
        <Route element={<Sidebar />}>
          <Route path="/" element={<Profile />} />
        </Route>
      </Route>

      <Route element={<RequireAuth allowedRoles={[RoleEnum.ADMIN]} />}>
        <Route element={<Sidebar />}>
          <Route path="/accounts" element={<Accounts />} />
        </Route>
      </Route>


      <Route
        element={
          <RequireAuth
            allowedRoles={[RoleEnum.ESTABLISHMENT]}
          />
        }
      >
        <Route element={<Sidebar />}>
          <Route path="/gallery" element={<Gallery />} />
        </Route>
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
