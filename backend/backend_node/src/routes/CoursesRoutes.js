import express from "express";
import CoursesController from "../controllers/CoursesController.js";

const CoursesRoutes = express.Router();

CoursesRoutes.get("/", CoursesController.getAllCourses);
CoursesRoutes.get("/:course_id/students", CoursesController.getAllStudentsByCourse);

export default CoursesRoutes;