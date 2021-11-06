import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";

import InputAdornment from "@material-ui/core/InputAdornment";
import MyResponsiveLine from "../charts/AreaChart";

import Fade from "@material-ui/core/Fade";
import ChartRangeSelector from "./ChartRangeSelector";
import Adjuster from "./Adjuster";

//import useCheckMobileScreen from "./utilities/useCheckMobileScreen";
import CollapseSearchBox from "./CollapseSearchBox";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    border: "1px white solid",
    borderRadius: "5px",
    height: "85%",
    width: "inherit",
    //flex: ".3",
    padding: "30px",
    //position: "relative",
    [theme.breakpoints.down("sm")]: {
      border: "none",
      padding: "5px",
    },
  },
  chartContainer: {
    height: "150px",
    marginBottom: "10px",
  },
  input: {
    color: "white",
  },
  inputLabel: {
    color: "white",
  },

  inputAdornment: {
    "&:hover": {
      //background: 'pink',
      background: "red",
      borderRadius: "5px",
      cursor: "pointer",
    },
  },
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
  actionSelector: {
    display: "flex",
    background: "#0e1b30",

    borderRadius: " 5px",
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    color: "grey",

    "& p": {
      flex: ".5",
      borderTop: "1px white solid",
      textAlign: "center",
      //color: "grey",
      cursor: "default",
      "&: hover": {
        cursor: "default",
      },
    },
  },
  actionSelectorActive: {
    //background: "#40454d",
    background: "#4e5057",
    color: "white",
  },
  fadeIn: {
    animation: "$fadeInLoad .5s",
  },
  "@keyframes fadeInLoad": {
    from: {
      opacity: "0",
    },
    to: {
      opacity: "1",
    },
  },
  expandLess: {
    float: "right",
    cursor: "pointer",
  },
}));

const formatData = (data, chartTimeFrame) => {
  var formatted = Object.keys(data["Weekly Adjusted Time Series"]).map(
    (key) => {
      var formattedObject = {
        x: key,
        y: data["Weekly Adjusted Time Series"][key]["5. adjusted close"],
      };

      return formattedObject;
    }
  );

  formatted = formatted.reverse();

  switch (chartTimeFrame) {
    case "1Y":
      formatted = formatted.slice(-51);
      break;
    case "5Y":
      formatted = formatted.slice(-255);
      break;
    case "10Y":
      formatted = formatted.slice(-510);
      break;

    default:
      formatted = formatted.slice(-51);
      break;
  }

  const chartData = [
    {
      id: "id string",
      color: "hsl(353, 70%, 50%)",
      data: formatted,
    },
  ];

  return chartData;
};

const SearchBox = (props) => {
  const [tickerValue, setTickerValue] = useState("");
  const [currentChart, setCurrentChart] = useState();
  const [chartData, setChartData] = useState();
  const [accordionExpanded, setAccordionExpanded] = useState(true);
  const [searchVal, setSearchVal] = useState("");

  //const [actionType, setActionType] = useState("add");
  // const [formValues, setFormValues] = useState({
  //   shares: "",
  //   price: "",
  // });

  const [chartTimeFrame, setChartTimeFrame] = useState("1Y");

  //const [validForSubmit, setValidForSubmit] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    //search a stock clicked in portolio, fill chart

    //perform a search only if user clicks a position that isn't already in search box

    if (
      props.portfolioClicked &&
      props.portfolioClicked.toUpperCase() !== searchVal.toUpperCase()
    )
      setSearchVal(props.portfolioClicked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.portfolioClicked]);

  //switch to time series daily adjusted to get stock split information

  // const search = (val) => {
  //   if (!val || val === "" || val.length > 5) return;
  //   val = val.toUpperCase();
  //   //if search is not from a click in the portfolio, then no portfolio item is active
  //   if (val !== props.portfolioClicked) props.setPortfolioClicked("");
  //   setTickerValue("");
  //   //`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${val}&apikey=${process.env.REACT_APP_API_KEY}`

  //   fetch(
  //     `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${val}&apikey=${process.env.REACT_APP_API_KEY}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (Object.keys(data)[0] === "Error Message") return;

  //       //API limit reached; call dialogue
  //       if (!data["Weekly Adjusted Time Series"]) {
  //         props.setOpenModel(true);
  //         return;
  //       }

  //       //console.log("data from stock card ", data);
  //       setCurrentChart(val);
  //       setChartData(data);
  //     })
  //     .catch((err) => console.log("ERROR!", err));
  // };

  //search function runs whenever 'searchVal' is updated
  useEffect(() => {
    let val = searchVal;
    if (!val || val === "" || val.length > 5) return;
    val = val.toUpperCase();
    //if search is not from a click in the portfolio, then no portfolio item is active
    if (val !== props.portfolioClicked) props.setPortfolioClicked("");
    setTickerValue("");
    //`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${val}&apikey=${process.env.REACT_APP_API_KEY}`

    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${val}&apikey=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (Object.keys(data)[0] === "Error Message") return;

        //API limit reached; call dialogue
        if (!data["Weekly Adjusted Time Series"]) {
          props.setOpenModel(true);
          return;
        }

        //console.log("data from stock card ", data);
        setCurrentChart(val);
        setChartData(data);
      })
      .catch((err) => console.log("ERROR!", err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchVal]);

  return (
    <CollapseSearchBox
      accordionExpanded={accordionExpanded}
      setAccordionExpanded={setAccordionExpanded}
    >
      <div className={classes.root}>
        <Input
          onChange={(e) => {
            if (e.target.value.length < 8) setTickerValue(e.target.value);
          }}
          value={tickerValue}
          className={classes.input}
          placeholder={"Ticker Lookup"}
          id="stockSearchInput"
          onKeyPress={(event) => {
            if (event.key === "Enter") setSearchVal(tickerValue);
          }}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon
                className={classes.inputAdornment}
                onClick={() => {
                  setSearchVal(tickerValue);
                }}
              />
            </InputAdornment>
          }
        />

        {chartData ? (
          <div>
            <ChartRangeSelector
              chartTimeFrame={chartTimeFrame}
              setChartTimeFrame={setChartTimeFrame}
            />
            <div className={classes.chartContainer}>
              <MyResponsiveLine data={formatData(chartData, chartTimeFrame)} />
            </div>
          </div>
        ) : null}

        {chartData ? <h1>{currentChart}</h1> : null}

        <Fade in={Boolean(currentChart)}>
          <div>
            <Adjuster
              currentChart={currentChart}
              submitNewShares={props.submitNewShares}
              costAverages={props.costAverages}
              portfolioClicked={props.portfolioClicked}
              removePosition={props.removePosition}
              setCurrentChart={setCurrentChart}
            />
          </div>
        </Fade>
      </div>
    </CollapseSearchBox>
  );
};

export default SearchBox;
