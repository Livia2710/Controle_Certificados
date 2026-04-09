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

    async getAllStudentsByCourse(req, res) {
        try {
            const { course_id } = req.params;

            const response = await CoursesService.getAllStudentsByCourse(course_id);

            return res.status(200).json(response);
        } catch (err) {
            if (err instanceof HttpException) {
                return res.status(err.status).json({ erro: err.message });
            }
            return res.status(500).json({ error: err.message });
        }
    }
}

export default new CoursesController();