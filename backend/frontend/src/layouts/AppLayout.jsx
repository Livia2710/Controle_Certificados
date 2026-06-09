import Sidebar from "../components/Sidebar";
import Logo from "../assets/logo.png";
import { useState } from "react";

export default function AppLayout({ children, onLogout, username, sidebarProps = {} }) {
    const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className="h-screen flex flex-col bg-gray-100">

      {/* HEADER NO TOPO */}
      <div className="h-[80px] bg-white border-b flex items-center justify-between px-4 md:px-6">

        {/* BOTÃO MOBILE */}
        <button className="md:hidden"
            onClick={()=> setOpenSidebar(true)}>☰</button>

        <h1 className="text-lg font-semibold">
          Controle de Certificados
        </h1>

        <img src={Logo} alt="Logo" className="h-10 md:h-20" />
      </div>

      {/* CORPO (SIDEBAR + CONTEÚDO) */}
      <div className="flex flex-1 overflow-hidden">

        {/* OVERLAY (mobile) */}
        {openSidebar && (
            <div
                onClick={()=> setOpenSidebar(false)}
                className="fixed inset-0 bg-black/30 z-40 md:hidden"/>
        )}

        {/* SIDEBAR */}
        <div className={`fixed md:relative z-50 md:z-suto h-full transition-transform duration-300
            ${openSidebar ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
            `}>
        <Sidebar 
          {...sidebarProps}
          username={username}
          onLogout={onLogout}
          mode={sidebarProps.mode}
        />
        </div>
       

        {/* CONTEÚDO */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </div>

      </div>
    </div>
  );
}