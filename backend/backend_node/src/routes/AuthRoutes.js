import express from "express";
import AuthController from "../controllers/AuthController.js";
import { VerifyAuthenticationToken } from "../middleware/VerifyAuthenticationToken.js";

const AuthRoutes = express.Router();

AuthRoutes.post("/login", AuthController.login);
AuthRoutes.post("/register", VerifyAuthenticationToken, AuthController.register);

export default AuthRoutes;