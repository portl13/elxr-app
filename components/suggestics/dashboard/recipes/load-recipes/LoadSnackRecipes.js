import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { useQuery } from "@apollo/client";
import { RECIPES_BY_MEAL_TIME } from "../../../../../graphql/suggestic-queries";
import {
  INITIAL_RECIPE_COUNT,
  RECIPE_COUNT_INCREMENT,
  setPaginationLoader,
  setSnackRecipes,
  setSnackRecipesLoading,
} from "../../../../../store/features/recipes/recipes-slice";
import { RecipeMealTime } from "@suggestic/sdk/dist/__generated_sdk";

export const LoadSnackRecipes = () => {
  const snackRecipesCount = useAppSelector(
    (state) => state.recipes.snackRecipesCount
  );

  const dispatch = useAppDispatch();

  const { loading, error, data /*refetch, networkStatus*/ } = useQuery(
    RECIPES_BY_MEAL_TIME,
    {
      variables: {
        first: snackRecipesCount,
        hidePurchasable: true,
        mealTime: RecipeMealTime.Snack,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      dispatch(
        setSnackRecipes(data?.recipesByMealTime?.edges.map((item) => item.node))
      );
    }
  }, [data]);

  useEffect(() => {
    snackRecipesCount === INITIAL_RECIPE_COUNT &&
      dispatch(setSnackRecipesLoading(loading));
  }, [loading]);

  return (
    // <div className="LoadSnackRecipes"/>
    <></>
  );
};
