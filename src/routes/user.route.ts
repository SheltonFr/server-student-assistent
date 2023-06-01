import { Router } from "express";
import userController from "../controllers/user.controller";
const router: Router = Router();

router.post("/", userController.create);
router.get("/:id", userController.findById);

export default router;
