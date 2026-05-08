import puppeteer from "puppeteer";

export const generatePdfBuffer = async (htmlContent) => {
    let browser;

    try {
        browser = await puppeteer.launch({
            headless: true,
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