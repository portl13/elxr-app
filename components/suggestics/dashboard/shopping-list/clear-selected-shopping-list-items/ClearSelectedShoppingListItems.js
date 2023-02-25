import React from "react";
import { useAlert } from "react-alert";
import { useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";

import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { TIMEOUT } from "../../../../../utils/constant";
import { CLEAR_SHOPPING_LIST_CHECKED_ITEMS } from "../../../../../graphql/suggestic-mutatons";
import { setCurrentShoppingList } from "../../../../../store/features/shopping-list/shopping-list-slice";

export const ClearSelectedShoppingListItems = () => {
  const alert = useAlert();
  const currentList = useAppSelector((state) => state.shoppingList.currentList);
  const isDoneList = useAppSelector((state) => state.shoppingList.isDoneList);

  const dispatch = useAppDispatch();

  const [clearShoppingListCheckedItems /*{ data, loading, error }*/] =
    useMutation(CLEAR_SHOPPING_LIST_CHECKED_ITEMS);

  return (
    <div className="ClearSelectedShoppingListItems">
      {
        currentList.length > 0 && isDoneList.length > 0 && (
          <Button
            color={"secondary"}
            onClick={() => {
              clearShoppingListCheckedItems().then((value) => {
                if (value.data.clearShoppingListCheckedItems.success) {
                  dispatch(setCurrentShoppingList([]));
                  alert.success(
                    "Checked items were successfully cleared!",
                    TIMEOUT
                  );
                } else {
                  alert.error(
                    "An error occurred while clearing checked items...",
                    TIMEOUT
                  );
                }
              });
            }}
          >
            Clear Selected Items
          </Button>
        )
        // TODO: add confirmation dialog
      }
    </div>
  );
};
