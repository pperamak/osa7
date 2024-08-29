import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { likeBlog, addComment } from "../reducers/blogReducer"
import { Form, Button } from "react-bootstrap"

const Blog = () => {
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(b => b.id === id)


  const [comment, setComment] = useState("")
  const dispatch=useDispatch()

  const updateLikes = (event) => {
    event.preventDefault()
    const uBlog = {
      ...blog,
      likes: blog.likes + 1,

    }
    dispatch(likeBlog(uBlog))
  }

  const updateComments = (event) => {
    event.preventDefault()
    dispatch(addComment(blog.id, comment))
    setComment("")
  }

  if (!blog) {
    return null
  }
  return(
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <Button variant="primary" onClick={updateLikes} style={{ marginLeft: "10px" }}>
          Like
        </Button>
      </div>
      <div>added by {blog.user["name"]}</div>
      <div>
        <h3>comments</h3>
        <Form onSubmit={updateComments}>
          <Form.Group controlId="comment">
            <Form.Control
              type="text"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
              placeholder="Add a comment"
            />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ marginTop: "10px" }}>
            Add Comment
          </Button>
        </Form>
        <ul>
          {blog.comments.map((comment) => (<li key={comment}>{comment}</li> ))}
        </ul>
      </div>

    </div>
  )
}
export default Blog