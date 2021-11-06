import React, { useState } from "react";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import firebase from "../firebase/firebase";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  inputStyle: {
    background: "white",
    color: "black",
    borderRadius: "5px",
    margin: "5px",
  },
  // loginContainer: {
  //   textAlign: "center",
  //   margin: "2% auto",
  // },
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
  submitButton: {
    display: "block",
    // width: "50em",
    background: "green",
    margin: "0 auto",
    "&:hover": {
      background: "#2fa134",
    },
  },
}));

function Login() {
  const classes = useStyles();
  const history = useHistory();

  const [formVals, setFormVals] = useState({
    email: "",
    password: "",
  });
  const [loginErr, setLoginErr] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(
        event.target.email.value,
        event.target.password.value
      )
      .then((userCredential) => {
        setLoginErr(null);
        history.push("/dashboard");
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage;

        if (errorCode === "auth/user-not-found") {
          errorMessage = "Sorry, we don't have that email address on file.";
        } else if (errorCode === "auth/invalid-email") {
          errorMessage = "Please provide full email address.";
        } else {
          errorMessage = error.message;
        }
        setLoginErr(errorMessage);
      });
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
        <h2 style={{ color: "red" }}>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            id="standard-basic"
            label="E-mail Address"
            name="email"
            value={formVals.email}
            onChange={(e) =>
              setFormVals({ ...formVals, email: e.target.value })
            }
            className={classes.inputStyle}
          />
          <br />
          <TextField
            id="standard-basic"
            label="Password"
            name="password"
            type="password"
            value={formVals.password}
            onChange={(e) =>
              setFormVals({ ...formVals, password: e.target.value })
            }
            className={classes.inputStyle}
          />
          <br />
          {loginErr ? <p>{loginErr}</p> : null}
          <Button type="submit" className={classes.submitButton}>
            {/* <input type="submit" value="Submit"/> */}
            Submit
          </Button>
        </form>
      </div>
    </Fade>
  );
}

export default Login;
