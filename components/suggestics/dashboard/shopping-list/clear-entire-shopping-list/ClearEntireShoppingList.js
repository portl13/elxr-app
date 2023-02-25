import React from "react";
import { useAlert } from "react-alert";

import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { TIMEOUT } from "../../../../../utils/constant";

import Button from "@material-ui/core/Button";
import { useMutation } from "@apollo/client";
import { CLEAR_SHOPPING_LIST } from "../../../../../graphql/suggestic-mutatons";
import { setCurrentShoppingList } from "../../../../../store/features/shopping-list/shopping-list-slice";

export const ClearEntireShoppingList = () => {
  const alert = useAlert();
  const currentList = useAppSelector((state) => state.shoppingList.currentList);

  const dispatch = useAppDispatch();

  const [clearShoppingList /*{ data, loading, error }*/] =
    useMutation(CLEAR_SHOPPING_LIST);

  return (
    <div className="ClearEntireShoppingList">
      {currentList.length > 0 && (
        <Button
          color={"secondary"}
          onClick={() => {
            clearShoppingList().then((value) => {
              if (value.data.clearShoppingList.success) {
                // console.log(value);
                dispatch(setCurrentShoppingList([]));
                alert.success(
                  "Shopping list is successfully cleared!",
                  TIMEOUT
                );
              } else {
                alert.error(
                  "An error occurred while clearing Shopping List...",
                  TIMEOUT
                );
              }
            });
          }}
        >
          Clear Shopping List
        </Button>
      )}
    </div>
  );
};
