import express from "express";
import EmailController from "../controllers/EmailController.js";
import { VerifyAuthenticationToken } from "../middleware/VerifyAuthenticationToken.js";

const EmailRoutes = express.Router();

EmailRoutes.post("/", VerifyAuthenticationToken, EmailController.sendEmails);
EmailRoutes.get('/getTasks', VerifyAuthenticationToken, EmailController.getEmailsPaginated);

export default EmailRoutes;