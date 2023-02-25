import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Alert } from "@material-ui/lab";
import { CircularProgress, Typography } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { SHOPPING_LIST_AGGREGATE } from "../../../../../graphql/suggestic-queries";
import { setLoaderStatus } from "../../../../../store/features/loader/loader-slice";
import {
  setCurrentShoppingList,
  setIsDoneList,
} from "../../../../../store/features/shopping-list/shopping-list-slice";
import { ShoppingListByAisleDisplay } from "./shopping-list-by-aisle-display/ShoppingListByAisleDisplay";
import CenterLoader from "../../../../CenterLoader/index";

export const Aisles = [
  "Beverages",
  "Breads & Bakery",
  "Breakfast & Cereal",
  "Dairy, Cheese & Eggs",
  "Fats & Oils",
  "Herbs, Spices & Seasonings",
  "Meat & Seafood",
  "Nuts & Seeds",
  "Pantry",
  "Prepared Foods",
  "Produce",
  "Rice, Grains, Pasta & Beans",
  "Other",
];

export function ShoppingListByAisle() {
  const currentList = useAppSelector((state) => state.shoppingList.currentList);
  const isLoading = useAppSelector((state) => state.loader.isLoading);
  const dispatch = useAppDispatch();

  const { loading, error, data, refetch /* networkStatus */ } = useQuery(
    SHOPPING_LIST_AGGREGATE,
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
      const list = data.shoppingListAggregate?.edges.map((item) => item.node);
      dispatch(setCurrentShoppingList(list));
      dispatch(
        setIsDoneList(
          list.filter((item) => item.isDone).map((item) => item.databaseId)
        )
      );
      dispatch(setLoaderStatus(false));
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [currentList]);

  useEffect(() => {
    dispatch(setLoaderStatus(!!loading));
  }, [loading]);

  if (loading) {
    return (
      <div className="full-page-loader">
        <CenterLoader />
      </div>
    );
  }

  return (
    <div className="ShoppingListByAisle">
      {loading ? (
        <CenterLoader />
      ) : (
        <>
          {!loading && currentList.length > 0 && (
            <div>
              <div className="remove-cart-btn">
                <button className="btn btn-danger btn-small">Remove</button>
              </div>
              {Aisles.map((aisle) => {
                const aisleList = currentList.filter(
                  (item) => item.aisleName === aisle
                );
                return (
                  aisleList.length > 0 && (
                    <ShoppingListByAisleDisplay
                      key={aisle}
                      aisleList={aisleList}
                      aisleName={aisle}
                    />
                  )
                );
              })}
            </div>
          )}
          {currentList.length === 0 && (
            <Alert
              severity="info"
              sx={{ justifyContent: "center", alignContent: "center" }}
            >
              <Typography textAlign="center">Shopping List is Empty</Typography>
            </Alert>
          )}
        </>
      )}
    </div>
  );
}
