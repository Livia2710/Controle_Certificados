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

    async findAllPaginated(limit, offset) {
        const result = await EmailTasks.findAndCountAll({
            include: [{
                association: "log"
            }],
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']],
            distinct: true
        });

        return {
            data: result.rows,
            totalPages: Math.ceil(result.count / limit)
        };
    }
}

export default new EmailTasksRepository();