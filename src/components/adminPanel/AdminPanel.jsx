import React from 'react';
import {Grid, Card, Typography, Box, Button } from '@material-ui/core';
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
      width: 200,
      height: 200,
      margin: '2vh',
      padding: '1vh',
      backgroundColor: theme.palette.primary.dark,
      "&:hover": {
          backgroundColor: theme.palette.primary.main,
          cursor: 'pointer'
      },
      color: theme.palette.primary.contrastText,   
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.contrastText   
    },
    box: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'center',
        textDecoration: 'none',
        height: '15vh',
        width: '15vh',
        backgroundColor: theme.palette.primary.main,
        
    }  
    
  }));

export default function AdminPanel(){
    const classes = useStyles()
    let { path, url } = useRouteMatch();

    return (
        <div className={classes.body}>
        <Grid container direction="row" alignItems= "center" justifyContent="center" spacing={0} style={{ minHeight: '55vh' }} >
            
            <Card className={classes.root}>   
             <Typography component = "h1" variant = 'h4'>Stock</Typography>
            </Card>

            <Link to ="/addproduct" className={classes.link}>
                <Card className={classes.root}>
                <Typography component = "h1" variant = 'h4'>Cargar Producto</Typography>
                </Card>
            </Link>

            <Link to ="/addcategory" className={classes.link}>
                <Card className={classes.root}> 
                    <Typography component = "h1" variant = 'h4'>Crear Nueva Categoria</Typography>
                </Card>
            </Link>    
            <Card className={classes.root}>
                <Typography component = "h1" variant = 'h4'>Administrar Usuarios</Typography>
            </Card>
            <Card className={classes.root}>
                <Typography component = "h1" variant = 'h4'>Historial de Ventas</Typography>
            </Card>
            
        </Grid>
            
                <Link to='/' className = {classes.link}>
                <Button variant="contained" color="primary">Home</Button>
                </Link>
           

        </div>

    )
}