import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Divider,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import { Link } from "react-router-dom";
import {numberWithCommas} from '../../utils';
import addToCart from "../../redux/actions/addToCart";
import { useDispatch } from "react-redux";
import { UserContext } from "../shoppingcart/UserContext";
import { useSelector } from "react-redux";
import { linkUserCart } from "../../redux/actions/linkUserCart";
import { useAuth0 } from "@auth0/auth0-react";


const useStyles = makeStyles((theme) => ({
  root: {
    width: 270, // Para que las cards tengan el mismo ancho sin importar el tamaño de la imagen
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",

    "&:hover": {
      boxShadow: "0 10px 40px 0px rgba(0,117,49,0.3)",
    },
    // marginRight: "2vh",
    // marginBottom:"2vh"
    margin: "3vh",
  },
  media: {
    width: "100%",
    paddingTop: "95%", // 16:9
    margin: "0vh",
    backgroundSize: "contain",
  },

  price: {
    color: theme.palette.primary.dark,
    fontSize: "24px",
  },
  icon: {
    color: "grey",
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
  text: {
    textDecoration: "none",
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    width: "16vh",
    fontSize: "1.8vh",
  },
  link: {
    color: theme.palette.primary.dark,
    textDecoration: 'none',
    "&:focus": {
      color: theme.palette.primary.light
    }

  }
}));

export default function ProductCard(product) {
  const { id, name, price, image, stock } = product;
  //recibe de Products las props
  // const { user, isAuthenticated } = useAuth0();
  // const cartState = useSelector(({ cart }) => cart);
  const classes = useStyles();
  const {shoppingCart, setShoppingCart} = useContext( UserContext )
  const {cartQuantity} = shoppingCart
  const dispatch = useDispatch()

  const agregar = (e) => {
    setShoppingCart( value => ({
      ...value,
      cartQuantity: cartQuantity + 1,
    }))
    dispatch( addToCart (id))   
    
  }

  // const alStorage = JSON.stringify(cartState)

  // if( !isAuthenticated){
  //   useEffect(() => {
  //     window.localStorage.setItem('cartItems', alStorage )
  //   }, [cartState])
  // } else {
    
  //   const { cart } = JSON.parse(alStorage)
  //   const userCart = {
  //         user,
  //         cart
  //       }
  //     dispatch( linkUserCart( userCart ) )
  // }
// //******************************************************************** */
//   useEffect(() => {
//     console.log(isAuthenticated)
//     if( !isAuthenticated){
//       window.localStorage.setItem('cartItems', alStorage )
//     } else {
    
//     const { cart } = JSON.parse(alStorage)
//     const userCart = {
//           user,
//           cart
//         }
//       dispatch( linkUserCart( userCart ) )
//     }
// }, [cartState])
//********************************************************************************* */

  useEffect(() => {
    window.localStorage.setItem('cant', JSON.stringify(cartQuantity) ) 
      return () =>{
        window.localStorage.setItem('cant', JSON.stringify(cartQuantity) )
      }
  }, [cartQuantity])


  return (
    <Card className={classes.root}>     

      <Link to={`/detail/${id}`} className ={classes.link}>
        <CardMedia className={classes.media} image={image} />
        <CardContent>
          <Typography component="h1" className={classes.price}>
            $ {numberWithCommas(price)}
          </Typography>
          <Typography variant="body2" component="h3">
            {name}
          </Typography>
          {
            (stock === 0 ? (
              <Typography variant="body2" color="error" component="p">
                Sin stock
              </Typography>
            ) : (
              <></>
            ))
          }
          <Typography variant="body2" color="textSecondary" component="p">
            Entrega en 24hs
          </Typography>
        </CardContent>
        <Divider variant="middle" light />
      </Link>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon className={classes.icon} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon className={classes.icon} />
        </IconButton>
        <Button 
            variant="contained" 
            className={classes.button}
            onClick={ agregar }
            endIcon = {<ShoppingCartIcon />}
            >
           Agregar
        </Button>
      </CardActions>
    </Card>
  );
}
