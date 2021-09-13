import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Typography, Container, CardMedia, makeStyles } from '@material-ui/core';
import { numberWithCommas } from '../../utils';
const { REACT_APP_SERVER } = process.env;

const useStyles = makeStyles((theme) => ({
    root:{
        width: '100%',
        margin: "3vh",
        display: 'flex', 
        justifyContent: 'space-around',
        border: '1px solid black'
    },
    media: {
      width: '50vh',
      margin: "0vh",
      backgroundSize: 'contain',
    
    },
    img: {
      width: '20%',
      backgroundSize: 'contain',
      
    }
  }));

export default function Sales(){
    const classes = useStyles()

    const [orders, setOrders] = useState()
    console.log(orders)

    const getOrders = async () => {      //me traigo las compras
        try{
           const response = await axios.get(`${REACT_APP_SERVER}/orders`)
            setOrders(response.data)
        }
        catch (error){
            console.log(error)
        }
      }

    useEffect(() => {
      getOrders()

    }, [])


    return (
        <Container>
            {   orders &&
                orders.map((order, i) => {
                    if(order.status === 'approved'){
                        return (
                            <>  
                            {
                                
                                    <Container className ={classes.root}>

                                        <CardMedia className = {classes.media} > 
                                        {order.products.map((product) => <img src = {product.image} className={classes.img}  />)}

                                        </CardMedia>
                                        <Typography variant="body2" component="h3">
                                            {order.products.map((product) => product.name)}
                                        </Typography>

                                        <Typography>
                                            Total Venta : $ 
                                            {   numberWithCommas(
                                                order.products.reduce((acc, item) => {
                                                    return (
                                                        acc += item.price
                                                    
                                                    )
                                                }, 0) )

                                            }

                                        </Typography>
                                        <Typography>
                                            Forma de Entrega: {order.shipping}
                                        </Typography>

                                    </Container>
                            
                                }
                               

                            </>
                        )
                    }
                })
            }
            
        </Container>
    )
}