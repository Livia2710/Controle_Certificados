import CoursesRepository from "../repository/CoursesRepository.js";
import HttpException from "../utils/HttpException.js";

class CoursesService {
    async getAllCourses() {
        try {
            const response = await CoursesRepository.findAllCourses();

            return response;
        } catch (err) {
            throw err;
        }
    }

    async getAllStudentsByCourse(course_id) {
        try {
            const response = await CoursesRepository.findAllStudentsByCourse(course_id);

            if(!response) {
                throw new HttpException("No course found with this Id", 404);
            }

            return response;
        } catch(err) {
            throw err;
        }
    }
}

export default new CoursesService();