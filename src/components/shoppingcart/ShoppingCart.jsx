import React, { useContext, useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import ShoppingCartItem from "./ShoppingCartItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Box, Button, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import cleanCart from "../../redux/actions/cleanCart";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { numberWithCommas } from "../../utils";
import axios from "axios";
import addOrder from "./../../redux/actions/addOrder";
import logo from "./logo.jpg";
const { REACT_APP_SERVER } = process.env;

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      alignItems: "center",
    },
    icon: {
      width: "8vh",
      backgroundSize: "contain",
      margin: "auto",
      offset: theme.mixins.toolbar,
    },
  }));



const ShoppingCart = () => {

const classes = useStyles()
const shoppingCartProducts = useSelector(state => state.cart.cart)
const {shoppingCart, setShoppingCart} = useContext( UserContext )
const {cartQuantity, cartItems} = shoppingCart
const dispatch = useDispatch()
const [idOrder, setIdOrder] = useState()

const handleDeleteAll = () => {
    dispatch(cleanCart());
    setShoppingCart((cant) => ({
      ...cant,
      cartQuantity: 0,
    }));
    localStorage.setItem("cartItemsQuantity", JSON.stringify(cartQuantity));
    localStorage.setItem("cartItem", JSON.stringify([]));
  };

useEffect(() => {
    axios
      .post(`${REACT_APP_SERVER}/orders`, {
        products: shoppingCartProducts.map((item) => item.name),
      })
      .then((response) => setIdOrder(response.data)) //guardamos el id de la orden en redux
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {            
    dispatch(addOrder(idOrder))
  },[idOrder])

useEffect(() => {
    JSON.parse(localStorage.getItem('cartItemsQuantity'))
}, [cartQuantity])

    return (
        <div> 
            <CssBaseline />
                <AppBar
                    style={{
                    backgroundColor: "rgb(0, 23, 20)",
                    height: "10%",
                    position: "sticky",
                    }}
                >
                    <Link to="/" style={{ margin: "auto" }}>
                    <img src={logo} className={classes.icon} />
                    </Link>
                </AppBar>
                <Container
                    maxWidth="xl"
                    style={{
                    backgroundColor: "#EEEBEB",
                    height: "150vh",
                    border: "1px solid #E7E4E4",
                    }}
                >
                <div className={classes.root}>
                    <Box flexGrow={1} marginLeft={5}>
                        <Typography variant="h2">carrito</Typography>
                    </Box>
                    <Box>
                        <Button
                        variant="contained"
                        color="primary"
                        endIcon={<DeleteForeverRoundedIcon />}
                        onClick={handleDeleteAll}
                        >
                        vaciar Carrito
                        </Button>
                    </Box>
                </div>
                    {shoppingCartProducts?.map((elem) => (
                    <ShoppingCartItem key={elem._id} {...elem} />
                    ))}          
                      
                    <Divider />
                    <Box>
                        <Typography variant='h4'>
                        Total de la compra: 
                        {
                        shoppingCartProducts.reduce((acc, item) => {
                            return (
                             acc += item.price * item.quantity
                            )
                        }, 0
                        )}
                        </Typography>
                        
                    </Box>

                    <Divider />

                    <Button
                        variant="contained"
                        color="primary"
                        disabled={shoppingCartProducts.length === 0}
                        component={Link} to={`/ordercart/${idOrder}`}
                    >
                        Comprar
                    </Button>
                    
                </Container>           
         </div>
  );
};

export default ShoppingCart;
