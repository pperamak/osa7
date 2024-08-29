import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogSlice=createSlice({
  name: "blogs",
  initialState: [],
  reducers:{
    setBlogs(state, action){
      return action.payload
    },
    appendBlog(state, action){
      state.push(action.payload)
    },
    updateBlog(state, action){
      const id=action.payload.id
      const changedBlog=action.payload
      return state.map(blog =>
        blog.id !== id ? blog :changedBlog
      )
    },
    removeBlog(state, action){
      const id=action.payload.id
      return state.filter((blog) => blog.id !== id)
    },
    addCommentToBlog(state, action) {
      const { id, comment } = action.payload
      const blog = state.find(blog => blog.id === id)
      if (blog) {
        blog.comments = blog.comments.concat(comment)
      }
    }
  }
})

export const { setBlogs, appendBlog, updateBlog, removeBlog, addCommentToBlog }=blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
    return newBlog
  }
}

export const likeBlog= blog => {
  return async dispatch => {
    const changedBlog = { ...blog }
    const changed = await blogService.update(changedBlog)
    dispatch(updateBlog(changed))
  }
}

export const addComment= ( id, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.addComment(id, comment)
    dispatch(addCommentToBlog({ id, comment }))
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    try {
      await blogService.remove(blog) // No need to return the response here
      dispatch(removeBlog(blog))
    } catch (error) {
      console.error("Failed to delete the blog:", error)
    }
  }
}

export default blogSlice.reducer
