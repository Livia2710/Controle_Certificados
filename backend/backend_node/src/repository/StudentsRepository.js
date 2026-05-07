import Students from "../models/Students.js";

class StudentsRepository {
    async findOneById(id) {
        return await Students.findOne({
            where: {
                id
            }
        })
    }
}

export default new StudentsRepository();