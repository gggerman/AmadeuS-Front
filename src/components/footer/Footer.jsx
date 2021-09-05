import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {BottomNavigation, BottomNavigationAction, CssBaseline, Typography} from '@material-ui/core';

const useStyles = makeStyles( (theme) => ({
    footer:{
        display: 'flex',
        justifyContent: 'space-around',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.dark
    }
}))

export default function Footer(){
    const classes = useStyles()
    return (
        //Para que el footer no tenga margenes blancos
        //en los costados y abajo y ocupe todo el ancho
        <CssBaseline>
        <BottomNavigation className ={classes.footer}>
            
            <Typography> About </Typography>
            <Typography> Team </Typography>
            <Typography> Contact </Typography>
            <Typography> FAQ </Typography>

        </BottomNavigation>
        </CssBaseline>
    )
}