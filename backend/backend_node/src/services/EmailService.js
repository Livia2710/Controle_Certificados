
class EmailService {
    async sendEmails(data) {
        try {
            console.log(data);

            return "funcionando...";
        } catch (err) {
            throw err;
        }
    }
}

export default new EmailService();