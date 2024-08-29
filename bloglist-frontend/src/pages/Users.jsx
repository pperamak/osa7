import { useSelector, useDispatch, } from "react-redux"
import { useEffect } from "react"
import { intializeAllUsers } from "../reducers/allUsersReducer"
import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"

const Users= () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(intializeAllUsers())
  }, [dispatch])
  const users = useSelector(state => state.allUsers)
  const sortedUsers = [...users].sort(
    (a, b) => b["blogs"].length - a["blogs"].length
  )
  return (
    <div>
      <h2>Users and Blog Counts</h2>
      <Table striped>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td>
                {user["blogs"].length} blogs
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}


export default Users