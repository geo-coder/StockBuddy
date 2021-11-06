import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import useCheckMobileScreen from "./utilities/useCheckMobileScreen";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "black",
    color: "white",
    width: "inherit",
    //margin: "0",
    flex: ".3",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
  },
}));

function CollapseSearchBox({
  accordionExpanded,
  setAccordionExpanded,
  ...props
}) {
  const classes = useStyles(accordionExpanded);

  const isMoble = useCheckMobileScreen();

  return (
    <>
      {isMoble ? (
        <Accordion
          className={classes.root}
          disableGutters
          expanded={accordionExpanded}
          onChange={() => {
            setAccordionExpanded(!accordionExpanded);
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Ticker Search</Typography>
          </AccordionSummary>

          <AccordionDetails>{props.children}</AccordionDetails>
        </Accordion>
      ) : (
        <div className={classes.root}>{props.children}</div>
      )}
    </>
  );
}

export default CollapseSearchBox;
