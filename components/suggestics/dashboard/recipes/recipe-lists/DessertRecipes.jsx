import React from "react";

import { useAppSelector } from "../../../../../store/store";
import { RecipeType } from "../../../../../utils/constant";
import { RecipeRow } from "../recipe-row/RecipeRow";

function DessertRecipes() {
  const dessertRecipes = useAppSelector(
    (state) => state.recipes.dessertRecipes
  );
  const dessertRecipesLoading = useAppSelector(
    (state) => state.recipes.dessertRecipesLoading
  );

  return (
    <div className="DessertRecipes">
      <div className="recipe-category-title">Dessert/Treat</div>
      <RecipeRow
        recipeList={dessertRecipes}
        isLoading={dessertRecipesLoading}
        recipeType={RecipeType.Dessert}
      />
    </div>
  );
}

export default DessertRecipes;
