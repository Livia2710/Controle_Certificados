import ProjectsRepository from "../repository/ProjectsRepository.js";

class ProjectsService {
    async createProject(name, userId) {
        return ProjectsRepository.create({
            name,
            user_id: userId
        });
    }

    async getProjects(userId) {
        return ProjectsRepository.findAllByUser(userId);
    }

    async deleteProject(id, userId) {
        return ProjectsRepository.delete(id, userId);
    }
}

export default new ProjectsService();