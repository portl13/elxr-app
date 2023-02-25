import React from "react";

import { useAppSelector } from "../../../../../../store/store";
import { Card, CardContent, Divider, Typography } from "@material-ui/core";

export const NUTRIENTS_MAP = {
  calcium: "Calcium",
  calories: "Calories",
  carbs: "Carbs",
  cholesterol: "Cholesterol",
  fat: "Fat",
  netcarbs: "Net carbs",
  potassium: "Potassium",
  protein: "Protein",
  saturatedFat: "Saturated fats",
  sodium: "Sodium",
  sugar: "Sugar",
  transFat: "Trans fats",
};

export const NutritionalInfo = () => {
  const selectedRecipe = useAppSelector(
    (state) => state.recipes.selectedRecipe
  );

  return (
    <Card sx={{ width: "90%" }} className="NutritionalInfo">
      <CardContent>
        <Typography className="capTitle">Nutritional Information</Typography>
        <Divider />
        <ul className="list-unstyled nutriList">
          {selectedRecipe?.nutrientsPerServing &&
            Object.keys(NUTRIENTS_MAP).map((key, index) => {
              {
                return (
                  <li key={"nutrient" + index}>
                    <span>{NUTRIENTS_MAP[key]}:</span>
                    <strong>
                      {!!selectedRecipe?.nutrientsPerServing[key]
                        ? selectedRecipe?.nutrientsPerServing[key]
                        : "0"}{" "}
                      gram
                    </strong>
                  </li>
                );
              }
            })}
        </ul>
      </CardContent>
    </Card>
  );
};
