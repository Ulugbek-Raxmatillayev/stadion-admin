import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    function checkLogin(): void {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
        } else {
            navigate('/admin/dashboard')
        }
    }

    useEffect(() => {
        checkLogin()
    }, [checkLogin])
    return (
        <div>Home</div>
    )
}

export default Home