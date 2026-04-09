import 'dotenv/config';
import express from "express";
import cors from "cors";
import EmailRoutes from "./routes/EmailRoutes.js";
import Database from "./config/Database.js";
import AuthRoutes from './routes/AuthRoutes.js';
import { SyncAssosiationsDB } from './models/Index.js';
import CoursesRoutes from './routes/CoursesRoutes.js';

const app = express();

// tirando o cors só para fins de dev
app.use(cors());
app.use(express.json());

// apontando as rotas
app.use('/email', EmailRoutes);
app.use('/auth', AuthRoutes);
app.use('/courses', CoursesRoutes);

// chama função que arrumas as FK do banco de dados
SyncAssosiationsDB();

async function bootsrap() {
    try {
        // coloca o comando de sync do db
        await Database.sync();
        console.log("Deu bom na sincronização de tabelas");

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