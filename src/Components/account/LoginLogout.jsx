import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react';


export default function LoginLogout() {
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
    
    // const [login, setLogin] = useState(isAuthenticated)
    
    // console.log('user', user)
    // console.log('isAuthenticated', isAuthenticated)


    // const loguear = () => {
    //     loginWithRedirect();
    //     setLogin(!login)
    //     console.log('loguear-login', login)
    // }

    // const desloguear = () => {
    //     logout();
    //     setLogin(!login)
    //     console.log('loguear-logout', login)

    // }

    useEffect(() => {
       console.log('user', user) 
    }, [user])

    // return (
    //     <div>
    //         {
    //             login 
    //                 ? <button onClick={desloguear}>LOGOUT</button> 
    //                 : <button onClick={loguear}>LOGIN</button>
    //         }
    //     </div>
    // )

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
