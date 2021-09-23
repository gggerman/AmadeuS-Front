import React from 'react';
import {makeStyles, AppBar, Toolbar, Typography, Box, Container, InputLabel } from '@material-ui/core';
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



export default function NavSecondary({shipping, success}){
    const classes = useStyles();
    console.log(shipping)


  

    return (
        <AppBar className={classes.nav}>
          <Toolbar>
          <Link to ="/" style={{margin:'1vh'}}>
          <img src ={logo} className={classes.icon}/>
          </Link>
          <Typography>Home</Typography>

          {
            success === "approved" &&

            <Box style={{marginLeft:'30%', width:'90%'}}>
              <Typography style={{fontSize:'1.1em'}} className={classes.text}>

                Gracias por tu compra! Te queremos mucho! por favor vuelvas prontos
              </Typography>
            </Box>


          }

          {  shipping &&
            <Container style={{display: 'flex', justifyContent:'flex-end'}}>
             <LocationOnIcon className={classes.text} /> 
            <Typography style={{fontSize:'0.95em', marginTop: '1vh'}} className={classes.text}>

              {shipping[0]?.street && `${shipping[0]?.street} ${shipping[0]?.number}, ${shipping[0]?.state}`}
            </Typography>
            

          </Container>

          }
          
          </Toolbar>
        </AppBar>
    )
}