import Projects from "../models/Projects.js";

class ProjectsRepository {
    async create(data) {
        return Projects.create(data);
    }

    async findAllByUser(userId) {
        return Projects.findAll({
            where: { user_id: userId },
            order: [["createdAt", "DESC"]]
        });
    }

    async delete(id, userId) {
        return Projects.destroy({
            where: {
                id,
                user_id: userId
            }
        });
    }
}

export default new ProjectsRepository();