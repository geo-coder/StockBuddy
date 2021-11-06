import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import StockCard from "./StockCard";
import TotalPortfolioCard from "./TotalPortfolioCard";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    border: "1px white solid",
    borderRadius: "5px",
    height: "85%",
    flex: ".65",
    padding: "30px",
    overflowY: "auto",
    // "-ms-overflow-style": "none" /* Internet Explorer 10+ */,
    // scrollbarWidth: "none",
  },

  container: {
    flex: ".65",
  },

  pCard: {
    height: "10%",
  },

  portfolioList: {
    overflowY: "auto",
    height: "75%",
    color: "white",
    border: "1px white solid",
    borderRadius: "5px",

    flex: ".65",
    padding: "30px",
  },
}));

function Portfolio(props) {
  const classes = useStyles();

  let portfolioList = []; // list of stock 'cards' to display to portfolio section

  const [gainsDisplayOption, setGainsDisplayOption] = useState("percentage");
  const [currentPrices, setCurrentPrices] = useState({});

  //whether to show gain/loss in dollars or percent across all position cards
  const toggleGainsDisplayChange = () => {
    let newOption = "dollar";
    if (gainsDisplayOption === "dollar") {
      newOption = "percentage";
    }
    setGainsDisplayOption(newOption);
  };

  const updateCurrentPrices = (ticker, price) => {
    let newVals = { ...currentPrices };

    newVals[ticker] = price;
    setCurrentPrices(newVals);
  };

  if (props.costAverages) {
    const keys = Object.keys(props.costAverages);

    keys.forEach((key) => {
      portfolioList.push(
        <StockCard
          key={key}
          ticker={key}
          costAverage={props.costAverages[key].averageCostPerShare}
          shares={props.costAverages[key].shares}
          gainsDisplayOption={gainsDisplayOption}
          toggleGainsDisplayChange={toggleGainsDisplayChange}
          setPortfolioClicked={props.setPortfolioClicked}
          active={props.portfolioClicked === key}
          updateCurrentPrices={updateCurrentPrices}
        />
      );
    });
  }

  return (
    <div className={classes.container}>
      <div className={classes.pCard}>
        <TotalPortfolioCard
          currentPrices={currentPrices}
          costAverages={props.costAverages}
          gainsDisplayOption={gainsDisplayOption}
          toggleGainsDisplayChange={toggleGainsDisplayChange}
        />
      </div>

      <div className={classes.portfolioList}>{portfolioList}</div>
    </div>
  );
}

export default Portfolio;
