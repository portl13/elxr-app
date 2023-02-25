import React from "react";

import { useAppSelector } from "../../../../../../store/store";
import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";

export const RecipeInstructions = () => {
  const selectedRecipe = useAppSelector(
    (state) => state.recipes.selectedRecipe
  );

  return (
    <Card sx={{ width: "90%" }} className="RecipeInstructions">
      <CardContent>
        {selectedRecipe?.instructions?.length > 0 && (
          <Typography className="capTitle">Instructions</Typography>
        )}
        <Divider />
        <ul className="list-unstyled">
          {selectedRecipe.instructions &&
            typeof selectedRecipe.instructions === "string" && (
              <li>{selectedRecipe.instructions}</li>
            )}
          {selectedRecipe.instructions &&
            Array.isArray(selectedRecipe.instructions) &&
            selectedRecipe?.instructions?.map((item, index) => {
              return (
                <li key={"instruction" + index}>
                  <strong>Step {index + 1}</strong> {item}{" "}
                </li>
              );
            })}
        </ul>
      </CardContent>
    </Card>
  );
};
