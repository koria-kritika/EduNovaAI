import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name: "course",
    initialState: {
        creatorCourseData: [],
        courseData: [],
        selectedCourse: null
    },
    reducers: {
        setCreatorCourseData: (state, action) => {
            state.creatorCourseData = action.payload
        },
        setCourseData: (state, action) => {
            state.courseData = action.payload
        },
        setSelectedCourse: (state, action) => {
            state.selectedCourse = action.payload
        },

       

        
        addCourse: (state, action) => {
            const course = action.payload
            const exists = state.courseData.some(c => c._id === course._id)
            if (!exists) {
                state.courseData.push(course)
            }
        },

        
        updateCourse: (state, action) => {
            const updated = action.payload
            state.courseData = state.courseData.map(c =>
                c._id === updated._id ? updated : c
            )
            
            if (state.selectedCourse?._id === updated._id) {
                state.selectedCourse = updated
            }
        },

       
        removeCourse: (state, action) => {
            const courseId = action.payload
            state.courseData = state.courseData.filter(c => c._id !== courseId)
            if (state.selectedCourse?._id === courseId) {
                state.selectedCourse = null
            }
        },

        
        addLectureToCourse: (state, action) => {
            const { courseId, course } = action.payload
            state.courseData = state.courseData.map(c =>
                c._id === courseId ? course : c
            )
            if (state.selectedCourse?._id === courseId) {
                state.selectedCourse = course
            }
        },

        
        updateLectureInCourse: (state, action) => {
            const { courseId, lecture } = action.payload
            state.courseData = state.courseData.map(c => {
                if (c._id !== courseId) return c
                return {
                    ...c,
                    lectures: c.lectures.map(l =>
                        l._id === lecture._id ? lecture : l
                    )
                }
            })
            if (state.selectedCourse?._id === courseId) {
                state.selectedCourse = {
                    ...state.selectedCourse,
                    lectures: state.selectedCourse.lectures.map(l =>
                        l._id === lecture._id ? lecture : l
                    )
                }
            }
        },

        
        removeLectureFromCourse: (state, action) => {
            const { courseId, lectureId } = action.payload
            state.courseData = state.courseData.map(c => {
                if (c._id !== courseId) return c
                return {
                    ...c,
                    lectures: c.lectures.filter(l => l._id !== lectureId)
                }
            })
            if (state.selectedCourse?._id === courseId) {
                state.selectedCourse = {
                    ...state.selectedCourse,
                    lectures: state.selectedCourse.lectures.filter(l => l._id !== lectureId)
                }
            }
        },
    }
})

export const {
    setCreatorCourseData,
    setCourseData,
    setSelectedCourse,
    addCourse,
    updateCourse,
    removeCourse,
    addLectureToCourse,
    updateLectureInCourse,
    removeLectureFromCourse,
} = courseSlice.actions

export default courseSlice.reducer
