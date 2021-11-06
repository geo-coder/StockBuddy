import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBox from "./SearchBox";
import Portfolio from "./Portfolio";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
//import Button from "@material-ui/core/Button";
import Button from "./UI/Button";
import firebase from "../firebase/firebase";
import OtherHeader from "../OtherHeader";
import NotFound from "../NotFound";

import { Switch, Route } from "react-router-dom";
import AccountSettings from "../AccountSettings/AccountSettings";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    margin: "2% 15% 0 15%", //the first val used to be 2%
    display: "flex",
    justifyContent: "space-between",
    height: "80vh",

    [theme.breakpoints.down("md")]: {
      margin: "2% 5% 0 5%", //the first val used to be 2%
    },

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      height: "auto",
      margin: "2% 5% 0 5%", //the first val used to be 2%
      paddingBottom: "125px",
    },
  },
  dialog: {
    background: "#1e2024",
    color: "white",
  },
  dialogButton: {
    background: "pink",
    marginTop: "1em",
    float: "right",
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();
  var db = firebase.firestore();

  const [costAverages, setCostAverages] = useState({});
  const [intialNotify, setInitialNotify] = useState(true);
  const [dbError, setDBError] = useState(null);

  useEffect(() => {
    //get user's cost averages from db

    if (props.userStatus) {
      firebase
        .firestore()
        .collection("users") //changed this
        .doc(props.userStatus)
        .get()
        .then((doc) => {
          if (doc.exists) {
            if (doc.data().portfolio) {
              setCostAverages(doc.data().portfolio);
            }
          }
        })
        .catch(() => {
          setDBError(
            "Sorry, there is a problem accessing your portfolio at this time. Please try again later"
          );
        });
    }
  }, [props.userStatus]);

  const [openModal, setOpenModel] = useState(false);

  const [portfolioClicked, setPortfolioClicked] = useState(null);

  //adds share amount of a specific stock in pfolio
  const submitNewShares = (tickerValue, shares, value) => {
    let copy = { ...costAverages };
    copy[tickerValue] = {
      shares: shares,
      averageCostPerShare: value,
    };

    //save to DB

    //set added position in demo mode
    if (!props.userStatus) {
      setCostAverages(copy);
      setPortfolioClicked(tickerValue);
    }

    //set added position in user account mode
    if (props.userStatus) {
      //old db structure
      // db.collection("users")
      //   .doc(props.userStatus)
      //   .collection("costAverages")
      //   .doc(tickerValue)
      //   .set(copy[tickerValue]);

      db.collection("users")
        .doc(props.userStatus)
        .set({ portfolio: { ...copy } }, { merge: true })
        .then(() => {
          setCostAverages(copy);
          setPortfolioClicked(tickerValue);
        })
        .catch(() => {
          setDBError(
            "Sorry, there is a problem accessing the database at this time. Please try again later"
          );
        });
    }

    // setCostAverages(copy);

    // setPortfolioClicked(tickerValue);
  };

  const removePosition = (ticker) => {
    let copy = { ...costAverages };
    delete copy[ticker];

    if (!props.userStatus) {
      setCostAverages(copy);
      setPortfolioClicked(null);
    }

    if (props.userStatus) {
      db.collection("users")
        .doc(props.userStatus)
        .update({ portfolio: { ...copy } })
        .then(() => {
          setCostAverages(copy);
          setPortfolioClicked(null);
        })
        .catch(() => {
          setDBError(
            "Sorry, there is a problem accessing the database at this time. Please try again later"
          );
        });
    }
  };

  const dash = (
    <div className={classes.root}>
      <SearchBox
        portfolioClicked={portfolioClicked}
        setPortfolioClicked={setPortfolioClicked}
        submitNewShares={submitNewShares}
        costAverages={costAverages}
        setOpenModel={setOpenModel}
        removePosition={removePosition}
      />
      <Portfolio
        setPortfolioClicked={setPortfolioClicked}
        portfolioClicked={portfolioClicked}
        costAverages={costAverages}
      />

      <Dialog
        open={intialNotify}
        onClose={() => {
          setInitialNotify(false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <DialogTitle className={classes.dialog}>Important Note</DialogTitle>

        <DialogContent className={classes.dialog}>
          This software is merely a programming demonstration and is not a
          complete product. Do not use this for official financial planning or
          tracking as it may contain errors and inconsistencies. App and
          associated user accounts may be deleted at any time.
          <br />
          <Button
            color="primary"
            style={{ float: "right" }}
            onClick={() => {
              setInitialNotify(false);
            }}
          >
            Ok
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(dbError)}
        onClose={() => {
          setDBError(false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <DialogTitle className={classes.dialog}>Database Error</DialogTitle>

        <DialogContent className={classes.dialog}>
          {dbError}
          <br />
          <Button
            color="primary"
            style={{ float: "right" }}
            onClick={() => {
              setDBError(false);
            }}
          >
            Ok
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openModal}
        onClose={() => {
          setOpenModel(false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <DialogTitle className={classes.dialog}>API limit Reached</DialogTitle>

        <DialogContent className={classes.dialog}>
          You've reached an API limit for calling stock information. Please wait
          a minute and try again. This is a demo application using
          Alphavantage's free API service. I ain't paying for premium!
          <br />
          <Button
            color="primary"
            style={{ float: "right" }}
            onClick={() => {
              setOpenModel(false);
            }}
          >
            Ok
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );

  return (
    <div>
      <OtherHeader userStatus={props.userStatus} />

      <Switch>
        <Route path="/dashboard" exact>
          {dash}
        </Route>

        <Route path="/dashboard/account-settings" exact>
          <AccountSettings userStatus={props.userStatus} />
        </Route>

        <Route path={"*"}>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

export default Dashboard;
