import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Fade from "@material-ui/core/Fade";

import React from "react";

function LandingPageHome({ classes }) {
  const history = useHistory();
  return (
    <div>
      <Fade in={true}>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            onClick={() => {
              history.push("/new-account");
            }}
            color="primary"
            className={classes.newAccountButton}
          >
            Create Account
          </Button>

          <Button
            color="primary"
            className={classes.loginButton}
            onClick={() => {
              history.push("/login");
            }}
          >
            Sign in
          </Button>

          <br />
          <br />
          <Button
            variant="contained"
            onClick={() => {
              history.push("/dashboard");
            }}
            color="primary"
            className={classes.demoButton}
          >
            Demo without Sign-In
          </Button>
        </div>
      </Fade>
    </div>
  );
}

export default LandingPageHome;
