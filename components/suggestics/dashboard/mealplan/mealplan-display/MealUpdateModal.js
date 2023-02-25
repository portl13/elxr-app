import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  setMealPlanModal,
  setAddToMealPlanMode,
  setMealToSwap,
  setRefetchMealPlan,
} from "../../../../../store/features/mealplan/mealplan-slice";
import { setSelectedRecipe } from "../../../../../store/features/recipes/recipes-slice";

import { useMutation } from "@apollo/client";
import { SWAP_MEAL_PLAN_RECIPE } from "../../../../../graphql/suggestic-mutatons";
import { setLoaderStatus } from "../../../../../store/features/loader/loader-slice";
import { useAlert } from "react-alert";
import { TIMEOUT } from "../../../../../utils/constant";

const MealUpdateModal = ({ handleCancel, isOpen }) => {
  // const [loaderStatus, setLoaderStatus] = useState(false)
  const { swapMealData, currentMealplan } = useSelector(
    (state) => state.mealplan
  );
  const dispatch = useDispatch();

  const alert = useAlert();
  const mealToSwap = useSelector((state) => state.mealplan.mealToSwap);
  const selectedRecipe = useSelector((state) => state.recipes.selectedRecipe);

  const [swapMealPlanRecipe /*{ data, loading, error }*/] = useMutation(
    SWAP_MEAL_PLAN_RECIPE
  );

  const handleOk = () => {
    if (!swapMealData.everyday) {
      dispatch(setLoaderStatus(true));
      console.log(mealToSwap.id, swapMealData.recipeId);
      swapMealPlanRecipe({
        variables: {
          mealId: mealToSwap.id,
          recipeId: swapMealData.recipeId,
        },
      }).then((value) => {
        dispatch(setLoaderStatus(false));
        if (value?.data?.swapMealPlanRecipe?.success) {
          resetState();
          alert.success("Recipe is successfully swapped.", TIMEOUT);
        } else {
          alert.error("An error occurred while swapping recipe...", TIMEOUT);
        }
      });
    } else {
      currentMealplan.forEach((mealPlanDay) => {
        mealPlanDay?.meals?.forEach((meal) => {
          if (meal?.meal?.toUpperCase() === mealToSwap?.meal?.toUpperCase()) {
            swapMealPlanRecipe({
              variables: {
                mealId: meal?.id,
                recipeId: swapMealData.recipeId,
              },
            });
          }
        });
      });
      resetState();
      dispatch(setLoaderStatus(false));
      alert.success("Recipe is successfully swapped for week.", TIMEOUT);
    }
  };

  const resetState = () => {
    handleCancel();
    dispatch(setMealPlanModal(false));
    dispatch(setMealToSwap({}));
    dispatch(setSelectedRecipe({}));
    dispatch(setAddToMealPlanMode(false));
    dispatch(setRefetchMealPlan(true));
  };

  return (
    <Dialog
      // sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={isOpen}
      className="updateMeal"
    >
      {/* <span class="close" onClick={() => handleCancel()}><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg></span> */}
      <DialogTitle>
        <Typography variant="h5">Update Mealplan?</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {!swapMealData?.everyday
            ? `Are you sure you want to swap this recipe into your mealplan?`
            : `Are you sure you want to swap this recipe into your mealplan for ${mealToSwap?.meal} everyday?`}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOk} variant="contained" color="secondary">
          Yes, Update
        </Button>
        <Button
          autoFocus
          onClick={() => dispatch(setMealPlanModal(false))}
          color="error"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MealUpdateModal;
