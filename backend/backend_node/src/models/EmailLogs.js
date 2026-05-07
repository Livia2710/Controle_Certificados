import { DataTypes } from 'sequelize';
import Database from '../config/Database.js';

const EmailLogs = Database.define(
    "email_logs",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email_task_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "email_tasks",
                key: "id"
            }
        },
        success_delivered: {
            type: DataTypes.JSON,
            allowNull: true
        },
        failed_delivered: {
            type: DataTypes.JSON,
            allowNull: true
        }
    },
    {
        tableName: "email_logs",
        timestamps: true
    }
)

export default EmailLogs;