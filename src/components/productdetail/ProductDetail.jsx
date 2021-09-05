import React, {useEffect, useState} from "react";
import { Typography } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Paper } from "@material-ui/core";
import { useParams } from "react-router";
import Nav from '../nav/Nav';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  media: {
    width: '100%',
    paddingTop: "100%", // 16:9
    margin: "0vh",
    backgroundSize: 'contain'
  },
  container: {
    width: "80vh",
  },
}));

export default function ProductDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState({})

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
}, [id])


  return (
    <div>
      <Nav />
      <div className= {classes.container}>
      <CardMedia className={classes.media} image={detail.image} />
          <Typography component="h1">{detail.name}</Typography>
          
          <Typography variant="body2" component="h3">
            {detail.description}
          </Typography>
       
        <Paper>
          <div>
            <Typography variant="body2" component="h3">
              {detail.price}
            </Typography>
            <Typography variant="body2" component="h3">
              {detail.stock}
            </Typography>
            <Typography variant="body2" component="h3">
              {detail.brand}
            </Typography>
            <Typography variant="body2" component="h3">
              {detail.categories}
            </Typography>
          </div>
        </Paper>
      </div>
    </div>
  );
}
