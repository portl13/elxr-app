import React from "react";

import { Button, Typography } from "@material-ui/core";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../store/store";
import {
  setShoppingListByRecipe,
  setShoppingRecipeIdList,
} from "../../../../../../../store/features/shopping-list/shopping-list-slice";
import { useMutation } from "@apollo/client";
import { REMOVE_FROM_SHOPPING_LIST } from "../../../../../../../graphql/suggestic-mutatons";

export const RemoveRecipeButton = (props) => {
  const shoppingRecipeIdList = useAppSelector(
    (state) => state.shoppingList.shoppingRecipeIdList
  );
  const shoppingListByRecipe = useAppSelector(
    (state) => state.shoppingList.shoppingListByRecipe
  );

  const dispatch = useAppDispatch();

  const [removeFromShoppingList /*{ data, loading, error }*/] = useMutation(
    REMOVE_FROM_SHOPPING_LIST
  );

  const handleRemove = () => {
    removeFromShoppingList({
      variables: {
        recipeId: props.recipeId,
      },
    }).then((value) => {
      if (value?.data?.removeFromShoppingList?.success) {
        dispatch(
          setShoppingRecipeIdList(
            shoppingRecipeIdList.filter(
              (recipeId) => recipeId !== props.recipeId
            )
          )
        );
        dispatch(
          setShoppingListByRecipe(
            shoppingListByRecipe.filter(
              (item) => item.recipeId !== props.recipeId
            )
          )
        );
      }
    });
  };

  return (
    <div className="RemoveRecipeButton">
      <Button
        variant="text"
        // sx={{width: "100%", marginBottom: "10px"}}
        color={"secondary"}
        onClick={handleRemove}
      >
        <Typography>Remove Recipe</Typography>
      </Button>
    </div>
  );
};
