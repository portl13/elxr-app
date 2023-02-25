import React from "react";

import { useAppSelector } from "../../../../../store/store";
import { RecipeRow } from "../recipe-row/RecipeRow";
import { RecipeType } from "../../../../../utils/constant";

function SnackRecipes() {
  const snackRecipes = useAppSelector((state) => state.recipes.snackRecipes);
  const snackRecipesLoading = useAppSelector(
    (state) => state.recipes.snackRecipesLoading
  );

  return (
    <div className="SnackRecipes">
      <div className="recipe-category-title">Snack</div>
      <RecipeRow
        recipeList={snackRecipes}
        isLoading={snackRecipesLoading}
        recipeType={RecipeType.Snack}
      />
    </div>
  );
}

export default SnackRecipes;
