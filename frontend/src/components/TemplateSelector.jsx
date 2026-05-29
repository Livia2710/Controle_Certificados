export default function TemplateSelector({ template, setTemplate }) {
  const templates = [
    { id: "moderno", label: "Moderno", bg: "bg-[#f3f3f3]", border: "border-gray-300", accent: "bg-[#e30613]" },
    { id: "classico", label: "Clássico", bg: "bg-[#F7F1E1]", border: "border-[#ac0c0b]", accent: "bg-[#ac0c0b]" },
    { id: "dark", label: "Dark", bg: "bg-black", border: "border-gray-700", accent: "bg-[#e30613]" },
    { id: "premium", label: "Premium", bg: "bg-[#f3f3f3]", border: "border-[#ecbc22]", accent: "bg-[#ecbc22]" },
    { id: "minimalista", label: "Minimalista", bg: "bg-white", border: "border-[#ac0c0b]", accent: "bg-[#ac0c0b]" },
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">
        Escolha o estilo do certificado
      </h2>
      
      {/* Flex Wrap e remoção de scroll */}
      <div className="flex flex-wrap gap-5 justify-center sm:justify-start">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            /* Aumentei para w-36 h-24 e adicionei p-1 para a borda vermelha aparecer bem */
            className={`relative flex-shrink-0 w-36 h-24 rounded-lg border-2 transition-all duration-200 overflow-hidden p-1 ${
              template === t.id 
                ? "border-red-600 scale-105 shadow-lg ring-1 ring-red-600" 
                : "border-gray-200 hover:border-gray-300"
            } ${t.bg}`}
          >
            {/* SIMULAÇÃO DAS ONDAS/BORDAS (Ajustadas para o novo tamanho) */}
            <div className="absolute inset-0 pointer-events-none">
              {t.id === "moderno" && (
                <>
                  <div className="absolute top-0 left-0 w-10 h-10 bg-red-500/20 rounded-br-full" />
                  <div className="absolute bottom-0 right-0 w-10 h-10 bg-red-500/20 rounded-tl-full" />
                </>
              )}
              {t.id === "dark" && (
                <>
                  <div className="absolute top-0 left-0 w-10 h-10 bg-red-600/30 rounded-br-full" />
                  <div className="absolute bottom-0 right-0 w-10 h-10 bg-red-600/30 rounded-tl-full" />
                </>
              )}
              {t.id === "premium" && (
                <>
                  <div className="absolute top-0 left-0 w-10 h-10 bg-[#ecbc22]/30 rounded-br-full" />
                  <div className="absolute bottom-0 right-0 w-10 h-10 bg-[#ecbc22]/30 rounded-tl-full" />
                </>
              )}
              {t.id === "classico" && (
                <div className="absolute inset-2 border border-gray-400 opacity-40" />
              )}
              {t.id === "minimalista" && (
                <div className="absolute inset-2 border-[1.5px] border-[#ac0c0b] rounded-md opacity-60" />
              )}
            </div>

            {/* TEXTOS SIMULADOS */}
            <div className="flex flex-col items-center justify-center h-full gap-2 relative z-10">
              <div className={`w-10 h-[2px] ${t.id === "dark" ? "bg-white/40" : "bg-gray-800/40"}`} />
              <div className={`w-16 h-[4px] ${t.accent} rounded-full`} />
              <div className="w-8 h-[2px] bg-gray-400/30" />
            </div>

            {/* LABEL - Sem uppercase forçado */}
            <div className={`absolute bottom-0 inset-x-0 text-[10px] font-medium py-1 ${
              t.id === "dark" ? "bg-white/10 text-white" : "bg-black/5 text-gray-700"
            }`}>
              {t.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
