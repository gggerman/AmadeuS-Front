import React from 'react';
import {makeStyles, AppBar, Toolbar, Typography, Divider, Container, InputLabel } from '@material-ui/core';
import logo from './logo.jpg';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    nav:{
        
        backgroundColor: 'rgb(0, 23, 20)',
        height: '10%',
        marginBottom: '7vh',
        position:'absolute'
        
    },
    icon: {
      width: "7vh",
      backgroundSize: "contain",
      margin: "auto",
    },
    text:{
      color: theme.palette.primary.light
    }
    
  }));



export default function NavSecondary({shipping}){
    const classes = useStyles();
   


  

    return (
        <AppBar className={classes.nav}>
          <Toolbar>
          <Link to ="/" style={{margin:'1vh'}}>
          <img src ={logo} className={classes.icon}/>
          </Link>
          <Typography>Home</Typography>

          {  shipping &&
            <Container style={{display: 'flex', justifyContent:'flex-end'}}>
             <LocationOnIcon className={classes.text} /> 
            <Typography style={{fontSize:'0.95em', marginTop: '1vh'}} className={classes.text}>

              {shipping.street && `${shipping.street} ${shipping.number}, ${shipping.state}`}
            </Typography>
            

          </Container>

          }
          
          </Toolbar>
        </AppBar>
    )
}