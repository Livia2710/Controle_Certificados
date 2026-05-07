import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");

    const sucess = await onLogin(email, password);
    if(sucess) {
      // REDIRECIONA
      navigate("/");
    } else {
      setError("Email ou senha inválidos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#7f1d1d] via-[#b91c1c] to-[#7f1d1d] relative overflow-hidden">

      <div className="bg-white/90 p-8 rounded-2xl shadow-xl w-[350px]">

        <div className="flex justify-center mb-4">
          <img src={Logo} className="w-[120px]" />
        </div>

        <h2 className="text-xl font-semibold mb-6 text-center">
          Login
        </h2>

        {/* ERRO */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">{error}</div>
        )}

        <label className="text-sm text-gray-600">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <label className="text-sm text-gray-600">Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded"
        >
          Entrar
        </button>

      </div>
    </div>
  );
}