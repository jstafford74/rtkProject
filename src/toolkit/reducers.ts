
import { createSlice } from "@reduxjs/toolkit"
import {} from '../api/post'
const initialState = { 
    posts:[]
    
}

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers:{
        submitPost: () => {
            
        }
    }
})