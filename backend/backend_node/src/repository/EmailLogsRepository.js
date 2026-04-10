import EmailLogs from "../models/EmailLogs.js";

class EmailLogsRepository {
    async create(data) {
        return EmailLogs.create(data);
    }
}

export default new EmailLogsRepository();