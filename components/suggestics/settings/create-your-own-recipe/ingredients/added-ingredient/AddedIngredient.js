import React from "react";

import { Box, IconButton, TextField, Typography } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import {
  Ingredient,
  setRecipeIngredients,
} from "../../../../../../store/features/create-own-recipe/create-own-recipe-slice";
import { useAppDispatch, useAppSelector } from "../../../../../../store/store";
import { Close } from "@material-ui/icons";

export const AddedIngredient = (props) => {
  const recipeIngredients = useAppSelector(
    (state) => state.createOwnRecipe.recipeIngredients
  );

  const dispatch = useAppDispatch();

  const handleRemoveRecipe = () => {
    dispatch(
      setRecipeIngredients(
        // filter out the recipe being removed
        [
          ...recipeIngredients.filter(
            (ingredient) => ingredient.foodId !== props.ingredient.foodId
          ),
        ]
      )
    );
  };

  const isQuantityInvalid = () => {
    return (
      isNaN(+props.ingredient.quantity) && props.ingredient.quantity !== ""
    );
  };

  const handleUpdateQuantity = (newQuantity) => {
    dispatch(
      setRecipeIngredients(
        recipeIngredients.map((ingredient) => {
          if (ingredient.foodId === props.ingredient.foodId) {
            return {
              ...ingredient,
              quantity: newQuantity,
            };
          }
          return ingredient;
        })
      )
    );
  };

  const handleGramsToggle = () => {
    dispatch(
      setRecipeIngredients(
        recipeIngredients.map((ingredient) => {
          if (ingredient.foodId === props.ingredient.foodId) {
            return {
              ...ingredient,
              isInGrams: !ingredient.isInGrams,
            };
          }
          return ingredient;
        })
      )
    );
  };

  return (
    <>
      {/* <Box>
            <IconButton color="secondary" component="span"
                onClick={handleRemoveRecipe}
            >
                <Close />
            </IconButton>
            {props.ingredient.name}
        </Box> */}
      <div className="selected-ingredient-name">
        <div className="ingredient-name">{props.ingredient.name}</div>
        <div className="close-ingredient" onClick={handleRemoveRecipe}>
          <img src="/img/cross-icon.svg" />
        </div>
      </div>
      <div className="selected-ingredient-form">
        <ToggleButtonGroup
          aria-label="Grams vs. Milliliters Toggle Button"
          color="secondary"
          exclusive
          size="small"
          fullWidth
          value={props.ingredient.isInGrams}
          onChange={handleGramsToggle}
        >
          <ToggleButton value={true}>
            <div>Grams</div>
          </ToggleButton>
          <ToggleButton value={false}>
            <div>Milliliters</div>
          </ToggleButton>
        </ToggleButtonGroup>

        <TextField
          variant="outlined"
          placeholder="Quantity"
          value={props.ingredient.quantity}
          error={isQuantityInvalid()}
          helperText={isQuantityInvalid() ? "Please enter valid number" : ""}
          onChange={(e) => handleUpdateQuantity(e.target.value)}
        />
      </div>
    </>
  );
};
