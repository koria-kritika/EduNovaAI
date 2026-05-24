import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/connectDB.js'
import cookieParser from 'cookie-parser'
import authRouter from './route/authRoute.js'
import cors from "cors"
import userRouter from './route/userRoute.js'
import courseRouter from './route/courseRoute.js'
import paymentRouter from './route/paymentRoute.js'
import reviewRouter from './route/reviewRoute.js'
import quizRoute from "./route/quizRoute.js"
import progressRoute from "./route/progressRoute.js"
import classroomRouter from "./route/classroomRoute.js"
import http from "http"
import { Server } from "socket.io"
import { initIO } from './socket.js'   // ← add this

dotenv.config()

const port = process.env.PORT
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
  origin: ["http://localhost:5173", "https://your-app.vercel.app"],
  credentials: true
}))

app.use("/uploads", express.static("uploads"))

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/course", courseRouter)
app.use("/api/order", paymentRouter)
app.use("/api/review", reviewRouter)
app.use("/api/quiz", quizRoute)
app.use("/api/progress", progressRoute)
app.use("/api/classroom", classroomRouter)

app.get("/", (req, res) => {
  res.send("Hello from Server")
})

const server = http.createServer(app)

export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://your-app.vercel.app"],
    credentials: true
  }
})

initIO(io)   // ← add this, registers io in socket.js so getIO() works anywhere

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id)

  socket.on("join_room", ({ courseId, channel }) => {
    socket.join(`${courseId}-${channel}`)
  })

  socket.on("new_message", ({ courseId, channel, message }) => {
    socket.to(`${courseId}-${channel}`).emit("receive_message", message)
  })

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id)
  })
})

server.listen(port, () => {
  console.log(`Server Started on port ${port}`)
  connectDb()
})