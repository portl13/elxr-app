import React from "react";

import { useAppDispatch, useAppSelector } from "../../../../../../store/store";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Toolbar,
  Typography,
} from "@material-ui/core";

import { SUGGESTIC_NO_IMAGE_URL } from "../recipe-main-info/RecipeMainInfo";
import {
  setAddToMealPlanMode,
  setMealToSwap,
} from "../../../../../../store/features/mealplan/mealplan-slice";
import { Close } from "@material-ui/icons";
import { ActionOutcomeDialog } from "../../../../../../components/action-outcome-dialog/ActionOutcomeDialog";
import { MealplanChoose } from "../../../mealplan/mealplan-display/MealplanChoose";
import { SwapButtonBar } from "../swap-button-bar/SwapButtonBar";

export const AddToMealPlan = () => {
  const addToMealPlanMode = useAppSelector(
    (state) => state.mealplan.addToMealPlanMode
  );
  const selectedRecipe = useAppSelector(
    (state) => state.recipes.selectedRecipe
  );

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setAddToMealPlanMode(false));
    dispatch(setMealToSwap({}));
  };

  return (
    <div className="AddToMealPlan" style={{ width: "90%" }}>
      <Dialog
        fullScreen
        maxWidth="sm"
        open={addToMealPlanMode}
        onClose={handleClose}
        sx={{ justifyContent: "center", textAlign: "center" }}
      >
        <div className="swapRecipePage">
          <AppBar
            sx={{ position: "relative", marginBottom: 2 }}
            color="transparent"
          >
            <Toolbar>
              <div>
                <Button
                  variant="text"
                  sx={{ width: "100%" }}
                  color="error"
                  startIcon={<Close />}
                  onClick={handleClose}
                >
                  <Typography alignSelf="right"></Typography>
                </Button>
              </div>
            </Toolbar>
          </AppBar>
          <Typography variant="h4" className="header-text">
            SWAP YOUR MEAL
          </Typography>
          <Box alignSelf={"center"}>
            <div className="meal-swap-wrap">
              <div className="meal-img">
                <img
                  src={
                    selectedRecipe.mainImage &&
                    selectedRecipe.mainImage !== SUGGESTIC_NO_IMAGE_URL
                      ? selectedRecipe.mainImage
                      : "/img/image_not_found_placeholder.png"
                  }
                  alt="ELXR"
                />
              </div>
              <div className="meal-swap-detail">
                <div className="meal-title">{selectedRecipe?.name}</div>
                <div className="meal-subtitle">
                  {selectedRecipe?.recipeType?.toUpperCase()}
                </div>
                <div className="meal-subtitle">
                  {" "}
                  {selectedRecipe?.numberOfServings}{" "}
                  {selectedRecipe?.numberOfServings === 1
                    ? "Serving"
                    : "Servings"}
                </div>
              </div>
            </div>
            <MealplanChoose />
          </Box>
        </div>

        {<SwapButtonBar />}
      </Dialog>
    </div>
  );
};
