import React, { useEffect, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
export const serverUrl = import.meta.env.VITE_SERVER_URL
import { ToastContainer } from "react-toastify"
import getCurrentUser from './customHooks/getCurrentUser'
import { useDispatch, useSelector } from 'react-redux'
import Profile from './pages/Profile'
import ForgetPassword from './pages/ForgetPassword'
import EditProfile from './pages/EditProfile'
import Dashboard from './pages/Educator/Dashboard'
import Courses from './pages/Educator/Courses'
import CreateCourses from './pages/Educator/CreateCourses'
import getCreatorCourse from './customHooks/getCreatorCourse'
import EditCourse from './pages/Educator/EditCourse'
import getPublishedCourse from './customHooks/getPublishedCourse'
import AllCourses from './pages/AllCourses'
import CreateLecture from './pages/Educator/CreateLecture'
import EditLecture from './pages/Educator/EditLecture'
import ViewCourse from './pages/ViewCourse'
import ScrollToTop from './component/ScrollToTop'
import ViewLectures from './pages/ViewLectures'
import MyEnrolledCourses from './pages/MyEnrolledCourses'
import getAllReviews from './customHooks/getAllReviews'
import SearchWithAi from './pages/SearchWithAi'
import QuizPage from "./pages/QuizPage"
import { setCourseData, setCreatorCourseData } from './redux/courseSlice'
import { io } from "socket.io-client"

export const socket = io(serverUrl, { withCredentials: true })

function App() {
  getCurrentUser()
  getCreatorCourse()
  getPublishedCourse()
  getAllReviews()

  const dispatch = useDispatch()
  const { userData, loading } = useSelector(state => state.user)
  const { courseData, creatorCourseData } = useSelector(state => state.course)

  // Use refs so socket handlers always read the latest state
  // without needing to re-register listeners on every render
  const courseDataRef = useRef(courseData)
  const creatorCourseDataRef = useRef(creatorCourseData)
  const userDataRef = useRef(userData)

  // Keep refs in sync with latest Redux state on every render
  useEffect(() => { courseDataRef.current = courseData }, [courseData])
  useEffect(() => { creatorCourseDataRef.current = creatorCourseData }, [creatorCourseData])
  useEffect(() => { userDataRef.current = userData }, [userData])

  // Register socket listeners ONCE on mount, use refs inside handlers
  useEffect(() => {

    // ── STUDENT SIDE ──────────────────────────────────────────────────────

    socket.on("course_published", (course) => {
      const current = Array.isArray(courseDataRef.current) ? courseDataRef.current : []
      if (current.some(c => c._id === course._id)) return
      dispatch(setCourseData([...current, course]))
    })

    socket.on("course_updated", (updatedCourse) => {
      const current = Array.isArray(courseDataRef.current) ? courseDataRef.current : []
      dispatch(setCourseData(
        current.map(c => c._id === updatedCourse._id ? updatedCourse : c)
      ))
    })

    socket.on("course_removed", (courseId) => {
      const current = Array.isArray(courseDataRef.current) ? courseDataRef.current : []
      dispatch(setCourseData(
        current.filter(c => c._id !== courseId)
      ))
    })

    socket.on("lecture_added", ({ courseId, course }) => {
      const current = Array.isArray(courseDataRef.current) ? courseDataRef.current : []
      dispatch(setCourseData(
        current.map(c => c._id === courseId ? { ...c, lectures: course.lectures } : c)
      ))
    })

    socket.on("lecture_updated", ({ courseId, lecture }) => {
      const current = Array.isArray(courseDataRef.current) ? courseDataRef.current : []
      dispatch(setCourseData(
        current.map(c => {
          if (c._id !== courseId) return c
          return {
            ...c,
            lectures: Array.isArray(c.lectures)
              ? c.lectures.map(l => l._id === lecture._id ? lecture : l)
              : c.lectures
          }
        })
      ))
    })

    socket.on("lecture_removed", ({ courseId, lectureId }) => {
      const current = Array.isArray(courseDataRef.current) ? courseDataRef.current : []
      dispatch(setCourseData(
        current.map(c => {
          if (c._id !== courseId) return c
          return {
            ...c,
            lectures: Array.isArray(c.lectures)
              ? c.lectures.filter(l => l._id !== lectureId)
              : c.lectures
          }
        })
      ))
    })

    // ── EDUCATOR SIDE ─────────────────────────────────────────────────────

    socket.on("student_enrolled", ({ courseId, creatorId, enrolledCount }) => {
      if (userDataRef.current?._id === creatorId) {
        const current = Array.isArray(creatorCourseDataRef.current) ? creatorCourseDataRef.current : []
        dispatch(setCreatorCourseData(
          current.map(c =>
            c._id === courseId
              ? { ...c, enrolledStudents: new Array(enrolledCount).fill(null) }
              : c
          )
        ))
      }
    })

    return () => {
      socket.off("course_published")
      socket.off("course_updated")
      socket.off("course_removed")
      socket.off("lecture_added")
      socket.off("lecture_updated")
      socket.off("lecture_removed")
      socket.off("student_enrolled")
    }
  }, []) // ← empty deps: register once, refs handle fresh state

  if (loading) return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0F172A',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        border: '3px solid rgba(59,130,246,0.2)',
        borderTop: '3px solid #3B82F6',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  return (
    <>
      <ToastContainer />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={userData ? <Profile /> : <Navigate to={"/signup"} />} />
        <Route path='/forget-password'  element={<ForgetPassword />} />
        <Route path='/editprofile' element={userData ? <EditProfile /> : <Navigate to={"/signup"} />} />
        <Route path='/allcourses' element={userData ? <AllCourses /> : <Navigate to={"/signup"} />} />
        <Route path='/dashboard' element={userData?.role === "educator" ? <Dashboard /> : <Navigate to={"/signup"} />} />
        <Route path='/courses' element={userData?.role === "educator" ? <Courses /> : <Navigate to={"/signup"} />} />
        <Route path='/createcourse' element={userData?.role === "educator" ? <CreateCourses /> : <Navigate to={"/signup"} />} />
        <Route path='/editcourse/:courseId' element={userData?.role === "educator" ? <EditCourse /> : <Navigate to={"/signup"} />} />
        <Route path='/createlecture/:courseId' element={userData?.role === "educator" ? <CreateLecture /> : <Navigate to={"/signup"} />} />
        <Route path='/editlecture/:courseId/:lectureId' element={userData?.role === "educator" ? <EditLecture /> : <Navigate to={"/signup"} />} />
        <Route path='/viewcourse/:courseId' element={userData ? <ViewCourse /> : <Navigate to={"/signup"} />} />
        <Route path='/viewlecture/:courseId' element={userData ? <ViewLectures /> : <Navigate to={"/signup"} />} />
        <Route path='/mycourses' element={userData ? <MyEnrolledCourses /> : <Navigate to={"/signup"} />} />
        <Route path='/search' element={userData ? <SearchWithAi /> : <Navigate to={"/signup"} />} />
        <Route path="/quiz/:courseId" element={<QuizPage />} />
      </Routes>
    </>
  )
}

export default App