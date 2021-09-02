import React from 'react';
import Nav from '../nav/Nav.jsx';
import Products from '../products/Products';
import Footer from '../footer/Footer';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles( (theme) => ({
    home: {
        overflow:'hidden'
    }
}))

export default function Home(){
    const classes = useStyles()
    return (
        <div className ={classes.home}>
            <Nav />
            <Products />
            <Footer />
        </div>

    )
}