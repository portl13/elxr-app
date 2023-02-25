import React, { useState } from "react";
//import dayjs from "dayjs";
import { useAlert } from "react-alert";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { Card, CardContent, Typography } from "@material-ui/core";

import { TIMEOUT } from "../../../../../../utils/constant";
import { useAppDispatch, useAppSelector } from "../../../../../../store/store";
import { setLoaderStatus } from "../../../../../../store/features/loader/loader-slice";
import { ADD_RECIPES_TO_SHOPPING_LIST } from "../../../../../../graphql/suggestic-mutatons";
//import { setAddToMealPlanMode } from "../../../../../../store/features/mealplan/mealplan-slice";
//import { setSlideIndex } from "../../../../../../store/features/dash-info/dash-info-slice";

export const IngredientsList = (props) => {
  const selectedRecipe = useAppSelector(
    (state) => state.recipes.selectedRecipe
  );
  const currentMealplan = useAppSelector(
    (state) => state.mealplan.currentMealplan
  );
  const [gotToCart, setGoToCart] = useState(false);
  const alert = useAlert();

  const [addRecipesToShoppingList, { loading /*data, error*/ }] = useMutation(
    ADD_RECIPES_TO_SHOPPING_LIST
  );

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAdd = () => {
    console.log(selectedRecipe);
    dispatch(setLoaderStatus(true));
    addRecipesToShoppingList({
      variables: {
        recipeIds: [selectedRecipe.databaseId],
      },
    }).then((value) => {
      dispatch(setLoaderStatus(false));
      if (value?.data?.addRecipesToShoppingList?.success) {
        alert.success(
          "Recipe is successfully added to shopping list.",
          TIMEOUT
        );
      } else {
        alert.error(
          "An error occurred adding recipes to shopping list.",
          TIMEOUT
        );
      }
      setGoToCart(true);
    });
  };

  /*   const handleAddMealPlan = () => {
    dispatch(setAddToMealPlanMode(true));
  }; */

  const gotToShoppingList = () => {
    router.push("/my_dashboard/shopping-list");
  };

  return (
    <Card sx={{ width: "90%" }} className="IngredientsList">
      <CardContent>
        <div className="ingreBox">
          <Typography className="capTitle">Ingredients</Typography>
          <ul className="list-ingre">
            {selectedRecipe?.ingredientLines?.map((item, index) => {
              return <li key={"ingredient" + index}>{item}</li>;
            })}
          </ul>

          {!gotToCart && (
            <aside>
              <span className="gradientButton" onClick={handleAdd}>
                <img src="/img/shoping-bag.svg" alt="ELXR" />
                Shop ingredients
              </span>
            </aside>
          )}

          {gotToCart && (
            <aside>
              <span className="gradientButton" onClick={gotToShoppingList}>
                <img src="/img/shoping-bag.svg" alt="ELXR" /> Go To Shopping
                List
              </span>
            </aside>
          )}

          {/* {props.showMealButton &&
            currentMealplan.length !== 0 &&
            !dayjs(currentMealplan[currentMealplan.length - 1]?.date).isBefore(
              dayjs()
            ) && (
              <aside>
                <span
                  className="outlinedButton mt-4"
                  onClick={handleAddMealPlan}
                >
                  <img src="/img/swap-icon.svg" alt="ELXR" /> Add to your
                  existing meal plan
                </span>
              </aside>
            )} */}
        </div>
      </CardContent>
    </Card>
  );
};
