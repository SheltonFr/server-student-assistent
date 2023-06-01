import { Router } from "express";
import UserRouter from './user.route'
import AuthRouter from './auth.route'
import SubjectRouter from './subject.route'
import TaskRouter from './task.route'
import { authMiddleware } from "../middlewares/auth.middleware";

const router: Router = Router();


router.use("/user", UserRouter);
router.use("/auth", AuthRouter);
router.use("/subject", authMiddleware ,SubjectRouter)
router.use("/task", authMiddleware ,TaskRouter)



export default router;