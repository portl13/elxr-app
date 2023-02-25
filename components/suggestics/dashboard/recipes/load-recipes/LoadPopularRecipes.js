import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { useQuery } from "@apollo/client";
import { POPULAR_RECIPES } from "../../../../../graphql/suggestic-queries";
import {
  INITIAL_RECIPE_COUNT,
  RECIPE_COUNT_INCREMENT,
  setPaginationLoader,
  setPopularRecipes,
  setPopularRecipesLoading,
} from "../../../../../store/features/recipes/recipes-slice";

export const LoadPopularRecipes = () => {
  const popularRecipesCount = useAppSelector(
    (state) => state.recipes.popularRecipesCount
  );

  const dispatch = useAppDispatch();

  const { loading, error, data /*refetch, networkStatus*/ } = useQuery(
    POPULAR_RECIPES,
    {
      variables: {
        first: popularRecipesCount,
        hidePurchasable: true,
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
        setPopularRecipes(data?.popularRecipes?.edges.map((item) => item.node))
      );
    }
  }, [data]);

  useEffect(() => {
    popularRecipesCount === INITIAL_RECIPE_COUNT &&
      dispatch(setPopularRecipesLoading(loading));
  }, [loading]);

  return (
    // <div className="LoadPopularRecipes"/>
    <></>
  );
};
