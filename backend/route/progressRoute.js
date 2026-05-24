import express from "express";
import { markLectureComplete, getCourseProgress } from "../controller/progressController.js";
import  isAuth  from "../middleware/isAuth.js";

const router = express.Router();

router.post("/mark", isAuth, markLectureComplete);
router.get("/:courseId", isAuth, getCourseProgress);

export default router;