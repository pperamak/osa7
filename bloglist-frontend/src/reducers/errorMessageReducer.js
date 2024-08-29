/* eslint-disable linebreak-style */
import { createSlice } from "@reduxjs/toolkit"

const initialState=null

const errorMessageSlice=createSlice({
  name: "errorMessage",
  initialState,
  reducers:{
    setErrorMessage(state, action){
      return action.payload
    }
  }
})
export const { setErrorMessage } = errorMessageSlice.actions

export default errorMessageSlice.reducer