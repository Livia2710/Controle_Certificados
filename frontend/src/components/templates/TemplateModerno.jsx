import Logo from "../../assets/logo.png";
import OndaTopo from "../../assets/certificados/moldura-top-left.svg";
import OndaBaixo from "../../assets/certificados/moldura-bottom-right.svg";

export default function TemplateModerno({ data }) {
  return (
    /* 1. Coloque o ID na div principal */
    /* 2. Adicione 'print:w-[1123px] print:h-[794px]' para garantir o tamanho A4 no PDF */
    <div 
      id="certificate-content" 
      className="w-full h-full bg-[#f3f3f3] relative overflow-hidden flex items-center justify-center min-w-[1123px] min-h-[794px]"
    >
      {/* ONDA TOPO */}
      <img
        src={OndaTopo}
        className="absolute -top-2 -left-2 w-[102%] h-[102%] object-cover pointer-events-none"
      />

      {/* ONDA BAIXO */}
      <img
        src={OndaBaixo}
        className="absolute -bottom-5 -right-2 w-[102%] h-[102%] object-cover pointer-events-none"
      />

      {/* CONTEÚDO */}
      
          {/* CONTEÚDO - Ajustado para manter tudo em uma linha e visível */}
      <div className="absolute inset-0 flex flex-col items-center justify-between text-center py-8 px-6 sm:px-10">
        
        {/* LOGO - Tamanho fixo e proporcional */}
        <div className="flex-shrink-0">
          <img 
            src={Logo} 
            className="w-[70px] sm:w-[100px] md:w-[140px] object-contain"
          />
        </div>

        {/* TEXTO CENTRAL - Uso de whitespace-nowrap para não quebrar o nome */}
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <h1 className="text-[#1a1a1a] text-xl sm:text-3xl md:text-5xl tracking-[0.2em] font-serif">
            CERTIFICADO
          </h1>

          
          
          <p className="text-[10px] sm:text-sm md:text-lg">Certificamos que</p>
          
          {/* NOME: whitespace-nowrap garante a extensão em uma linha */}
          <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#e30613] font-dancing whitespace-nowrap">
            {data?.name || "Nome do Aluno"}
          </p>
          
          <p className="text-[10px] sm:text-sm md:text-lg">participou do projeto</p>
          
          <p className="text-sm sm:text-xl md:text-2xl text-red-600 font-semibold uppercase">
            {data?.project}
          </p>
          
          <p className="text-[10px] sm:text-sm md:text-lg">
            com carga horária de <span className="font-bold">{data?.hours} horas</span>
          </p>
        </div>

        {/* ASSINATURA - mt-auto empurra para baixo, flex-shrink-0 garante que não suma */}
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