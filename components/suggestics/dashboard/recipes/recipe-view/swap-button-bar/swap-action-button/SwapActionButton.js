import React from "react";
import { useAlert } from "react-alert";
import { useMutation } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../store/store";
import { TIMEOUT } from "../../../../../../../utils/constant";
import {
  setAddToMealPlanMode,
  setMealToSwap,
  setRefetchMealPlan,
} from "../../../../../../../store/features/mealplan/mealplan-slice";
import { SWAP_MEAL_PLAN_RECIPE } from "../../../../../../../graphql/suggestic-mutatons";
import { setLoaderStatus } from "../../../../../../../store/features/loader/loader-slice";
import { setSelectedRecipe } from "../../../../../../../store/features/recipes/recipes-slice";

export const SwapActionButton = (props) => {
  const alert = useAlert();
  const mealToSwap = useAppSelector((state) => state.mealplan.mealToSwap);
  const currentMealplan = useAppSelector(
    (state) => state.mealplan.currentMealplan
  );
  const selectedRecipe = useAppSelector(
    (state) => state.recipes.selectedRecipe
  );
  const isSelectedRecipe = Object.keys(selectedRecipe).length > 0;

  const dispatch = useAppDispatch();

  const [confirmationDialogOpen, setConfirmationDialogOpen] =
    React.useState(false);

  const [swapMealPlanRecipe /*{ data, loading, error }*/] = useMutation(
    SWAP_MEAL_PLAN_RECIPE
  );

  const openConfirmationDialog = () => {
    setConfirmationDialogOpen(true);
  };

  const handleCancel = () => {
    setConfirmationDialogOpen(false);
  };

  const resetState = () => {
    dispatch(setMealToSwap({}));
    dispatch(setSelectedRecipe({}));
    dispatch(setAddToMealPlanMode(false));
    dispatch(setRefetchMealPlan(true));
  };

  const handleOk = () => {
    if (!props.everyday) {
      dispatch(setLoaderStatus(true));
      console.log(mealToSwap.id, props.recipeId);
      swapMealPlanRecipe({
        variables: {
          mealId: mealToSwap.id,
          recipeId: props.recipeId,
        },
      }).then((value) => {
        dispatch(setLoaderStatus(false));
        if (value?.data?.swapMealPlanRecipe?.success) {
          setConfirmationDialogOpen(false);
          resetState();
          alert.success("Recipe is successfully swapped.", TIMEOUT);
        } else {
          alert.error("An error occurred while swapping recipe", TIMEOUT);
        }
      });
    } else {
      currentMealplan.forEach((mealPlanDay) => {
        mealPlanDay?.meals?.forEach((meal) => {
          if (meal?.meal?.toUpperCase() === mealToSwap?.meal?.toUpperCase()) {
            swapMealPlanRecipe({
              variables: {
                mealId: meal?.id,
                recipeId: props.recipeId,
              },
            });
          }
        });
      });
      resetState();
      dispatch(setLoaderStatus(false));
      alert.success("Recipe is successfully swapped for week.", TIMEOUT);
      // navigate(RoutePath.Dashboard);
    }
    setConfirmationDialogOpen(false);
  };

  return (
    <div className="SwapActionButton">
      {/* <Tooltip title={!props.everyday ? "Swap Recipe" : "Eat This Dish Everyday"}> */}
      <span>
        <Button
          aria-label="Swap Recipe"
          disabled={!isSelectedRecipe || !mealToSwap.id}
          variant="contained"
          color="secondary"
          size="large"
          sx={{ width: "100%" }}
          onClick={openConfirmationDialog}
        >
          {!props.everyday ? "Swap for the day" : "Swap for week"}
        </Button>
      </span>
      {/* </Tooltip> */}

      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
        maxWidth="xs"
        open={confirmationDialogOpen}
        className="updateMeal"
      >
        <span class="close" onClick={() => handleCancel()}>
          <svg
            class="MuiSvgIcon-root"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </span>
        <DialogTitle>
          <Typography variant="h5">Update Mealplan?</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {!props.everyday
              ? `Are you sure you want to swap this recipe into your mealplan?`
              : `Are you sure you want to swap this recipe into your mealplan for ${mealToSwap?.meal} everyday?`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOk} variant="contained" color="secondary">
            Yes, Update
          </Button>
          <Button autoFocus onClick={handleCancel} color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
