import { useAuth0 } from '@auth0/auth0-react'

export default function LoginLogout() {
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
    // console.log('isAuthenticated', isAuthenticated)
    // console.log('user', user)
   
    return (
        <div>
            {
                isAuthenticated
                    ? <button onClick={() => logout()}>LOGOUT</button>
                    : <button onClick={() => loginWithRedirect()}>LOGIN</button>
            }
        </div>
    )
}
