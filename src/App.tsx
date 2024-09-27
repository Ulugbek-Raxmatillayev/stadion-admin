import { Route, Routes, useNavigate } from "react-router-dom"
import Login from "./pages/auth/login"
import Dashboard from "./pages/dashboard/dashboard"
import { QueryClient, QueryClientProvider } from "react-query"
import Home from "./pages/home"
import Master from "./pages/master/master"

const queryClient = new QueryClient()
function App(): JSX.Element {
  
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin/dashboard" element={<Dashboard/>}/>
        <Route path="/admin/masters" element={<Master/>}/>
      </Routes>
    </QueryClientProvider>
  )
}

export default App