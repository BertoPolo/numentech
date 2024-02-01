import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import React, { Suspense, lazy } from "react"
import Login from "./components/Login"

const Home = lazy(() => import("./components/Home"))

// import "bootstrap-icons/font/bootstrap-icons.css"

const App = () => (
  <div>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </div>
)

export default App
