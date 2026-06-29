import { Message } from "../model/classroomModel.js";
import { Warning } from "../model/warningModel.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import uploadOnCloudinary from "../config/cloudinary.js";
import { BANNED_WORDS } from "../config/bannedWords.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const localModerate = (text) => {
  const lower = text.toLowerCase();
  const found = BANNED_WORDS.find(word => lower.includes(word));
  if (found) {
    return {
      isSafe: false,
      reason: `Message contains inappropriate language: "${found}"`
    };
  }
  return { isSafe: true, reason: "" };
};


const moderateMessage = async (text) => {
  const localResult = localModerate(text);
  if (!localResult.isSafe) {
    console.log("LOCAL FILTER caught:", text);
    return localResult;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
    const prompt = `You are a strict content moderator. Analyze this message and respond ONLY with JSON, no extra text, no markdown.
    
Message: "${text}"

Respond with exactly this format:
{"isSafe": true, "reason": ""}
or  
{"isSafe": false, "reason": "brief reason why it is unsafe"}

Flag as unsafe if message contains ANY of:
- offensive or abusive language
- bullying or harassment  
- spam or repeated meaningless content
- promotions, ads, or self-promotion links
- hate speech or slurs
- threatening language
- sexual content`;

    const result = await model.generateContent(prompt);
    const raw = result.response.text();
    const json = raw.match(/\{[\s\S]*?\}/);
    if (!json) return { isSafe: true, reason: "" };
    const parsed = JSON.parse(json[0]);
    console.log("GEMINI MOD RESULT:", parsed);
    return parsed;
  } catch (error) {
    console.log("GEMINI MODERATION UNAVAILABLE:", error.status || error.message);
    return { isSafe: true, reason: "" };
  }
};

export const getMessages = async (req, res) => {
  try {
    const { courseId, channel } = req.params;
    const messages = await Message.find({
      courseId, channel, isDeleted: false, parentId: null
    })
      .populate("userId", "name photoUrl")
      .sort({ createdAt: 1 })
      .limit(100);

    res.json({ success: true, messages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};


export const getThreadReplies = async (req, res) => {
  try {
    const { messageId } = req.params;
    const replies = await Message.find({ parentId: messageId, isDeleted: false })
      .populate("userId", "name photoUrl")
      .sort({ createdAt: 1 });

    res.json({ success: true, replies });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch replies" });
  }
};


export const sendMessage = async (req, res) => {
  try {
    const { courseId, channel } = req.params;
    const { text, parentId } = req.body;
    const userId = req.userId;

    if (!text?.trim()) {
      return res.status(400).json({ message: "Message cannot be empty" });
    }

    let warningRecord = await Warning.findOne({ userId, courseId });

    if (warningRecord?.isBanned) {
      return res.status(403).json({
        message: "You have been removed from this classroom due to repeated violations.",
        banned: true
      });
    }

    const modResult = await moderateMessage(text);
    console.log("FINAL MOD RESULT for:", text, "->", modResult);

    if (!modResult.isSafe) {
      warningRecord = await Warning.findOneAndUpdate(
        { userId, courseId },
        {
          $inc: { count: 1 },
          $push: {
            reasons: {
              reason: modResult.reason,
              messageText: text,
              date: new Date()
            }
          },
          $setOnInsert: { isBanned: false }
        },
        { new: true, upsert: true }
      );

      console.log("WARNING COUNT NOW:", warningRecord.count);

      if (warningRecord.count >= 3) {
        warningRecord.isBanned = true;
        await warningRecord.save();
        return res.status(403).json({
          message: "🚫 You have been removed from this classroom after 3 violations.",
          banned: true,
          warningCount: warningRecord.count
        });
      }

      return res.status(400).json({
        message: `⚠️ Warning ${warningRecord.count}/3: Your message was flagged — ${modResult.reason}. After 3 warnings you will be removed.`,
        warned: true,
        warningCount: warningRecord.count
      });
    }

    const message = await Message.create({
      courseId,
      userId,
      channel,
      text: text.trim(),
      parentId: parentId || null,
      isThread: !!parentId
    });

    const populated = await message.populate("userId", "name photoUrl");
    res.json({ success: true, message: populated });

  } catch (error) {
    console.log("SEND MESSAGE ERROR:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
};


export const uploadNote = async (req, res) => {
  try {
    const { courseId, channel } = req.params;
    const { text } = req.body;
    const userId = req.userId;
    const file = req.file;

    let fileUrl = null;
    let fileName = null;
    let fileType = null;

    if (file) {
      fileUrl = await uploadOnCloudinary(file.path);
      fileName = file.originalname;
      fileType = file.mimetype.includes("pdf") ? "pdf" : "image";
    }

    const message = await Message.create({
      courseId, userId, channel, text, fileUrl, fileName, fileType
    });

    const populated = await message.populate("userId", "name photoUrl");
    res.json({ success: true, message: populated });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Upload failed" });
  }
};


export const upvoteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.userId;

    const message = await Message.findById(messageId);
    if (!message) return res.status(404).json({ message: "Message not found" });

    const alreadyUpvoted = message.upvotes.includes(userId);
    if (alreadyUpvoted) {
      message.upvotes.pull(userId);
    } else {
      message.upvotes.push(userId);
    }

    await message.save();
    res.json({ success: true, upvotes: message.upvotes.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Upvote failed" });
  }
};


export const markBestAnswer = async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await Message.findByIdAndUpdate(
      messageId,
      { isBestAnswer: true },
      { new: true }
    );
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.json({ success: true, message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to mark best answer" });
  }
};


export const getWarningStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.userId;
    const warning = await Warning.findOne({ userId, courseId });
    res.json({
      success: true,
      warningCount: warning?.count || 0,
      isBanned: warning?.isBanned || false
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch warning status" });
  }
};
