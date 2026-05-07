import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.erro || "Erro ao registrar");
        return;
      }

      alert("Usuário criado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro no servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 via-red-500 to-red-700">

      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-[400px]">

       <div className="flex justify-center mb-4">
                <img src={Logo} className="w-[120px]" />
              </div>

        <h2 className="text-xl font-semibold mb-6 text-center">
          Criar Conta
        </h2>

        {/* USERNAME */}
        <label className="text-sm text-gray-600">Nome</label>
        <input
          type="text"
          value={username}
          onChange={(e)=> setUsername(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        {/* EMAIL */}
        <label className="text-sm text-gray-600">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        {/* PASSWORD */}
        <label className="text-sm text-gray-600">Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded"
        >
          Registrar
        </button>

      </div>
    </div>
  );
}