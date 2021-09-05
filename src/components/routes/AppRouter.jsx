import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ProductDetail from "../productdetail/ProductDetail";
import Home from "../home/Home";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../theme";
import { AddCategory } from "../addCategory/AddCategory";
import AddProduct  from "../addProduct/AddProduct.jsx";
import AdminPanel from "../adminPanel/AdminPanel";
import Nav from "../nav/Nav";

const AppRouter = () => {
  return (
    <>
      <div>
        <ThemeProvider theme={theme}>
        <Route path="/" component={Nav} />
          <Switch>
            <Route exact path="/products" component={Home} />
            <Route path="/detail/:id" component={ProductDetail} />

            <Route path="/adminpanel/addCategory" component={AddCategory} />            

            <Route path="/adminpanel/addproduct" component={AddProduct} />
            <Route path="/adminpanel" component={AdminPanel} />

            <Redirect to="/products" />

          </Switch>
        </ThemeProvider>
      </div>
    </>
  );
};

export default AppRouter;
