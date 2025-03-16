import { Route, Routes } from "react-router";
import "./App.css";
import { Home } from "@/pages/Home";
import { Auth } from "@/pages/Auth";
import { Sidebar } from "@/pages/layouts/Sidebar";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/sidebar" element={<Sidebar />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
