import { Router } from "express";
import { create, findByUserId } from "../controllers/subject.controller";

const router: Router = Router();

router.post("/", create);
router.get("/", findByUserId);

export default router;
