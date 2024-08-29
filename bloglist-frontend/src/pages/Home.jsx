import  { useDispatch, useSelector } from "react-redux"
import { createBlog, likeBlog, deleteBlog } from "../reducers/blogReducer"
import { uSetToken } from "../reducers/userReducer"
import { setErrorMessage } from "../reducers/errorMessageReducer"
import { setRedMsg } from "../reducers/redMsgReducer"
import AddBlogForm from "../components/AddBlogForm"
import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"
const Home= () => {
  const dispatch=useDispatch()
  const blogs=useSelector(state => state.blogs)
  const user=useSelector(state => state.user)

  const handleNewBlog = async (newBlog) => {
    try {
      dispatch(uSetToken())
      const nblog= await dispatch(createBlog(newBlog))
      dispatch(setErrorMessage(`a new blog ${nblog.title} by ${nblog.author} added`))
      setTimeout(() => {
        dispatch(setErrorMessage(null))
      }, 5000)
    } catch (exception) {
      dispatch(setRedMsg("Add all necessary information"))
      setTimeout(() => {
        dispatch(setRedMsg(null))
      }, 5000)
    }
  }

  return(
    <div>
      <div>
        <AddBlogForm handleNewBlog={handleNewBlog} />
      </div>
      <Table striped>
        <tbody>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title} {blog.author}
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Home