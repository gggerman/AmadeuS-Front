import { useAuth0 } from '@auth0/auth0-react'

export default function Logout() {
    const { logout, isAuthenticated, user } = useAuth0();

    return (
        <button onClick={logout}>LOGOUT</button>
    )
}