import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: Number, // index of correct option
  explanation: String,
});

const quizAttemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  questions: [questionSchema],
  userAnswers: [{ type: mongoose.Schema.Types.Mixed }],
  score: Number,
  totalQuestions: Number,
  passed: Boolean,
  certificateId: String, // unique cert ID if passed
  attemptedAt: { type: Date, default: Date.now },
});

export const QuizAttempt = mongoose.model("QuizAttempt", quizAttemptSchema);