import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

//this code would just cancel any unfound path
// function NotFound() {
//   const history = useHistory();

//   React.useEffect(() => {
//     history.goBack();
//   });

//   return null;
// }

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    textAlign: "center",
  },
  buttons: {
    color: "#ff5656",
    border: "1px solid white",
    margin: "1em",
    "&:hover": {
      color: "#ff8989",
    },
  },
}));

function NotFound() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <h1>404 Not Found</h1>
      <h1>Sorry, this page was not found.</h1>
      <Button
        className={classes.buttons}
        onClick={() => history.push("/")}
        variant="outlined"
      >
        Home
      </Button>

      <Button
        className={classes.buttons}
        onClick={() => history.push("/dashboard")}
        variant="outlined"
      >
        Dashboard
      </Button>
    </div>
  );
}

export default NotFound;
