import React, { useEffect } from "react";

import { useQuery } from "@apollo/client";
import { RecipeMealTime } from "@suggestic/sdk/dist/__generated_sdk";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { RECIPES_BY_MEAL_TIME } from "../../../../../graphql/suggestic-queries";
import {
  INITIAL_RECIPE_COUNT,
  RECIPE_COUNT_INCREMENT,
  setDinnerRecipes,
  setDinnerRecipesLoading,
  setPaginationLoader,
} from "../../../../../store/features/recipes/recipes-slice";

export function LoadDinnerRecipes() {
  const dinnerRecipesCount = useAppSelector(
    (state) => state.recipes.dinnerRecipesCount
  );

  const dispatch = useAppDispatch();

  const { loading, error, data /* refetch, networkStatus */ } = useQuery(
    RECIPES_BY_MEAL_TIME,
    {
      variables: {
        first: dinnerRecipesCount,
        hidePurchasable: true,
        mealTime: RecipeMealTime.Dinner,
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
        setDinnerRecipes(
          data?.recipesByMealTime?.edges.map((item) => item.node)
        )
      );
    }
  }, [data]);

  useEffect(() => {
    dinnerRecipesCount === INITIAL_RECIPE_COUNT &&
      dispatch(setDinnerRecipesLoading(loading));
  }, [loading]);

  return (
    // <div className="LoadDinnerRecipes"/>
    <></>
  );
}
