import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { Table } from "react-bootstrap"
const User=() => {
  const id = useParams().id
  const users=useSelector(state => state.allUsers)
  const user = users.find(u => u.id === id)
  if (!user) {
    return null
  }
  return(
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <Table striped>
        <tbody>
          {user.blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                {blog.title}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default User