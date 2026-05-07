import { DataTypes } from 'sequelize';
import Database from '../config/Database.js';

const Courses = Database.define(
    "courses",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    },
    {
        tableName: "courses",
        timestamps: true
    }
)

export default Courses;