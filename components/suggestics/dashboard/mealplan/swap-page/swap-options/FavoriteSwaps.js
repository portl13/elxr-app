import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../../../../store/store";
import { useQuery } from "@apollo/client";
import { MY_FAVORITE_RECIPES } from "../../../../../../graphql/suggestic-queries";
import {
  setFavoriteLoader,
  setFavoriteSwaps,
} from "../../../../../../store/features/mealplan/mealplan-slice";
import { RecipeColumn } from "../../../recipes/recipe-column/RecipeColumn";

export const FavoriteSwaps = () => {
  const { favoriteRecipes, mealToSwap } = useAppSelector(
    (state) => state.mealplan.mealToSwap
  );

  const dispatch = useAppDispatch();

  const { loading, error, data /*refetch, networkStatus*/ } = useQuery(
    MY_FAVORITE_RECIPES,
    {
      variables: {
        first: 100,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      // console.log(data)
      dispatch(
        setFavoriteSwaps(
          data.myFavoriteRecipes?.edges
            ?.filter((item) => {
              return item.node?.mealTags?.some((tag) => {
                if (mealToSwap?.meal.toUpperCase() === tag.toUpperCase())
                  return true;
              });
            })
            .map((item) => item.node)
        )
      );
    }
  }, [data]);

  useEffect(() => {
    // dispatch(setFavoriteLoader(loading))
  }, [loading]);

  return (
    <div className="FavoriteSwaps">
      <RecipeColumn
        recipeList={favoriteRecipes}
        isLoading={loading}
        selectRecipe={true}
      />
    </div>
  );
};
