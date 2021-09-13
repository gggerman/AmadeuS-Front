import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../home/Home";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../theme";
import { AddCategory } from "../addcategory/AddCategory";
import AddProduct from "../addproduct/AddProduct";
import AdminPanel from "../adminpanel/AdminPanel";
import Order from "../order/Order";
import OrderDetail from "../orderdetail/OrderDetail";
import "../../App.css";
import Stock from "../stock/Stock";
import AddUser from "../adduser/AddUser";
import UserManagement from "../usermanagement/UserManagement";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import OrderCart from '../ordercart/OrderCart';
import Sales from '../sales/Sales';
import "../../App.css";
import ShoppingCart from "../shoppingcart/ShoppingCart";
import { UserContext } from "../shoppingcart/UserContext";
import "../../App.css";
import Detail from "../detail/Detail";

const AppRouter = () => {
  const { user, isAuthenticated } = useAuth0();

  console.log("admin", user);

  const adminAuth = function (component) {
    if (user) {
      return user.email && user.email === "crismaxbar@gmail.com" || user.email === 'heisjuanpablo@gmail.com' || user.email === "leandrobuzeta@gmail.com" || user.email === "juanmhdz99@gmail.com"
        ? component
        : Home;
    } else if (isAuthenticated === false) {
      return Home
    }
  };

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
            <Route path="/detail/:id" component={Detail} />
            <Route path="/stock" component={adminAuth(Stock)} />
            <Route path="/adminpanel" component={adminAuth(AdminPanel)} />
            <Route path="/addcategory" component={adminAuth(AddCategory)} />
            <Route path="/addproduct" component={adminAuth(AddProduct)} />
            <Route path="/editproduct/:id" component={adminAuth(AddProduct)} />
            <Route path='/cart' component={ ShoppingCart } />        
            <Route path="/order/:id" component={withAuthenticationRequired(Order)} />
            <Route path ="/ordercart/:id" component = {OrderCart} />
            <Route path="/orderdetail" component = {OrderDetail} />
            <Route path="/usermanagement" component={adminAuth(UserManagement)} />
            <Route path="/adduser" component={AddUser} />
            <Route path ="/sales" component={Sales} />
            </UserContext.Provider>
            <Redirect to="/" />
          </Switch>
        </ThemeProvider>
      </div>
    </>
  );
};
export default AppRouter;
