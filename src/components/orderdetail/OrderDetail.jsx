import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { makeStyles, CssBaseline, AppBar, Container, Typography, Divider, Box, CardMedia, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { numberWithCommas } from '../../utils';
import NavSecondary from '../navsecondary/NavSecondary';
import { headers } from "../../utils/GetHeaders"
import { InfoRounded } from '@material-ui/icons';
import cleanCart from "../../redux/actions/cleanCart";
import { linkUserCart } from "../../redux/actions/linkUserCart";
import { UserContext } from '../shoppingcart/UserContext';


const { REACT_APP_SERVER } = process.env;

const useStyles = makeStyles((theme) => ({
  rootProduct: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '12vh',
    padding: '2vh',
    margin: '2vh',
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
    justifyContent: 'space-around',
    alignItems: 'center',
    width: "50%",
    height: '80vh',
    backgroundColor: 'RGB(245, 245, 244)',
    borderRadius: '5px',
  },
}));

export default function OrderDetail() {
  const classes = useStyles();
  const order = useSelector((state) => state.app.order);
  const user = useSelector((state) => state.app.user);
  //me traigo el orderId generado en Order
  const dispatch = useDispatch()
  const { shoppingCart, setShoppingCart } = useContext(UserContext);
  const { cartQuantity } = shoppingCart;
  
  const query = new URLSearchParams(useLocation().search);
  const status = query.get("status");
 
  useEffect(() => {
    axios.put(`${REACT_APP_SERVER}/orders/stock/${order._id}`, { status: status })
    .then(response => axios.post(`${REACT_APP_SERVER}/users/${order.buyer?._id}/purchaseEmail`, response.data, {headers}))
    .catch(error => console.log(error))
    
    if(status==='approved'){
      let obj = {
        user,
        cart: [],
      };
      // user?.cart = [];
      dispatch(linkUserCart(obj));
      dispatch(cleanCart())
    }
  }, [status])

  return (
    <div>
      <CssBaseline>
        <NavSecondary shipping={order.shipping} />

        <Container className={classes.containerDer} >
          <Box>
            <Typography component="h2" variant="body" style={{ marginTop: '-1vh', alignSelf: 'flex-center', marginLeft: '4vh' }}>
              Tu Compra:
            </Typography>
          </Box>

          <Container style={{ marginTop: '-15vh' }}>
            {
              status === 'approved' &&
              order.products.map((product) => {
                return (

                  <Container className={classes.rootProduct}>
                    <Box >
                      <Typography variant="p" color="primary">
                        {product.name}
                      </Typography>
                    </Box>
                    <CardMedia style={{ display: 'flex', justifyContent: 'flex-end' }}
                      image={product.image}
                      className={classes.img2}>

                    </CardMedia>

                  </Container>
                )
              })

            }
            <Table>

              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="overline" style={{ textDecoration: 'underline', fontSize: '1.1em' }}>Precio
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="overline" style={{ textDecoration: 'underline', fontSize: '1.1em' }}>Envio
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
                    <Typography variant="body1">
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
