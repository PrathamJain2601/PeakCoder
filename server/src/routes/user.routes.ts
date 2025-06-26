import { Router } from "express";
import { getProfile } from "../controllers/user/get-profile.controller";
import { updateProfile } from "../controllers/user/update-profile.controller";
import { deleteProfile } from "../controllers/user/delete-profile.controller";
import { recentSubmissions } from "../controllers/user/recent-submissions.controller";
import { profileStats } from "../controllers/user/profile-stats.controller";
import { getLeaderboard } from "../controllers/user/leaderboard.controller";
import { isAuthorized } from "../middlewares/auth.middleware";

const router = Router();

router.get("/get",isAuthorized, getProfile);
router.put("/update",isAuthorized, updateProfile);
router.delete("/delete",isAuthorized, deleteProfile);
router.get("/profile-stats",isAuthorized, profileStats);
router.get("/recent-submissions",isAuthorized, recentSubmissions);
router.get("/leaderboard", getLeaderboard);

export default router;