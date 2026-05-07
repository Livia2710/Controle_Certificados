// Importando as logos (modo claro e escuro)
import Logo from "../assets/logo.png";
import LogoDark from "../assets/logo_dark.png";

// Importando os templates
import TemplateClassico from "./templates/TemplateClassico";
import TemplateDark from "./templates/TemplateDark";
import TemplateMinimalista from "./templates/TemplateMinimalista";
import TemplateModerno from "./templates/TemplateModerno";
import TemplatePremium from "./templates/TemplatePremium";

export default function CertificatePreview({template, data}) {

  const renderizarTemplate = () => {
    switch(template){
      case "classico":
        return <TemplateClassico data={data}/>;
      case "dark":
        return <TemplateDark data={data}/>;
      case "minimalista":
        return <TemplateMinimalista data={data}/>;
      case "moderno":
        return <TemplateModerno data={data}/>;
      case "premium":
        return <TemplatePremium data={data}/>;
    }
  }
  return (
   <div className=" w-full flex justify-center">
    <div className="origin-top scale-[0.6] sm:scale-[0.7] md:scale-[0.8] lg:scale-[0.9] xl:scale-100">
      <div id="certificate-content" className="w-[1100px] h-[780px] bg-white shadow border rounded-xl overflow-hidden">
         {renderizarTemplate()}
      </div>
    </div>  
  </div>
  );
}