import React from "react";

import FavoriteRecipes from "./recipe-lists/FavoriteRecipes";
import PopularRecipes from "./recipe-lists/PopularRecipes";
import BreakfastRecipes from "./recipe-lists/BreakfastRecipes";
import LunchRecipes from "./recipe-lists/LunchRecipes";
import DinnerRecipes from "./recipe-lists/DinnerRecipes";
import SnackRecipes from "./recipe-lists/SnackRecipes";
import { SearchRecipes } from "./search-recipes/SearchRecipes";
import DessertRecipes from "./recipe-lists/DessertRecipes";
import UserRecipes from "./recipe-lists/UserRecipes";

export const RECIPES_PER_ROW = 20;

export function Recipes() {
  return (
    <div className="Recipes">
      <SearchRecipes />
      <FavoriteRecipes />
      <PopularRecipes />
      <BreakfastRecipes />
      <LunchRecipes />
      <DinnerRecipes />
      <SnackRecipes />
      <DessertRecipes />
      <UserRecipes />
    </div>
  );
}
