import Logo from "../../assets/logo_dark.png";
import OndaTopo from "../../assets/certificados/moldura-top-left.svg";
import OndaBaixo from "../../assets/certificados/moldura-bottom-right.svg";

export default function TemplateDark({ data }) {
  return (

    /* 1. Coloque o ID na div principal */
    /* 2. Adicione 'print:w-[1123px] print:h-[794px]' para garantir o tamanho A4 no PDF */
    <div 
      id="certificate-content" 
      className="w-full h-full bg-[#000] relative overflow-hidden flex items-center justify-center min-w-[1123px] min-h-[794px]"
    >
      
      {/* ONDAS DE FUNDO - Mantendo suas posições originais */}
      <img src={OndaTopo} className="absolute -top-2 -left-2 w-[102%] h-[102%] object-cover pointer-events-none opacity-80" />
      <img src={OndaBaixo} className="absolute -bottom-5 -right-2 w-[102%] h-[102%] object-cover pointer-events-none opacity-80" />

      {/* CONTEÚDO - Cores invertidas para o modo Dark */}
      <div className="absolute inset-0 flex flex-col items-center justify-between text-center py-8 px-6 sm:px-10">
        
        {/* LOGO */}
        <div className="flex-shrink-0">
          <img 
            src={Logo} 
            className="w-[70px] sm:w-[100px] md:w-[160px] object-contain brightness-110" 
          />
        </div>

        {/* TEXTO CENTRAL */}
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          {/* TÍTULO EM BRANCO */}
           <h1 className="text-white text-xl sm:text-3xl md:text-5xl tracking-[0.2em] font-serif">
            CERTIFICADO
          </h1>
          
          <p className="text-gray-300 text-[10px] sm:text-sm md:text-lg">Certificamos que</p>
          
          {/* NOME: Destaque em vermelho ou branco, conforme sua preferência */}
          <p className="text-2xl sm:text-4xl md:text-6xl text-[#e30613] font-dancing whitespace-nowrap">
            {data?.name || "Nome do Aluno"}
          </p>
          
          <p className="text-gray-300 text-[10px] sm:text-sm md:text-lg">participou do projeto</p>
          
          {/* PROJETO EM BRANCO/VERMELHO */}
          <p className="text-sm sm:text-xl md:text-2xl text-red-500 font-semibold uppercase">
            {data?.project}
          </p>
          
          <p className="text-gray-300 text-[10px] sm:text-sm md:text-lg">
            com carga horária de <span className="text-white font-bold">{data?.hours} horas</span>
          </p>
        </div>

        {/* ASSINATURA - Linha e texto em branco */}
        <div className="flex flex-col items-center flex-shrink-0 mt-4">
          <div className="w-[100px] sm:w-[200px] md:w-[350px] border-t border-white mb-1" />
          <p className="text-white text-[10px] sm:text-xs md:text-sm uppercase tracking-widest">
            Instrutor Responsável
          </p>
        </div>

      </div>
    </div>
  );
}
