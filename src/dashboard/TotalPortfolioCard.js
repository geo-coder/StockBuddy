import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GainDisplay from "./GainDisplay";
import currencyFormat from "../utils/currencyFormat";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    borderRadius: "5px",
    marginTop: "5px",
    padding: "5px 30px",
    background: "#1e2024", //lighter bg if active
    display: "flex",
    justifyContent: "space-between",
    // alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      marginBottom: "10px",
    },
  },
  pVal: {
    fontSize: "20px",
    cursor: "default",
  },
  up: {
    color: "#16c922",
  },
  down: {
    color: "red",
  },
  ticker: {
    display: "inline",
  },
  prettyLabel: {
    fontWeight: "bold",
    color: "#4089ff",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 4px auto",
    },
  },
}));

function TotalPortfolioCard(props) {
  const classes = useStyles();
  let totalCurrentValue = 0;
  let cost = 0;
  let gainLoss = 0;

  if (props.costAverages) {
    const keys = Object.keys(props.costAverages);

    keys.forEach((key) => {
      //if statement here ensures that the current price has been received from the api before it's counted
      if (props.currentPrices[key]) {
        totalCurrentValue =
          totalCurrentValue +
          props.costAverages[key].shares * parseFloat(props.currentPrices[key]);
        cost =
          cost +
          props.costAverages[key].shares *
            parseFloat(props.costAverages[key].averageCostPerShare);
      }
    });
    gainLoss = (totalCurrentValue - cost).toFixed(2);

    totalCurrentValue = totalCurrentValue.toFixed(2);
  }

  return (
    <div className={classes.root}>
      <p className={classes.prettyLabel}>Total Portfolio</p>

      <p>
        <strong>Current Value:</strong> {currencyFormat(totalCurrentValue)}
      </p>

      <p>
        <strong>Cost:</strong> {currencyFormat(cost)}
      </p>
      <p>
        <strong>Gain / Loss: </strong>
        <GainDisplay
          fsize={"12px"}
          gainsDisplayOption={props.gainsDisplayOption}
          toggleGainsDisplayChange={props.toggleGainsDisplayChange}
          totalDifference={gainLoss}
          totalDifferencePercentage={
            cost === 0 ? 0 : ((gainLoss / cost) * 100).toFixed(2)
          }
          up={gainLoss >= 0}
        />
      </p>
    </div>
  );
}

export default TotalPortfolioCard;
