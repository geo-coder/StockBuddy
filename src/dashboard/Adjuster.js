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

function Adjuster(props) {
  const classes = useStyles();
  const [formValues, setFormValues] = useState({
    shares: 0,
    price: 0,
  });

  const [validForSubmit, setValidForSubmit] = useState(false);

  useEffect(() => {
    if (props.costAverages[props.currentChart]) {
      setFormValues({
        shares: props.costAverages[props.currentChart].shares,
        price: props.costAverages[props.currentChart].averageCostPerShare,
      });
    } else {
      setFormValues({
        shares: 0,
        price: 0,
      });
    }
  }, [props.currentChart, props.costAverages]);

  useEffect(() => {
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
  }, [props.currentChart, formValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    props.submitNewShares(
      props.currentChart,
      Number(e.target.shares.value),
      Number(e.target.price.value)
    );
  };

  const inputChange = (e) => {
    //handles and validates input in shares and value inputs
    if (!/^[\d]*(\.[\d]*)?$/.test(e.target.value)) return; //reject if its not a number or float
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleFocus = (e) => e.target.select();

  return (
    <div>
      <form className={classes.addGroup} onSubmit={handleSubmit}>
        <div>
          <TextField
            onFocus={handleFocus}
            id="standard-basic"
            label="Total Shares"
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
            label="Avg Cost / Share"
            name="price"
            value={formValues.price}
            onFocus={handleFocus}
            onChange={inputChange}
            disabled={props.currentChart ? false : true}
            className={classes.textfieldStyle}
            inputProps={{ className: classes.inputBorder }}
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
          />
        </div>
        <div>
          <Button type="submit" disabled={!validForSubmit} color="green">
            Set
          </Button>

          {props.costAverages[props.currentChart] ? (
            <Button
              color="red"
              onClick={() => {
                props.removePosition(props.currentChart);
                setFormValues({
                  shares: 0,
                  price: 0,
                });
              }}
            >
              Remove
            </Button>
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default Adjuster;
