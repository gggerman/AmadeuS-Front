import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Typography, Container, CardMedia, makeStyles } from '@material-ui/core';
const { REACT_APP_SERVER } = process.env;

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
        <div>
            {   orders &&
                orders.map((order, i) => {
                    if(order.status === 'approved'){
                        return (
                            <>  
                            {
                                
                                    <Container >
                                        <CardMedia className = {classes.media} > <img src={order.products.map((product) => product.image)} className={classes.img} /> 
                                        </CardMedia>
                                        <Typography>
                                            {order.products.map((product) => product.name)}
                                        </Typography>
                                        <Typography>
                                            {order.status}
                                        </Typography>

                                    </Container>
                            
                                }
                               

                            </>
                        )
                    }
                })
            }
            
        </div>
    )
}