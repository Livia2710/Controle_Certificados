import puppeteer from "puppeteer";

export const generatePdfBuffer = async (htmlContent) => {
    let browser;

    try {
        browser = await puppeteer.launch({
            headless: true,
            executablePath: "C:\\Users\\livia\\.cache\\puppeteer\\chrome\\win64-147.0.7727.57\\chrome-win64\\chrome.exe",
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu'
            ]
        });

        const page = await browser.newPage();

        await page.setContent(htmlContent, {
            waitUntil: "networkidle0"
        });

        const buffer = await page.pdf({
            format: 'A4',
            landscape: true,
            printBackground: true
        });

        console.log("[PDF] Sucesso!");
        return buffer;

    } catch (err) {
        console.error("[PDF] Erro:", err);
        throw err;

    } finally {
        if (browser) await browser.close();
    }
};