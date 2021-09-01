import React from 'react';
import ProductCard1 from '../ProductCard1/ProductCard1';
import ProductCard2 from '../ProductCard2/ProductCard2';
import Grid from '@material-ui/core/Grid';


export default function Products (){
    return (
        <Grid container direction="row" alignItems= "center" justify="center"  style={{ minHeight: '100vh'}}  >
                
                    <ProductCard1 />
                    <ProductCard1 />
                    <ProductCard1 />
                    
        </Grid>

            
        
    )
}