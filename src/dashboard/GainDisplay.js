import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import currencyFormat from "../utils/currencyFormat";
import commaFormat from "../utils/commaFormat";

const useStyles = makeStyles((theme) => ({
  pVal: {
    fontSize: (props) => props.fSize,
    cursor: "default",
  },
  up: {
    color: "#16c922",
  },
  down: {
    color: "red",
  },
}));

function GainDisplay({
  gainsDisplayOption,
  totalDifference,
  totalDifferencePercentage,
  toggleGainsDisplayChange,
  up,
  ...props
}) {
  const classes = useStyles(props);

  let gainDisplay;
  if (gainsDisplayOption === "dollar") {
    gainDisplay = (
      <>
        {up ? "+" : ""}
        {currencyFormat(totalDifference)}
      </>
    );
  } else {
    gainDisplay = (
      <>
        {up ? "+" : ""}
        {commaFormat(totalDifferencePercentage)}%
      </>
    );
  }

  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
        toggleGainsDisplayChange();
      }}
      className={
        up ? classes.up + " " + classes.pVal : classes.down + " " + classes.pVal
      }
    >
      {gainDisplay}
    </span>
  );
}

export default GainDisplay;
