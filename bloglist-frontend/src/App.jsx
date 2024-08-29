import { useState, useEffect } from "react"
import Notification from "./components/Notification"
import { useDispatch } from "react-redux"
import { setErrorMessage } from "./reducers/errorMessageReducer"
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from "./reducers/blogReducer"
import { useSelector } from "react-redux"
import { setUser, clearUser, loginUser, uSetToken } from "./reducers/userReducer"
import{
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"
import Home from "./pages/Home"
import Users from "./pages/Users"
import User from "./pages/User"
import Blog from "./pages/Blog"
import { Button, Form, Navbar, Nav } from "react-bootstrap"


const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])


  const user=useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
    setUsername("")
    setPassword("")
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBloglistUser")
    dispatch(clearUser())
    dispatch(setErrorMessage("logged out"))
    setTimeout(() => {
      dispatch(setErrorMessage(null))
    }, 5000)
  }




  const padding = {
    padding: 5
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification/>
        <Form onSubmit={handleLogin} data-testid="loginform">
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              data-testid="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              placeholder="Enter username"
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              data-testid="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              placeholder="Enter password"
            />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ marginTop: "10px" }}>
          Login
          </Button>
        </Form>
      </div>
    )
  }

  return (
    <Router>
      <div className="container">
        <div>
          <h1>blog app</h1>
          <Notification/>
          <p>
            {user.name} logged in
            <Button variant="primary" onClick={handleLogout}>logout</Button>
          </p>
          <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#" as="span">
                    <Link style={padding} to="/">home</Link>
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    <Link style={padding} to="/users">users</Link>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
          <Routes>
            <Route path="/users/:id" element={<User/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/blogs/:id" element={<Blog/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
