import React from 'react';
import {AppBar, Card, Box, Container, CardMedia, Typography, Divider, Button, CssBaseline} from '@material-ui/core';
import logo from './logo.jpg'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    media: {
      width: '100%',
      paddingTop: "80%", // 16:9
      margin: "0vh",
      backgroundSize: 'contain',
      "&:hover": {
        backgroundSize: "larger"
      },
    },
    container: {
        height: '100%',
        width: '100%',
        marginTop: '10vh', 
        display: 'flex',
        backgroundColor: 'RGB(238, 238, 238)'
    },
    containerIzq: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent:'space-around',
      alignItems: 'center',
      width: "60%",
      height: '70vh',
      backgroundColor:'RGB(245, 245, 244)',
      margin: '3%',
      borderRadius: '5px',
      
      
    },
    containerDer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent:'space-around',
      alignItems: 'center',
      width: "40%",
      height: '50vh',
      backgroundColor:'RGB(245, 245, 244)',
      borderRadius: '5px',
        
        
    },
    button: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
      height: '6vh',
      width: '15vh',
      fontSize: '70%'
    
    },
    img: {
        width: '80%',
        backgroundSize: 'contain',
        
    },
    media: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: '50px',
        width: '60%'
       
    }
  }));
  
  export default function Order() {
    const classes = useStyles()
  

  
  
    return (
      <div>
        <CssBaseline>
        <AppBar style = {{backgroundColor: 'rgb(0, 23, 20)', height: '10%'}}>

        </AppBar>

         <Container className={classes.container}>

          
          <Container className={classes.containerIzq}>
            
              <Typography component ="h1" variant= "h5" style = {{marginTop: '-10vh'}}> ¿Como queres recibir o retirar tu compra?</Typography>

              <Box>
                 <Typography component ="h1" variant = "h6">Recibir Compra</Typography>
                 <Typography component ="h4">Tu Domicilio</Typography>
                 
                 <Typography component ="h1" variant = "h6">Recibir Compra</Typography>
                 <Typography component ="h4">Correo</Typography>
                 

                 <Typography component="h1" variant = "h6">Retirar Compra </Typography>
                 <Typography component ="h4">Domicilio de la Tienda</Typography>
            
              </Box>  
              
          
          </Container>


          <Container className={classes.containerDer}>


            <Box style = {{display:'flex', justifyContent:'center', marginTop: '3vh'}}>
                <CardMedia className={classes.media}> <img src={'https://vanzguitars.files.wordpress.com/2010/03/32_jem7dbk.png'} className={classes.img} /> 
                </CardMedia>
             </Box>
             <Typography component="h1" variant ='body1' >
               Ibanez JEM Steve Vai Signature
             </Typography>

             <Box style = {{display: 'flex', justifyContent: 'space-evenly'}}>
                <Typography component="h1" variant ='h5' >
                Total:
                </Typography>
                <Typography component="h1" variant ='h5' >
                $ 250.000
                </Typography>
             </Box>

             <Typography component="p" variant ='body2' >
               Cantidad : 1
             </Typography>
             <Divider variant = "middle" style ={{width: '100%'}}/>                 

             <Button variant="contained" className={classes.button}>
                    Continuar
             </Button>
                
  
          </Container>
        </Container>
        
        </CssBaseline>
  
      </div>
    );
  }
  