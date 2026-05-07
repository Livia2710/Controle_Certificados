import { useState } from "react";
import AppLayout from "../layouts/AppLayout";
import EmailTasks from "../components/EmailsTasks";

export default function Historico({ onLogout, username }) {
  const [taskSelecionada, setTaskSelecionada] = useState(null);
  const token = localStorage.getItem("token");

  return (
    <AppLayout onLogout={onLogout} username={username} sidebarProps={{mode:"historico"}}>

      {/* HEADER DA PÁGINA */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">
          Histórico de Emails
        </h1>
        <p className="text-sm text-gray-500">
          Visualize os envios realizados e seus detalhes
        </p>
      </div>

      {/* LISTA DE TASKS */}
      <div className="bg-white rounded-xl shadow p-4">
        <EmailTasks token={token} />
      </div>


    </AppLayout>
  );
}