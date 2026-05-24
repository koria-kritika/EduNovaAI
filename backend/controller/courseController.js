// import uploadOnCloudinary from "../config/cloudinary.js"
// import Course from "../model/courseModel.js"
// import Lecture from "../model/lectureModel.js"
// import User from "../model/userModel.js"
// import { getIO } from "../socket.js" // ✅ no circular import

// // for Course
// export const createCourse = async (req, res) => {
//     try {
//         const { title, category } = req.body
//         if (!title || !category) {
//             return res.status(400).json({ message: "title or Category is required" })
//         }
//         const course = await Course.create({
//             title,
//             category,
//             creator: req.userId
//         })
//         return res.status(201).json(course)
//     } catch (error) {
//         return res.status(500).json({ message: `CreateCourse error ${error}` })
//     }
// }

// export const getPublishedCourses = async (req, res) => {
//     try {
//         const courses = await Course.find({ isPublished: true }).populate("lectures reviews")
//         if (!courses) {
//             return res.status(400).json({ message: "Courses are not found" })
//         }
//         return res.status(200).json(courses)
//     } catch (error) {
//         return res.status(500).json({ message: `failed to get isPublished Courses  ${error}` })
//     }
// }

// export const getCreatorCourses = async (req, res) => {
//     try {
//         const userId = req.userId
//         const courses = await Course.find({ creator: userId })
//         if (!courses) {
//             return res.status(400).json({ message: "Courses are not found" })
//         }
//         return res.status(200).json(courses)
//     } catch (error) {
//         return res.status(500).json({ message: `failed to get Creator Courses ${error}` })
//     }
// }

// export const editCourse = async (req, res) => {
//     try {
//         const { courseId } = req.params
//         const { title, subTitle, description, category, level, isPublished, price } = req.body

//         let thumbnail
//         if (req.file) {
//             thumbnail = await uploadOnCloudinary(req.file.path)
//         }

//         let course = await Course.findById(courseId)
//         if (!course) {
//             return res.status(400).json({ message: "Course is not found" })
//         }

//         const wasPublished = course.isPublished
//         const updateData = { title, subTitle, description, category, level, isPublished, price, thumbnail }
//         course = await Course.findByIdAndUpdate(courseId, updateData, { new: true }).populate("lectures reviews")

//         const io = getIO()

//         // course published for first time → add to all students
//         if (!wasPublished && isPublished === 'true') {
//             io.emit("course_published", course)
//         }

//         // course updated while published → update all students
//         if (wasPublished && isPublished === 'true') {
//             io.emit("course_updated", course)
//         }

//         // course unpublished → remove from students
//         if (wasPublished && isPublished === 'false') {
//             io.emit("course_removed", courseId)
//         }

//         return res.status(200).json(course)
//     } catch (error) {
//         return res.status(500).json({ message: `failed to edit Course ${error}` })
//     }
// }

// export const getCourseById = async (req, res) => {
//     try {
//         const { courseId } = req.params
//         let course = await Course.findById(courseId)
//         if (!course) {
//             return res.status(400).json({ message: "Course is not found" })
//         }
//         return res.status(200).json(course)
//     } catch (error) {
//         return res.status(500).json({ message: `failed to get Course by id ${error}` })
//     }
// }

// export const removeCourse = async (req, res) => {
//     try {
//         const { courseId } = req.params
//         let course = await Course.findById(courseId)
//         if (!course) {
//             return res.status(400).json({ message: "Course is not found" })
//         }
//         await Course.findByIdAndDelete(courseId, { new: true })

//         // course deleted → remove from all students instantly
//         const io = getIO()
//         io.emit("course_removed", courseId)

//         return res.status(200).json({ message: "Course removed" })
//     } catch (error) {
//         return res.status(500).json({ message: `failed to delete Course by id ${error}` })
//     }
// }

// // for Lecture
// export const createLecture = async (req, res) => {
//     try {
//         const { lectureTitle } = req.body
//         const { courseId } = req.params
//         if (!lectureTitle || !courseId) {
//             return res.status(400).json({ message: "lectureTitle is required" })
//         }
//         const lecture = await Lecture.create({ lectureTitle })
//         const course = await Course.findById(courseId)
//         if (course) {
//             course.lectures.push(lecture._id)
//         }
//         await course.populate("lectures")
//         await course.save()

//         // new lecture added → update enrolled students viewing this course
//         const io = getIO()
//         io.emit("lecture_added", { courseId, course })

//         return res.status(201).json({ lecture, course })
//     } catch (error) {
//         return res.status(500).json({ message: `failed to create Lecture ${error}` })
//     }
// }

// export const getCourseLecture = async (req, res) => {
//     try {
//         const { courseId } = req.params
//         const course = await Course.findById(courseId)
//         if (!course) {
//             return res.status(404).json({ message: "Course is not found" })
//         }
//         await course.populate("lectures")
//         await course.save()
//         return res.status(200).json(course)
//     } catch (error) {
//         return res.status(500).json({ message: `failed to getCourseLecture ${error}` })
//     }
// }

