import Courses from "./Courses.js";
import EmailLogs from "./EmailLogs.js";
import EmailTasks from "./EmailTasks.js";
import Students from "./Students.js";

export function SyncAssosiationsDB() {
    // um curso tem vários alunos, um aluno possui um curso
    Courses.hasMany(Students, { foreignKey: "course_id", as: "students" });
    Students.belongsTo(Courses, { foreignKey: "course_id", as: "course" });

    // permite q o log puxe a taks, e que a task puxe o log
    EmailLogs.belongsTo(EmailTasks, { foreignKey: "email_task_id", as: "email_task" });
    EmailTasks.hasOne(EmailLogs, { foreignKey: "email_task_id", as: "log" });
}