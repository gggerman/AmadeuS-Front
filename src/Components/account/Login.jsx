import { useAuth0 } from '@auth0/auth0-react'

export default function Login() {
    const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

    console.log(user)
    return (
        <button onClick={loginWithRedirect}>LOGIN</button>
    )
}