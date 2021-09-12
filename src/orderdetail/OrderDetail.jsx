import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {makeStyles, CssBaseline, AppBar, Container, Typography, Divider, Box, CardMedia} from '@material-ui/core';
import logo from './logo.jpg';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { numberWithCommas } from '../utils';

const useStyles = makeStyles((theme) => ({
    media: {
      width: '50vh',
      margin: "0vh",
      backgroundSize: 'contain',
      "&:hover": {
        backgroundSize: "larger"
         }
    },
    img: {
      width: '20%',
      backgroundSize: 'contain',
      
    }, 
    container: {
        height: '100vh',
        width: '100%',
        marginTop: '10vh', 
        display: 'flex',
        backgroundColor: 'RGB(238, 238, 238)'
    },
    icon: {
      width: '8vh',
      backgroundSize: 'contain',
      margin: 'auto'
    },
    box: {
      display: 'flex',
      justifyContent: 'row',
      
    }
  }));

export default function OrderDetail () {
const classes = useStyles()
const orderId = useSelector((state) => state.app.order) //me traigo el orderId generado en Order, por ahora me tira undefined
const [infoOrder, setInfoOrder] = useState({})

console.log(infoOrder)

const query = new URLSearchParams(useLocation().search);

const collection_id = query.get('collection_id')
const status = query.get('status')
const merchant_order_id = query.get('merchant_order_id')


console.log(status) //status de MP:  hay que modificar el status de nuestra order en nuestra base de datos


const getOrderById = async () => {      //me traigo la info de la compra con el id que guarde en Redux
  try{
     const response = await axios.get(`http://localhost:3001/orders/${orderId}`)
      setInfoOrder(response.data)
  }
  catch (error){
      console.log(error)
  }
}

useEffect(() => {
    // me traigo con redux el id de Order addOrder
    getOrderById(orderId)
}, [])

useEffect(() => {
  axios.put(`http://localhost:3001/orders/${orderId}`, status)
}, [])

// a su vez habria que hacer un axios.put en la order de nuestra base de datos para actualizar su status 

    return (
        <div>
         <CssBaseline>
        <AppBar style = {{backgroundColor: 'rgb(0, 23, 20)', height: '10%', position: 'absolute'}}>
          <Link to ="/products" style = {{margin: 'auto'}}>
          <img src ={logo} className={classes.icon}/>
          </Link>
        </AppBar>

        <Container className={classes.container}>
            {
                status === 'approved' ? 

                  <Container>
                    <Typography style = {{textAlign: 'center'}} component = "h2" variant ="body1">
                        Tu compra fue un exito
                    </Typography> 

                    { infoOrder.products && 
                      infoOrder.products.map((product) => {
                        return (
                        <Box className = {classes.box}>
                          <CardMedia className = {classes.media} > <img src={product.image} className={classes.img} /> 
                          </CardMedia>
                          <Typography> {product.name}</Typography>
                          <Typography> ${ numberWithCommas(product.price)}</Typography>
                          <Typography> {product.brand}</Typography>

                         </Box>
                        )
                      })
                    }
                    
                       
                  </Container>  
                       : 
                        <Typography style = {{textAlign: 'center'}}>
                        no tenes fondos raton o tipeaste mal
                        </Typography>  
            }
            
        </Container>
    

        </CssBaseline>    
        </div>
    )
}

// http://localhost:3000/orderdetail?collection_id=16911216892&collection_status=approved&payment_id=16911216892&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=3245729926&preference_id=672708410-71d2d278-158e-48f7-baa0-52c1ff053701&site_id=MLA&processing_mode=aggregator&merchant_account_id=null