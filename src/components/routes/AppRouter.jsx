import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ProductDetail from "../productdetail/ProductDetail";
import Home from "../home/Home";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../theme";
import { AddCategory } from "../addcategory/AddCategory";
import AdminPanel from "../adminpanel/AdminPanel";
import AddProduct from "../addproduct/AddProduct";
import ShoppingCart from "../shoppingcart/ShoppingCart";
import { UserContext } from "../shoppingcart/UserContext";
import Order from "../order/Order";
import '../../App.css'
import AddUser from "../adduser/AddUser";
 

const AppRouter = () => {

// const [quantityCart, setQuantityCart] = useState(0)
const initialState = {
  cartQuantity: 0,
  cartItems: []
}

const [shoppingCart, setShoppingCart] = useState(initialState)


  return (
    <>
      <div className='app'>
        <ThemeProvider theme={theme}>

          <Switch>
          {/* <UserContext.Provider value={{quantityCart, setQuantityCart}}> */}
          <UserContext.Provider value={{shoppingCart, setShoppingCart}}>
            {/* El catalogo se tiene que visualizar en la ruta /products
            Hay que poner otro home de inicio que no sea el catalogo */}
            <Route exact path="/" component={Home} />
            <Route path="/detail/:id" component={ProductDetail} />
            <Route path="/adminpanel" component={AdminPanel} />
            <Route path="/addcategory" component={AddCategory} />
            <Route path="/addproduct" component={AddProduct} />
            <Route path='/cart' component={ ShoppingCart } />
            


            <Route path="/order/:id" component = {Order} />

            <Route path="/editproduct/:id" component={AddProduct} />
            <Route path="/adduser" component={AddUser} />

            <Redirect to="/products" />
            </UserContext.Provider>
          </Switch>
        </ThemeProvider>
      </div>
    </>
  );
};

export default AppRouter;
