import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
// import "bootstrap-icons/font/bootstrap-icons.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import React, { Suspense, lazy } from "react"
import Login from "./components/Login"
import { AuthProvider } from "./tools/authContext"

const Home = lazy(() => import("./components/Home"))
const NotFound = lazy(() => import("./components/NotFound"))
const Register = lazy(() => import("./components/Register"))

const ProtectedRoute = ({ element: Component }) => {
  const isAuthenticated = !!localStorage.getItem("accessToken")
  return isAuthenticated ? <Component /> : <Navigate to="/" />
}
const App = () => (
  <div>
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/home" element={<ProtectedRoute element={Home} />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  </div>
)

export default App
