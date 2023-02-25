import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";

import { useAppDispatch, useAppSelector } from "../../../../../../store/store";
import { RECOMMENDED_SWAPS } from "../../../../../../graphql/suggestic-queries";
import {
  setRecommendedLoader,
  setRecommendedSwaps,
} from "../../../../../../store/features/mealplan/mealplan-slice";
import { RecipeColumn } from "../../../recipes/recipe-column/RecipeColumn";
import { useDispatch } from "react-redux";

export const RecommendedSwaps = (props) => {
  // const mealToSwap = useAppSelector((state) => state.mealplan.mealToSwap);
  // const recommendedSwaps = useAppSelector((state) => state.mealplan.recommendedSwaps);

  // const dispatch = useDispatch();

  // const { loading, error, data, /*refetch, networkStatus*/ } = useQuery(
  //     RECOMMENDED_SWAPS,
  //     {
  //         variables: {
  //             forSimpleMealPlan: false,
  //             mealTime: mealToSwap?.meal?.toUpperCase(),
  //         },
  //     }
  // );

  // useEffect(() => {
  //     if (error) {
  //         console.log(error);
  //     }
  //     if (data) {
  //         // console.log(data)
  //         dispatch(setRecommendedSwaps(data.recommendedSwaps?.recipes));
  //     }
  // }, [data]);

  return (
    <div className="RecommendedSwaps">
      <RecipeColumn
        recipeList={props.recommendedSwaps}
        isLoading={props.loading}
        selectRecipe={true}
      />
    </div>
  );
};
