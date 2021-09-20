import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../nav/Nav";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Container,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CreateIcon from "@material-ui/icons/Create";
import HistoryIcon from "@material-ui/icons/History";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUser } from "../../redux/actions/users";

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    width: "13vw",
    height: "13vw",
    margin: "0vh",
    borderRadius: "6.5vw",
    backgroundSize: "contain",
  },
  icon: {
    color: "grey",
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
  container: {
    boxShadow: "0 10px 40px 0px rgba(0,117,49,0.3)",
    display: "flex",
    justifyContent: "space-between",
    width: "70%",
    height: "100%",
    borderRadius: "10px",
    padding: "2vh",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
}));

function UserProfile() {
  const { user } = useAuth0();
  const userDB = useSelector((state) => state.app.user);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(saveUser(user));
    }
  }, [dispatch]);

  return (
    <Grid
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Nav />
      <Container className={classes.container}>
        <img className={classes.media} src={user.picture} />
        <CardContent>
          <Typography variant="h5" component="h1">
            Nombre: {user.name}
          </Typography>
          <Typography component="h1" className={classes.price}>
            Email: {user.mail}
          </Typography>
        </CardContent>
        <div style={{ display: "flex" }}>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem button component={Link} to="/favorites">
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary="Favoritos" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary="Historial de compras" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/shoppinghistory"
              className={classes.link}
            >
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary="Editar cuenta" />
            </ListItem>
          </List>
        </div>
      </Container>
    </Grid>
  );
}

export default UserProfile;
