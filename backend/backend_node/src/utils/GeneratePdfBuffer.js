import html_to_pdf from "html-pdf-node";

export const generatePdfBuffer = (htmlContent) => {
    return new Promise((resolve, reject) => {
        
        const file = { content: htmlContent };
        const options = { 
            format: 'A4', 
            printBackground: true, 
            landscape: true,
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox', 
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--no-zygote'
            ]
        };

        // timeout só se der perda pra n travar a promisse
        const timeout = setTimeout(() => {
            console.error("[PDF] TIMEOUT CRÍTICO");
            reject(new Error("Timeout na geração do PDF"));
        }, 30000); 

        html_to_pdf.generatePdf(file, options, (err, buffer) => {
            clearTimeout(timeout);
            if (err) {
                console.error("[PDF] Erro:", err);
                return reject(err);
            }
            console.log("[PDF] Sucesso!");
            resolve(buffer);
        });
    });
};