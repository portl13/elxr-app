import React from "react";

import { LoadBreakfastRecipes } from "./LoadBreakfastRecipes";
import { LoadDinnerRecipes } from "./LoadDinnerRecipes";
import { LoadLunchRecipes } from "./LoadLunchRecipes";
import { LoadFavoriteRecipes } from "./LoadFavoriteRecipes";
import { LoadPopularRecipes } from "./LoadPopularRecipes";
import { LoadSnackRecipes } from "./LoadSnackRecipes";
import { LoadDessertRecipes } from "./LoadDessertRecipes";
import { LoadUserRecipes } from "./LoadUserRecipes";

export function LoadRecipes() {
  return (
    <div className="LoadRecipes">
      <LoadFavoriteRecipes />
      <LoadPopularRecipes />
      <LoadBreakfastRecipes />
      <LoadLunchRecipes />
      <LoadDinnerRecipes />
      <LoadSnackRecipes />
      <LoadDessertRecipes />
      <LoadUserRecipes />
    </div>
  );
}
