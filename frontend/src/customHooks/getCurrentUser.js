// import axios from 'axios'
// import React, { useEffect } from 'react'
// import { serverUrl } from '../App'
// import { useDispatch } from 'react-redux'
// import { setUserData } from '../redux/userSlice'

// const getCurrentUser = () => {
//     const dispatch = useDispatch()
//   useEffect(()=>{
//    const fetchUser = async () => {
//     try {
//         const result = await axios.get(serverUrl + "/api/user/getcurrentuser" , {withCredentials:true})
//         dispatch(setUserData(result.data))
//     } catch (error) {
//         console.log(error)
//         dispatch(setUserData(null))
//     }
//    }
//    fetchUser()
//   },[])
// }

// export default getCurrentUser
import { useEffect } from "react"
import axios from "axios"
import { serverUrl } from "../App"
import { useDispatch } from "react-redux"
import { setUserData, setUserLoading } from "../redux/userSlice"

const getCurrentUser = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get(serverUrl + "/api/user/getcurrentuser", { withCredentials: true })
                dispatch(setUserData(result.data))
            } catch (error) {
                dispatch(setUserLoading(false))  // ← not logged in, stop loading
                console.log(error)
            }
        }
        fetchUser()
    }, [])
}

export default getCurrentUser
