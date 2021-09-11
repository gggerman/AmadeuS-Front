import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import getAllProducts from "../../redux/actions/getAllProducts";
import { numberWithCommas } from "../../utils";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 1000, 
    height: 240,
    display: "flex",
    justifyContent: "space-between",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 10px 40px 0px rgba(0,117,49,0.3)",
    },
    margin: "3vh",
  },
  media: {
    width: "100%",
    height: "100%",
    minHeight: 220,
    minWidth: 240,
    margin: "0vh",
    backgroundSize: "contain",
  },

  price: {
    color: theme.palette.primary.dark,
    fontSize: "24px",
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
    width: "16vh",
    fontSize: "1.6vh",
  },
  description: {
    overflow: "auto",
  },
}));

function Stock() {
  const { data, loading, success } = useSelector(
    ({ app }) => app.productsLoaded
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/products/${id}`);
  };

  return (
    <div style={{ display: "contents" }}>
      {loading && (
        <div style={{ display: "contents" }}>
          <div></div>
          <div className="loading">
            <CircularProgress />
          </div>
        </div>
      )}
      {!loading && success && (
        <>
          {data.map((product) => {
            return (
              <Grid>
                <Card className={classes.root}>
                  <div style={{ display: "flex" }}>
                    <div style={{ height: "220px", width: "240px" }}>
                      <CardMedia
                        className={classes.media}
                        image={product.image}
                      />
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <CardContent>
                        <Typography component="h1" className={classes.price}>
                          $ {numberWithCommas(product.price)}
                        </Typography>
                        <Typography variant="h5" component="h1">
                          {product.name}
                        </Typography>
                        {/* <Typography className={classes.description} variant="body2" component="h3">
                          {product.description}
                        </Typography> */}
                        {product.stock === 0 ? (
                          <Typography
                            variant="body2"
                            color="error"
                            component="p"
                          >
                            Sin stock
                          </Typography>
                        ) : (
                          <Typography variant="body2" component="p">
                            Cantidad: {product.stock} unidades
                          </Typography>
                        )}
                      </CardContent>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <CardActions
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          flexDirection: "column",
                          margin: "0",
                        }}
                      >
                        <Link
                          to={`/editproduct/${product._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button
                            variant="contained"
                            className={classes.button}
                          >
                            Editar
                          </Button>
                        </Link>
                        <form
                          onSubmit={() => handleDelete(product._id)}
                          style={{ display: "flex", margin: "0" }}
                        >
                          <Button
                            variant="contained"
                            className={classes.button}
                            type="submit"
                          >
                            Eliminar
                          </Button>
                        </form>
                      </CardActions>
                    </div>
                  </div>
                </Card>
              </Grid>
            );
          })}
        </>
      )}
    </div>
  );
}

export default Stock;
