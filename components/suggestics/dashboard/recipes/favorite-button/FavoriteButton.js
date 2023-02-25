import React from "react";

import { useMutation } from "@apollo/client";
import { IconButton, Tooltip, MenuItem } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import { USER_FAVORITE_RECIPE } from "../../../../../graphql/suggestic-mutatons";
import {
  setFavoriteRecipes,
  setPopularRecipes,
  setBreakfastRecipes,
  setLunchRecipes,
  setDinnerRecipes,
  setSnackRecipes,
  setSelectedRecipe,
  setDessertRecipes,
} from "../../../../../store/features/recipes/recipes-slice";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { RecipeType } from "../../../../../utils/constant";

export function FavoriteButton(props) {
  const favoriteRecipes = useAppSelector(
    (state) => state.recipes.favoriteRecipes
  );
  const popularRecipes = useAppSelector(
    (state) => state.recipes.popularRecipes
  );
  const breakfastRecipes = useAppSelector(
    (state) => state.recipes.breakfastRecipes
  );
  const lunchRecipes = useAppSelector((state) => state.recipes.lunchRecipes);
  const dinnerRecipes = useAppSelector((state) => state.recipes.dinnerRecipes);
  const snackRecipes = useAppSelector((state) => state.recipes.snackRecipes);
  const dessertRecipes = useAppSelector(
    (state) => state.recipes.dessertRecipes
  );

  const selectedRecipe = useAppSelector(
    (state) => state.recipes.selectedRecipe
  );

  const dispatch = useAppDispatch();

  const [userFavoriteRecipe] = useMutation(USER_FAVORITE_RECIPE);

  function editArray(oldArray) {
    return [...oldArray].map((item) => {
      if (item.databaseId === props.recipe.databaseId) {
        return {
          ...item,
          isUserFavorite: !item.isUserFavorite,
        };
      }
      return item;
    });
  }

  function toggleSingleRecipeView() {
    dispatch(
      setSelectedRecipe({
        ...selectedRecipe,
        isUserFavorite: !selectedRecipe.isUserFavorite,
      })
    );
  }

  function toggleMultiRecipeView() {
    const isFavorite = props.recipe.isUserFavorite;

    switch (props.recipeType) {
      case RecipeType.Favorite: {
        dispatch(setPopularRecipes(editArray(popularRecipes)));
        dispatch(setBreakfastRecipes(editArray(breakfastRecipes)));
        dispatch(setLunchRecipes(editArray(lunchRecipes)));
        dispatch(setDinnerRecipes(editArray(dinnerRecipes)));
        dispatch(setSnackRecipes(editArray(snackRecipes)));
        dispatch(setDessertRecipes(editArray(dessertRecipes)));
        break;
      }
      case RecipeType.Popular: {
        dispatch(setPopularRecipes(editArray(popularRecipes)));
        break;
      }
      case RecipeType.Breakfast: {
        dispatch(setBreakfastRecipes(editArray(breakfastRecipes)));
        break;
      }
      case RecipeType.Lunch: {
        dispatch(setLunchRecipes(editArray(lunchRecipes)));
        break;
      }
      case RecipeType.Dinner: {
        dispatch(setDinnerRecipes(editArray(dinnerRecipes)));
        break;
      }
      case RecipeType.Snack: {
        dispatch(setSnackRecipes(editArray(snackRecipes)));
        break;
      }
      case RecipeType.Dessert: {
        dispatch(setDessertRecipes(editArray(dessertRecipes)));
        break;
      }
      // note: User created recipes cannot be favorited
      default:
        break;
    }

    if (isFavorite) {
      // remove from favorites
      dispatch(
        setFavoriteRecipes(
          favoriteRecipes.filter(
            (item) => item.databaseId != props.recipe.databaseId
          )
        )
      );
    } else {
      // add to favorites
      dispatch(
        setFavoriteRecipes([
          {
            ...props.recipe,
            isUserFavorite: true,
          },
          ...favoriteRecipes,
        ])
      );
    }
  }

  function toggleFavorite(event) {
    event.stopPropagation();
    const id =
      props.recipeType === "USER" ? props.recipe.id : props.recipe.databaseId;
    userFavoriteRecipe({
      variables: {
        recipeId: id,
      },
    }).then((value) => {
      if (value?.data?.userFavoriteRecipe?.success) {
        // change the heart icon accordingly
        if (props.singleRecipeView) {
          toggleSingleRecipeView();
        } else {
          window.scrollTo(0, 0);
          toggleMultiRecipeView();
          props.handleClose();
        }
      }
    });
  }

  return (
    <>
      {!props.singleRecipeView && (
        <MenuItem onClick={toggleFavorite}>
          {props.recipe.isUserFavorite
            ? "Remove from Favorites"
            : "Add to Favorites"}
        </MenuItem>
      )}
      {props.singleRecipeView && (
        <div className="FavoriteButton">
          <Tooltip
            title={
              props.recipe.isUserFavorite
                ? "Remove recipe from Favorites"
                : "Add recipe to Favorites"
            }
          >
            <IconButton
              aria-label={
                props.recipe.isUserFavorite
                  ? "Remove recipe from Favorites"
                  : "Add recipe to Favorites"
              }
              onClick={toggleFavorite}
            >
              {props.recipe.isUserFavorite ? (
                <Favorite sx={{ color: "red" }} />
              ) : (
                <Favorite />
              )}
            </IconButton>
          </Tooltip>
        </div>
      )}
    </>
  );
}
