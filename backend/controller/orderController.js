import razorpay from 'razorpay'
import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()
import Course from '../model/courseModel.js'
import User from '../model/userModel.js'
import { getIO } from '../socket.js'

const RazorPayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

export const RazorpayOrder = async (req, res) => {
    try {
        const { courseId, userId } = req.body
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ message: "Course is not found" })
        }

        // ✅ If course is free (price 0), enroll directly without payment
        if (!course.price || course.price === 0) {
            const user = await User.findById(userId)
            if (!user.enrolledCourses.includes(courseId)) {
                user.enrolledCourses.push(courseId)
                await user.save()
            }
            if (!course.enrolledStudents.includes(userId)) {
                course.enrolledStudents.push(userId)
                await course.save()
            }
            const io = getIO()
            io.emit("student_enrolled", {
                courseId,
                creatorId: course.creator.toString(),
                enrolledCount: course.enrolledStudents.length,
                courseName: course.title,
            })
            return res.status(200).json({ free: true, message: "Enrolled successfully in free course" })
        }

        const options = {
            amount: course.price * 100,  // paise
            currency: 'INR',
            receipt: courseId.toString()
        }
        const order = await RazorPayInstance.orders.create(options)
        return res.status(200).json(order)
    } catch (error) {
        return res.status(500).json({ message: `Failed to create Razorpay Order ${error}` })
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const {
            courseId,
            userId,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body

        // ✅ Verify signature using HMAC-SHA256 — the correct & secure way
        const body = razorpay_order_id + '|' + razorpay_payment_id
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex')

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Payment could not be completed. Invalid signature." })
        }

        // Signature valid — enroll the student
        const user = await User.findById(userId)
        if (!user.enrolledCourses.includes(courseId)) {
            user.enrolledCourses.push(courseId)
            await user.save()
        }

        const course = await Course.findById(courseId).populate("lectures")
        if (!course.enrolledStudents.includes(userId)) {
            course.enrolledStudents.push(userId)
            await course.save()
        }

        const io = getIO()
        io.emit("student_enrolled", {
            courseId,
            creatorId: course.creator.toString(),
            enrolledCount: course.enrolledStudents.length,
            courseName: course.title,
        })

        return res.status(200).json({ message: "Payment verified and enrollment successful" })

    } catch (error) {
        return res.status(500).json({ message: `Internal server error during payment verification ${error}` })
    }
}