import { Progress } from "../model/progressModel.js";
import Course  from "../model/courseModel.js";

// Called when a lecture video ends
export const markLectureComplete = async (req, res) => {
  try {
    const { courseId, lectureId } = req.body;
    const userId = req.userId;

    const course = await Courses.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    let progress = await Progress.findOne({ userId, courseId });

    if (!progress) {
      progress = await Progress.create({ userId, courseId, completedLectures: [] });
    }

    // Add lectureId only if not already marked
    if (!progress.completedLectures.includes(lectureId)) {
      progress.completedLectures.push(lectureId);
    }

    // Check if all lectures are now done
    const totalLectures = course.lectures?.length || 0;
    progress.courseCompleted = progress.completedLectures.length >= totalLectures;

    await progress.save();

    res.json({
      success: true,
      completedLectures: progress.completedLectures,
      courseCompleted: progress.courseCompleted,
      totalLectures,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to mark lecture complete", error: error.message });
  }
};

// Get progress for a course
export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.userId;

    const course = await Courses.findById(courseId);
    const progress = await Progress.findOne({ userId, courseId });

    const completedLectures = progress?.completedLectures || [];
    const totalLectures = course?.lectures?.length || 0;
    const courseCompleted = completedLectures.length >= totalLectures && totalLectures > 0;

    res.json({
      success: true,
      completedLectures,
      courseCompleted,
      totalLectures,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch progress", error: error.message });
  }
};