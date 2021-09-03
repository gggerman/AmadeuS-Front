import React, {useEffect} from 'react';
import ProductCard from '../productcard/ProductCard';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import  {getAllProducts}  from '../../redux/actions/getAllProducts';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles( (theme) => ({
    grid: {
        marginTop:'30vh',
        margin: '0 auto',
        maxWidth: '200vh'

    }
}))

export default function Products (){
const products = useSelector((state) => state.productsLoaded);
const classes = useStyles();
const dispatch = useDispatch()


useEffect(() => {
    dispatch(getAllProducts());
  });

//aca llamariamos a useSelector
//hariamos un map de los products de la db
console.log(products)
    return (
            <Grid container direction="row" alignItems= "center" justifyContent="center" className ={classes.grid}   >
                    
                {
                    products?.map((product) => {
                        return (
                            <ProductCard 
                                name = {product.name} 
                                description = {product.description} 
                                price = {product.price} 
                                image ={product.image}
                                />
                        )
                    })
                }

                        {/* <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard /> */}
                        
            </Grid>
        
            
        
    )
}