import EmailTasks from "../models/EmailTasks.js";

class EmailTasksRepository {
    async create(data) {
        return EmailTasks.create(data);
    }

    async updateProgress(taskId) {
        return EmailTasks.increment("processed", {
            by: 1,
            where: {
                id: taskId
            }
        })
    }

    async updateStatus(taskId, status) {
        return EmailTasks.update(
            {
                status
            },
            {
                where: {
                    id: taskId
                }
            }
        )
    }
}

export default new EmailTasksRepository();