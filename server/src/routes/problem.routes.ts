import { Router } from "express";
import { getProblems } from "../controllers/problem/get-problem.controller";
import { createProblem } from "../controllers/problem/create-problem.controller";
import { updateProblem } from "../controllers/problem/update-problem.controller";
import { deleteProblem } from "../controllers/problem/delete-problem.controller";
import { addTestCase } from "../controllers/problem/add-testcase.controller";


const router = Router();

router.get("/problems", getProblems);
router.post("/problems", createProblem);
router.put("/problems/:id", updateProblem);
router.delete("problems/:id", deleteProblem);
router.post("/problems/:problemId/testcases", addTestCase);

export default router;