import Courses from "./Courses.js";
import Students from "./Students.js";

export function SyncAssosiationsDB() {
    // um curso tem vários alunos, um aluno possui um curso
    Courses.hasMany(Students, { foreignKey: "course_id", as: "students" });
    Students.belongsTo(Courses, { foreignKey: "course_id", as: "course" });
}