import React from "react";

import { useAppSelector } from "../../../../../store/store";
import { RecipeRow } from "../recipe-row/RecipeRow";
import { RecipeType } from "../../../../../utils/constant";

function FavoriteRecipes() {
  const favoriteRecipes = useAppSelector(
    (state) => state.recipes.favoriteRecipes
  );
  const favoriteRecipesLoading = useAppSelector(
    (state) => state.recipes.favoriteRecipesLoading
  );

  return (
    <div className="PopularRecipes">
      {favoriteRecipes?.length > 0 && (
        <>
          <div className="d-flex align-items-center justify-content-between">
            <div className="recipe-category-title"> Favorite Recipes</div>
          </div>
          <RecipeRow
            recipeList={favoriteRecipes}
            isLoading={favoriteRecipesLoading}
            recipeType={RecipeType.Favorite}
          />
        </>
      )}
    </div>
  );
}

export default FavoriteRecipes;
