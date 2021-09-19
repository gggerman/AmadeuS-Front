import { useAuth0 } from "@auth0/auth0-react";
import { Button, MenuItem } from "@material-ui/core";

export default function LoginLogout() {
  const { isAuthenticated, loginWithRedirect, loginWithPopup, logout, user } =
    useAuth0();
  // console.log('isAuthenticated', isAuthenticated)
  // console.log("user", user);

  return (
    <div>
      {isAuthenticated ? (
        <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
      ) : (
        <MenuItem onClick={loginWithPopup}>Acceder</MenuItem>
      )}
    </div>
  );
}
