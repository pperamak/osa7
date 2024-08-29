import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/users"

const allUsersSlice=createSlice({
  name: "allUsers",
  initialState: [],
  reducers:{
    setAllUsers(state, action){
      return action.payload
    }
    /*clearUser(state){
      return null
    }*/
  }
})

export const { setAllUsers } =allUsersSlice.actions

export const intializeAllUsers = () => {
  return async dispatch => {
    const blogs = await userService.getAll()
    dispatch(setAllUsers(blogs))
  }
}

export default allUsersSlice.reducer

