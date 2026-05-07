import ProjectsService from "../services/ProjectsService.js";

class ProjectsController {
    async create(req, res) {
        const { name } = req.body;

        const project = await ProjectsService.createProject(
            name,
            req.user.id
        );

        return res.status(201).json(project);
    }

    async getAll(req, res) {
        const projects = await ProjectsService.getProjects(req.user.id);
        return res.status(200).json(projects);
    }

    async delete(req, res) {
        const { id } = req.params;

        await ProjectsService.deleteProject(id, req.user.id);

        return res.status(204).send();
    }
}

export default new ProjectsController();