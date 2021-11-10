import React, { useState } from "react";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import firebase from "../firebase/firebase";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  inputStyle: {
    background: "white",
    color: "black",
    borderRadius: "5px",
    margin: "5px",
  },
  loginContainer: {
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
  submitButton: {
    display: "block",
    // width: "50em",
    background: "green",
    margin: "0 auto",
    "&:hover": {
      background: "#2fa134",
    },
  },

  inputContainer: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",

    justifyContent: "center",
  },
  errorMessage: {
    color: "red",
  },
  closeIcon: {
    position: "absolute",
    top: "0",
    right: "0",
    margin: "3px 3px 0 0",
    cursor: "pointer",
    "&:hover": {
      color: "red",
    },
  },
}));

function NewAccount() {
  const classes = useStyles();
  const history = useHistory();

  var db = firebase.firestore();

  const [formVals, setFormVals] = useState({});
  const [emailValid, setEmailValid] = useState(false);
  const [passwordOneValid, setPasswordOneValid] = useState(false);
  const [passwordTwoValid, setPasswordTwoValid] = useState(false);
  const [errorFromFB, setErrorFromFB] = useState(null);

  const handleChange = (e) => {
    setFormVals({ ...formVals, [e.target.name]: e.target.value });
    if (e.target.name === "email") {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value) === true) {
        setEmailValid(true);
      } else {
        setEmailValid(false);
      }
    }

    //validate password: at least 8 chars, including 1 letter and 1 number, optional special chars
    if (e.target.name === "password") {
      if (
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{8,}$/.test(
          e.target.value
        ) === true
      ) {
        setPasswordOneValid(true);
        if (e.target.value === formVals.retype) {
          setPasswordTwoValid(true);
        } else {
          setPasswordTwoValid(false);
        }
      } else {
        setPasswordOneValid(false);
        setPasswordTwoValid(false);
      }
    }

    if (e.target.name === "retype") {
      if (e.target.value === formVals.password) {
        setPasswordTwoValid(true);
      } else {
        setPasswordTwoValid(false);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(
        event.target.email.value,
        event.target.password.value
      )
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;

        db.collection("users")
          .doc(user.uid)
          .set({
            email: event.target.email.value,
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
        // ...
        history.push("/dashboard");
      })
      .catch((error) => {
        var errorMessage = error.message;

        setErrorFromFB(errorMessage);
        // ..
      });
    //setFormVals({ email: "", password: "" });
  };

  return (
    <Fade in={true}>
      <div className={classes.loginContainer}>
        <CloseIcon
          className={classes.closeIcon}
          onClick={() => {
            history.push("/");
          }}
        />
        <h2 style={{ color: "red" }}>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className={classes.inputContainer}>
            <TextField
              id="standard-basic"
              label="E-mail Address"
              name="email"
              type="email"
              value={formVals.email}
              onChange={handleChange}
              className={classes.inputStyle}
            />
            {emailValid ? (
              <CheckCircleIcon />
            ) : (
              <CheckCircleIcon visibility={"hidden"} />
            )}
          </div>

          <br />

          <div className={classes.inputContainer}>
            <TextField
              id="standard-basic"
              label="Password"
              name="password"
              type="password"
              value={formVals.password}
              onChange={handleChange}
              className={classes.inputStyle}
            />
            {passwordOneValid ? (
              <CheckCircleIcon />
            ) : (
              <CheckCircleIcon visibility={"hidden"} />
            )}
          </div>

          <br />
          <div className={classes.inputContainer}>
            <TextField
              disabled={!passwordOneValid}
              id="standard-basic"
              label="Retype Password"
              name="retype"
              type="password"
              value={formVals.retype}
              onChange={handleChange}
              className={classes.inputStyle}
            />
            {passwordTwoValid ? (
              <CheckCircleIcon />
            ) : (
              <CheckCircleIcon visibility={"hidden"} />
            )}
          </div>

          <br />
          <p>
            <strong>
              Password must be at least 8 characters, and contain at least one
              letter and one number.
            </strong>
          </p>
          <br />

          {errorFromFB ? (
            <p className={classes.errorMessage}>
              <strong>{errorFromFB}</strong>
            </p>
          ) : null}

          <Button
            type="submit"
            className={classes.submitButton}
            disabled={!emailValid || !passwordOneValid || !passwordTwoValid}
          >
            Create Account!
          </Button>
        </form>
      </div>
    </Fade>
  );
}

export default NewAccount;
