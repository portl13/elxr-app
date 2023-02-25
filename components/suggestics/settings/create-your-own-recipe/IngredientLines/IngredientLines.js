import React from "react";

import { Box, Button, Typography } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { IngredientLine } from "./ingredient-line/IngredientLine";
import { setIngredientLines } from "../../../../../store/features/create-own-recipe/create-own-recipe-slice";

export const IngredientLines = () => {
  const ingredientLines = useAppSelector(
    (state) => state.createOwnRecipe.ingredientLines
  );

  const dispatch = useAppDispatch();

  const handleAddIngredientLine = () => {
    dispatch(setIngredientLines([...ingredientLines, ""]));
  };

  return (
    <div className="IngredientLines">
      <div className="recipe-form-title">Add Nutritional Information</div>
      <div className="recipe-form-subtitle">
        Please mention the ingredients &amp; add description &amp; instructions
        as well
      </div>
      {ingredientLines?.length > 0 && (
        <Box paddingTop={3}>
          {ingredientLines?.map((ingredientLine, index) => (
            <IngredientLine
              key={index * 19}
              text={ingredientLine}
              index={index}
            />
          ))}
        </Box>
      )}
      {/* <Button onClick={handleAddIngredientLine}>
                Add New Ingredient Line
            </Button> */}
      <div className="recipe-add-btn" onClick={handleAddIngredientLine}>
        +Add another ingredient
      </div>
    </div>
  );
};
