import React, { useEffect } from "react";

import { useQuery } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { MY_RECIPES } from "../../../../../graphql/suggestic-queries";
import {
  INITIAL_RECIPE_COUNT,
  setUserRecipes,
  setUserRecipesLoading,
} from "../../../../../store/features/recipes/recipes-slice";

export function LoadUserRecipes() {
  const userRecipesCount = useAppSelector(
    (state) => state.recipes.userRecipesCount
  );

  const dispatch = useAppDispatch();

  const { loading, error, data /* refetch, networkStatus */ } = useQuery(
    MY_RECIPES,
    {
      variables: {
        first: userRecipesCount,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      dispatch(setUserRecipes(data.myRecipes?.edges.map((item) => item.node)));
    }
  }, [data]);

  useEffect(() => {
    userRecipesCount === INITIAL_RECIPE_COUNT &&
      dispatch(setUserRecipesLoading(loading));
  }, [loading]);

  return (
    // <div className="LoadUserRecipes"/>
    <></>
  );
}
