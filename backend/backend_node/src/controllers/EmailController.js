

class EmailController {
    async getLogEmails(req, res) {
        return res.status(200).json({ msg: "funfou top o teste." })
    }
}

export default new EmailController();