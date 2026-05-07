import Logo from "../../assets/logo.png";
import OndaTopoDourada from "../../assets/certificados/moldura-top-left-premium.svg"; // Ajuste o nome do arquivo se precisar
import OndaBaixoDourada from "../../assets/certificados/moldura-bottom-right-premium.svg"; // Ajuste o nome do arquivo se precisar

export default function TemplatePremium({ data }) {
  return (
    <div 
      className="w-full h-full bg-[#f3f3f3] relative overflow-hidden flex items-center justify-center min-w-[1123px] min-h-[794px]"
    >
      {/* ONDAS DOURADAS */}
      <img src={OndaTopoDourada} className="absolute -top-2 -left-2 w-[102%] h-[102%] object-cover pointer-events-none" />
      <img src={OndaBaixoDourada} className="absolute -bottom-5 -right-2 w-[102%] h-[102%] object-cover pointer-events-none" />

      {/* CONTEÚDO */}
      <div className="absolute inset-0 flex flex-col items-center justify-between text-center py-8 px-6 sm:px-10">
        
        {/* LOGO */}
        <div className="flex-shrink-0">
          <img 
            src={Logo} 
            className="w-[70px] sm:w-[100px] md:w-[140px] object-contain" 
          />
        </div>

        {/* TEXTO CENTRAL */}
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          {/* TÍTULO PRETO BOLD */}
          <h1 className="text-black text-xl sm:text-3xl md:text-5xl tracking-[0.2em] font-serif font-bold">
            CERTIFICADO
          </h1>
          
          <p className="text-[10px] sm:text-sm md:text-lg">Certificamos que</p>
          
          {/* NOME DO ALUNO DOURADO (#ecbc22) */}
          <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#ecbc22] font-dancing whitespace-nowrap">
            {data?.name || "Nome do Aluno"}
          </p>
          
          <p className="text-[10px] sm:text-sm md:text-lg">participou do projeto</p>
          
          {/* NOME DO PROJETO PRETO BOLD */}
          <p className="text-sm sm:text-xl md:text-2xl text-black font-bold uppercase">
            {data?.project}
          </p>
          
          <p className="text-[10px] sm:text-sm md:text-lg">
            com carga horária de <span className="font-bold">{data?.hours} horas</span>
          </p>
        </div>

        {/* ASSINATURA */}
        <div className="flex flex-col items-center flex-shrink-0 mt-4">
          <div className="w-[100px] sm:w-[200px] md:w-[350px] border-t border-black mb-1" />
          <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-widest font-medium">
            Instrutor Responsável
          </p>
        </div>

      </div>
    </div>
  );
}
