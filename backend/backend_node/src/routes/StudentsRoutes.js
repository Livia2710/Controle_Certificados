import express from "express";
import {VerifyAuthenticationToken} from "../middleware/VerifyAuthenticationToken.js";
import Students from "../models/Students.js";

const router = express.Router();

router.get("/", VerifyAuthenticationToken, async (req, res) => {
  try {
    const students = await Students.findAll();
    res.json(students);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar alunos" });
  }
});

export default router;