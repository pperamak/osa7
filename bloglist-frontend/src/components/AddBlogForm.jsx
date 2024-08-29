import { useState } from "react"
import PropTypes from "prop-types"
import { Button, Form } from "react-bootstrap"

const AddBlogForm = ({ handleNewBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [newBlogVisible, setNewBlogVisible] = useState(false)
  const hideWhenVisible = { display: newBlogVisible ? "none" : "" }
  const showWhenVisible = { display: newBlogVisible ? "" : "none" }

  const addBlog = (event) => {
    event.preventDefault()
    handleNewBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle("")
    setAuthor("")
    setUrl("")
    setNewBlogVisible(false)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="primary" onClick={() => setNewBlogVisible(true)} style={{ marginLeft: "10px" }}>
          Add new blog
        </Button>
      </div>
      <div style={showWhenVisible}>
        <h2>create new</h2>
        <Form onSubmit={addBlog}>
          <Form.Group >
            <Form.Label>Title</Form.Label>
            <Form.Control
              data-testid="title"
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
              id="title-input"
              placeholder="Enter blog title"
            />
          </Form.Group>
          <Form.Group >
            <Form.Label>Author</Form.Label>
            <Form.Control
              data-testid="author"
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
              id="author-input"
              placeholder="Enter author name"
            />
          </Form.Group>
          <Form.Group >
            <Form.Label>URL</Form.Label>
            <Form.Control
              data-testid="url"
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
              id="url-input"
              placeholder="Enter blog URL"
            />
          </Form.Group>
          <Button variant="success" type="submit" id="submit-button" style={{ marginRight: "10px" }}>
            Create
          </Button>
          <Button variant="secondary" onClick={() => setNewBlogVisible(false)}>
            Cancel
          </Button>
        </Form>

      </div>
    </div>
  )
}
AddBlogForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
}
export default AddBlogForm

/*<form onSubmit={addBlog}>
          <div>
            title
            <input
              data-testid="title"
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
              id="title-input"
            />
          </div>
          <div>
            author
            <input
              data-testid="author"
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
              id="author-input"
            />
          </div>
          <div>
            url
            <input
              data-testid="url"
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
              id="url-input"
            />
          </div>
          <button type="submit" id="submit-button">
            create
          </button>
        </form>
        <button onClick={() => setNewBlogVisible(false)}>cancel</button>
        */