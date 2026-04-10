import { DataTypes } from 'sequelize';
import Database from '../config/Database.js';

const EmailTasks = Database.define(
    "email_tasks",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        status: {
            type: DataTypes.ENUM("FAILED", "PROCESSING", "COMPLETED"),
            allowNull: false,
            defaultValue: "PROCESSING",
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        processed: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: "email_tasks",
        timestamps: true
    }
)

export default EmailTasks;