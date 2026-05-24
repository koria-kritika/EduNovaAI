import { GoogleGenerativeAI } from "@google/generative-ai";
import Courses from "../model/courseModel.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const courseChat = async (req, res) => {
  try {
    // const { courseId, message, mode, language } = req.body;
    const { courseId } = req.params;
const { message, mode, language } = req.body;
    const userId = req.userId;

    const course = await Courses.findById(courseId).populate("lectures");
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Build course context from all available content
    const courseContext = `
      Course: ${course.title}
      Description: ${course.description}
      Category: ${course.category}
      Topics/Lectures: ${course.lectures?.map((l, i) => 
        `${i + 1}. ${l.lectureTitle}`).join(", ")}
    `;

    const modeInstructions = {
      beginner: "Explain in very simple language, avoid jargon, use relatable everyday examples.",
      advanced: "Use technical terminology, go deeper, assume strong prior knowledge.",
      exam: "Focus on exam-important points, bullet points, key definitions and formulas.",
      analogy: "Use creative real-world analogies and metaphors for every concept."
    };

  const langInstructions = {
  english:   'Respond in clear, natural English.',
  hinglish:  'Respond in Hinglish — natural mix of Hindi and English in Roman script. Example: "Yeh concept basically aise kaam karta hai, samjhe?"',
  hindi:     'Respond entirely in Hindi using Devanagari script.',
  tamil:     'Respond entirely in Tamil script.',
  telugu:    'Respond entirely in Telugu script.',
  bengali:   'Respond entirely in Bengali script.',
  marathi:   'Respond entirely in Marathi using Devanagari script.',
  gujarati:  'Respond entirely in Gujarati script.',
  punjabi:   'Respond entirely in Punjabi using Gurmukhi script.',
  kannada:   'Respond entirely in Kannada script.',
  malayalam: 'Respond entirely in Malayalam script.',
  urdu:      'Respond entirely in Urdu using Nastaliq script (right-to-left).',
  spanish:   'Respond entirely in Spanish.',
  french:    'Respond entirely in French.',
};
    const systemPrompt = `You are an AI tutor ONLY for this specific course. Only answer questions related to this course content. If asked unrelated things, politely redirect.

COURSE CONTENT:
${courseContext}

Mode: ${modeInstructions[mode] || modeInstructions.beginner}
Language: ${langInstructions[language] || langInstructions.english}

Keep responses concise, structured, and student-friendly.`;

    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
 
     const result = await model.generateContent(systemPrompt + "\nStudent question: " + message);
    const reply = result.response.text();
    res.json({ success: true, reply });

  } catch (error) {
    console.log("CHAT ERROR:", error);
    res.status(500).json({ message: "Chat failed", error: error.message });
  }
}