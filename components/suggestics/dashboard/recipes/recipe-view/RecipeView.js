import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { setSelectedRecipe } from "../../../../../store/features/recipes/recipes-slice";
import { AppBar, Button, Dialog, Toolbar, Typography } from "@material-ui/core";
import { NavigateBefore } from "@material-ui/icons";
import { SwapButtonBar } from "./swap-button-bar/SwapButtonBar";
import { NutritionalInfo } from "./nutritional-info/NutritionalInfo";
import { RecipeInstructions } from "./recipe-instructions/RecipeInstructions";
import { IngredientsList } from "./ingredients-list/IngredientsList";
import { RecipeMainInfo } from "./recipe-main-info/RecipeMainInfo";
import { AddToMealPlan } from "./add-to-mealplan/AddToMealPlan";
import dayjs from "dayjs";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_MEALPLAN } from "../../../../../graphql/suggestic-queries";
import { setCurrentMealplan } from "../../../../../store/features/mealplan/mealplan-slice";
import { AdherenceScore } from "./adherence-score/AdherenceScore";

export const RecipeView = (props) => {
  const selectedRecipe = useAppSelector(
    (state) => state.recipes.selectedRecipe
  );
  const mealToSwap = useAppSelector((state) => state.mealplan.mealToSwap);
  const currentMealplan = useAppSelector(
    (state) => state.mealplan.currentMealplan
  );

  const dispatch = useAppDispatch();

  const { error, data /*loading, refetch, networkStatus*/ } = useQuery(
    GET_CURRENT_MEALPLAN,
    {
      variables: {
        useDatetime: false,
        // fromDate: todayString,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      dispatch(
        setCurrentMealplan(
          [...data.mealPlan]
            .sort((item1, item2) => {
              if (item1 === item2) return 0;
              return dayjs(item1.date).isBefore(dayjs(item2.date)) ? -1 : 1;
            })
            .slice(-7)
        )
      );
    }
  }, [data]);

  const handleClose = () => {
    dispatch(setSelectedRecipe({}));
  };

  return (
    <div className="RecipeView">
      <Dialog
        fullScreen
        open={!!selectedRecipe.id} //
        onClose={handleClose}
        sx={{ justifyContent: "center" }}
      >
        <AppBar
          sx={{ position: "relative", marginBottom: 2 }}
          color="transparent"
        >
          <Toolbar>
            <div>
              <Button
                color="default"
                className="back-btn"
                startIcon={<NavigateBefore />}
                onClick={handleClose}
              >
                <Typography alignSelf={"center"}>Go back</Typography>
              </Button>
            </div>
          </Toolbar>
        </AppBar>

        <div
          spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ width: "100%" }}
        >
          <RecipeMainInfo />

          {
            // doesn't make sense to show if opened from Meal Plan view etc
            !!props.showAddToMealPlanButton &&
              // only show if there's an active meal plan to add to
              currentMealplan.length !== 0 &&
              !dayjs(
                currentMealplan[currentMealplan.length - 1]?.date
              ).isBefore(dayjs()) && <AddToMealPlan />
          }

          {!!Math.floor(selectedRecipe?.adherenceDetails?.score / 10) && (
            <AdherenceScore />
          )}

          <IngredientsList />

          <RecipeInstructions />

          <NutritionalInfo />
        </div>

        {/*Conditional Swap Button Bar*/}
        {mealToSwap?.id && <SwapButtonBar />}
      </Dialog>
    </div>
  );
};
