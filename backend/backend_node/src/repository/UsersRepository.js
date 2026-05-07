import Users from "../models/Users.js";
import { Op } from "sequelize";

class UsersRepository {
    async create(data) {
        return Users.create(data);
    }

    async findOneByEmail(email) {
        return Users.findOne({ 
            where: { 
                email
            }
        })
    }

    async verifyExistenceUser(username, email) {
        // usando o Op.or aqui para fazer comparação "OR", se deixar sem faz comparação "AND"
        return Users.findOne({
            where: {
                [Op.or]: [
                    { username },
                    { email }
                ]
            }
        })
    }
}

export default new UsersRepository();