// export const editLecture = async (req, res) => {
//     try {
//         const { lectureId } = req.params
//         const { isPreviewFree, lectureTitle } = req.body
//         const lecture = await Lecture.findById(lectureId)
//         if (!lecture) {
//             return res.status(404).json({ message: "Lecture is not found" })
//         }

//         let videoUrl
//         if (req.file) {
//             videoUrl = await uploadOnCloudinary(req.file.path)
//             lecture.videoUrl = videoUrl
//         }
//         if (lectureTitle) {
//             lecture.lectureTitle = lectureTitle
//         }
//         // lecture.isPreviewFree = isPreviewFree
//         lecture.isPreviewFree = isPreviewFree === "true" || isPreviewFree === true
//         await lecture.save()

//         // lecture updated → notify students watching this course
//         const course = await Course.findOne({ lectures: lectureId })
//         if (course) {
//             const io = getIO()
//             io.emit("lecture_updated", { courseId: course._id.toString(), lecture })
//         }

//         return res.status(200).json(lecture)
//     } catch (error) {
//         return res.status(500).json({ message: `failed to edit Lecture ${error}` })
//     }
// }

// export const removeLecture = async (req, res) => {
//     try {
//         const { lectureId } = req.params
//         const lecture = await Lecture.findByIdAndDelete(lectureId)
//         if (!lecture) {
//             return res.status(404).json({ message: "Lecture not found" })
//         }

//         const course = await Course.findOneAndUpdate(
//             { lectures: lectureId },
//             { $pull: { lectures: lectureId } },
//             { new: true }
//         ).populate("lectures")

//         // lecture removed → update students
//         if (course) {
//             const io = getIO()
//             io.emit("lecture_removed", { courseId: course._id.toString(), lectureId })
//         }

//         return res.status(200).json({ message: "Lecture Remove Successfully" })
//     } catch (error) {
//         return res.status(500).json({ message: `Failed to remove Lectures ${error}` })
//     }
// }

// export const getCreatorById = async (req, res) => {
//     try {
//         const { userId } = req.body
//         const user = await User.findById(userId).select("-password")
//         if (!user) {
//             return res.status(404).json({ message: "User is not Found" })
//         }
//         return res.status(200).json(user)
//     } catch (error) {
//         return res.status(500).json({ message: `Failed to get Creator ${error}` })
//     }
// }
import uploadOnCloudinary from "../config/cloudinary.js"
import Course from "../model/courseModel.js"
import Lecture from "../model/lectureModel.js"
import User from "../model/userModel.js"
import { getIO } from "../socket.js"

// ── Course ────────────────────────────────────────────────────────────────────

export const createCourse = async (req, res) => {
    try {
        const { title, category } = req.body
        if (!title || !category) {
            return res.status(400).json({ message: "title or Category is required" })
        }
        const course = await Course.create({
            title,
            category,
            creator: req.userId
        })
        return res.status(201).json(course)
    } catch (error) {
        return res.status(500).json({ message: `CreateCourse error ${error}` })
    }
}

export const getPublishedCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true }).populate("lectures reviews")
        if (!courses) {
            return res.status(400).json({ message: "Courses are not found" })
        }
        return res.status(200).json(courses)
    } catch (error) {
        return res.status(500).json({ message: `failed to get isPublished Courses  ${error}` })
    }
}

export const getCreatorCourses = async (req, res) => {
    try {
        const userId = req.userId
        const courses = await Course.find({ creator: userId })
        if (!courses) {
            return res.status(400).json({ message: "Courses are not found" })
        }
        return res.status(200).json(courses)
    } catch (error) {
        return res.status(500).json({ message: `failed to get Creator Courses ${error}` })
    }
}

export const editCourse = async (req, res) => {
    try {
        const { courseId } = req.params
        const { title, subTitle, description, category, level, isPublished, price } = req.body

        let thumbnail
        if (req.file) {
            thumbnail = await uploadOnCloudinary(req.file.path)
        }

        let course = await Course.findById(courseId)
        if (!course) {
            return res.status(400).json({ message: "Course is not found" })
        }

        const wasPublished = course.isPublished
        const updateData = { title, subTitle, description, category, level, isPublished, price, thumbnail }
        course = await Course.findByIdAndUpdate(courseId, updateData, { new: true }).populate("lectures reviews")

        const io = getIO()

        if (!wasPublished && isPublished === 'true') {
            io.emit("course_published", course)
        }
        if (wasPublished && isPublished === 'true') {
            io.emit("course_updated", course)
        }
        if (wasPublished && isPublished === 'false') {
            io.emit("course_removed", courseId)
        }

        return res.status(200).json(course)
    } catch (error) {
        return res.status(500).json({ message: `failed to edit Course ${error}` })
    }
}

