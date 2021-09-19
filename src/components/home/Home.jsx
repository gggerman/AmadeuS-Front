import React, { useEffect } from "react";
import Footer from "../footer/Footer";
import Catalogue from "../catalogue/Catalogue";
import { makeStyles } from "@material-ui/core/styles";
import Nav from "../nav/Nav";
import { saveUser } from "../../redux/actions/users";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  home: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

export default function Home() {
  const classes = useStyles();
  const userDB = useSelector((state) => state.app.user);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();

  // Cuando el usuario se loguea, se envía la información a DB
  useEffect(() => {
    // console.log('entre a useEffect, user', user)
    // console.log('entre a useEffect, userDB', userDB)
    isAuthenticated && !userDB && dispatch(saveUser(user));
  }, [isAuthenticated]);

  return (
    <div className={classes.home}>
      <Nav />
      <Catalogue />
      <Footer />
    </div>
  );
}
