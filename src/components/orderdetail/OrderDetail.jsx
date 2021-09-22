import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {makeStyles, CssBaseline, AppBar, Container, Typography, Divider, Box, CardMedia, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { numberWithCommas } from '../../utils';
import NavSecondary from '../navsecondary/NavSecondary';
import { headers } from "../../utils/GetHeaders"
import { InfoRounded } from '@material-ui/icons';
const { REACT_APP_SERVER } = process.env;

const useStyles = makeStyles((theme) => ({
  rootProduct: {      
    display: 'flex',
    flexDirection:'row',
    width: '100%', 
    height:'12vh',  
    padding:'2vh', 
    margin:'2vh',
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    borderRadius: '3%',
    backgroundColor: 'white',
    

  },
  media: {
    width: "50vh",
    margin: "0vh",
    backgroundSize: "contain",
    "&:hover": {
      backgroundSize: "larger",
    },
  },
  img: {
    width: "20%",
    backgroundSize: "contain",
  },
  img2: {
    width: '15%',
    backgroundSize: 'contain',
    
},
  container: {
    height: "100vh",
    width: "100%",
    marginTop: "1vh",
    display: "flex",
    backgroundColor: "RGB(238, 238, 238)",
  },
  icon: {
    width: "8vh",
    backgroundSize: "contain",
    margin: "auto",
  },
  box: {
    display: "flex",
    justifyContent: "row",
  },
  containerDer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'space-around',
    alignItems: 'center',
    width: "50%",
    height: '80vh',
    backgroundColor:'RGB(245, 245, 244)',
    borderRadius: '5px',
  },
}));

export default function OrderDetail() {
  const classes = useStyles();
  const orderId = useSelector((state) => state.app.order); //me traigo el orderId generado en Order
  const [infoOrder, setInfoOrder] = useState({});
  const [orderUpdated, setOrderUpdated] = useState({})
 
 

  console.log(infoOrder);
  console.log(orderUpdated)
  

  const query = new URLSearchParams(useLocation().search);
  const status = query.get("status");
  //status de MP:  hay que modificar el status de nuestra order en nuestra base de datos


 


  const getOrderById = async () => {      //me traigo la info de la compra con el id que guarde en Redux
    try {
      const response = await axios.get(`${REACT_APP_SERVER}/orders/${orderId}`, { headers })
      setInfoOrder(response.data)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // me traigo con redux el id de Order addOrder
    
    getOrderById(orderId)
  }, [])
  
  //--------------ACTUALIZAMOS LA ORDEN EN NUESTRA DB CON EL STATUS QUE DEVUELVE MP--------------//
  useEffect(() => {
    axios.put(`${REACT_APP_SERVER}/orders/${orderId}`, { status: status }, { headers })
  }, [infoOrder])

//--------------ACTUALIZAMOS LA ORDEN EN NUESTRA DB CON EL STATUS QUE DEVUELVE MP--------------//
useEffect(() => {
  axios.put(`${REACT_APP_SERVER}/orders/${orderId}`, {status: status}) 
  .then((response) => setOrderUpdated(response.data))
  .catch((err) => console.log(err))
}, [status])

//aca dispara el mail de notificacion al usuario  
useEffect(() => {
  
   axios.post(`${REACT_APP_SERVER}/users/${infoOrder.buyer?._id}/purchaseEmail`, { orderUpdated }, { headers } ) 
  
},[orderUpdated])
 

    return (
        <div>
         <CssBaseline>
         <NavSecondary shipping ={infoOrder.shipping} />

        <Container className={classes.containerDer} >
          <Box>
            <Typography component ="h2" variant= "body" style = {{marginTop: '-1vh', alignSelf:'flex-center', marginLeft: '4vh'}}>
              Tu Compra:
            </Typography>
          </Box>  
       
            <Container style={{marginTop:'-15vh'}}>
              


        {    
             infoOrder.products &&

              infoOrder.products.map((product) => {
                return (
               
                <Container className={classes.rootProduct}>
                  <Box >
                    <Typography variant="p" color ="primary">
                        {product.name}
                    </Typography>
                  </Box>
                  <CardMedia style={{display:'flex', justifyContent:'flex-end'}} 
                    image={product.image} 
                    className = {classes.img2}>
                
                  </CardMedia>

                </Container> 
                )
              }) 

        }
              <Table>

                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant ="overline" style={{textDecoration: 'underline', fontSize: '1.1em'}}>Precio
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant ="overline" style={{textDecoration: 'underline', fontSize: '1.1em'}}>Envio
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                   <TableRow>
                      <TableCell>
                        
                          {/* {   orderUpdated && 
                            <Typography variant ="body1">
                            $ {numberWithCommas(orderUpdated.products.reduce((acc, item) => {
                              return (
                              acc += item.price //aca hay que agregarle * quantity
                              )
                            }, 0
                            ))
                            }
                              </Typography>
                         
                          } */}
                        
                      </TableCell> 
                      <TableCell>
                        <Typography variant ="body1">
                            Entrega a domicilio
                        </Typography>
                      </TableCell>
                   </TableRow>
                </TableBody>             
                </Table>
              </Container>
              

        </Container>


      </CssBaseline>
    </div>
  );
}
