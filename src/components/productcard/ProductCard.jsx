import React, { useContext, useEffect } from "react";
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
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import { Link } from "react-router-dom";
import {numberWithCommas} from '../../utils';
import addToCart from "../../redux/actions/addToCart";
import { useDispatch } from "react-redux";
import { UserContext } from "../shoppingcart/UserContext";
import { useSelector } from "react-redux";

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
    fontSize: "1.6vh",
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
  const classes = useStyles();
  const {shoppingCart, setShoppingCart} = useContext( UserContext )
  const {cartQuantity, cartItems} = shoppingCart
  const dispatch = useDispatch()

  
  const agregar = (e) => {
    setShoppingCart( cant => ({
      ...cant,
      cartQuantity: cartQuantity + 1,
    }))
    dispatch( addToCart (id))   
  }
  
  useEffect(() => {
    localStorage.setItem('cartItemsQuantity', JSON.stringify(cartQuantity)) 
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
            >
           Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
