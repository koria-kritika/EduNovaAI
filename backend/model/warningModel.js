import mongoose from "mongoose";

const warningSchema = new mongoose.Schema({
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  count:    { type: Number, default: 0 },
  reasons:  [{ reason: String, messageText: String, date: Date }],
  isBanned: { type: Boolean, default: false },
}, { timestamps: true });

export const Warning = mongoose.model("Warning", warningSchema);