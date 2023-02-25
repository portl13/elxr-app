import React from "react";

import { useAppSelector } from "../../../../../store/store";
import { RecipeType } from "../../../../../utils/constant";
import { RecipeRow } from "../recipe-row/RecipeRow";

function UserRecipes() {
  const userRecipes = useAppSelector((state) => state.recipes.userRecipes);
  const userRecipesLoading = useAppSelector(
    (state) => state.recipes.userRecipesLoading
  );

  return (
    <div className="UserRecipes">
      {userRecipes?.length > 0 && (
        <div>
          <div className="recipe-category-title">Your Recipes</div>
          <RecipeRow
            recipeList={userRecipes}
            isLoading={userRecipesLoading}
            recipeType={RecipeType.User}
          />
        </div>
      )}
    </div>
  );
}

export default UserRecipes;
