import express from "express";
import EmailController from "../controllers/EmailController.js";

const EmailRoutes = express.Router();

EmailRoutes.post("/", EmailController.sendEmails);

export default EmailRoutes;