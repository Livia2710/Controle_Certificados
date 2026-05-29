import { useState } from "react"; // Adicione o useState
import { Link, useLocation } from "react-router-dom";
import { Folder, Users, GraduationCap, Search, Plus, Trash2, Mail, FileText, LogOut, UserPlus } from "lucide-react";

export default function Sidebar({ 
  alunos = [], selecionados = [], toggleAluno, toggleSelecionarTodos, setBusca, 
  cursos = [], onSelectCurso, setProjetoSelecionado, projetosSalvos = [], 
  inputProjeto, setInputProjeto, adicionarProjeto, removerProjeto, username, onLogout, mode = "home",
  errors = {}
}) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  
  // Criamos um estado para o select saber qual curso está exibindo
  const [cursoLocal, setCursoLocal] = useState("");

  

  const handleChangeCurso = (e) => {
    const valor = e.target.value;
    setCursoLocal(valor);
    onSelectCurso(valor); // Dispara a função que busca na API (Home)
  };

  return (
    <div className="w-[300px] h-full bg-gray-50 border-r flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 pl-6 space-y-6 custom-scrollbar">
        
        {/* LINKS DE NAVEGAÇÃO */}
        <div className="space-y-2">
          <Link to="/" className={`flex items-center gap-2 px-2 py-2 rounded-md text-sm ${isActive("/") ? "bg-gray-200 text-black font-medium" : "text-gray-600 hover:bg-gray-100"}`}>
            <FileText size={16} /> Certificados
          </Link>
          <Link to="/historico" className={`flex items-center gap-2 px-2 py-2 rounded-md text-sm ${isActive("/historico") ? "bg-gray-200 text-black font-medium" : "text-gray-600 hover:bg-gray-100"}`}>
            <Mail size={16} /> Histórico
          </Link>
        </div>

        {mode === "home" && (
          <div className="space-y-6">
            {/* PROJETOS */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><Folder size={14} /> Projetos</h3>
              <div className="flex gap-2 mb-2">
                <input type="text" value={inputProjeto} onChange={(e) => setInputProjeto(e.target.value)} 
                className={`flex-1 border rounded p-2 text-sm outline-none transition-all 
                ${errors.projeto ? "border-red-500 bg-red-50 animate-pulse" :"focus:ring-1 focus:ring-red-500"}`} placeholder="Novo Projeto" />
                <button type="button" onClick={adicionarProjeto} className="bg-red-500 text-white px-3 rounded hover:bg-red-600"><Plus size={16} /></button>
              </div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {projetosSalvos.map((p) => (
                  <div key={p.id} 
                  onClick={() => {
                    setProjetoSelecionado(p.name);
                    setInputProjeto("")
                  }} 
                  className="flex justify-between items-center bg-white border p-2 rounded text-sm hover:border-red-300 cursor-pointer ml-1">
                    <span className="truncate flex-1">{p.name}</span>
                    <button onClick={(e) => { e.stopPropagation(); removerProjeto(p.id); }} className="text-gray-300 hover:text-red-500 transition-colors p-1">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* CURSO - AJUSTADO COM VALUE E CURSOLOCAL */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><GraduationCap size={14} /> Curso</h3>
              <select 
                value={cursoLocal} 
                className="w-full border rounded p-2 text-sm bg-white cursor-pointer outline-none focus:ring-1 focus:ring-red-500" 
                onChange={handleChangeCurso}
              >
                <option value="">Todos os cursos</option>
                {cursos.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* BUSCA E ALUNOS */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><Search size={14} /> Buscar</h3>
              <input type="text" onChange={(e) => setBusca(e.target.value)} className="w-full border rounded p-2 text-sm mb-4 outline-none focus:ring-1 focus:ring-red-500" placeholder="Nome do aluno..." />
              
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><Users size={14} /> Alunos</h3>
              <button onClick={toggleSelecionarTodos} className="w-full mb-2 bg-gray-200 hover:bg-gray-300 text-xs py-2 rounded font-medium transition-colors">
                {selecionados.length > 0 && selecionados.length === alunos.length ? "Desmarcar todos" : "Selecionar todos"}
              </button>
              <div className={`space-y-1 max-h-52 overflow-y-auto 
                ${errors.alunos ? "border border-red-400 rounded p-1 animate-pulse": ""}`}>
                {alunos.map(a => (
                  <div key={a.id} onClick={() => toggleAluno(a)} className={`p-2 rounded border text-xs cursor-pointer ml-1 transition-all ${selecionados.some(s => s.id === a.id) ? "bg-red-50 border-red-400 text-red-700 font-medium" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
                    {a.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* RODAPÉ FIXO */}
      <div className="p-4 pl-6 border-t bg-gray-50 flex-shrink-0 shadow-[0_-2px_10px_rgba(0,0,0,0.02)] space-y-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            {username?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-800">{username || "Usuário"}</span>
          </div>
        </div>
        <Link 
          to="/register"
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
        >
          <UserPlus size={16} />
          Registrar usuário
        </Link>
        <button onClick={onLogout} className="flex items-center gap-2 text-red-500 text-sm font-medium hover:text-red-600 transition-colors">
          <LogOut size={16} /> Sair do sistema
        </button>
      </div>
    </div>
  );
}
