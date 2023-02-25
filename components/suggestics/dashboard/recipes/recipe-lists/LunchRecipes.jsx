import React from "react";

import { useAppSelector } from "../../../../../store/store";
import { RecipeType } from "../../../../../utils/constant";
import { RecipeRow } from "../recipe-row/RecipeRow";

function LunchRecipes() {
  const lunchRecipes = useAppSelector((state) => state.recipes.lunchRecipes);
  const lunchRecipesLoading = useAppSelector(
    (state) => state.recipes.lunchRecipesLoading
  );
  return (
    <div className="LunchRecipes">
      <div className="recipe-category-title">Lunch</div>
      <RecipeRow
        recipeList={lunchRecipes}
        isLoading={lunchRecipesLoading}
        recipeType={RecipeType.Lunch}
      />
    </div>
  );
}

export default LunchRecipes;
