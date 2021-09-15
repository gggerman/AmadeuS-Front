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
import { useAuth0 } from '@auth0/auth0-react';
import NavSecondary from '../navsecondary/NavSecondary';

const { REACT_APP_SERVER } = process.env;


const useStyles = makeStyles((theme) => ({
    media: {
      width: '100%',
      paddingTop: "80%", // 16:9
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
     
      alignItems: 'center',
      width: "60%",
      height: '70vh',
      backgroundColor:'RGB(245, 245, 244)',
      margin: '2%',
      paddingTop: '2%',
      borderRadius: '5px',
    
    },
    root: {      
      display: 'flex',
      flexDirection:'row',
      justifyContent: 'space-between',
      width: '100%',  
      flexGrow: 1,

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
  
  export default function Order() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { user } = useAuth0();

    const { id } = useParams()
    
    const [detail, setDetail] = useState({})
    const [quantity, setQuantity] = useState(1)

    const [idOrder, setIdOrder] = useState()
    console.log(detail)
    
    
    const getProductById = async () => {
      try{
         const response = await axios.get(`${REACT_APP_SERVER}/products/${id}`)
          setDetail(response.data)
      }
      catch (error){
          console.log(error)
      }
    }
   
    
    useEffect(() => {
      getProductById(id) 
    }, [])
   

    useEffect(() => {            
      dispatch(addOrder(idOrder))
    },[idOrder])


    const handleCheckout = () => {
      
      axios.post(`${REACT_APP_SERVER}/orders`, { products: detail.name, user: user })
      .then((response) => setIdOrder(response.data)) 
      .catch((err) => console.log(err))
      
      axios.post(`${REACT_APP_SERVER}/mercadopago/checkout`, { name: detail.name, price: detail.price, quantity: quantity})
      .then((response) => window.location = response.data )
      .catch((err) => console.log(err))
    }
  
    const handleQuantity = (e) =>{
      setQuantity(e.target.value)
    }
  
    return (
      <div>
        <CssBaseline>
        <NavSecondary style={{marginBottom: '5vh'}} />

         <Container className={classes.container}>

          
          <Container className={classes.containerIzq}>
             
          
           <Box>
              <Typography component ="h1" variant= "h5" style = {{marginTop: '-2vh', marginBottom: '10vh'}}> ¿Como queres recibir o retirar tu compra?</Typography>
            </Box>

            
           <div className={classes.root}> 
              <Box>
                <Typography component ="h1" variant = "h6">Recibir Compra</Typography>
              </Box>
              <Box>
                <Typography component ="h4" variant = "h6">Agregar</Typography>
              </Box>
              <Box>
                <Typography component ="h4">Tu Domicilio</Typography>
              </Box>

           </div>  
           <div className={classes.root}> 
                <Box>
                 <Typography component ="h1" variant = "h6">Recibir Compra</Typography>
                </Box>
                <Box>
                <Typography component ="h4" variant = "h6">Elegir</Typography>
                </Box>
                <Box>
                 <Typography component ="h4">Correo</Typography>
                </Box>
                
           </div>
             
           <div className={classes.root}> 
                 <Box>
                   <Typography component="h1" variant = "h6">Retirar Compra </Typography>
                 </Box>
                 <Box>
                  <Typography component ="h4">Ver</Typography>
                 </Box>
                 <Box>
                  <Typography component ="h4">Domicilio de la Tienda</Typography>
                 </Box>
           </div>
                                 
          
          </Container>


          <Container className={classes.containerDer}>


            <Box style = {{display:'flex', justifyContent:'center', marginTop: '3vh'}}>
                <CardMedia className={classes.media}> <img src={detail.image} className={classes.img} /> 
                </CardMedia>
             </Box>
             <Typography component="h1" variant ='body1' >
               {detail.name}
             </Typography>

             <Box style = {{display: 'flex', justifyContent: 'space-evenly'}}>
                <Typography component="h1" variant ='h5' >
                Total:
                </Typography>
                {detail.price && <Typography component="h1" variant ='h5' >
                $ {numberWithCommas(detail.price * quantity)}
                </Typography>}
                
             </Box>
             <Typography component ="h4">Stock Disponible: {detail.stock}</Typography>

             <Typography component="p" variant ='body2' >
               Stock Disponible:  {detail.stock}
             </Typography>
             <Divider variant = "middle" style ={{width: '100%'}}/>                 
               <label>Cantidad: 
                 <input type="number" min = "1" max ={detail.stock} defaultValue = "1" onChange={handleQuantity}/>
               
               </label>
             <Button variant="contained" className={classes.button} onClick ={handleCheckout}>
                    Continuar
             </Button>
            
                
  
          </Container>
        </Container>
        
        </CssBaseline>
  
      </div>
    );
  }
  