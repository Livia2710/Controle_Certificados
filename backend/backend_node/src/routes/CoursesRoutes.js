import express from "express";
import CoursesController from "../controllers/CoursesController.js";
import { VerifyAuthenticationToken } from "../middleware/VerifyAuthenticationToken.js";

const CoursesRoutes = express.Router();

CoursesRoutes.get("/", VerifyAuthenticationToken, CoursesController.getAllCourses);
CoursesRoutes.get("/:course_id/students", VerifyAuthenticationToken, CoursesController.getAllStudentsByCourse);

export default CoursesRoutes;