import Logo from "../../assets/logo.png";

export default function TemplateMinimalista({ data }) {
  return (
    /* CONTAINER PRINCIPAL COM A MOLDURA ARREDONDADA */
       /* 1. Coloque o ID na div principal */
    /* 2. Adicione 'print:w-[1123px] print:h-[794px]' para garantir o tamanho A4 no PDF */
    <div 
      id="certificate-content" 
      className="w-full h-full bg-[#f3f3f3] relative overflow-hidden flex items-center justify-center min-w-[1123px] min-h-[794px]"
    >
      {/* MOLDURA (Borda arredondada) */}
       <div className="absolute inset-4 sm:inset-6 border-[1.5px] sm:border-[2px] border-[#ac0c0b] rounded-[8px] sm:rounded-[12px] pointer-events-none" />

      {/* CONTEÚDO - Mesma estrutura segura */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between text-center py-12 px-10 sm:px-16">
        
        {/* LOGO */}
        <div className="flex-shrink-0">
          <img 
            src={Logo} 
            className="w-[70px] sm:w-[100px] md:w-[140px] object-contain" 
          />
        </div>

        {/* TEXTO CENTRAL */}
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <h1 className="text-[#1a1a1a] text-xl sm:text-3xl md:text-5xl tracking-[0.2em] font-serif font-bold">
            CERTIFICADO
          </h1>
          
          <p className="text-[10px] sm:text-sm md:text-lg">Certificamos que</p>
          
          {/* NOME DO ALUNO (Vermelho para combinar com a borda ou o padrão anterior) */}
          <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#e30613] font-dancing whitespace-nowrap">
            {data?.name || "Nome do Aluno"}
          </p>
          
          <p className="text-[10px] sm:text-sm md:text-lg">participou do projeto</p>
          
          <p className="text-sm sm:text-xl md:text-2xl text-black font-bold uppercase">
            {data?.project}
          </p>
          
          <p className="text-[10px] sm:text-sm md:text-lg">
            com carga horária de <span className="font-bold">{data?.hours} horas</span>
          </p>
        </div>

        {/* ASSINATURA */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="w-[100px] sm:w-[200px] md:w-[350px] border-t border-black mb-1" />
          <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-widest font-medium">
            Instrutor Responsável
          </p>
        </div>

      </div>
    </div>
  );
}
