import express from "express";
import EmailController from "../controllers/EmailController.js";

const EmailRoutes = express.Router();

EmailRoutes.get("/logs", EmailController.getLogEmails);

export default EmailRoutes;