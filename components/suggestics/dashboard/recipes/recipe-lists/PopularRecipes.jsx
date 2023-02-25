import React from "react";

import { useAppSelector } from "../../../../../store/store";
import { RecipeType } from "../../../../../utils/constant";
import { RecipeRow } from "../recipe-row/RecipeRow";
import CenterLoader from "../../../../CenterLoader/index";

function PopularRecipes() {
  const popularRecipes = useAppSelector(
    (state) => state.recipes.popularRecipes
  );
  const popularRecipesLoading = useAppSelector(
    (state) => state.recipes.popularRecipesLoading
  );
  return (
    <div className="PopularRecipes">
      <div className="d-flex align-items-center justify-content-between">
        <div className="recipe-category-title">Popular</div>
      </div>
      <RecipeRow
        recipeList={popularRecipes}
        isLoading={popularRecipesLoading}
        recipeType={RecipeType.Popular}
      />
    </div>
  );
}

export default PopularRecipes;
