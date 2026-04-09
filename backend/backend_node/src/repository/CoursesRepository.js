import Courses from "../models/Courses.js";
import Students from "../models/Students.js";

class CoursesRepository {
    async findAllCoursesAndStudents() {
        return await Courses.findAll();
    }

    async findAllStudentsByCourse(course_id) {
        return await Courses.findOne({
            where: {
                id: course_id
            },
            include: [
                {
                    model: Students,
                    as: "students"
                }
            ]
        })
    }
}

export default new CoursesRepository();