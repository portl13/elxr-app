import React from "react";

import { Button } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../../../../../store/store";
import {
  RECIPE_COUNT_INCREMENT,
  setFavoriteRecipesCount,
  setPopularRecipesCount,
  setBreakfastRecipesCount,
  setLunchRecipesCount,
  setDinnerRecipesCount,
  setSnackRecipesCount,
  setDessertRecipesCount,
  setUserRecipesCount,
} from "../../../../../../store/features/recipes/recipes-slice";
import { RecipeType } from "../../../../../../utils/constant";

export const ViewMoreRecipesButton = (props) => {
  const favoriteRecipesCount = useAppSelector(
    (state) => state.recipes.favoriteRecipesCount
  );
  const popularRecipesCount = useAppSelector(
    (state) => state.recipes.popularRecipesCount
  );
  const breakfastRecipesCount = useAppSelector(
    (state) => state.recipes.breakfastRecipesCount
  );
  const lunchRecipesCount = useAppSelector(
    (state) => state.recipes.lunchRecipesCount
  );
  const dinnerRecipesCount = useAppSelector(
    (state) => state.recipes.dinnerRecipesCount
  );
  const snackRecipesCount = useAppSelector(
    (state) => state.recipes.snackRecipesCount
  );
  const dessertRecipesCount = useAppSelector(
    (state) => state.recipes.dessertRecipesCount
  );
  const userRecipesCount = useAppSelector(
    (state) => state.recipes.userRecipesCount
  );

  const dispatch = useAppDispatch();

  const handleClick = () => {
    switch (props.recipeType) {
      case RecipeType.Favorite:
        dispatch(
          setFavoriteRecipesCount(favoriteRecipesCount + RECIPE_COUNT_INCREMENT)
        );
        break;
      case RecipeType.Popular:
        dispatch(
          setPopularRecipesCount(popularRecipesCount + RECIPE_COUNT_INCREMENT)
        );
        break;
      case RecipeType.Breakfast:
        dispatch(
          setBreakfastRecipesCount(
            breakfastRecipesCount + RECIPE_COUNT_INCREMENT
          )
        );
        break;
      case RecipeType.Lunch:
        dispatch(
          setLunchRecipesCount(lunchRecipesCount + RECIPE_COUNT_INCREMENT)
        );
        break;
      case RecipeType.Dinner:
        dispatch(
          setDinnerRecipesCount(dinnerRecipesCount + RECIPE_COUNT_INCREMENT)
        );
        break;
      case RecipeType.Snack:
        dispatch(
          setSnackRecipesCount(snackRecipesCount + RECIPE_COUNT_INCREMENT)
        );
        break;
      case RecipeType.Dessert:
        dispatch(
          setDessertRecipesCount(dessertRecipesCount + RECIPE_COUNT_INCREMENT)
        );
        break;
      case RecipeType.User:
        dispatch(
          setUserRecipesCount(userRecipesCount + RECIPE_COUNT_INCREMENT)
        );
        break;
      default:
        break;
    }
  };

  return (
    <Button
      className="ViewMoreRecipesButton"
      color="secondary"
      disabled={props.isLoading}
      onClick={handleClick}
    >
      View More
    </Button>
  );
};
