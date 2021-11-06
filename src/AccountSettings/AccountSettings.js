import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import firebase from "../firebase/firebase";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    margin: "0 auto",
    width: "20%",
    background: "rgba(0, 0, 0,.9)",
    padding: "2%",
    borderRadius: "15px",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "20%",
    },
  },
  delButton: {
    background: "red",
    color: "white",
    "&:hover": {
      background: "#f7233f",
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
  labelStyle: {
    color: "lightgray",
  },
  errorMsg: {
    color: "red",
  },
  goBack: {
    color: "white",
    border: "1px white solid",
    background: "Transparent",
    borderRadius: "5px",
    "&:hover": {
      border: "1px green solid",
    },
  },
}));

function AccountSettings(props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState(null);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const user = firebase.auth().currentUser;
  var db = firebase.firestore();

  const deleteAccount = () => {
    reauth().then((val) => {
      if (val) {
        db.collection("users")
          .doc(props.userStatus)
          .delete()
          .then(() => {
            const user = firebase.auth().currentUser;

            user
              .delete()
              .then(() => {
                history.push("/");
              })
              .catch((error) => {
                //console.log("error in deleting user", error.message);
                setErrorMsg("Error in deleting user. Please try again later.");
                // An error ocurred
                // ...
              });
          })
          .catch(() => {
            //console.error("Error removing document: ", error);
            setErrorMsg("Database error. Please try again later.");
          });
      }
    });
  };

  const reauth = async () => {
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );

    const result = await user
      .reauthenticateWithCredential(credential)
      .then(() => {
        return true;
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          setErrorMsg("Invalid password provided.");
        }
        if (error.code === "auth/too-many-requests") {
          setErrorMsg("Too many password attempts. Please try again later");
          setDisableSubmit(true);
        }

        return false;
      });
    return result;
  };

  return (
    <div>
      <div className={classes.container}>
        <h1>Account Settings</h1>
        <Button
          onClick={() => setDialogOpen(true)}
          className={classes.delButton}
        >
          Delete Account
        </Button>
        <br />
        <br />
        <Button
          onClick={() => history.push("/dashboard")}
          className={classes.goBack}
        >
          Back to Dashboard
        </Button>
      </div>
      <Dialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <DialogTitle className={classes.dialog}>Delete Account</DialogTitle>

        <DialogContent className={classes.dialog}>
          Please re-enter your password to delete your account.
          <br />
          <TextField
            label="password"
            name="password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            InputLabelProps={{
              className: classes.labelStyle,
            }}
          />
          <br />
          {errorMsg ? <p className={classes.errorMsg}>{errorMsg}</p> : null}
          <Button
            onClick={deleteAccount}
            disabled={disableSubmit}
            color="primary"
            style={{ float: "right" }}
          >
            Delete Now
          </Button>
          <Button
            color="primary"
            style={{ float: "right" }}
            onClick={() => {
              setDisableSubmit(false);
              setDialogOpen(false);
            }}
          >
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AccountSettings;
