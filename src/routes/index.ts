import { Router } from "express";
import UserRouter from './user.route'
import AuthRouter from './auth.route'
import SubjectRouter from './subject.route'
import { authMiddleware } from "../middlewares/auth.middleware";

const router: Router = Router();


router.use("/user", UserRouter);
router.use("/auth", AuthRouter);
router.use("/subject", authMiddleware ,SubjectRouter)



export default router;