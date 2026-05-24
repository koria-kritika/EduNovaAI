import express from "express";
import {
  generateQuiz,
  submitQuiz,
  getQuizHistory,
  getCertificate,
} from "../controller/quizController.js";
import  isAuth  from "../middleware/isAuth.js";

const router = express.Router();

router.get("/generate/:courseId", isAuth, generateQuiz);
router.post("/submit", isAuth, submitQuiz);
router.get("/history/:courseId", isAuth, getQuizHistory);
router.get("/certificate/:certificateId", getCertificate); // public for sharing

export default router;