export const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params
        let course = await Course.findById(courseId)
        if (!course) {
            return res.status(400).json({ message: "Course is not found" })
        }
        return res.status(200).json(course)
    } catch (error) {
        return res.status(500).json({ message: `failed to get Course by id ${error}` })
    }
}

export const removeCourse = async (req, res) => {
    try {
        const { courseId } = req.params
        let course = await Course.findById(courseId)
        if (!course) {
            return res.status(400).json({ message: "Course is not found" })
        }
        await Course.findByIdAndDelete(courseId, { new: true })

        const io = getIO()
        io.emit("course_removed", courseId)

        return res.status(200).json({ message: "Course removed" })
    } catch (error) {
        return res.status(500).json({ message: `failed to delete Course by id ${error}` })
    }
}

// ── Lecture ───────────────────────────────────────────────────────────────────

export const createLecture = async (req, res) => {
    try {
        const { lectureTitle } = req.body
        const { courseId } = req.params
        if (!lectureTitle || !courseId) {
            return res.status(400).json({ message: "lectureTitle is required" })
        }
        const lecture = await Lecture.create({ lectureTitle })
        const course = await Course.findById(courseId)
        if (course) {
            course.lectures.push(lecture._id)
        }
        await course.populate("lectures")
        await course.save()

        const io = getIO()
        io.emit("lecture_added", { courseId, course })

        return res.status(201).json({ lecture, course })
    } catch (error) {
        return res.status(500).json({ message: `failed to create Lecture ${error}` })
    }
}

export const getCourseLecture = async (req, res) => {
    try {
        const { courseId } = req.params
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ message: "Course is not found" })
        }
        await course.populate("lectures")
        await course.save()
        return res.status(200).json(course)
    } catch (error) {
        return res.status(500).json({ message: `failed to getCourseLecture ${error}` })
    }
}

export const editLecture = async (req, res) => {
    try {
        const { lectureId } = req.params
        const { isPreviewFree, lectureTitle } = req.body
        const lecture = await Lecture.findById(lectureId)
        if (!lecture) {
            return res.status(404).json({ message: "Lecture is not found" })
        }

        // ✅ Handle video upload with proper error messages for size issues
        if (req.file) {
            try {
                const videoUrl = await uploadOnCloudinary(req.file.path)
                if (!videoUrl) {
                    return res.status(500).json({ message: "Video upload failed. Please try again." })
                }
                lecture.videoUrl = videoUrl
            } catch (uploadError) {
                const msg = uploadError.message || ""

                if (msg.startsWith('FILE_TOO_LARGE_AFTER_COMPRESSION')) {
                    const mb = msg.split(':')[1]
                    return res.status(400).json({
                        message: `Video still too large after compression (${mb}MB). Max upload limit is 300MB. Please use a shorter or lower resolution video.`
                    })
                }

                if (msg.startsWith('FILE_TOO_LARGE')) {
                    const mb = msg.split(':')[1]
                    return res.status(400).json({
                        message: `Video too large (${mb}MB). Max upload limit is 300MB.`
                    })
                }

                return res.status(500).json({ message: "Video upload failed. Please try again." })
            }
        }

        if (lectureTitle) {
            lecture.lectureTitle = lectureTitle
        }
        lecture.isPreviewFree = isPreviewFree === "true" || isPreviewFree === true
        await lecture.save()

        // Notify students watching this course
        const course = await Course.findOne({ lectures: lectureId })
        if (course) {
            const io = getIO()
            io.emit("lecture_updated", { courseId: course._id.toString(), lecture })
        }

        return res.status(200).json(lecture)
    } catch (error) {
        return res.status(500).json({ message: `failed to edit Lecture ${error}` })
    }
}

export const removeLecture = async (req, res) => {
    try {
        const { lectureId } = req.params
        const lecture = await Lecture.findByIdAndDelete(lectureId)
        if (!lecture) {
            return res.status(404).json({ message: "Lecture not found" })
        }

        const course = await Course.findOneAndUpdate(
            { lectures: lectureId },
            { $pull: { lectures: lectureId } },
            { new: true }
        ).populate("lectures")

        if (course) {
            const io = getIO()
            io.emit("lecture_removed", { courseId: course._id.toString(), lectureId })
        }

        return res.status(200).json({ message: "Lecture Remove Successfully" })
    } catch (error) {
        return res.status(500).json({ message: `Failed to remove Lectures ${error}` })
    }
}

// ── Creator ───────────────────────────────────────────────────────────────────

export const getCreatorById = async (req, res) => {
    try {
        const { userId } = req.body
        const user = await User.findById(userId).select("-password")
        if (!user) {
            return res.status(404).json({ message: "User is not Found" })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `Failed to get Creator ${error}` })
    }
}