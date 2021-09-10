import { useAuth0 } from '@auth0/auth0-react'

export default function Logout() {
    const { logout, isAuthenticated, user } = useAuth0();
    console.log('isAuthenticated-Logout', isAuthenticated)
    console.log(user)

    return (
        <button onClick={logout}>LOGOUT</button>
    )
}