import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token")  // check for JWT

  if (!token) {
    return <Navigate to="/" replace />    // redirect if no token
  }

  return children                               // render page if token exists
}

export default ProtectedRoute
