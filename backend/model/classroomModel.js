import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  courseId:  { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  channel:   { type: String, enum: ["general", "doubts", "notes", "assignments", "announcements"], default: "general" },
  text:      { type: String },
  fileUrl:   { type: String },
  fileName:  { type: String },
  fileType:  { type: String }, // pdf, image, etc
  isThread:  { type: Boolean, default: false },
  parentId:  { type: mongoose.Schema.Types.ObjectId, ref: "Message" }, // for thread replies
  isBestAnswer: { type: Boolean, default: false },
  upvotes:   [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  isDeleted: { type: Boolean, default: false },
  deletedReason: { type: String },
}, { timestamps: true });

export const Message = mongoose.model("Message", messageSchema);