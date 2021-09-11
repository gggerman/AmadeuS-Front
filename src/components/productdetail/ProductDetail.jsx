import React, {useEffect, useState} from "react";
import { Typography, Divider } from "@material-ui/core";
import { CardMedia, Box, Grid, Button, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import Nav from '../nav/Nav';
import axios from 'axios';
import { numberWithCommas } from '../../utils';
import { useDispatch, useSelector } from "react-redux";


const useStyles = makeStyles((theme) => ({
  media: {
    width: '100%',
    paddingTop: "80%", // 16:9
    margin: "0vh",
    backgroundSize: 'contain',
    "&:hover": {
      backgroundSize: "larger"
    }
  },
  container: {
    width: "80vh",
    margin: '5vh'
  },
  mp:{
    maxWidth: '8vh',
    marginRight: '5vh',
    marginLeft: '5vh'
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    width: "20vh",
    height: '7vh',
    fontSize: "2vh",
    marginRight: '4vh',
    marginLeft: '4vh'
  },

}));

export default function ProductDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const { data, success, loading } = useSelector(({ app }) => app.detail);
  const dispatch = useDispatch();
  const classes = useStyles();

const getProductById = async () => {
  try{
     const response = await axios.get(`http://localhost:3001/products/${id}`)
      setDetail(response.data)
  }
  catch (error){
      console.log(error)
  }
}

useEffect(() => {
  getProductById(id) 
}, [])


  return (
    <div>
      {
        detail.price && 
        <div>
         <Nav />
       <Grid container style = { { marginTop: '-4vh'}}>

        <Grid item xs ={6}>
            <CardMedia className={classes.media} image={detail.image} />
        </Grid>

        <Grid item xs ={6}>
            <Typography component="h1" variant ='h4' className = {classes.container}>
              {detail.name}
              <Divider variant="middle" light />
              </Typography>
              <Typography variant="h3" component="h2" className = {classes.container}>
                ${numberWithCommas(detail.price)}
                <Divider variant="fullwidth" />
              </Typography>
            <Typography component="p" variant ='body2' className = {classes.container}>
                  {detail.description}
            </Typography>


              <Grid style = {{width:'600px',display: 'flex',justifyContent: 'center'}}>

                <Box> <img src={'https://img.icons8.com/color/480/mercado-pago.png'} className = {classes.mp} /></Box>

                <Button variant="contained" className={classes.button}>
                  Add to Cart
                </Button>
                <Link to={`/order/${id}`} style ={{textDecoration:'none'}}>
                  <Button variant="contained" className={classes.button}>
                    Comprar
                  </Button>
                </Link>
              </Grid>
              {data.stock === 0 ? (
                <Typography
                  variant="body2"
                  color="error"
                  component="h3"
                  className={classes.container}
                >
                  Sin stock
                </Typography>
                
              ) : ( 
                <Typography
                  variant="body2"
                  component="h3"
                  className={classes.container}
                >
                  Stock: {data.stock}
                </Typography>
              )}
              <Typography
                variant="body2"
                component="h3"
                className={classes.container}
              >
                {data.brand}
              </Typography>
        </Grid>
      </Grid>


        </div>

      }


    </div>
  );
}
