import React from "react";

import { useAppSelector } from "../../../../../store/store";
import { RecipeRow } from "../recipe-row/RecipeRow";
import { RecipeType } from "../../../../../utils/constant";

function DinnerRecipes() {
  const dinnerRecipes = useAppSelector((state) => state.recipes.dinnerRecipes);
  const dinnerRecipesLoading = useAppSelector(
    (state) => state.recipes.dinnerRecipesLoading
  );

  return (
    <div className="DinnerRecipes">
      <div className="recipe-category-title">Dinner</div>
      <RecipeRow
        recipeList={dinnerRecipes}
        isLoading={dinnerRecipesLoading}
        recipeType={RecipeType.Dinner}
      />
    </div>
  );
}

export default DinnerRecipes;
