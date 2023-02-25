import React from "react";
import { useAlert } from "react-alert";

import { Button, Typography } from "@material-ui/core";
import { TIMEOUT } from "../../../../../../utils/constant";
import { useAppDispatch, useAppSelector } from "../../../../../../store/store";
import { setAddToShoppingListMode } from "../../../../../../store/features/mealplan/mealplan-slice";
import { setToAddList } from "../../../../../../store/features/shopping-list/shopping-list-slice";
import { ADD_RECIPES_TO_SHOPPING_LIST } from "../../../../../../graphql/suggestic-mutatons";
import { useMutation } from "@apollo/client";
import { LoaderButton } from "../../../../../../components/buttons/loader-button/LoaderButton";

export const AddToShoppingListButton = () => {
  const alert = useAlert();
  const addToShoppingListMode = useAppSelector(
    (state) => state.mealplan.addToShoppingListMode
  );
  const toAddList = useAppSelector((state) => state.shoppingList.toAddList);

  const dispatch = useAppDispatch();

  const [addRecipesToShoppingList, { loading /*data, error */ }] = useMutation(
    ADD_RECIPES_TO_SHOPPING_LIST
  );

  const handleClick = () => {
    dispatch(setAddToShoppingListMode(!addToShoppingListMode));
    dispatch(setToAddList([]));
  };

  const handleAdd = () => {
    console.log(toAddList);
    addRecipesToShoppingList({
      variables: {
        recipeIds: toAddList,
      },
    }).then((value) => {
      if (value?.data?.addRecipesToShoppingList?.success) {
        dispatch(setAddToShoppingListMode(false));
        dispatch(setToAddList([]));
        alert.success(
          "Recipes were successfully added to shopping list!",
          TIMEOUT
        );
        return;
      } else {
        alert.error(
          "An error occurred adding recipes to shopping list...",
          TIMEOUT
        );
      }
    });
  };

  return (
    <div className="AddToShoppingListButton" style={{ marginBottom: "10px" }}>
      <Button
        variant={addToShoppingListMode ? "outlined" : "contained"}
        sx={{ width: "100%", marginBottom: "10px" }}
        color={"secondary"}
        onClick={handleClick}
      >
        <Typography>
          {addToShoppingListMode ? "Done Adding" : "Add to Shopping List"}
        </Typography>
        {/*TODO: add Select All/Deselect All*/}
      </Button>
      {addToShoppingListMode && toAddList.length > 0 && (
        <LoaderButton
          variant="contained"
          sx={{ width: "100%", marginBottom: "10px" }}
          color={"secondary"}
          onClick={handleAdd}
          isLoading={loading}
          fullWidth
        >
          <Typography>
            Add {toAddList.length} {toAddList.length > 1 ? "items" : "item"} to
            Shopping List
          </Typography>
        </LoaderButton>
      )}
    </div>
  );
};
