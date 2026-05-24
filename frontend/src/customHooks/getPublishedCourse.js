// import React from 'react'
// import { useEffect } from 'react'
// import axios from 'axios'
// import { serverUrl } from '../App'
// import { useDispatch } from 'react-redux'
// import { setCourseData } from '../redux/courseSlice'
// const getPublishedCourse = () => {
//  const dispatch = useDispatch()
//     useEffect(()=>{
//        const getCourseData = async () => {
//         try {
//             const result = await axios.get(serverUrl + "/api/course/getpublished" , {withCredentials:true})
//              dispatch(setCourseData(result.data))
//              console.log(result.data)
//         } catch (error) {
//             console.log(error)
//         }
        
//        }
//        getCourseData()
//     },[])

// }

// export default getPublishedCourse

import { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setCourseData } from '../redux/courseSlice'

const getPublishedCourse = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const getCourseData = async () => {
            try {
                const result = await axios.get(
                    serverUrl + "/api/course/getpublished",
                    { withCredentials: true }
                )
                const data = Array.isArray(result.data) ? result.data : []
                dispatch(setCourseData(data))
            } catch (error) {
                console.log(error)
                dispatch(setCourseData([]))
            }
        }

        getCourseData()

        const interval = setInterval(getCourseData, 10000)
        return () => clearInterval(interval)

    }, [])
}

export default getPublishedCourse