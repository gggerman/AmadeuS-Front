import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Divider,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import { Link } from "react-router-dom";
import {numberWithCommas} from '../../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 280, // Para que las cards tengan el mismo ancho sin importar el tamaño de la imagen
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",

    "&:hover": {
      boxShadow: "0 10px 40px 0px rgba(0,117,49,0.3)",
    },
    // marginRight: "2vh",
    // marginBottom:"2vh"
    margin: "3vh",
  },
  media: {
    width: '100%',
    paddingTop: "100%", // 16:9
    margin: "0vh",
    backgroundSize: 'contain'
  },

  price: {
    color: theme.palette.primary.dark,
    fontSize: "25px",
  },
  icon: {
    color: "grey",
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
  text: {
    textDecoration: "none",
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    width: "18vh",
    fontSize: "1.7vh",
  },
}));

export default function ProductCard(product) {
  const { id, name, price, image } = product;
  //recibe de Products las props
  const classes = useStyles();

 


  return (
    <Card className={classes.root}>
      <IconButton aria-label="add to favorites">
        <FavoriteIcon className={classes.icon} />
      </IconButton>

      <Link to={`/detail/${id}`} style={{ textDecoration: "none" }}>
        <CardMedia className={classes.media} image={image} />
        <CardContent>
          <Typography component="h1" className={classes.price}>
            $ {numberWithCommas(price)}
          </Typography>
          <Typography variant="body2" component="h3">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Entrega en 24hs
          </Typography>
        </CardContent>
        <Divider variant="middle" light />
      </Link>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton aria-label="share">
          <ShareIcon className={classes.icon} />
        </IconButton>

        <Button variant="contained" className={classes.button}>
          {" "}
          Add to Cart{" "}
        </Button>
      </CardActions>
    </Card>
  );
}
