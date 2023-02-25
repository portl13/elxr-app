import React, { useEffect } from "react";

import { useQuery } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { MY_FAVORITE_RECIPES } from "../../../../../graphql/suggestic-queries";
import {
  INITIAL_RECIPE_COUNT,
  RECIPE_COUNT_INCREMENT,
  setFavoriteRecipes,
  setFavoriteRecipesLoading,
  setPaginationLoader,
} from "../../../../../store/features/recipes/recipes-slice";

export const useFavoriteRecipes = () => {
  const favoriteRecipesCount = useAppSelector(
    (state) => state.recipes.favoriteRecipesCount
  );

  const dispatch = useAppDispatch();

  const { loading, error, data } = useQuery(MY_FAVORITE_RECIPES, {
    variables: {
      first: favoriteRecipesCount,
    },
  });

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      dispatch(
        setFavoriteRecipes(
          data?.myFavoriteRecipes?.edges.map((item) => item.node)
        )
      );
    }
  }, [data]);

  useEffect(() => {
    favoriteRecipesCount === INITIAL_RECIPE_COUNT &&
      dispatch(setFavoriteRecipesLoading(loading));
  }, [loading]);

  return { loading, error, data };
};

export function LoadFavoriteRecipes() {
  return <></>;
}
