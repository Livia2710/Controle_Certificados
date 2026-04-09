import express from "express";
import CoursesController from "../controllers/CoursesController.js";

const CoursesRoutes = express.Router();

CoursesRoutes.get("/", CoursesController.getAllCoursesAndStudents);

export default CoursesRoutes;