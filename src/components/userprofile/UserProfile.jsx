import React from "react";
import NavSecondary from "../navsecondary/NavSecondary";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CreateIcon from "@material-ui/icons/Create";
import HistoryIcon from "@material-ui/icons/History";

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    width: "13vw",
    height: "13vw",
    margin: "0vh",
    borderRadius: "6.5vw",
  },
  icon: {
    color: "grey",
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
}));

function UserProfile() {
  const { user } = useAuth0();
  const classes = useStyles();
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <NavSecondary />
      <div style={{ marginTop: "10vh", display: "flex", width: "70%" }}>
        <img className={classes.media} src={user.picture} />
        <div style={{ display: "flex" }}>
          <CardContent>
            <Typography variant="h5" component="h1">
              Nombre: {user.name}
            </Typography>
            <Typography component="h1" className={classes.price}>
              Email: {user.email}
            </Typography>
          </CardContent>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem button>
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
            <ListItem button>
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary="Editar cuenta" />
            </ListItem>
          </List>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
