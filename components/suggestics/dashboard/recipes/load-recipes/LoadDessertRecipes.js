import React, { useEffect } from "react";

import { useQuery } from "@apollo/client";
import { RecipeMealTime } from "@suggestic/sdk/dist/__generated_sdk";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { RECIPES_BY_MEAL_TIME } from "../../../../../graphql/suggestic-queries";
import {
  INITIAL_RECIPE_COUNT,
  RECIPE_COUNT_INCREMENT,
  setDessertRecipes,
  setDessertRecipesLoading,
  setPaginationLoader,
} from "../../../../../store/features/recipes/recipes-slice";

export function LoadDessertRecipes() {
  const dessertRecipesCount = useAppSelector(
    (state) => state.recipes.dessertRecipesCount
  );

  const dispatch = useAppDispatch();

  const { loading, error, data /* refetch, networkStatus */ } = useQuery(
    RECIPES_BY_MEAL_TIME,
    {
      variables: {
        first: dessertRecipesCount,
        hidePurchasable: true,
        mealTime: RecipeMealTime.TreatDessert,
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
        setDessertRecipes(
          data?.recipesByMealTime?.edges.map((item) => item.node)
        )
      );
    }
  }, [data]);

  useEffect(() => {
    dessertRecipesCount === INITIAL_RECIPE_COUNT &&
      dispatch(setDessertRecipesLoading(loading));
  }, [loading]);

  return (
    // <div className="LoadDessertRecipes"/>
    <></>
  );
}
