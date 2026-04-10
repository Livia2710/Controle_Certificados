import { BodyLoginDTO } from "../DTOs/BodyLoginDTO.js";
import { BodyRegistroDTO } from "../DTOs/BodyRegistroDTO.js";
import AuthService from "../services/AuthService.js";
import HttpException from "../utils/HttpException.js";
import { ZodError } from "zod";

class AuthController {
    async login(req, res) {
        try {
            // implementar filtro com zod, por enquanto vou deixar na gambiarra msm
            const userData = BodyLoginDTO.parse(req.body)

            const response = await AuthService.login(userData);

            return res.status(200).json(response);
        } catch(err) {
            if (err instanceof HttpException) {
                return res.status(err.status).json({ erro: err.message });
            }
            if (err instanceof ZodError) {
                return res.status(400).json({
                    error: err.issues[0].message
                });
            }
            return res.status(500).json({ erro: `An error occurred while trying to log in: ${err.message}` });
        }
    }

    async register(req, res) {
        try {
            const userData = BodyRegistroDTO.parse(req.body)

            await AuthService.register(userData);

            return res.status(200).json({ message: "The user was created successfully." })
        } catch(err) {
            if (err instanceof HttpException) {
                return res.status(err.status).json({ erro: err.message });
            }
            if (err instanceof ZodError) {
                return res.status(400).json({
                    error: err.issues[0].message
                });
            }
            return res.status(500).json({ erro: `An error occurred while trying to register the user: ${err.message}` });
        }
    }
}

export default new AuthController();