import express from "express";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";
import {
  getMessages, sendMessage, uploadNote,
  upvoteMessage, markBestAnswer, getWarningStatus,
  getThreadReplies
} from "../controller/classroomController.js";

const classroomRouter = express.Router();

classroomRouter.get("/messages/:courseId/:channel", isAuth, getMessages);
classroomRouter.get("/thread/:messageId", isAuth, getThreadReplies);
classroomRouter.post("/send/:courseId/:channel", isAuth, sendMessage);
classroomRouter.post("/upload/:courseId/:channel", isAuth, upload.single("file"), uploadNote);
classroomRouter.post("/upvote/:messageId", isAuth, upvoteMessage);
classroomRouter.post("/bestanswer/:messageId", isAuth, markBestAnswer);
classroomRouter.get("/warnings/:courseId", isAuth, getWarningStatus);

export default classroomRouter;