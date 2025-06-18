import { Router } from "express";
import { runTestCase } from "../controllers/submission/run.controller";
import { submitTestCase } from "../controllers/submission/submit.controller";

const router = Router();

router.post("/run", runTestCase);
router.post("/submit", submitTestCase);

export default router;
