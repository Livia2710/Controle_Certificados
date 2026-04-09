import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.STMP_HOST,
    port: process.env.STMP_PORT,
    secure: false,
    auth: {
        user: process.env.STMP_USER,
        pass: process.env.STMP_PASSWORD
    }
})

// TESTE
transporter.verify((error) => {
    if (error) {
        console.error("Erro no SMTP:", error);
    } else {
        console.log("Conexão com Twilio/SendGrid estabelecida!");
    }
});

export default transporter