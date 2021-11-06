import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GainDisplay from "./GainDisplay";
import currencyFormat from "../utils/currencyFormat";
import commaFormat from "../utils/commaFormat";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    borderRadius: "5px",
    marginTop: "5px",
    padding: "5px 30px",
    background: (active) => (active ? "#4e5057" : "#1e2024"), //lighter bg if active
    borderLeft: (active) => (active ? "3px solid #4089ff" : "none"),

    display: "flex",
    justifyContent: "space-between",
    "&:hover": {
      background: "#4e5057",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
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
}));

//color #1e2024
function StockCard({
  ticker,
  costAverage,
  shares,
  gainsDisplayOption,
  toggleGainsDisplayChange,
  setPortfolioClicked,
  active,
  updateCurrentPrices,
}) {
  let [currentValue, setCurrentValue] = useState(null);
  let up = currentValue >= costAverage; //have you made money or lost
  let totalDifference = parseFloat(
    currentValue * shares - costAverage * shares
  ).toFixed(2); //how much you've made or lost total
  let totalDifferencePercentage = parseFloat(
    (((currentValue - costAverage) / costAverage) * 100).toFixed(2)
  );

  useEffect(() => {
    fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data["Global Quote"]["05. price"]) {
          let currentPrice = data["Global Quote"]["05. price"];

          currentPrice = parseFloat(currentPrice).toFixed(2);

          setCurrentValue(currentPrice);
          updateCurrentPrices(ticker, currentPrice);
        }
      })
      .catch((err) => console.log("ERROR!", err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles(active);

  if (currentValue) {
    return (
      <div className={classes.root} onClick={() => setPortfolioClicked(ticker)}>
        <div>
          <h2 className={classes.ticker}>
            {ticker} {currencyFormat(currentValue)}
          </h2>
          <p>{commaFormat(shares)} shares</p>
          <p>@ ${costAverage}/share cost avg</p>
        </div>
        <div>
          <p>
            <strong>Position Value:</strong>
            {currencyFormat(currentValue * shares)}
          </p>
          <p>
            <strong>Position Cost:</strong>{" "}
            {currencyFormat(costAverage * shares)}
          </p>
        </div>
        <div>
          <p>Total Gain/Loss</p>

          <GainDisplay
            totalDifference={totalDifference}
            totalDifferencePercentage={totalDifferencePercentage}
            toggleGainsDisplayChange={toggleGainsDisplayChange}
            gainsDisplayOption={gainsDisplayOption}
            fSize={"20px"}
            up={up}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default StockCard;
