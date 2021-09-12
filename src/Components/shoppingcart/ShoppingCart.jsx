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

const handleDeleteAll = () => {
    dispatch ( cleanCart() )
    setShoppingCart( cant =>({
        ...cant,
        cartQuantity: 0
    }) )
    localStorage.setItem('cartItemsQuantity', JSON.stringify(cartQuantity)) 
    localStorage.setItem('cartItem', JSON.stringify([])) 
}

useEffect(() => {
    JSON.parse(localStorage.getItem('cartItemsQuantity'))
}, [cartQuantity])

console.log('cartItems', cartItems)
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
                        total de la compra
                        </Typography>
                    </Box>
                    <hr />
                    {/* aca hay que agregar a donde redirige, por ahora lo hace al home */}
                    <Button 
                        variant='contained' 
                        color='primary'
                        component={ Link } to='/'
                        >
                        Comprar
                    </Button>
                </Container>                   
        </div>
    )
}

export default ShoppingCart

        