import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Historico from "./pages/Historico";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  const [logado, setLogado] = useState(false);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) throw new Error("Token inválido");

        const data = await response.json();
        setUser(data);
        setLogado(true);
      } catch (err) {
        console.error(err);
        setLogado(false);
        localStorage.removeItem("token");
      } finally {
        setLoading(false); 
      }
    };

    fetchUser();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(data.erro || "Erro no login");
      return;
    }

    localStorage.setItem("token", data.token);

    // busca o user imediatamente
    const me = await fetch("http://localhost:5000/auth/me", {
      headers: { Authorization: `Bearer ${data.token}` }
    });

    const userData = await me.json();

    setUser(userData);
    setLogado(true);

    return true;
  } catch {
    return false;
  }
  };   

  const handleLogout = () => {
    localStorage.removeItem("token");
      setLogado(false);
      setUser(null);
    };

    if (loading) {
      return (
        <div className="flex h-screen w-screen items-center justify-center">
          <p>Carregando...</p> 
        </div>
      );
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route 
          path="/login" 
          element={!logado ? <Login onLogin={handleLogin} /> : <Navigate to="/" />}
        />

        {/* PROTECTED */}
        {logado && user ? (
          <>
            <Route path="/" element={<Home onLogout={handleLogout} username={user?.username} />} />
            <Route path="/historico" element={<Historico onLogout={handleLogout} username={user?.username} />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}

      </Routes>
    </BrowserRouter>
  );
}
