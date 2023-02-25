import React from "react";

import { useAppSelector } from "../../../../../store/store";
import { RecipeType } from "../../../../../utils/constant";
import { RecipeRow } from "../recipe-row/RecipeRow";

function BreakfastRecipes() {
  const breakfastRecipes = useAppSelector(
    (state) => state.recipes.breakfastRecipes
  );
  const breakfastRecipesLoading = useAppSelector(
    (state) => state.recipes.breakfastRecipesLoading
  );
  return (
    <div className="BreakfastRecipes">
      <div className="recipe-category-title">Breakfast</div>
      <RecipeRow
        recipeList={breakfastRecipes}
        isLoading={breakfastRecipesLoading}
        recipeType={RecipeType.Breakfast}
      />
    </div>
  );
}

export default BreakfastRecipes;
