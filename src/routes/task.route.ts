import { Router } from "express";
import taskController from "../controllers/task.controller";
const router: Router = Router();

router.post("/", taskController.create);
router.get("/", taskController.findByUserId);
router.get("/:id", taskController.findById);

export default router;
