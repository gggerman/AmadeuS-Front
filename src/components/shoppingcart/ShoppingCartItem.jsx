import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Card, CardActionArea, CardMedia, IconButton, Typography } from '@material-ui/core';
import { useContext, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Cancel } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import deleteOneItem from '../../redux/actions/deleteOneItem';
import { UserContext } from './UserContext';
import React from 'react'
import addToCart from '../../redux/actions/addToCart';
import { numberWithCommas } from '../../utils';



const useStyles = makeStyles((theme) => ({
  root: {      
    display: 'flex',
    flexDirection:'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,    
    flexGrow: 1,
    backgroundColor: '#E2DBDB'
  },

  card: {
    marginRight: 5,
    maxWidth: 100,
    maxHeight: 100,    
  },

  mediaimg: {
    height: '100',
    width: 'contein',
    paddingTop: '0',
  },
  
}));

const ShoppingCartItem = ({_id, name, description, price, stock, brand, image, categories, qualification, quantity}) => {
  
  const classes = useStyles();
  const [counter, setCounter] = useState( quantity > stock ? stock : quantity)
  const [totalValue, setTotalValue] = useState(price) //arreglar
  const dispatch = useDispatch()
  const {shoppingCart, setShoppingCart} = useContext( UserContext )
  const {cartQuantity} = shoppingCart
  
  const increment = (e) => {
    //   console.log(e)
      setCounter( counter + 1 )
      setShoppingCart( cant => ({
          ...cant,
          cartQuantity: cartQuantity  + 1
      }))
      dispatch( addToCart(_id))
      // setTotalValue(() => price * counter)
  }

  const decrement = () => {
      setCounter( counter - 1 )
      if( cartQuantity > 0){
        setShoppingCart( cant => ({
            ...cant,
            cartQuantity: cartQuantity  - 1
        }))
        }
      // setTotalValue((price) =>  price * counter)
  }

  const handleDelete = (e) => {      
      
      dispatch( deleteOneItem(_id) )
      setShoppingCart( cant => ({
        ...cant,
        cartQuantity: cartQuantity  - quantity
    }))      
  }
 

  return (
    <div className={classes.root}>
        <Box>
            <IconButton onClick={ handleDelete }>
                <Cancel/>
            </IconButton>
        </Box>
        <Box marginRight={7}>            
            <Typography variant='body1'>
                $ {numberWithCommas(totalValue * counter)} 
            </Typography>
        </Box>

        <Box mr={5}>
            <Box border={1} color='gray' width='fit-content'>           
                <IconButton aria-label='remove' onClick={decrement} disabled={counter === 1 || counter === 0 }>
                    <RemoveIcon/>
                </IconButton>
                    {counter}
                <IconButton aria-label='add' onClick={increment} disabled={ counter === stock }>
                    <AddIcon/>
                </IconButton>
            </Box>
            
            <Box>
                <Typography variant='subtitle2' align='center'>
                    {stock} unidades
                </Typography>
            </Box>
        </Box>

        <Box flexGrow={1} marginLeft={3}>
            <Typography variant='h6' >
                {name}
            </Typography>
        </Box>
            
        <Box>
            <Card variant='outlined' className={classes.card}>      
                <CardMedia
                className={classes.mediaimg}
                component="img"
                alt="img"
                height="80"
                image={image}
                // title="Contemplative Reptile"
                />          
            </Card>
        </Box>         
    </div>
  );
}

export default ShoppingCartItem
