const addShares = (costAverages, tickerValue, shares, value, buyDate) => {
  if (Object.keys(costAverages).includes(tickerValue)) {
    //if stock is already in portfolio
    let oldVal =
      costAverages[tickerValue].shares *
      costAverages[tickerValue].averageCostPerShare;
    let newVal = shares * value;
    let totalShares = shares + costAverages[tickerValue].shares;
    let newCostAverage = ((oldVal + newVal) / totalShares).toFixed(2);
    costAverages[tickerValue] = {
      shares: totalShares,
      averageCostPerShare: newCostAverage,
    };
  } else {
    //create new property if stock is new to portfolio
    costAverages[tickerValue] = {
      shares: shares,
      averageCostPerShare: value,
    };
  }

  return costAverages;
};

export default addShares;
