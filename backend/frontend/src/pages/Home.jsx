import { useState, useEffect, useCallback } from "react";
import AppLayout from "../layouts/AppLayout";
import TemplateSelector from "../components/TemplateSelector";
import CertificatePreview from "../components/CertificatePreview";
import { API_URL } from "../config/api";

export default function Home({ onLogout, username }) {
  const [cursos, setCursos] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [projetosSalvos, setProjetosSalvos] = useState([]);
  const [inputProjeto, setInputProjeto] = useState("");
  const [selecionados, setSelecionados] = useState([]);
  const [busca, setBusca] = useState("");
  const [projetoSelecionado, setProjetoSelecionado] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [status, setStatus] = useState(null);
  const [template, setTemplate] = useState("moderno");
  const token = localStorage.getItem("token");

  console.log("TOKEN:", token);

  const [errors, setErrors] = useState({
  projeto: false,
  alunos: false,
  horas: false
});

  const fetchCursos = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCursos(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); }
  }, [token]);

  const fetchAlunos = useCallback(async (cursoId = "") => {
    try {
      const url = cursoId 
        ? `${API_URL}/courses/${cursoId}/students` 
        : `${API_URL}/students`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setAlunos(cursoId ? (data.students || []) : (Array.isArray(data) ? data : []));
      }
    } catch (err) { console.error("Erro ao buscar alunos:", err); }
  }, [token]);

  const fetchProjetos = useCallback(async () => {
  try {
    const res = await fetch(`${API_URL}/projects`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.ok) {
      const data = await res.json();
      setProjetosSalvos(data); 
    }
  } catch (err) {
    console.error("Erro ao buscar projetos:", err);
  }
}, [token]);

  useEffect(() => {
    if (token) { 
      fetchCursos(); 
      fetchAlunos(); 
      fetchProjetos();
    }
  }, [token, fetchCursos, fetchAlunos]);

  const alunosFiltrados = alunos.filter(a => a.name?.toLowerCase().includes(busca.toLowerCase()));

  const adicionarProjeto = async () => {
  if (!inputProjeto.trim()) return;

  try {
    const res = await fetch(`${API_URL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name: inputProjeto.trim() })
    });

    if (res.ok) {
      const novo = await res.json();
      console.log(novo);

      setProjetosSalvos(prev => [...prev, novo]);
      setProjetoSelecionado(novo.name);
      setInputProjeto("");
    }
  } catch (err) {
    console.error("Erro ao criar projeto:", err);
  }
};

  const removerProjeto = async (id) => {
  try {
    await fetch(`${API_URL}/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setProjetosSalvos(prev => prev.filter(p => p.id !== id));
  } catch (err) {
    console.error("Erro ao deletar projeto:", err);
  }
};

console.log(inputProjeto);

  // FUNÇÃO DE ENVIO CORRIGIDA
  const handleEnviarEmails = async () => {
    const newError = {
      projeto: !(projetoSelecionado || inputProjeto),
      alunos: selecionados.length === 0,
      horas: !cargaHoraria || Number(cargaHoraria) <= 0
    };

    setErrors(newError);

    //Se tiver erro, para aqui
    if (Object.values(newError).some(e => e)) return;
    
    setStatus("loading");

    try {
      const res = await fetch(`${API_URL}/emails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          project_name: projetoSelecionado || inputProjeto,
          qtd_hours: Number(cargaHoraria),
          students: selecionados.map((a) => a.id),
          template: template
        }),
      });

      if (res.ok){ 
        console.log("✅ Processo de envio iniciado! Confira o histórico.");
        setStatus("success")

        //limpa feedback depois de 3s
        setTimeout(() => setStatus(null), 3000);
        setSelecionados([]);
        setCargaHoraria("");
        setProjetoSelecionado("");
        setInputProjeto("");
      } else {
        console.error("❌ Erro ao solicitar envio.");
        setStatus("error");
        setTimeout(() => setStatus(null), 3000);
      }
    } catch (err) {
      console.error("❌ Falha na conexão:", err);
      setStatus("error");
      setTimeout(() => setStatus(null), 3000);

      //Temporário
      alert("❌ Falha na conexão.");
    }
  };

  const certificateData = {
    name: selecionados.length > 0 ? selecionados[0].name : "Nome do Aluno",
    project: projetoSelecionado || inputProjeto || "Projeto",
    hours: cargaHoraria || 0,
  };

  return (
    <AppLayout onLogout={onLogout} username={username} sidebarProps={{
      alunos: alunosFiltrados,
      selecionados,
      toggleAluno: (aluno) => {
        setSelecionados(prev => {
          const exists = prev.find(a => a.id === aluno.id);
          return exists
          ? prev.filter(a => a.id !== aluno.id) 
          : [...prev, aluno];
        });
       setErrors(prev => ({...prev, alunos: false}));
      },
      toggleSelecionarTodos: () => {
        if (selecionados.length === alunosFiltrados.length && alunosFiltrados.length > 0) {
          setSelecionados([]);
        } else {
          setSelecionados([...alunosFiltrados]);
        }

        setErrors(prev => ({...prev, alunos:false}));
      },
      setBusca, cursos, onSelectCurso: (id) => fetchAlunos(id),
      setProjetoSelecionado: (value) => {
        setProjetoSelecionado(value);
        setErrors(prev => ({...prev, projeto: false}))
      }, 
      setInputProjeto: (value) => {
        setInputProjeto(value);
        setErrors(prev => ({...prev, projeto:false}))
      },
      projetosSalvos, inputProjeto, adicionarProjeto, removerProjeto, mode: "home",
      errors:errors
    }}>
      <div className="space-y-6">
        <TemplateSelector template={template} setTemplate={setTemplate} />
        <CertificatePreview template={template} data={certificateData} />
        
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-sm font-semibold mb-2">Carga Horária</h2>
          <input type="number" min="1" placeholder="Ex: 20" value={cargaHoraria} 
          onChange={(e) => {
              setCargaHoraria(e.target.value);
              setErrors(prev => ({ ...prev, horas: false }));
            }}
          className={`w-full border rounded p-2 outline-none transition-all 
          ${errors.horas ? "border-red-500 bg-red-50 animate-pulse": "focus:ring-1 focus:ring-red-500"}`}  />
        </div>

        {/* BOTÃO AGORA CONECTADO À FUNÇÃO */}
        <button 
          onClick={handleEnviarEmails} 
          disabled={status === "loading"}
          className={` w-full p-3 rounded font-bold transition-colors shadow-md
            ${status === "loading"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 text-white"
            }`}>
          Enviar Certificados
        </button>
      </div>
      {status && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className={`
            px-4 py-3 rounded-lg shadow-lg text-sm font-medium transition-all
            ${status === "success" && "bg-green-500 text-white"}
            ${status === "error" && "bg-red-500 text-white"}
            ${status === "loading" && "bg-gray-800 text-white"}
          `}>
            {status === "loading" && "Enviando certificados..."}
            {status === "success" && "Certificados enviados com sucesso!"}
            {status === "error" && "Erro ao enviar certificados"}
          </div>
        </div>
      )}
    </AppLayout>
  );
}
