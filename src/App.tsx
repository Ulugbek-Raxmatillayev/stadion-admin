import { Route, Routes } from "react-router-dom"
import Login from "./pages/auth/login"
import Dashboard from "./pages/dashboard/dashboard"

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin/dashboard" element={<Dashboard/>}/>
      </Routes>
    </>
  )
}

export default App