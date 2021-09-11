import React from "react";
import Footer from "../footer/Footer";
import Catalogue from "../catalogue/Catalogue";
import { makeStyles } from "@material-ui/core/styles";
import Nav from "../nav/Nav";

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
  return (
    <div className={classes.home}>
      <Nav />
      <Catalogue />
      <Footer />
    </div>
  );
}
