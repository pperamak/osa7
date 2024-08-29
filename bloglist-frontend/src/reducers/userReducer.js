import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import loginService from "../services/login"
import { setErrorMessage } from "./errorMessageReducer"
import { setRedMsg } from "./redMsgReducer"

const initialState=null

const userSlice=createSlice({
  name: "user",
  initialState,
  reducers:{
    setUser(state, action){
      return action.payload
    },
    clearUser(state){
      return null
    }
  }
})
export const { setUser, clearUser } = userSlice.actions

export const uSetToken = () => {
  return async (dispatch, getState) => {
    // Retrieve the current state of the user slice
    const user = getState().user

    // If the user is logged in, set the token in the blogService
    if (user && user.token) {
      blogService.setToken(user.token)
    }
  }
}

// Thunk action creator for logging in a user
export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setErrorMessage(`${user.username} logged in successfully!`))

      // Clear the success message after 5 seconds
      setTimeout(() => {
        dispatch(setErrorMessage(null))
      }, 5000)
    } catch (exception) {
      dispatch(setRedMsg("Wrong username or password"))

      // Clear the error message after 5 seconds
      setTimeout(() => {
        dispatch(setRedMsg(null))
      }, 5000)
    }
  }
}

export default userSlice.reducer