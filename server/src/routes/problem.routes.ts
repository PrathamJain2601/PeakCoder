import { Router } from "express";
import { getProblems } from "../controllers/problem/get-problems.controller";
import { createProblem } from "../controllers/problem/create-problem.controller";
// import { updateProblem } from "../controllers/problem/update-problem.controller";
import { deleteProblem } from "../controllers/problem/delete-problem.controller";
import { addTestCase } from "../controllers/problem/add-testcase.controller";
import { getSingleProblem } from "../controllers/problem/get-single-problem.controller";
import { getSampleTestcases } from "../controllers/problem/get-sample-testcase.controller";
import multer from "multer";

// Multer configuration (stores file in memory before upload)
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

const router = Router();
router.get("/:id", getSingleProblem);
router.get("/:id/testcases", getSampleTestcases);
router.get("/", getProblems);
router.post("/", createProblem);
// router.put("/:id", updateProblem);
router.delete("/:id", deleteProblem);
router.post("/:problemId/testcases", upload.fields([{ name: "inputFile", maxCount: 1 }, { name: "outputFile", maxCount: 1 },]), addTestCase);

export default router;