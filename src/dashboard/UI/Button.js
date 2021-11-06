import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    background: (props) => {
      switch (props.color) {
        case "green":
          //return "#10a137";
          return "linear-gradient(45deg, #10a137 30%, #1bfa57 90%)";
        case "red":
          return "linear-gradient(45deg, #ff3b3b 30%, #c71414 90%)";
        default:
          return "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)";
      }
    },

    border: 0,
    borderRadius: 3,
    color: "white",
    height: 48,
    padding: "0 30px",
    margin: "1em 0 1em 0",
  },
});

function MyButton(props) {
  const { color, ...other } = props;
  const classes = useStyles(props);
  return <Button className={classes.root} {...other} />;
}

export default MyButton;
