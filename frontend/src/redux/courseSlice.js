
// import { createSlice } from "@reduxjs/toolkit";

// const courseSlice = createSlice({
//     name: "course",
//     initialState: {
//         creatorCourseData: [],
//         courseData: [],
//         selectedCourse: null
//     },
//     reducers: {
//         setCreatorCourseData: (state, action) => {
//             state.creatorCourseData = action.payload
//         },
//         setCourseData: (state, action) => {
//             state.courseData = action.payload
//         },
//         setSelectedCourse: (state, action) => {
//             state.selectedCourse = action.payload
//         }
//     }
// })

// export const { setCreatorCourseData, setCourseData, setSelectedCourse } = courseSlice.actions
// export default courseSlice.reducer

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

        // ── Socket-driven real-time reducers ──────────────────────────────

        // A new course was published → add it to the list
        addCourse: (state, action) => {
            const course = action.payload
            const exists = state.courseData.some(c => c._id === course._id)
            if (!exists) {
                state.courseData.push(course)
            }
        },

        // A course was updated (title, thumbnail, lectures, etc.)
        updateCourse: (state, action) => {
            const updated = action.payload
            state.courseData = state.courseData.map(c =>
                c._id === updated._id ? updated : c
            )
            // keep selectedCourse in sync
            if (state.selectedCourse?._id === updated._id) {
                state.selectedCourse = updated
            }
        },

        // A course was unpublished or deleted → remove from list
        removeCourse: (state, action) => {
            const courseId = action.payload
            state.courseData = state.courseData.filter(c => c._id !== courseId)
            if (state.selectedCourse?._id === courseId) {
                state.selectedCourse = null
            }
        },

        // A lecture was added to a course
        addLectureToCourse: (state, action) => {
            const { courseId, course } = action.payload
            state.courseData = state.courseData.map(c =>
                c._id === courseId ? course : c
            )
            if (state.selectedCourse?._id === courseId) {
                state.selectedCourse = course
            }
        },

        // A lecture was edited (video url, title, isPreviewFree)
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

        // A lecture was removed from a course
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