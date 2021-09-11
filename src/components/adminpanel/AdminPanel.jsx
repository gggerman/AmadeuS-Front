import React from 'react';
import {Grid, Card, Typography, Box, Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useRouteMatch } from "react-router-dom";



// idea: cards de cada funcionalidad 
//-stock. edicion de lo que ya esta subido
//-cargar producto, categorias
//-historial de ventas
//-administrar usuarios
//-secciones (ofertas-novedades)
const useStyles = makeStyles((theme) => ({
    body: {
        margin: '0',
        height: '100%',
        overflow: 'hidden'
    },
    root: {
      display: 'flex',
      justifyContent: 'center', 
      textAlign: 'center',
      width: 200,
      height: 200,
      margin: '2vh',
      padding: '1vh',
      background: 'linear-gradient(to right, #093028, #237a57)',
      "&:hover": {
          background: 'linear-gradient(to left, #16222a, #3a6073)',
          cursor: 'pointer'
      },
      color: theme.palette.primary.contrastText,   
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.contrastText   
    },
    backhome: {
        display: 'flex',
        justifyContent: 'center'
    },
    btn: {
        backgroundColor: '#16222A',
        color:'white',
        "&:hover": {
            backgroundColor: theme.palette.primary.light
        }
    }
    
    
  }));

export default function AdminPanel(){
    const classes = useStyles()
    let { path, url } = useRouteMatch();

    return (
        <div className={classes.body}>
        <Grid container direction="row" alignItems= "center" justifyContent="center" spacing={0} style={{ minHeight: '55vh' }} >
            
            <Link to = "/stock" className={classes.link}>
            <Card className={classes.root}>   
             <Typography component = "h1" variant = 'h5'>Stock</Typography>
            </Card>
            </Link>

            <Link to ="/addcategory" className={classes.link}>
                <Card className={classes.root}>
                <Typography component = "h1" variant = 'h5'>Crear Nueva Categoria</Typography>
                </Card>
            </Link>

            <Link to ="/addproduct" className={classes.link}>
                <Card className={classes.root}> 
                    <Typography component = "h1" variant = 'h5'>Cargar Producto</Typography>
                </Card>
            </Link>    
            <Link to ="/usermanagement" className={classes.link}>
                <Card className={classes.root}>
                    <Typography component = "h1" variant = 'h5'>Administrar Usuarios</Typography>
                </Card>
            </Link>
            <Link to ="" className={classes.link}>
                <Card className={classes.root}>
                    <Typography component = "h1" variant = 'h5'>Historial de Ventas</Typography>
                </Card>
            </Link>
            
        </Grid>
             <Container className={classes.backhome}>
                <Link to='/' className = {classes.link}>
                <Button variant="contained" className ={classes.btn}>Home</Button>
                </Link>
            </Container>

        </div>

    )
}