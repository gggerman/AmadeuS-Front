import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {BottomNavigation, BottomNavigationAction, Typography} from '@material-ui/core';

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
        <BottomNavigation className ={classes.footer}>
            
            <Typography> About </Typography>
            <Typography> Team </Typography>
            <Typography> Contact </Typography>
            <Typography> FAQ </Typography>
                       
        </BottomNavigation>
    )
}