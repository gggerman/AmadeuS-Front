import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Container,
  CardMedia,
  makeStyles,
  Grid,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { numberWithCommas } from "../../utils";
import NavSecondary from "./../navsecondary/NavSecondary";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, saveUser } from "../../redux/actions/users";
import { useAuth0 } from "@auth0/auth0-react";
const { REACT_APP_SERVER } = process.env;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "3vh",
    display: "flex",
    justifyContent: "space-around",
    border: "1px solid black",
  },
  media: {
    width: "10%",
    margin: "0vh",
    backgroundSize: "contain",
  },
  tableCell: {
    padding: "1vw",
    height: "10%",
    width: "10vh",
  },
  img: {
    width: "15vh",
    height: "15vh",
    backgroundSize: "contain",
  },
}));

export default function ShoppingHistory() {
  const classes = useStyles();
  const [invoice, setInvoice] = useState(1);
  const dispatch = useDispatch();
  const [orders, setOrders] = useState();
  const { user } = useAuth0();
  const userDB = useSelector((state) => state.app.user);

  useEffect(() => {
    if (userDB) {
      dispatch(getUserById(userDB._id));
    }
  }, [dispatch]);

  return (
    <>
      <NavSecondary />
      <Grid container style={{ marginTop: "15vh" }}>
        <Table style={{ marginLeft: "45vh" }}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}> Factura </TableCell>
              <TableCell className={classes.tableCell}> Productos </TableCell>
              <TableCell className={classes.tableCell}> Total </TableCell>
              <TableCell className={classes.tableCell}> Estado </TableCell>
              <TableCell className={classes.tableCell}> Ubicacion </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userDB &&
              userDB.orders.map((order) => (
                <TableRow>
                  <TableCell className={classes.tableCell}> 0001 </TableCell>
                  <TableCell className={classes.tableCell}>
                    {order.products &&
                      order.products.map((product) => (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CardMedia
                            image={product.image}
                            className={classes.img}
                          />
                          <Typography>
                            ${numberWithCommas(product.price)}
                          </Typography>
                        </div>
                      ))}
                  </TableCell>
                  <TableCell>
                    {" "}
                    $
                    {numberWithCommas(
                      order.products.reduce((acc, item) => {
                        return (acc += item.price);
                      }, 0)
                    )}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {order.status === "approved" &&
                      order.status.toUpperCase()}{" "}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Grid>
    </>
  );
}
