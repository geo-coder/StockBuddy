import { useState } from "react";

import LandingPage from "./LandingPage/LandingPage";
import NotFound from "./NotFound";

import { CssBaseline } from "@material-ui/core";
//import Header from "./Header";

import { Route, Switch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
//import OtherHeader from "./OtherHeader";
import Dashboard from "./dashboard/Dashboard";
//import AccountSettings from "./AccountSettings/AccountSettings";

import firebase from "./firebase/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    height: "100vh",
    width: "100vw",
    background: "black",
    color: "white",
    [theme.breakpoints.down("sm")]: {
      height: "100vh",
      overflowY: "scroll",
      webkitOverflowScrolling: "touch",
    },
  },
}));

function App() {
  const classes = useStyles();

  //const [portfolio, setPortfolio] = useState([]);

  const [userStatus, setUserStatus] = useState(null);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      //console.log("user state changed,", uid);
      setUserStatus(uid);
      // ...
    } else {
      // console.log("user state changed signout?");
      setUserStatus(null);
      // User is signed out
      // ...
    }
  });

  //old className={"App" + " " + classes.root}
  return (
    <div className={`App ${classes.root}`}>
      <CssBaseline />

      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/login" exact>
          <LandingPage />
        </Route>
        <Route path="/new-account" exact>
          <LandingPage />
        </Route>

        <Route path="/dashboard">
          <Dashboard userStatus={userStatus} />
        </Route>

        <Route path={"*"}>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
