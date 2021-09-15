import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Typography, Container, CardMedia, makeStyles, Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { numberWithCommas } from '../../utils';
import NavSecondary from './../navsecondary/NavSecondary';
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
        width: "10%",
        margin: "0vh",
        backgroundSize: "contain",
      },
    tableCell:{
        padding:'1vw',
        height: '10%',
        width: '10vh'
    },
    img: {
      width: '25%',
      backgroundSize: 'contain',
      backgroundColor: 'grey'
    }
  }));

export default function Sales(){
    const classes = useStyles()
    const [invoice, setInvoice] = useState(1)

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
        <>
        <NavSecondary />
        <Grid container style ={{marginTop: '15vh'}}>
            <Table style = {{ marginLeft: '45vh'}}>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableCell} > Factura </TableCell>
                        <TableCell className={classes.tableCell} > Productos </TableCell>
                        <TableCell className={classes.tableCell} > Ingreso </TableCell>
                        <TableCell className={classes.tableCell} > Estado </TableCell>
                        <TableCell className={classes.tableCell} > Cliente </TableCell>
                        <TableCell className={classes.tableCell} > Ubicacion </TableCell>

                    </TableRow>

                </TableHead>


                <TableBody>
                   {orders?.map((order) => (
                       <TableRow key={order._id}>

                            <TableCell className={classes.tableCell} > 0001 </TableCell>
                            <TableCell className={classes.tableCell} > 
                                {order.products.map((product) => <img src = {product.image} className={classes.img}  /> )} 
                            </TableCell>
                            <TableCell> $
                                { numberWithCommas(order.products.reduce((acc, item) => {
                                         return (
                                            acc += item.price
                                                    
                                                )
                                                }, 0))} 
                            </TableCell>
                            <TableCell> {order.status.toUpperCase()} </TableCell>
                            <TableCell>{ order.buyer && order.buyer.mail} </TableCell>
                            <TableCell> {order.shipping}Buenos Aires </TableCell>
                            <MoreVertIcon/>
                           

                       </TableRow>

                   ))
                   
                   
                   }


                </TableBody>
            </Table>

            
            
        </Grid>
        </>
    )
}