import React from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

export const ProgramRule = (props) => {
  return (
    <div className="ProgramRule">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="avoid-content"
          id="avoid-header"
        >
          <Typography>{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {props.items && props.items.length > 0 ? (
            <List>
              {props.items.map((item, index) => {
                return (
                  <ListItem key={`rule ${index}`}>
                    <Typography sx={{ textTransform: "capitalize" }}>
                      {`• ${item.name?.replace(`${props.title} `, "")}`}
                    </Typography>
                  </ListItem>
                );
              })}
            </List>
          ) : null}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
