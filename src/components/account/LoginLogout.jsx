import { useAuth0 } from "@auth0/auth0-react";
import { MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import cleanCart from "../../redux/actions/cleanCart";
import { linkUserCart } from "../../redux/actions/linkUserCart";
import { cleanUser } from "../../redux/actions/users";

export default function LoginLogout() {
  const { isAuthenticated, loginWithRedirect, loginWithPopup, logout, user } =
    useAuth0();
  const userDB = useSelector((state) => state.app.user);
  const shoppingCart = useSelector(state => state.cart.cart)
  const dispatch = useDispatch();
  
  const handleChangeLogout = () => {
    logout();
    const userCartToDb = {
      user: userDB,
      cart: shoppingCart
    }
    dispatch( linkUserCart( userCartToDb ))
    dispatch(cleanUser());
    dispatch( cleanCart() )
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
