import React from "react";

import { ButtonGroup, IconButton, Typography, Box } from "@material-ui/core";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../store/store";
import { setShoppingListByRecipe } from "../../../../../../../store/features/shopping-list/shopping-list-slice";
import { useMutation } from "@apollo/client";
import { UPDATE_SHOPPING_LIST_RECIPE_SERVINGS } from "../../../../../../../graphql/suggestic-mutatons";
import { Add, Remove } from "@material-ui/icons";

export const RecipeServings = (props) => {
  const shoppingListByRecipe = useAppSelector(
    (state) => state.shoppingList.shoppingListByRecipe
  );

  const dispatch = useAppDispatch();

  const [updateShoppingListRecipeServings /*{ data, loading, error }*/] =
    useMutation(UPDATE_SHOPPING_LIST_RECIPE_SERVINGS);

  const handleUpdate = (diff) => {
    updateShoppingListRecipeServings({
      variables: {
        recipeId: props.recipeId,
        numberOfServings: props.numberOfServings + diff,
      },
    }).then((value) => {
      if (value?.data?.updateShoppingListRecipeServings?.success) {
        dispatch(
          setShoppingListByRecipe(
            shoppingListByRecipe.map((item) => {
              return item.recipeId === props.recipeId
                ? {
                    ...item,
                    numberOfServings: item.numberOfServings + diff,
                  }
                : item;
            })
          )
        );
      }
    });
  };

  return (
    <div className="RecipeServings">
      <Typography color="text.secondary">
        {`
                        ${props.numberOfServings} ${
          props.numberOfServings === 1 ? "Serving" : "Servings"
        }
                        ${
                          props.numberOfServings === props.recipeServings
                            ? " (default)"
                            : ""
                        }
                        `}
      </Typography>
      <ButtonGroup
        variant="contained"
        aria-label="add or subtract servings buttons"
        className="plus-minus-btn"
      >
        <IconButton
          disabled={props.numberOfServings < 2}
          size="small"
          onClick={() => handleUpdate(-1)}
        >
          <Remove fontSize="small" />
        </IconButton>
        <Box className="serving-count">{props.numberOfServings}</Box>
        <IconButton size="small" onClick={() => handleUpdate(1)}>
          <Add fontSize="small" />
        </IconButton>
      </ButtonGroup>
    </div>
  );
};
