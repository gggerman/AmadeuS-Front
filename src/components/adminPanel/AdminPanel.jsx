import React from 'react';
import {Grid, Card} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


// idea: cards de cada funcionalidad 
//-stock. edicion de lo que ya esta subido
//-cargar producto, categorias
//-historial de ventas
//-administrar usuarios
//-secciones (ofertas-novedades)
const useStyles = makeStyles((theme) => ({

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
      color: theme.palette.primary.contrastText      
    }  
    
  }));

export default function AdminPanel(){
    const classes = useStyles()

    return (
        <Grid container direction="row" alignItems= "center" justifyContent="center" spacing={0} style={{ minHeight: '100vh' }} >
            
            <Card className={classes.root}>   
                <h2>Stock</h2>
            </Card>
            <Card className={classes.root}>
                <h2>Cargar Producto</h2>
            </Card>
            <Card className={classes.root}>
               <h2> Historial de Ventas</h2>
            </Card>
            <Card className={classes.root}>
                <h2>Administrar Usuarios</h2>
            </Card>
            <Card className={classes.root}>
               <h2> Ofertas-Novedades</h2>
            </Card>
            
        </Grid>
    )
}