import React from 'react';
import {makeStyles, AppBar, Typography, Divider } from '@material-ui/core';
import logo from './logo.jpg';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    nav:{
        backgroundColor: 'rgb(0, 23, 20)',
        height: '10%',
        marginBottom: '5vh',
        position: 'absolute'
    },
    icon: {
      width: "8vh",
      backgroundSize: "contain",
      margin: "auto",
    },
    
  }));

export default function NavSecondary(){
    const classes = useStyles();

    return (
        <AppBar className={classes.nav}>
          <Link to ="/" style = {{margin: 'auto'}}>
          <img src ={logo} className={classes.icon}/>
          </Link>
        </AppBar>
    )
}