import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ProductDetail from "../productdetail/ProductDetail";
import Home from "../home/Home";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../theme";
import AddProduct from "../AddProduct/AddProduct";

const AppRouter = () => {
  return (
    <>
      <div>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path="/products" component={Home} />
            <Route path="/detail/:id" component={ProductDetail} />
            <Route path="/addProduct" component={AddProduct} />
            <Redirect to="/products" />
          </Switch>
        </ThemeProvider>
      </div>
    </>
  );
};

export default AppRouter;
