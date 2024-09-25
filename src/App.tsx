import { Route, Routes } from "react-router-dom"
import Login from "./pages/auth/login"
import Dashboard from "./pages/dashboard/dashboard"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()
function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin/dashboard" element={<Dashboard/>}/>
      </Routes>
    </QueryClientProvider>
  )
}

export default App