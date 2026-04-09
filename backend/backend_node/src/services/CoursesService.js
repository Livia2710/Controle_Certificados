import CoursesRepository from "../repository/CoursesRepository.js";

class CoursesService {
    async getAllCoursesAndStudents() {
        try {
            const response = await CoursesRepository.findAllCoursesAndStudents();

            return response;
        } catch (err) {
            throw err;
        }
    }
}

export default new CoursesService();