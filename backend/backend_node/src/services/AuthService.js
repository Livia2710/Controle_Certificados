import UsersRepository from "../repository/UsersRepository.js";
import HttpException from "../utils/HttpException.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
    async login(userData) {
        try {
            const user = await UsersRepository.findOneByEmail(userData.email);
            if (!user) {
                throw new HttpException("Email or password are not valid.", 401);
            }

            const valid = await bcrypt.compare(userData.password, user.password);
            if(!valid) {
                throw new HttpException("Email or password are not valid.", 401);
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    role: user.role,
                    username: user.username
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN
                }
            );

            return {
                token,
                userData: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            };
        } catch (err) {
            throw err;
        }
    }

    async register(userData) {
        try {
            const existsUser = await UsersRepository.verifyExistenceUser(userData.username, userData.email);

            if (existsUser) {
                throw new HttpException("User with this email or username already exists.", 409)
            }

            const passwordHashed = await bcrypt.hash(userData.password, 10);

            await UsersRepository.create({
                username: userData.username,
                email: userData.email,
                password: passwordHashed
            });
        } catch (err) {
            throw err;
        }
    }
}

export default new AuthService();