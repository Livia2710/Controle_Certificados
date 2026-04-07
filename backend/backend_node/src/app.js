import express from "express";
import cors from "cors";
import EmailRoutes from "./routes/EmailRoutes.js";

const app = express();

// tirando o cors só para fins de dev
app.use(cors());
app.use(express.json());

// apontando as rotas
app.use('/email', EmailRoutes);

async function bootsrap() {
    try {
        // coloca o comando de sync do db

        app.listen(5000, () => {
            console.log("API rodando na porta 5000...")
        })
    } catch (err) {
        console.error("Deu merda no boot da API:");
        console.error(err);
        process.exit(1);
    }
}

bootsrap();