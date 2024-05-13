import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
// import "bootstrap-icons/font/bootstrap-icons.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import React, { Suspense, lazy } from "react"
import Login from "./components/Login"

const Home = lazy(() => import("./components/Home"))
const NotFound = lazy(() => import("./components/NotFound"))
const Register = lazy(() => import("./components/Register"))

const App = () => (
  <div>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </div>
)

export default App
