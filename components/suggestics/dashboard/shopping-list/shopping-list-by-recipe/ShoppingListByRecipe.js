import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { setLoaderStatus } from "../../../../../store/features/loader/loader-slice";

import { useQuery } from "@apollo/client";
import { SHOPPING_LIST } from "../../../../../graphql/suggestic-queries";
import { Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  setShoppingRecipeIdList,
  setShoppingListByRecipe,
} from "../../../../../store/features/shopping-list/shopping-list-slice";
import { ShoppingListByRecipeItem } from "./shopping-list-by-recipe-item/ShoppingListByRecipeItem";
import CenterLoder from "../../../../../components/CenterLoader/index";
export const ShoppingListByRecipe = () => {
  const currentList = useAppSelector((state) => state.shoppingList.currentList);
  const shoppingListByRecipe = useAppSelector(
    (state) => state.shoppingList.shoppingListByRecipe
  );
  const shoppingRecipeIdList = useAppSelector(
    (state) => state.shoppingList.shoppingRecipeIdList
  );
  const isLoading = useAppSelector((state) => state.loader.isLoading);
  console.log(isLoading, "21");
  const dispatch = useAppDispatch();

  const { loading, error, data, refetch /*networkStatus*/ } = useQuery(
    SHOPPING_LIST,
    {
      variables: {
        first: 100,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(setLoaderStatus(false));
    }
    if (data) {
      // console.log(data)
      dispatch(
        setShoppingListByRecipe(
          data.shoppingList?.edges.map((item) => item.node)
        )
      );
      dispatch(
        setShoppingRecipeIdList(
          Array.from(
            new Set(data.shoppingList?.edges.map((item) => item.node.recipeId))
          )
        )
      );
      // dispatch(setIsDoneList(list.filter((item: any) => item.isDone).map((item: any) => item.databaseId)));
      dispatch(setLoaderStatus(false));
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [currentList]);

  useEffect(() => {
    dispatch(setLoaderStatus(!!loading));
  }, [loading]);
  return (
    <div className="ShoppingListByRecipe">
      <div className="remove-cart-btn mb-3">
        <button className="btn btn-danger btn-small">Remove</button>
      </div>
      {isLoading ? (
        <CenterLoder />
      ) : (
        <>
          {shoppingRecipeIdList.length > 0 &&
            shoppingRecipeIdList.map((recipeId) => {
              return (
                <ShoppingListByRecipeItem
                  ingredientList={shoppingListByRecipe.filter(
                    (item) => item.recipeId === recipeId
                  )}
                  key={recipeId}
                  recipeId={recipeId}
                  // recipeName={shoppingListByRecipe.find(item => item.recipeId === recipeId).recipeName}
                />
              );
            })}
          {shoppingRecipeIdList.length === 0 && !loading && (
            <Alert
              severity="info"
              sx={{ justifyContent: "center", alignContent: "center" }}
            >
              <Typography textAlign={"center"}>
                Shopping List is Empty
              </Typography>
            </Alert>
          )}
        </>
      )}
    </div>
  );
};
