import { Alert } from "react-bootstrap"
import { useSelector } from "react-redux"
const Notification = () => {
  const errorStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  const redErrorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const message=useSelector(state => state.errorMessage)
  const redMsg=useSelector(state => state.redMsg)

  if (redMsg === null && message !== null) {
    return <div className="container"><Alert variant="success">{message}</Alert></div>
  } else if (redMsg !== null && message === null) {
    return <div className="container"><Alert variant="danger">{redMsg}</Alert></div>
  } else if (redMsg === null && message === null) {
    return null
  }
}

export default Notification
