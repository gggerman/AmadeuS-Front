import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ProductDetail from "../productdetail/ProductDetail";
import Home from "../home/Home";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../theme";
import { AddCategory } from "../addcategory/AddCategory";
import AdminPanel from "../adminpanel/AdminPanel";
import AddProduct from "../addproduct/AddProduct";
import "../../App.css";
import Stock from "../stock/Stock";
import AddUser from "../adduser/AddUser";
import LoginLogout from "../account/LoginLogout";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Order from "../order/Order";
import "../../App.css";
import ShoppingCart from "../shoppingcart/ShoppingCart";
import { UserContext } from "../shoppingcart/UserContext";
import "../../App.css";

const AppRouter = () => {
  const { user } = useAuth0();

  console.log("admin", user);

  const adminAuth = function (component) {
    if (user) {
      return user.email && user.email === "juanmhdz99@gmail.com"
        ? component
        : Home;
    }
  };
  // const [quantityCart, setQuantityCart] = useState(0)
  const initialState = {
    cartQuantity: 0,
    cartItems: [],
  };

  const [shoppingCart, setShoppingCart] = useState(initialState);

  return (
    <>
      <div className="app">
        <ThemeProvider theme={theme}>
          <Switch>
            {/* <UserContext.Provider value={{quantityCart, setQuantityCart}}> */}
            <UserContext.Provider value={{ shoppingCart, setShoppingCart }}>
              {/* El catalogo se tiene que visualizar en la ruta /products
            Hay que poner otro home de inicio que no sea el catalogo */}
              <Route exact path="/" component={Home} />
              <Route path="/detail/:id" component={ProductDetail} />
              <Route path="/stock" component={adminAuth(Stock)} />
              <Route path="/adminpanel" component={adminAuth(AdminPanel)} />
              <Route path="/addcategory" component={adminAuth(AddCategory)} />
              <Route path="/addproduct" component={adminAuth(AddProduct)} />
              <Route
                path="/editproduct/:id"
                component={adminAuth(AddProduct)}
              />
              <Route path="/cart" component={ShoppingCart} />
              <Route path="/order/:id" component={Order} />
              <Route path="/adduser" component={AddUser} />
              <Route path="/login" component={LoginLogout} />
              <Route path="/order/:id" component={Order} />
              <Redirect to="/" />
            </UserContext.Provider>
          </Switch>
        </ThemeProvider>
      </div>
    </>
  );
};

export default AppRouter;
