import { GoogleGenerativeAI } from "@google/generative-ai";
import { QuizAttempt } from "../model/quizModel.js";
import Courses  from "../model/courseModel.js";
import { v4 as uuidv4 } from "uuid";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate quiz from course content using Gemini
export const generateQuiz = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Courses.findById(courseId).populate("lectures");

    if (!course) return res.status(404).json({ message: "Course not found" });

    // Build content string from course title + description + lecture titles
    const contentSummary = `
      Course Title: ${course.title}
      Description: ${course.description}

      Topics Covered: ${course.lectures?.map(l => l.lectureTitle).join(", ")}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
      You are a quiz generator. Based on this course content, generate exactly 10 multiple choice questions.
      
      Content: ${contentSummary}
      
      Return ONLY valid JSON in this exact format, no extra text:
      {
        "questions": [
          {
            "question": "Question text here?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": 0,
            "explanation": "Brief explanation why this is correct"
          }
        ]
      }
      
      Rules:
      - correctAnswer is the index (0-3) of the correct option
      - Make questions genuinely educational and relevant
      - Vary difficulty: 3 easy, 5 medium, 2 hard
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Clean and parse JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid AI response");
    const quizData = JSON.parse(jsonMatch[0]);

    res.json({ success: true, quiz: quizData, courseId });
     } catch (error) {
    console.log("QUIZ ERROR:", error);

    const status = error?.status || error?.httpStatus || error?.response?.status;
    const msg = error?.message?.toLowerCase() || "";

    const isRateLimit =
      status === 429 ||
      status === 503 ||
      msg.includes("429") ||
      msg.includes("503") ||
      msg.includes("rate limit") ||
      msg.includes("quota") ||
      msg.includes("resource has been exhausted") ||
      msg.includes("too many requests");

    if (isRateLimit) {
      return res.status(429).json({
        message: "Too many requests. This is a free-tier limitation. Please try again in a few minutes.",
        error: error.message,
      });
    }

    res.status(500).json({ message: "Quiz generation failed", error: error.message });
  }
};

// Submit quiz answers and evaluate
export const submitQuiz = async (req, res) => {
  try {
    const { courseId, questions, userAnswers } = req.body;
    const userId = req.userId;

     if (!questions || !userAnswers || questions.length === 0) {
      return res.status(400).json({ message: "Invalid quiz data" });
    }

    let score = 0;
    questions.forEach((q, i) => {
      if (userAnswers[i] === q.correctAnswer) score++;
    });

    const percentage = (score / questions.length) * 100;
    const passed = percentage >= 70; // 70% passing threshold
    const certificateId = passed ? `CERT-${uuidv4().slice(0, 8).toUpperCase()}` : null;

    const attempt = await QuizAttempt.create({
      userId,
      courseId,
      questions,
      userAnswers,
      score,
      totalQuestions: questions.length,
      passed,
      certificateId,
    });

    res.json({
      success: true,
      score,
      total: questions.length,
      percentage: Math.round(percentage),
      passed,
      certificateId,
      attemptId: attempt._id,
    });
  } catch (error) {
       console.log("SUBMIT ERROR:", error);

  const status = error?.status || error?.httpStatus || error?.response?.status;
  const msg = error?.message?.toLowerCase() || "";

  const isRateLimit =
    status === 429 ||
    status === 503 ||
    msg.includes("429") ||
    msg.includes("503") ||
    msg.includes("rate limit") ||
    msg.includes("quota") ||
    msg.includes("resource has been exhausted") ||
    msg.includes("too many requests");

  if (isRateLimit) {
    return res.status(429).json({
      message: "Too many requests. This is a free-tier limitation. Please try again in a few minutes.",
      error: error.message,
    });
  }

  res.status(500).json({ message: "Submission failed", error: error.message });
  }
};

// Get user's quiz history for a course
export const getQuizHistory = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.userId;

    const attempts = await QuizAttempt.find({ userId, courseId })
      .sort({ attemptedAt: -1 })
      .limit(5);

    res.json({ success: true, attempts });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch history" });
  }
};

// Get certificate details
export const getCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;
    const attempt = await QuizAttempt.findOne({ certificateId })
      .populate("userId", "name email")
      .populate("courseId", "title");

    if (!attempt) return res.status(404).json({ message: "Certificate not found" });

    res.json({ success: true, certificate: attempt });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch certificate" });
  }
};