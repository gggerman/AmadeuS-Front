import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {AppBar, Card, Box, Container, CardMedia, Typography, Divider, Button, CssBaseline} from '@material-ui/core';
import logo from './logo.jpg'
import { makeStyles } from '@material-ui/core';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { numberWithCommas } from '../../utils';
import { useDispatch } from 'react-redux';
import addOrder from '../../redux/actions/addOrder';


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
  
  export default function Order() {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { id } = useParams()
    const [detail, setDetail] = useState({})
    const [quantity, setQuantity] = useState(1)

    const [idOrder, setIdOrder] = useState()
    console.log(idOrder)
    
    const { REACT_APP_SERVER } = process.env;
    
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
      //axios.post a nuestra base de datos con status 'pending? 
      //axios.post('http://localhost:3001/orders, toda la info: detail.name, detail.price, detail.quantity, detail.id, buyer,detail.stock, detail.categories)
      axios.post('http://localhost:3001/orders', { products: detail.name })
      .then((response) => setIdOrder(response.data)) //estado de redux para guardar ese id y dps que lo consuma OrderDetail no estaria guardando en redux
      // .then( (response) => dispatch(addOrder(response)))   no funciona asi
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
        <AppBar style = {{backgroundColor: 'rgb(0, 23, 20)', height: '10%', position: 'absolute'}}>
          <Link to ="/products" style = {{margin: 'auto'}}>
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
  