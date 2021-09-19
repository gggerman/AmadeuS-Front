import { useAuth0 } from "@auth0/auth0-react";
import { Button, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { cleanUser } from "../../redux/actions/users";

export default function LoginLogout() {
  const { isAuthenticated, loginWithRedirect, loginWithPopup, logout, user } =
    useAuth0();
  const userDB = useSelector((state) => state.app.user);
  const dispatch = useDispatch();

  // console.log('isAuthenticated', isAuthenticated)
  // console.log("user", user);

  const handleChangeLogout = () => {
    logout();
    dispatch(cleanUser());
  };

  return (
    <div>
      {isAuthenticated && userDB ? (
        <MenuItem onClick={handleChangeLogout}>Cerrar sesión</MenuItem>
      ) : (
        <MenuItem onClick={loginWithRedirect}>Acceder</MenuItem>
      )}
    </div>
  );
}
