import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function EmailTasks({ token }) {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [openTaskId, setOpenTaskId] = useState(null);

  const fetchTasks = async (pagina = 1) => {
    try {
      const res = await fetch(`http://localhost:5000/emails/getTasks?page=${pagina}&limit=5`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTasks(data.data || []);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleTask = (taskId) => {
    setOpenTaskId((prev) => (prev === taskId ? null : taskId));
  };

  useEffect(() => {
    fetchTasks(page);
    const interval = setInterval(() => fetchTasks(page), 3000);
    return () => clearInterval(interval);
  }, [page]);

  const statusStyle = (status) => {
    switch (status) {
      case "COMPLETED": return "bg-green-100 text-green-700";
      case "PROCESSING": return "bg-yellow-100 text-yellow-700";
      default: return "bg-red-100 text-red-700";
    }
  };

  return (
    <div>
      <h2 className="font-semibold text-gray-800 mb-4">Histórico de Emails</h2>
      
      <div className="space-y-3">
        {tasks.length === 0 && (
          <p className="text-sm text-gray-500">Nenhuma task encontrada</p>
        )}

        {tasks.map((task) => {
          const isOpen = openTaskId === task.id;
          return (
            <div key={task.id} className="border rounded-xl overflow-hidden transition-all">
              {/* HEADER */}
              <div 
                onClick={() => toggleTask(task.id)} 
                className="flex justify-between items-center p-4 cursor-pointer bg-white hover:bg-gray-50 transition"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">{task.project_name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {task.processed}/{task.total} emails enviados
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyle(task.status)}`}>
                    {task.status}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </div>
              </div>

              {/* BODY (ACCORDION) */}
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px] border-t" : "max-h-0"}`}>
                <div className="p-4 bg-gray-50">
                  <div className="bg-black rounded-md p-4 text-xs font-mono space-y-4 border border-gray-800">
                    
                    {/* FAILED PRIMEIRO */}
                    <div>
                      <p className="text-red-400 font-semibold mb-1">FAILED</p>
                      <pre className="text-red-300/80 whitespace-pre-wrap">
                        {JSON.stringify(task.log?.failed_delivered || [], null, 2)}
                      </pre>
                    </div>

                    {/* SUCCESS SEGUNDO */}
                    <div>
                      <p className="text-green-500 font-semibold mb-1">SUCCESS</p>
                      <pre className="text-green-300 whitespace-pre-wrap">
                        {JSON.stringify(task.log?.success_delivered || [], null, 2)}
                      </pre>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* PAGINAÇÃO */}
      <div className="flex justify-between mt-5 text-sm">
        <button 
          disabled={page === 1} 
          onClick={() => setPage((p) => p - 1)} 
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-40"
        >
          Anterior
        </button>
        <span className="text-gray-500">
          Página {page} de {totalPages || 1}
        </span>
        <button 
          disabled={page === totalPages || totalPages === 0} 
          onClick={() => setPage((p) => p + 1)} 
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-40"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
