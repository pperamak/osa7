/* eslint-disable linebreak-style */
import { configureStore } from "@reduxjs/toolkit"
import errorMessageReducer from "./errorMessageReducer"
import redMsgReducer from "./redMsgReducer"
import blogReducer from "./blogReducer"
import userReducer from "./userReducer"
import allUsersReducer from "./allUsersReducer"


const store = configureStore({
  reducer:{
    errorMessage: errorMessageReducer,
    redMsg: redMsgReducer,
    blogs: blogReducer,
    user: userReducer,
    allUsers: allUsersReducer
  }

})

export default store