/* eslint-disable linebreak-style */
import { createSlice } from "@reduxjs/toolkit"

const initialState=null

const redMsgSlice=createSlice({
  name: "redMsg",
  initialState,
  reducers:{
    setRedMsg(state, action){
      return action.payload
    }
  }
})
export const { setRedMsg } = redMsgSlice.actions

export default redMsgSlice.reducer