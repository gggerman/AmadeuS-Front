import React from "react";
import {
  Grid,
  Card,
  CardActions,
  Box,
  Typography,
  Button,
  Container,
  Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useRouteMatch } from "react-router-dom";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import NavSecondary from "../navsecondary/NavSecondary";

// idea: cards de cada funcionalidad
//-stock. edicion de lo que ya esta subido
//-cargar producto, categorias
//-historial de ventas
//-administrar usuarios
//-secciones (ofertas-novedades)
const useStyles = makeStyles((theme) => ({
  body: {
    margin: "0",
    height: "100%",
    backgroundColor: 'RGB(238, 238, 238)'
  },
  root: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    width: 180,
    height: 200,
    margin: "2vh",
    padding: "1vh",
    background: "linear-gradient(to right, #093028, #237a57)",
    "&:hover": {
      background: "linear-gradient(to left, #16222a, #3a6073)",
      cursor: "pointer",
    },
    color: theme.palette.primary.contrastText,
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.contrastText,
  },
  backhome: {
    display: "flex",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "#16222A",
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

export default function AdminPanel() {
  const classes = useStyles();
  let { path, url } = useRouteMatch();

  return (
    <Container className={classes.body}>
      <NavSecondary />

      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={0}
        style={{ minHeight: "65vh", marginTop: '5vh' }}
      >
        <Paper elevation={4} style={{margin:'1vh'}}>
        <Link to="/stock" className={classes.link}>
          <Card className={classes.root}>
            <Typography variant="h6">
              Stock
            </Typography>
          </Card>
        </Link>
        </Paper>

        <Paper elevation={4} style={{margin:'1vh'}}>
        <Link to="/addcategory" className={classes.link}>
          <Card className={classes.root}>
            <Typography variant="h6">
              Crear Nueva Categoría
            </Typography>
          </Card>
        </Link>
        </Paper>

        <Paper elevation={4} style={{margin:'1vh'}}>
        <Link to="/addproduct" className={classes.link}>
          <Card className={classes.root}>
            <Typography variant="h6">
              Cargar Producto
            </Typography>
            <Box>
              <AddAPhotoIcon />
            </Box>
          </Card>
        </Link>
        </Paper>

        <Paper elevation={4} style={{margin:'1vh'}}>
        <Link to="/usermanagement" className={classes.link}>
          <Card className={classes.root}>
            <Typography variant='h6'>Administrar Usuarios</Typography>
          </Card>
        </Link>
        </Paper>

        <Paper elevation={4} style={{margin:'1vh'}}>
        <Link to="/sales" className={classes.link}>
          <Card className={classes.root}>
            <Typography variant="h6">
              Historial de Ventas
            </Typography>
          </Card>
        </Link>
        </Paper>

      </Grid>

    </Container>
  );
}
