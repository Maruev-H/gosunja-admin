import { Route, Routes } from "react-router";
import "./App.css";
import { Home } from "@/pages/Home";
import { Auth } from "@/pages/Auth";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
