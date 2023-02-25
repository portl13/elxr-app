import React from "react";

import { Button } from "@material-ui/core";
import {
  setIngredientSearchTerm,
  setRecipeIngredients,
} from "../../../../../../store/features/create-own-recipe/create-own-recipe-slice";
import { useAppDispatch, useAppSelector } from "../../../../../../store/store";

export const IngredientToAdd = (props) => {
  const recipeIngredients = useAppSelector(
    (state) => state.createOwnRecipe.recipeIngredients
  );

  const dispatch = useAppDispatch();

  const handleAdd = () => {
    // no duplicates
    if (
      !recipeIngredients.find(
        (ingredient) => ingredient.foodId === props.ingredient.foodId
      )
    ) {
      dispatch(setRecipeIngredients([props.ingredient, ...recipeIngredients]));
    }
    dispatch(setIngredientSearchTerm(""));
  };

  return (
    <Button className="IngredientToAdd" onClick={handleAdd}>
      {props.ingredient.name}
    </Button>
  );
};
