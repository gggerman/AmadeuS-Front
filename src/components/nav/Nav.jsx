import React, { useContext, useEffect, useState } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Button,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SearchBar from "../searchbar/SearchBar";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { UserContext } from "../shoppingcart/UserContext";
import LoginLogout from "../account/LoginLogout";
import logo from "./logo.jpg";
import { useSelector } from "react-redux";
import { saveUser } from "../../redux/actions/users";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  grow: {
    // flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(7),
    width: "40%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  offset: theme.mixins.toolbar,
  link: {
    textDecoration: "none",
    color: theme.palette.primary.dark,
  },
  navDisplay: {
    display: "flex",
    justifyContent: "space-between",
  },
  icon: {
    marginTop: "2vh",
    width: "8vh",
    backgroundSize: "contain",
    margin: "auto",
    borderRadius: "6px",
  },
  avatar: {
    width: "2vw",
    borderRadius: "15px",
  },
  welcome: {
    color: theme.palette.primary.light,
    fontSize: "80%",
    alignSelf: "center",
    display: "flex",
  },
}));

export default function Nav() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const { isAuthenticated, user, isLoading } = useAuth0();
  const userDB = useSelector((state) => state.app.user);
  console.log("usuario DB", userDB);
  const dispatch = useDispatch();
  // console.log("nav", isAuthenticated);
  // console.log("nav-user", user);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const { shoppingCart } = useContext(UserContext);
  const { cartQuantity } = shoppingCart;
  const menuId = "primary-search-account-menu";

  useEffect(() => {
    if (user) {
      dispatch(saveUser(user));
    }
  }, [dispatch]);

  const adminAuth = function () {
    if (!isLoading) {
      if (user) {
        return (user.email && user.email === "crismaxbar@gmail.com") ||
          user.email === "heisjuanpablo@gmail.com" ||
          user.email === "leandrobuzeta@gmail.com" ||
          user.email === "juanmhdz99@gmail.com"
          ? true
          : false;
      }
    }
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <LoginLogout />
      {adminAuth() && (
        <Link to="/adminpanel" className={classes.link}>
          <MenuItem>Administrar</MenuItem>
        </Link>
      )}
      {userDB && (
        <Link to="/userprofile" className={classes.link}>
          <MenuItem>Perfil</MenuItem>
        </Link>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar
      style={{
        position: "relative",
        backgroundColor: "rgb(0, 23, 20)",
        width: "100%",
      }}
    >
      <Toolbar className={classes.navDisplay}>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <img src={logo} className={classes.icon} />
        </Link>
        <SearchBar />

        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          {user && (
            <Typography
              component="p"
              variant="body2"
              className={classes.welcome}
            >
              Bienvenido {user.given_name} Bartolome Mitre 177..
            </Typography>
          )}
          <IconButton
            aria-label="show 4 new mails"
            color="inherit"
            component={Link}
            to="/cart"
          >
            <Badge badgeContent={cartQuantity} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={null} color="secondary">
              <FavoriteIcon />
            </Badge>
          </IconButton>

          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            {userDB ? (
              <img src={userDB.picture} className={classes.avatar} />
            ) : (
              <AccountCircle />
            )}
          </IconButton>
        </div>
      </Toolbar>
      {/* <div style={{display:'flex', justifyContent:'flex-end', marginRight:'2vw'}}>
          <Link to='/adduser' style={{ textDecoration: "none", color:"#ffffff" }}>
            <Typography variant="p" noWrap>
              Registrate
            </Typography>
          </Link>
        </div> */}
      {/* Sin esto el nav tapa los ordenamientos y filtrado y no se ven */}
      {/* <div className={classes.offset}></div> NO BORRAR */}
      {/* <div className={classes.offset}></div> NO BORRAR */}
      {renderMobileMenu}
      {renderMenu}
    </AppBar>
  );
}
