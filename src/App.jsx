import Papa from "papaparse"; /*Para ler o csv */
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState, useEffect } from 'react';
import Logo from "./assets/logo.png";
import LogoDark from "./assets/logo_dark.png";
import './App.css';


export  default function App() {
  //Certificado dinâmicos
  const [projetoSelecionado, setProjetoSelecionado] = useState("");
  const [cargaHoraria, setcargaHoraria] = useState("");

  //CSV
  const [alunos, setAlunos] = useState([]);
  const [projetos, setProjetos] = useState([]);

  //Filtros
  const [selecionados, setSelecionados] = useState([]);
  const [busca, setBusca] = useState("");
  const [cursoSelecionado, setCursoSelecionado] = useState("");

  //Função para selecionar/desmarcar todos os alunos
  const toggleAluno = (nome) => {
  setSelecionados((prev) =>
    prev.includes(nome)
      ? prev.filter((n) => n !== nome)
      : [...prev, nome]
  );
  };

  const selecionarTodos = () => {
  if (selecionados.length === alunosFiltrados.length) {
    setSelecionados([]);
  } else {
    setSelecionados(alunosFiltrados.map((a) => a.nome));
  }
  };

  //Template
  const[template, setTemplate] = useState("moderno");

   const templateList = [
  { id: "moderno", label: "Moderno" },
  { id: "dark", label: "Dark" },
  { id: "glass", label: "Glass" }
  ];

  const templateStyles = {
  moderno: {
    card: "bg-white text-gray-900",
    sub: "text-gray-500",
    border: "bg-gray-300"
  },
  dark: {
    card: "bg-black text-white",
    sub: "text-gray-300",
    border: "bg-gray-600"
  },
  glass: {
    card: "backdrop-blur-md bg-white/10 border border-white/20 text-white",
    sub: "text-red-400",
    border: "bg-red-300"
  }
  };

  const MiniTemplate = ({ type}) => {
    const base = "w-16 h-16 rounded-xl p-2 flex-col justify-between text-[6px]";

    if(type === "moderno") {
      return (
        <div className={`${base} bg-white border`}>
          <div className='h-1 bg-red-500 rounded'/>
          <div className='h-2 bg-gray-300 rounded'/>
          <div className='h-[2px] bg-gray-400 rounded w-6 mx-auto'/>
        </div>
      );
    }
    if(type === "dark"){
      return (
        <div className={`${base} bg-black text-white`}>
          <div className='h-1 bg-red-500 rounded'/>
          <div className='h-2 bg-gray-600 rounded'/>
          <div className='h-[2px] bg-gray-500 rounded w-6 mx-auto'/>
        </div>
      );
    }
    if(type === "glass"){
      return (
        <div className={`${base} bg-white/20 backdrop-blur border-white/30`}>
          <div className='h-1 bg-red-400 rounded'/>
          <div className='h-2 bg-white/40 rounded'/>
          <div className='h-[2px] bg-white/50 rounded w-6 mx-auto'/>
        </div>
      );
    }
  }

  useEffect(() => {
    fetch("/data/alunos.csv")
    .then(res => res.text())
    .then(csv => {
      const parsed = Papa.parse(csv, {
        header: true,
        skipEmptyLines: true
      });
    setAlunos(parsed.data);
    });

    fetch("/data/projetos.csv")
  .then(res => res.text())
  .then(csv => {
    const parsed = Papa.parse(csv, {
      header: true,
      skipEmptyLines: true
    });
    setProjetos(parsed.data);
  });
}, []);

 const alunosFiltrados = alunos.filter((a) => {
  return (
    a.nome?.toLowerCase().includes(busca.toLowerCase()) &&
    (cursoSelecionado === "" || a.curso === cursoSelecionado)
  );
});

const gerarPDF = async () => {
  const elemento = document.getElementById("certificado");

  const canvas = await html2canvas(elemento);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [canvas.width, canvas.height]
  });

  pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

  // 👇 gera um PDF para cada aluno selecionado
  selecionados.forEach((nome) => {
    pdf.save(`certificado-${nome}.pdf`);
  });
};

  return (
    /*  Responsividade em Tailwind
           sem nada = mobile
           sm =>640(tablet) 
           md =>768(Ipad mini) 
           lg =>1024(Desktop) 
           lx =>1280(Monitores grandes)
    */
    
    <div className="min-h-screen bg-[var(--bg)]">

       {/* FAIXA SUPERIOR  (embaixo do card) */}
          <div className=" w-full h-20 bg-black"/>
  
      {/* CONTAINER CENTRAL */}
      <div className="flex justify-center -mt-10 px-4 mb-[-40px]">
          
          {/* CARD */}
          
          <div className="w-full sm:w-[600px] lg:w-[1000px]
              bg-white   
              rounded-xl       /* bordas arredondadas */
              shadow-xl        /* sombra */
              p-4 sm:p-6       /* espaçamento interno */
            "
          >
        
        {/* HEADER */}
         <header className="flex justify-between items-center mb-6">
           {/* TÍTULO */}
            <h1 className="text-xl sm:text-2xl font-semibold text-[var(--text-strong)]">
              Controle de Certificados - Projetos de Extensão
            </h1>
        <img src={Logo} alt="Logo" className="h-20 sm:h-24 object-contain"/>
      </header>
            
      {/* GRID DASHBOARD */}
      <div className="
           grid             
           grid-cols-1     /* mobile: 1 coluna */
           lg:grid-cols-2  /*desktop: 2 colunas*/
           gap-6
      ">
        {/* CARD 1 - FILTROS */}
        <div className='bg-white rounded-xl shadow-md p-4 
        lg:col-span-2 /*ocupa linha inteira no desktop*/'>

          <h2 className="font-semibold mb-4">Filtros</h2>

            {/* PROJETO */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Projeto</label>

              <select className="w-full border rounded p-2"
              onChange={(e) => setProjetoSelecionado(e.target.value)}>
              <option value="">Selecione</option>
              {projetos.map((p) => (
                <option key={p.id} value={p.nome}>{p.nome}</option>
              ))}
            </select>
            </div>

            {/* Curso + Busca */}
            <div className="flex flex-col sm:flex-row gap-4">

              {/* CURSO */}
              <div className="w-full">
                <label className="block mb-1 font-medium">Curso</label>

                <select
                className="w-full border rounded p-2"
                onChange={(e) => setCursoSelecionado(e.target.value)}
              >
                <option value="">Todos</option>

                {[...new Set(alunos.map(a => a.curso))].map((curso) => (
                  <option key={curso}>{curso}</option>
                ))}
              </select>
              </div>

              {/* BUSCAR */}
              <div className="w-full">
                <label className='block mb-1 font-medium'>Buscar Aluno</label>
                <input
                type="text"
                placeholder="Buscar..."
                className="w-full border rounded p-2"
                onChange={(e) => setBusca(e.target.value)}
              />
              </div>
            </div>

            </div>
            
            {/* CARD 2 - ALUNOS */}
            <div className='bg-white rounded-xl shadow-md p-4'>
              <h2 className='font-semibold mb-4'>Alunos</h2>

              <div className="border rounded p-3 space-y-2 h-48 overflow-y-scroll">
                <label className='flex items-center gap-2'>
                  <input type='checkbox' className='accent-red-700'
                  checked={selecionados.length === alunosFiltrados.length}
                  onChange={selecionarTodos}/>
                  Selecionar todos
                </label>

                {alunosFiltrados.map((a, i) => (
                <label key={i} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-red-700"
                    checked={selecionados.includes(a.nome)}
                    onChange={() => toggleAluno(a.nome)}
                  />
                  {a.nome}
                </label>
              ))}
              </div>
            </div>

            {/* CARD 3 - PREVIEW */}
            <div className="bg-white rounded-xl shadow-md mt-5">
              <h2 className='font-semibold mb-4 text-start p-4'>Pré-visualização do Certificado</h2>

              <div className="flex gap-4 items-start">

              {/* CERTIFICADO */}
              <div  className="flex-1 flex justify-center">
                <div id="certificado" className={`
                  w-full max-w-[300px] rounded-xl shadow p-6 text-center relative
                  ${templateStyles[template].card}
                `}>

              {/* LINHA DECORATIVA TOPO */}
              <div className="absolute top-0 left-0 w-full h-2 bg-[var(--primary)] rounded-t-xl" />

              {/* LOGO */}
              <img src={template === "dark" ? LogoDark :  Logo} alt="Logo" className="h-20 mx-auto mb-4 object-contain"/>

              {/* TÍTULO */}
              <h2 className={`text-lg font-bold ${templateStyles[template].sub}`}>Certificado</h2>

              <p className="text-sm text-gray-500 mt-2">Certificamos que</p>

              {/* NOME */}
              <p className={`font-semibold mt-2 ${template === "dark" ? "text-gray-300" : "text-gray-500"}`}>{selecionados.length > 0 ? selecionados[0] : "Nome do Aluno"}</p>

              <p className="text-sm text-gray-500 mt-2">participou do projeto</p>

              {/* PROJETO */}
              <p className=" font-medium mt-2 text-[var(--primary)]">{projetoSelecionado || "Nome do Projeto"}</p>

              {/* CARGA HORÁRIA */}
              <p className="text-sm  mt-3">com carga horária de <strong>{cargaHoraria || "0"} horas</strong></p>

              <div className="flex flex-col items-center mt-6">
            {/* LINHA */}
            <div className={`w-40 h-[2px] mb-2 ${templateStyles[template].border}`}/>

            {/* TEXTO */}
            <p className="text-xs text-gray-500">
              Instrutor Responsável
            </p>
          </div>
          </div>
          
          {/* TEMPLATES LATERAL */}
          <div className="flex flex-col gap-2 pl-5">
            {templateList.map((t) => (
              <div 
              key={t.id}
              onClick={() => setTemplate(t.id)}
              className={`
                w-16 h-16
                rounded-lg
                border
                cursor-pointer
                flex items-center justify-center
                transition
                ${template === t.id
                  ? "border-red-600 bg-red-100"
                  : "border-gray-300 hover:border-red-500"}
                `}>
                  <MiniTemplate type={t.id}/>
                </div>
            ))}
          </div>   
             </div>
            </div>
            

            {/* CARD 4 - CARGA HORÁRIA */}
            <div className="bg-white rounded-xl shadow-md p-4 mt-5 lg:col-span-2">
              <h2 className="font-semibold mb-4">Carga Horária</h2>

              <input
                type="number"
                className="w-full border rounded p-2 mb-4"
                placeholder="Ex: 20 horas"
                onChange={(e) => setcargaHoraria(e.target.value)}
              />
              
            <button onClick={gerarPDF}
             className="w-full text-white p-3 rounded font-semibold bg-[var(--primary)] hover:bg-[var(--primary-hover)]">
              Enviar Certificados
            </button>
          </div>
        </div>

      </div>
      </div>
      
      </div>
      {/* FAIXA (embaixo do card) */} 
      <div className=" w-full h-16 bg-black mt-0"/>
      </div>
      

  );
}
