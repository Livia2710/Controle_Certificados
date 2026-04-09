import { DataTypes } from 'sequelize';
import Database from '../config/Database.js';

const Students = Database.define(
    "students",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        course_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "courses",
                key: "id"
            }
        }
    },
    {
        tableName: "students",
        timestamps: true
    }
)

export default Students;