import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ProductDetail from "../productdetail/ProductDetail";
import Home from "../home/Home";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../theme";
import { AddCategory } from "../addcategory/AddCategory";
import AddProduct from "../addproduct/AddProduct";
import AdminPanel from "../adminpanel/AdminPanel";
import Order from "../order/Order";
import OrderDetail from './../../orderdetail/OrderDetail';
import AddUser from "../adduser/AddUser";
import LoginLogout from "../account/LoginLogout";
import { withAuthenticationRequired } from '@auth0/auth0-react'
const AppRouter = () => {

  return (
    <>
      <div className='app'>
        <ThemeProvider theme={theme}>

          <Switch>
            {/* El catalogo se tiene que visualizar en la ruta /products
            Hay que poner otro home de inicio que no sea el catalogo */}
            <Route exact path="/" component={Home} /> {/* Si se cambia a /products hay problemas con la autenticación */}
            <Route path="/detail/:id" component={ProductDetail} />
            <Route path="/adminpanel" component={AdminPanel} />
            <Route path="/addcategory" component={AddCategory} />
            <Route path="/addproduct" component={AddProduct} />
            <Route path="/order/:id" component = {Order} />
            <Route path="/orderdetail" component = {OrderDetail} />
      

            <Redirect to="/products" />
            <Route path="/editproduct/:id" component={AddProduct} />
            <Route path="/adduser" component={AddUser} />
            <Route path="/login" component={LoginLogout} />
            <Redirect to="/" /> {/* Si se cambia a /products hay problemas con la autenticación */}

          </Switch>
        </ThemeProvider>
      </div>
    </>
  );
};

export default AppRouter;
