import { Router } from "express";
import { create } from "../controllers/subject.controller";

const router: Router = Router();


router.post('/', create)



export default router;