import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "./UI/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  addGroup: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textfieldStyle: {
    //background: "black",
    color: "white !important",

    margin: "5px",
  },
  floatingLabelFocusStyle: {
    color: "darkgray",
  },
  inputBorder: {
    color: "white",
    borderBottom: "1px solid gray",
  },
  dateInput: {
    background: "black",
    color: "white",
    borderBottom: "1px solid gray",
    borderRadius: "5px",
    marginTop: "5px",
  },
}));

function Add(props) {
  const classes = useStyles();

  const [validForSubmit, setValidForSubmit] = useState(false);
  const [formValues, setFormValues] = useState({
    shares: "",
    price: "",
  });

  useEffect(
    () => {
      // determines whether form is valid for submission (share and cost inputs)

      if (
        props.currentChart &&
        formValues.price &&
        formValues.shares &&
        !isNaN(formValues.price) &&
        !isNaN(formValues.shares)
      ) {
        setValidForSubmit(true);
      } else {
        setValidForSubmit(false);
      }
    },
    // optional dependency array
    [props.currentChart, formValues]
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    props.submitNewShares(
      props.currentChart,
      Number(e.target.shares.value),
      Number(e.target.price.value),
      e.target.buyDate.value
    );
    setFormValues({
      shares: "",
      price: "",
    });
  };

  const inputChange = (e) => {
    //handles and validates input in shares and value inputs
    if (!/^[\d]*(\.[\d]*)?$/.test(e.target.value)) return; //reject if its not a number or float
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form className={classes.addGroup} onSubmit={handleSubmit}>
        <div>
          <TextField
            id="standard-basic"
            label="Shares"
            name="shares"
            value={formValues.shares}
            onChange={inputChange}
            disabled={props.currentChart ? false : true}
            className={classes.textfieldStyle}
            inputProps={{ className: classes.inputBorder }}
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
          />
          <TextField
            id="standard-basic"
            label="Price"
            name="price"
            value={formValues.price}
            onChange={inputChange}
            disabled={props.currentChart ? false : true}
            className={classes.textfieldStyle}
            inputProps={{ className: classes.inputBorder }}
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
          />

          <input
            className={classes.dateInput}
            disabled={props.currentChart ? false : true}
            type="date"
            id="buyDate"
            name="buyDate"
          ></input>
        </div>
        <Button type="submit" disabled={!validForSubmit} color="green">
          +Add
        </Button>
      </form>
    </div>
  );
}

export default Add;
