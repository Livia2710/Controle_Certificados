import CoursesService from "../services/CoursesService.js";

class CoursesController {
    async getAllCoursesAndStudents(req, res) {
        try {
            const response = await CoursesService.getAllCoursesAndStudents();

            if(!response) {
                return res.status(204).send();
            }

            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}

export default new CoursesController();