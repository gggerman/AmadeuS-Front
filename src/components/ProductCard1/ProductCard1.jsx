import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, Divider } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 270,
    boxShadow:"0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
        boxShadow:"0 10px 40px 0px rgba(0,117,49,0.3)",
    },
    marginRight: "2vh"
    
  },
  media: {
    height: 0,
    paddingTop: '50%', // 16:9
    margin: '1vh'
  },
  
  price: {
      color: theme.palette.primary.dark,
      fontSize: '25px'
  },
  icon: {
      color: 'grey',
          "&:hover": {
              color: theme.palette.primary.light
            },   
  },
  text: {
    textDecoration: 'none'
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
        backgroundColor: theme.palette.primary.light, 
    }
  }
  
}));

export default function ProductCard1() {
  const classes = useStyles();
  

  return (
    <Card className={classes.root} >
      <CardHeader
        action={
            <IconButton aria-label="add to favorites">
            <FavoriteIcon className={classes.icon}/>
          </IconButton>
        }
        title="Ibanez JEM Steve Vai Signature"
        subheader=""
      />
      <Divider variant="middle" light/>
    <Link to ="/productDetail" style = {{textDecoration:'none'}}>
      <CardMedia
        className={classes.media}
        image={'https://http2.mlstatic.com/D_NQ_NP_600860-MLA31587514157_072019-O.jpg'}
      />
      <CardContent>
        <Typography  component="h1" className= {classes.price}>
          $120.999
        </Typography>
        <Typography variant= "body2" color="textSecondary" component ="p">
            Entrega en 24hs
        </Typography>
        
      </CardContent>
      <Divider variant="middle" light/>
      </Link>
      <CardActions style = {{display:'flex', justifyContent: 'space-between'}}>
       
            <IconButton aria-label="share">
            <ShareIcon className={classes.icon}/>
            </IconButton>

            <Button variant="contained" className = {classes.button}> Add to Cart </Button>
        
      </CardActions>

      
    </Card>
  );
}