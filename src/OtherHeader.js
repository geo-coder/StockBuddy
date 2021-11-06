import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import firebase from "./firebase/firebase";
import { useHistory } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    background: "black",
  },
  accountButton: {
    cursor: "pointer",
  },
}));

export default function ButtonAppBar(props) {
  const history = useHistory();
  const classes = useStyles();
  //const [menuToggle, setMenuToggle] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    handleClose();

    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        history.push("/");
      })
      .catch((error) => {
        // An error happened.
        console.log("signout error: ", error);
      });
  };

  const toAccountSettings = () => {
    handleClose();
    history.push("/dashboard/account-settings");
  };

  let logo;

  if (props.userStatus) {
    logo = (
      <Typography
        style={{ cursor: "pointer", display: "inline" }}
        variant="h6"
        onClick={() => {
          history.push("/dashboard");
        }}
      >
        StockBuddy
      </Typography>
    );
  } else {
    logo = (
      <Typography
        style={{ cursor: "pointer", display: "inline" }}
        variant="h6"
        onClick={() => {
          history.push("/");
        }}
      >
        StockBuddy
      </Typography>
    );
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <div className={classes.title}>{logo}</div>

          {props.userStatus ? (
            <div>
              <AccountCircleIcon
                className={classes.accountButton}
                onClick={handleClick}
              />

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={toAccountSettings}>
                  Account Settings
                </MenuItem>
                <MenuItem onClick={signOut}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button color="inherit">Demo</Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
