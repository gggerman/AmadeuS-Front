import React, {useContext, useEffect, useState} from "react";
import { Typography, Divider } from "@material-ui/core";
import { CardMedia, Box, Grid, Button, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Paper } from "@material-ui/core";
import { useParams } from "react-router";
import Nav from '../nav/Nav';
import axios from 'axios';
import { numberWithCommas } from '../../utils';
import { UserContext } from "../shoppingcart/UserContext";
import { useDispatch } from "react-redux";
import addToCart from "../../redux/actions/addToCart";



const useStyles = makeStyles((theme) => ({
  media: {
    width: '100%',
    paddingTop: "80%", // 16:9
    margin: "0vh",
    backgroundSize: 'contain',
    "&:hover": {
      backgroundSize: "larger"
    }
  },
  container: {
    width: "80vh",
    margin: '5vh'
  },
  mp:{
    maxWidth: '8vh',
    marginRight: '5vh',
    marginLeft: '5vh'
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    width: "20vh",
    fontSize: "2vh",
    marginRight: '4vh',
    marginLeft: '4vh'
  },
  
}));

export default function ProductDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState({})

  const classes = useStyles();
  console.log(detail)
  const dispatch = useDispatch()
  const {shoppingCart, setShoppingCart} = useContext( UserContext )
  const {cartQuantity} = shoppingCart

  const getProductById = async () => {
          
    try{
      const response = await axios.get(`http://localhost:3001/products/${id}`)
        setDetail(response.data)
    }
    catch (error){
        console.log(error)
    }
  }

  useEffect(() => {
    getProductById(id) 
  }, [id])

  const handleAdd = (e) => {
    setShoppingCart( cant => ({
      ...cant,
      cartQuantity: cartQuantity  + 1
  }))
    dispatch( addToCart(id))
  }


  return (
    <div>
      {
        detail.price && 
        <div>
         <Nav />
       <Grid container style = { { marginTop: '-4vh'}}>
        
        <Grid item xs ={6}>
            <CardMedia className={classes.media} image={detail.image} />
        </Grid>

        <Grid item xs ={6}>
            <Typography component="h1" variant ='h4' className = {classes.container}>
              {detail.name}
              <Divider variant="middle" light />
              </Typography>
              <Typography variant="h3" component="h2" className = {classes.container}>
                ${numberWithCommas(detail.price)}
                <Divider variant="fullwidth" />
              </Typography>
            <Typography component="p" variant ='body2' className = {classes.container}>
                  {detail.description}
            </Typography>


              <Grid style = {{width:'600px',display: 'flex',justifyContent: 'center'}}>
                
                <Box> <img src={'https://img.icons8.com/color/480/mercado-pago.png'} className = {classes.mp} /></Box>
              
                <Button  
                    variant="contained" 
                    className={classes.button}
                    onClick={ handleAdd }
                    >
                  Add to Cart
                </Button>
                <Button variant="contained" className={classes.button}>
                  Buy
                </Button>
              </Grid>

              <Typography variant="body2" component="h3" className = {classes.container}>
                Stock: {detail.stock} {detail.brand}
              </Typography>
        </Grid>
      </Grid>


        </div>

      }
     

    </div>
  );
}
