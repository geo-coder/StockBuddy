import React from "react";
import "./LandingPage.css";

import { Route, Switch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import LandingPageHome from "./LandingPageHome";
import NewAccount from "./NewAccount";
import Login from "./Login";

const useStyles = makeStyles((theme) => ({
  root: {
    //height: '100vh',

    backgroundImage:
      "url(https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80)",

    // backgroundRepeat: 'no-repeat',
    // backgroundSize: 'cover',
    // backgroundAttachment: 'fixed'

    minHeight: "100%",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  title: {
    margin: "0 auto 0 auto",
    paddingTop: "3%",

    textAlign: "center",
    fontSize: "xx-large",
    color: "white",
    [theme.breakpoints.down("sm")]: {
      fontSize: "large",
      marginBottom: "1em",
    },
  },
  buttonContainer: {
    margin: "2% auto 0 auto",
    textAlign: "center",
  },
  loginButton: {
    border: "white 1px solid",
    color: "white",
    "&:hover": {
      //background: 'pink',
      border: "red 1px solid",
    },
  },
  newAccountButton: {
    marginRight: "2rem",
    background: "rgb(255, 70, 70)",
    "&:hover": {
      //background: 'pink',
      background: "rgb(255, 30, 30)",
    },
  },
  demoButton: {
    background: "#253e99",
    color: "white",
    borderRadius: "5px",
  },
}));

function LandingPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Header/> */}

      <div className={classes.title}>
        <h1>StockBuddy</h1>
        <h3>Keep Track of Your Stock Portfolio</h3>
      </div>

      <Switch>
        <Route path="/" exact>
          <LandingPageHome classes={classes} />
        </Route>
        <Route path="/new-account" exact>
          <NewAccount />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
      </Switch>

      <CssBaseline />
    </div>
  );
}

export default LandingPage;
