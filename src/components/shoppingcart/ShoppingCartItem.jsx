import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { useContext, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Cancel } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import deleteOneItem from "../../redux/actions/deleteOneItem";
import { UserContext } from "./UserContext";
import React from "react";
import addToCart from "../../redux/actions/addToCart";
import { numberWithCommas } from "../../utils";
import { decrementQuantityCart } from "../../redux/actions/decrementQuantityCart";
const { REACT_APP_SERVER } = process.env;

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "8px",
    display: "flow-root",
  },
  mediaimg: {
    maxWidth: "max-content",
    height: "100px",
    margin: "0 - 100%",
    objectFit: "contain",
  },
}));

const ShoppingCartItem = ({
  _id,
  name,
  description,
  price,
  stock,
  brand,
  image,
  categories,
  qualification,
  quantity,
}) => {
  const classes = useStyles();
  const [counter, setCounter] = useState(quantity > stock ? stock : quantity);
  const [totalValue, setTotalValue] = useState(price);
  const dispatch = useDispatch();
  const { shoppingCart, setShoppingCart } = useContext(UserContext);
  const { cartQuantity, totalPurchase } = shoppingCart;

  const increment = (e) => {
    setCounter(counter + 1);
    setShoppingCart((value) => ({
      ...value,
      cartQuantity: cartQuantity + 1,
    }));
    dispatch(addToCart(_id));
  };

  const decrement = (e) => {
    setCounter(counter - 1);
    dispatch(decrementQuantityCart(_id));
    if (cartQuantity > 0) {
      setShoppingCart((value) => ({
        ...value,
        cartQuantity: cartQuantity - 1,
      }));
    }
  };

  const handleDelete = (e) => {
    dispatch(deleteOneItem(_id));
    setShoppingCart((cant) => ({
      ...cant,
      cartQuantity: cartQuantity - quantity,
    }));
  };

  return (
    <Container className={classes.root}>
      <Grid>
        <Card
          style={{
            display: "flex",
            alignItems: "center",
            background: "#E5DFDF",
          }}
        >
          <Box
            style={{
              overflow: "hidden",
              Width: "100px",
              height: "100px",
              textAlign: "center",
              overflow: "hidden",
            }}
            width="100px"
          >
            <CardMedia
              className={classes.mediaimg}
              component="img"
              alt="img"
              image={image}
            />
          </Box>
          <Container>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h6"
                style={{
                  width: "500px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {name}
              </Typography>
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Box style={{border: '2px solid #B7B9C0', borderRadius:'20px', color:'black', width: 'max-content', marginRight: '90px' }}>
                  <IconButton
                    aria-label="remove"
                    onClick={decrement}
                    disabled={counter === 1 || counter === 0}
                  >
                    <RemoveIcon />
                  </IconButton>
                  {counter}
                  <IconButton
                    aria-label="add"
                    onClick={increment}
                    disabled={counter === stock}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
                <Box>
                  <Typography variant="subtitle2" align="center">
                    {stock} unidades
                  </Typography>
                </Box>
                <Box marginRight={7} ml={7} style={{ width: "max-content" }}>
                  <Typography variant="body1" style={{fontWeight: 'bold'}}>
                    $ {numberWithCommas(totalValue * counter)}
                  </Typography>
                </Box>
                <Box>
                  <IconButton onClick={handleDelete}>
                    <Cancel />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Container>
        </Card>
      </Grid>
    </Container>
  );
};

export default ShoppingCartItem;
