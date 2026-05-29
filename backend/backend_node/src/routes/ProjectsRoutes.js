import { Router } from "express";
import ProjectsController from "../controllers/ProjectsController.js";
import { VerifyAuthenticationToken } from "../middleware/VerifyAuthenticationToken.js";

const router = Router();

router.post("/", VerifyAuthenticationToken, ProjectsController.create);
router.get("/", VerifyAuthenticationToken, ProjectsController.getAll);
router.delete("/:id", VerifyAuthenticationToken, ProjectsController.delete);

export default router;