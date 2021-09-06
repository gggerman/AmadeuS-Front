import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ProductDetail from "../productdetail/ProductDetail";
import Home from "../home/Home";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../theme";
import { AddCategory } from "../addcategory/AddCategory";
import AdminPanel from "../adminpanel/AdminPanel";
import AddProduct from "../addproduct/AddProduct";
 

const AppRouter = () => {
  return (
    <>
      <div>
        <ThemeProvider theme={theme}>
        
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/detail/:id" component={ProductDetail} />

            <Route path="/adminpanel" component={AdminPanel} />
            <Route path="/addcategory" component={AddCategory} />            
            <Route path="/addproduct" component={AddProduct} />
            

            <Redirect to="/" />

          </Switch>
        </ThemeProvider>
      </div>
    </>
  );
};

export default AppRouter;
