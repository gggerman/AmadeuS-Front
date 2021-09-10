import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ProductDetail from "../productdetail/ProductDetail";
import Home from "../home/Home";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../theme";
import { AddCategory } from "../addategory/AddCategory";
import AdminPanel from "../adminpanel/AdminPanel";
import AddProduct from "../addproduct/AddProduct";
import Order from "../order/Order";
import '../../App.css'
import AddUser from "../adduser/AddUser";


const AppRouter = () => {


  return (
    <>
      <div className='app'>
        <ThemeProvider theme={theme}>

          <Switch>
            {/* El catalogo se tiene que visualizar en la ruta /products
            Hay que poner otro home de inicio que no sea el catalogo */}
            <Route exact path="/products" component={Home} />
            <Route path="/detail/:id" component={ProductDetail} />
            <Route path="/adminpanel" component={AdminPanel} />
            <Route path="/addcategory" component={AddCategory} />
            <Route path="/addproduct" component={AddProduct} />


            <Route path="/order/:id" component = {Order} />

            <Route path="/editproduct/:id" component={AddProduct} />
            <Route path="/adduser" component={AddUser} />

            <Redirect to="/products" />

          </Switch>
        </ThemeProvider>
      </div>
    </>
  );
};

export default AppRouter;
