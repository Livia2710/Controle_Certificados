import { BodySendEmailsDTO } from "../DTOs/BodySendEmailsDTO.js";
import EmailService from "../services/EmailService.js";
import { ZodError } from "zod";
import HttpException from "../utils/HttpException.js";


class EmailController {
    async sendEmails(req, res) {
        try {
            // usa o filtro do Zod para validar o body da request
            const data = BodySendEmailsDTO.parse(req.body);

            const response = await EmailService.sendEmails(data);

            return res.status(200).json(response);
        } catch (err) {
            if (err instanceof HttpException) {
                return res.status(err.status).json({ erro: err.message });
            }
            if (err instanceof ZodError) {
                return res.status(400).json({
                    error: err.issues[0].message
                });
            }
            return res.status(500).json({ erro: `An error occurred while trying to invite the emails: ${err.message}` });
        }
    }    
}

export default new EmailController();