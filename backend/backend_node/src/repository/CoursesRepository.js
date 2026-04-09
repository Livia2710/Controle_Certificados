import Courses from "../models/Courses.js";

class CoursesRepository {
    async findAllCoursesAndStudents() {
        return await Courses.findAll();
    }
}

export default new CoursesRepository();