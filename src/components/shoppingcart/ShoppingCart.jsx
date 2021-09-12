import React, { useContext, useEffect, useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ShoppingCartItem from './ShoppingCartItem'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import cleanCart from '../../redux/actions/cleanCart';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import { numberWithCommas } from '../../utils';
import axios from 'axios'
import addOrder from './../../redux/actions/addOrder';
const { REACT_APP_SERVER } = process.env;

const useStyles = makeStyles( ( theme ) =>({
    root:{
        display: 'flex',
        alignItems: 'center',       
    },
}) )



const ShoppingCart = () => {

const classes = useStyles()
const shoppingCartProducts = useSelector(state => state.cart.cart)
const {shoppingCart, setShoppingCart} = useContext( UserContext )
const {cartQuantity, cartItems} = shoppingCart
const dispatch = useDispatch()

const [idOrder, setIdOrder] = useState()

const handleDeleteAll = () => {
    dispatch ( cleanCart() )
    setShoppingCart( cant =>({
        ...cant,
        cartQuantity: 0
    }) )
    localStorage.setItem('cartItemsQuantity', JSON.stringify(cartQuantity)) 
    localStorage.setItem('cartItem', JSON.stringify([])) 
}

const handleCheckout = () => {
    //axios.post a nuestra base de datos con status 'pending? 
    //axios.post('http://localhost:3001/orders, toda la info: detail.name, detail.price, detail.quantity, detail.id, buyer,detail.stock, detail.categories)
    axios.post('http://localhost:3001/orders', { products: shoppingCartProducts })
    .then((response) => setIdOrder(response.data)) //estado de redux para guardar ese id y dps que lo consuma OrderDetail no estaria guardando en redux
    // .then( (response) => dispatch(addOrder(response)))   no funciona asi
    .catch((err) => console.log(err))
    
    axios.post(`${REACT_APP_SERVER}/mercadopago/checkout`, {shoppingCartProducts})
    .then((response) => window.location = response.data )
    .catch((err) => console.log(err))
  }

  useEffect(() => {            
    dispatch(addOrder(idOrder))
  },[idOrder])

useEffect(() => {
    JSON.parse(localStorage.getItem('cartItemsQuantity'))
}, [cartQuantity])

console.log(shoppingCartProducts)
    return (
        <div>        
             
            <CssBaseline />
                <Container maxWidth="xl" style={{ backgroundColor: '#EEEBEB', height: '150vh', border:'1px solid #E7E4E4' }} >
                    <div className={classes.root}>
                        <Box flexGrow={1} marginLeft={5} >
                            <Typography variant='h2' >
                                carrito
                            </Typography>
                        </Box>
                        <Box>
                            <Button 
                                variant='contained' 
                                color='primary'
                                endIcon={<DeleteForeverRoundedIcon />}
                                onClick={ handleDeleteAll }                    
                            >
                                vaciar Carrito
                            </Button>
                        </Box>
                    
                    </div>
                    {   
                       shoppingCartProducts?.map( elem => (
                            <ShoppingCartItem key={elem._id} {...elem} />
                        ))
                        }
                    
                    <hr />
                    <Box>
                        <Typography variant='h4'>
                        Total de la compra: {
                        shoppingCartProducts.reduce((acc, item) => {
                            return (
                             acc += item.price
                            )
                        }, 0
                        )}
                        </Typography>
                        
                    </Box>

                    <hr />
                    {/* aca hay que agregar a donde redirige, por ahora lo hace al home */}
                    <Button 
                        variant='contained' 
                        color='primary'
                        onClick ={handleCheckout}
                        >
                        Comprar
                    </Button>
                </Container>                   
        </div>
    )
}

export default ShoppingCart

        