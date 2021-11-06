import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  spanButton: {
    cursor: "pointer",
    fontWeight: "bold",
    color: "#404040",
  },
  spanButtonActive: {
    color: "#4089ff",
  },
}));

function ChartRangeSelector(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <span
        className={
          props.chartTimeFrame === "1Y"
            ? classes.spanButton + " " + classes.spanButtonActive
            : classes.spanButton
        }
        onClick={() => {
          props.setChartTimeFrame("1Y");
        }}
      >
        1Y
      </span>
      <span
        className={
          props.chartTimeFrame === "5Y"
            ? classes.spanButton + " " + classes.spanButtonActive
            : classes.spanButton
        }
        onClick={() => {
          props.setChartTimeFrame("5Y");
        }}
      >
        5Y
      </span>
      <span
        className={
          props.chartTimeFrame === "10Y"
            ? classes.spanButton + " " + classes.spanButtonActive
            : classes.spanButton
        }
        onClick={() => {
          props.setChartTimeFrame("10Y");
        }}
      >
        10Y
      </span>
    </div>
  );
}

export default ChartRangeSelector;
