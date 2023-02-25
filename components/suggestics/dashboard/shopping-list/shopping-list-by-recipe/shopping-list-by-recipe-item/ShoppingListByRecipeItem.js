import React from "react";

import { useMutation } from "@apollo/client";
import {
  Typography,
  List,
  ListItem,
  Radio,
  Grid,
  Box,
} from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../../../../../store/store";
import { setIsDoneList } from "../../../../../../store/features/shopping-list/shopping-list-slice";
import { TOGGLE_SHOPPING_LIST_ITEM } from "../../../../../../graphql/suggestic-mutatons";
import { RemoveRecipeButton } from "./remove-recipe-button/RemoveRecipeButton";
import { RecipeServings } from "./recipe-servings/RecipeServings";

export const ShoppingListByRecipeItem = (props) => {
  const isDoneList = useAppSelector((state) => state.shoppingList.isDoneList);
  const dispatch = useAppDispatch();
  const [toggleShoppingListItem /*{ data, loading, error }*/] = useMutation(
    TOGGLE_SHOPPING_LIST_ITEM
  );
  const handleClick = (databaseId) => {
    toggleShoppingListItem({
      variables: {
        isAggregate: false,
        itemId: databaseId,
      },
    }).then((value) => {
      if (value.data.toggleShoppingListItem.success) {
        if (!isItemChecked(databaseId)) {
          dispatch(setIsDoneList([...isDoneList, databaseId]));
        } else {
          dispatch(
            setIsDoneList(
              isDoneList.filter((currentId) => databaseId != currentId)
            )
          );
        }
      }
    });
  };

  const isItemChecked = (databaseId) => {
    return isDoneList.includes(databaseId);
  };

  return (
    <div className="ShoppingListByAisleDisplay">
      {props.ingredientList.length > 0 && (
        <Box className="recipe-list">
          <Box className="recipe-heading-container">
            <div className="d-flex align-items-center">
              <Radio
                // checked={checked}
                color={"primary"}
                checkedIcon={<img src="/img/checked-icon.svg" alt="icon" />}
              />
              <Box>
                <Typography variant="h5">
                  {props.ingredientList[0].recipeName}
                </Typography>
                {/* <RemoveRecipeButton recipeId={props.recipeId}/> */}
              </Box>
            </div>
            <RecipeServings
              recipeId={props.recipeId}
              numberOfServings={props.ingredientList[0].numberOfServings}
              recipeServings={props.ingredientList[0].recipeServings}
            />
          </Box>
          <Box className="recipe-list-container">
            <List>
              {props.ingredientList.map((ingredient) => {
                const checked = isItemChecked(ingredient.databaseId);
                return (
                  <ListItem
                    key={ingredient.databaseId}
                    sx={{ width: "100%" }}
                    onClick={() => handleClick(ingredient.databaseId)}
                  >
                    <Radio
                      checked={checked}
                      color={"primary"}
                      checkedIcon={
                        <img src="/img/checked-icon.svg" alt="icon" />
                      }
                    />
                    <Grid container alignItems="center">
                      <Grid item xs={8} wrap="no-wrap">
                        <Typography
                          sx={checked ? { textDecoration: "line-through" } : {}}
                        >
                          {ingredient.ingredient}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography className="unit-text">
                          {ingredient.floatQuantity} {ingredient.unit}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Box>
      )}
    </div>
  );
};
