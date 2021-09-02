import React from 'react';
import ProductCard from '../productcard/ProductCard';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (theme) => ({
    grid: {
        marginTop:'30vh',
        margin: '0 auto',
        maxWidth: '200vh'

    }
}))

export default function Products (){
const classes = useStyles();
//aca llamariamos a useSelector
//hariamos un map de los products de la db

    return (
            <Grid container direction="row" alignItems= "center" justifyContent="center" className ={classes.grid}   >
                    
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        
            </Grid>
        
            
        
    )
}