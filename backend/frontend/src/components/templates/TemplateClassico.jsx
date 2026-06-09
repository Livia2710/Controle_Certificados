import Logo from "../../assets/logo.png";
import Moldura from "../../assets/certificados/moldura-classico.svg"; // Exemplo de caminho

export default function TemplateClassico({ data }) {
  return (
      /* 1. Coloque o ID na div principal */
    /* 2. Adicione 'print:w-[1123px] print:h-[794px]' para garantir o tamanho A4 no PDF */
    <div 
      id="certificate-content" 
      className="w-full h-full bg-[#F7F1E1] relative overflow-hidden flex items-center justify-center min-w-[1123px] min-h-[794px]"
    >
      {/* BORDA ÚNICA - Ocupa todo o fundo */}
      <img 
        src={Moldura} 
        className="absolute inset-0 w-full h-full object-stretch pointer-events-none sm:p-2" 
      />

      {/* CONTEÚDO - Mesma lógica de distribuição segura */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between text-center py-20 px-8 sm:px-14">
        
        {/* TOPO: LOGO */}
        <div className="flex-shrink-0">
          <img 
            src={Logo} 
            className="w-[70px] sm:w-[100px] md:w-[150px] object-contain"
          />
        </div>

        {/* MEIO: TEXTOS (Escaláveis) */}
        <div className="flex flex-col items-center gap-1 sm:gap-2 md:gap-3">
          <h1 className="text-[#1a1a1a] text-xl sm:text-3xl md:text-5xl tracking-[0.2em] font-serif">
            CERTIFICADO
          </h1>

          <p className="text-[10px] sm:text-sm md:text-lg italic">Certificamos que</p>
          
          {/* NOME: Em uma linha só e centralizado */}
          <p className="text-2xl sm:text-4xl md:text-6xl text-[#ac0c0b] font-dancing whitespace-nowrap">
            {data?.name || "Nome do Aluno"}
          </p>
          
          <p className="text-[10px] sm:text-sm md:text-lg">participou do projeto</p>
          
          <p className="text-sm sm:text-xl md:text-2xl text-[#1a1a1a] font-bold uppercase tracking-tight">
            {data?.project}
          </p>
          
          <p className="text-[10px] sm:text-sm md:text-lg">
            com carga horária de <span className="font-bold text-[#1a1a1a]">{data?.hours} horas</span>
          </p>
        </div>

        {/* BASE: ASSINATURA */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="w-[120px] sm:w-[250px] md:w-[400px] border-t-2 border-black mb-1" />
          <p className="text-[10px] sm:text-xs md:text-sm font-semibold uppercase">
            Instrutor Responsável
          </p>
        </div>

      </div>
    </div>
  );
}
