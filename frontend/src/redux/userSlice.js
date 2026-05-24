// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//     name:"user",
//     initialState:{
//         userData:null
//     },
//     reducers:{
//         setUserData:(state,action)=>{
//             state.userData = action.payload
//         }
//     }
// })
 
// export const {setUserData} = userSlice.actions
// export default userSlice.reducer

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        loading: true  // ← add this
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
            state.loading = false  // ← done loading
        },
        setUserLoading: (state, action) => {
            state.loading = action.payload  // ← control loading
        }
    }
})

export const { setUserData, setUserLoading } = userSlice.actions
export default userSlice.reducer