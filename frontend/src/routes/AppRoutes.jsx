import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Historico from "../pages/Historico";

export default function AppRoutes({ onLogout }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home onLogout={onLogout} />} />
        <Route path="/historico" element={<Historico onLogout={onLogout}  />} />
      </Routes>
    </BrowserRouter>
  );
}