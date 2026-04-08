import AuthService from "../services/AuthService.js";
import HttpException from "../utils/HttpException.js";

class AuthController {
    async login(req, res) {
        try {
            // implementar filtro com zod, por enquanto vou deixar na gambiarra msm
            const { email, password } = req.body;

            const userData = ({
                email, 
                password
            })

            const response = await AuthService.login(userData);

            return res.status(200).json(response);
        } catch(err) {
            if (err instanceof HttpException) {
                return res.status(err.status).json({ erro: err.message });
            }
            return res.status(500).json({ erro: `An error occurred while trying to log in: ${err.message}` });
        }
    }

    async register(req, res) {
        try {
            // implementar filtro com zod, por enquanto vou deixar na gambiarra msm
            const { username, email, password } = req.body;

            const userData = ({
                username,
                email, 
                password
            })

            await AuthService.register(userData);

            return res.status(200).json({ message: "The user was created successfully." })
        } catch(err) {
            if (err instanceof HttpException) {
                return res.status(err.status).json({ erro: err.message });
            }
            return res.status(500).json({ erro: `An error occurred while trying to register the user: ${err.message}` });
        }
    }
}

export default new AuthController();