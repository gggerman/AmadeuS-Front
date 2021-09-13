import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {AppBar, Card, Box, Container, CardMedia, Typography, Divider, Button, CssBaseline} from '@material-ui/core';
import logo from './logo.jpg'
import { makeStyles } from '@material-ui/core';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { numberWithCommas } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import addOrder from '../../redux/actions/addOrder';

const { REACT_APP_SERVER } = process.env;


const useStyles = makeStyles((theme) => ({
    media: {
      width: '50%',
      paddingTop: "20%", // 16:9
      margin: "0vh",
      backgroundSize: 'contain',
      "&:hover": {
        backgroundSize: "larger"
      },
    },
    container: {
        height: '100%',
        width: '100%',
        marginTop: '10vh', 
        display: 'flex',
        backgroundColor: 'RGB(238, 238, 238)'
    },
    containerIzq: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent:'space-around',
      alignItems: 'center',
      width: "60%",
      height: '70vh',
      backgroundColor:'RGB(245, 245, 244)',
      margin: '2%',
      borderRadius: '5px',
      
      
    },
    containerDer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent:'space-around',
      alignItems: 'center',
      width: "35%",
      height: '100vh',
      backgroundColor:'RGB(245, 245, 244)',
      borderRadius: '5px',
        
        
    },
    button: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
      height: '6vh',
      width: '15vh',
      fontSize: '70%'
    
    },
    icon: {
      width: '8vh',
      backgroundSize: 'contain',
      margin: 'auto'
    },
    img: {
        width: '40%',
        backgroundSize: 'contain',
        
    },
    media: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: '50px',
        width: '60%'
       
    }
  }));         
  //como hacer para unificar la preview de la compra en este solo componente, ya sea que venga desde Cart o ProdDetail
  //en principio estaria controlado por el id que llega por params, si venimos desde cart a order no le pasariamos id
  //detail por lo tanto tiraria undefined, no habria id
  export default function Order() {
    const { REACT_APP_SERVER } = process.env;
    const classes = useStyles()
    const dispatch = useDispatch()
    const cartProducts = useSelector(state => state.cart.cart)
    console.log(cartProducts)
    

    const { id } = useParams() //el id usado es el id de la orden


    const [quantity, setQuantity] = useState(1)

    const [idOrder, setIdOrder] = useState()
 
    
    
    

    useEffect(() => {            
      dispatch(addOrder(idOrder))
    },[idOrder])


    const handleCheckout = () => {
     
      axios.post(`${REACT_APP_SERVER}/orders`, { products: cartProducts.map((item) => item.name) })
      .then((response) => setIdOrder(response.data)) 
  
      .catch((err) => console.log(err))
      
      axios.post(`${REACT_APP_SERVER}/mercadopago/cart`, {cartProducts})
      .then((response) => window.location = response.data )
      .catch((err) => console.log(err))
    }
  
    const handleQuantity = (e) =>{
      setQuantity(e.target.value)
    }
  
    return (
      <div>
        <CssBaseline>
        <AppBar style = {{backgroundColor: 'rgb(0, 23, 20)', height: '10%', position: 'absolute'}}>
          <Link to ="/" style = {{margin: 'auto'}}>
          <img src ={logo} className={classes.icon}/>
          </Link>
        </AppBar>

         <Container className={classes.container}>

          
          <Container className={classes.containerIzq}>
            <Box>
              <Typography component ="h1" variant= "h5" style = {{marginTop: '-2vh'}}> ¿Como queres recibir o retirar tu compra?</Typography>
            </Box>

              <Container style = {{backgroundColor: 'white', height: '80%'}}>
                <Box>
                 <Typography component ="h1" variant = "h6">Recibir Compra</Typography>
                 <Typography component ="h4">Tu Domicilio</Typography>
                 </Box>

                <Box>
                 <Typography component ="h1" variant = "h6">Recibir Compra</Typography>
                 <Typography component ="h4">Correo</Typography>
                </Box>  

                <Box>
                  <Typography component="h1" variant = "h6">Retirar Compra </Typography>
                  <Typography component ="h4">Domicilio de la Tienda</Typography>
                 </Box>

              </Container>  
              
          
          </Container>


          <Container className={classes.containerDer}>

          { 
            cartProducts.map(({image}) => {
              return (
                <Container>
                    <CardMedia className={classes.media}> <img src={image} className = {classes.img}/> 
                    </CardMedia>
                </Container>
              )
            }) }
            {
              cartProducts.map(({name}) => {
                return ( 
                  <>
                <Typography component="h4" variant ='body2' >
                {name}
                </Typography>
                  </>
                )
              })
            }

                <Box style = {{display: 'flex', justifyContent: 'space-evenly'}}>
                  <Typography component="h1" variant ='h5' >
                  Total:
                  </Typography>
                  <Typography component="h1" variant ='h5' > 
                  $ {numberWithCommas(cartProducts.reduce((acc, item) => {
                            return (
                             acc += item.price
                            )
                        }, 0
                        ))
                    }
                  </Typography>
               </Box>
            


             <Divider variant = "middle" style ={{width: '100%'}}/>                 
               

             <Button variant="contained" className={classes.button} onClick ={handleCheckout}>
                    Continuar
             </Button>
            
                
  
          </Container>
        </Container>
        
        </CssBaseline>
  
      </div>
    );
  }
  