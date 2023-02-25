/* eslint-disable */
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useAlert } from "react-alert";

import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

import { TIMEOUT } from "../../../../utils/constant";
import GradientButton from "../../../../components/ui/button/GradientButton";

import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
//import { ActionOutcomeDialog } from "../../../../components/action-outcome-dialog/ActionOutcomeDialog";
import { useMutation } from "@apollo/client";
import {
  setIngredientLines,
  setIngredientSearchResults,
  setIngredientSearchTerm,
  setInstructions,
  setMealTime,
  setNumberOfServings,
  setRecipeIngredients,
  setRecipeName,
  setTotalTime,
} from "../../../../store/features/create-own-recipe/create-own-recipe-slice";
import { Ingredients } from "./ingredients/Ingredients";
import { Instructions } from "./instructions/Instructions";
import { CREATE_MY_RECIPE } from "../../../../graphql/suggestic-mutatons";
import { MY_RECIPES } from "../../../../graphql/suggestic-queries";
import { IngredientLines } from "./IngredientLines/IngredientLines";
import { setUserRecipes } from "../../../../store/features/recipes/recipes-slice";
//import { setSlideIndex } from "../../../../store/features/dash-info/dash-info-slice";
import router from "next/router";

export const CreateYourOwnRecipe = ({ isOpen, handleClose }) => {
  const dispatch = useAppDispatch();
  const alert = useAlert();
  const recipeName = useAppSelector(
    (state) => state.createOwnRecipe.recipeName
  );
  const totalTime = useAppSelector((state) => state.createOwnRecipe.totalTime);
  const mealTime = useAppSelector((state) => state.createOwnRecipe.mealTime);
  const recipeIngredients = useAppSelector(
    (state) => state.createOwnRecipe.recipeIngredients
  );
  const ingredientLines = useAppSelector(
    (state) => state.createOwnRecipe.ingredientLines
  );
  const instructions = useAppSelector(
    (state) => state.createOwnRecipe.instructions
  );
  const numberOfServings = useAppSelector(
    (state) => state.createOwnRecipe.numberOfServings
  );

  const userRecipesCount = useAppSelector(
    (state) => state.recipes.userRecipesCount
  );

  const [
    createMyRecipe,
    {
      /*loading, data, error */
    },
  ] = useMutation(CREATE_MY_RECIPE);

  const { loading, error, data, refetch /* networkStatus*/ } = useQuery(
    MY_RECIPES,
    {
      variables: {
        first: userRecipesCount,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const handleCloseAction = () => {
    router.push("/my_dashboard/recipe");
    refetch();
    resetState();
    handleClose();
  };

  const isDisabled = () => {
    return (
      recipeName?.length < 1 ||
      recipeIngredients?.length < 1 ||
      ingredientLines?.length < 1 ||
      instructions?.length < 1 ||
      totalTime?.length < 1 ||
      mealTime?.length < 1 ||
      numberOfServings === 0
    );
  };

  const resetState = () => {
    dispatch(setRecipeName(""));
    dispatch(setTotalTime(""));
    dispatch(setNumberOfServings(0));
    dispatch(setIngredientSearchTerm(""));
    dispatch(setIngredientSearchResults([]));
    dispatch(setRecipeIngredients([]));
    dispatch(setIngredientLines([""]));
    dispatch(setInstructions([""]));
  };

  const handleSubmit = () => {
    createMyRecipe({
      variables: {
        input: {
          courses: ["N/A"],
          cuisines: ["N/A"],
          ingredientLines: [...ingredientLines],
          ingredients: [
            ...recipeIngredients.map((ingredient) => {
              return {
                foodId: ingredient.foodId,
                grams: ingredient.isInGrams ? +ingredient.quantity : 0,
                milliliters: !ingredient.isInGrams ? +ingredient.quantity : 0,
              };
            }),
          ],
          instructions: [...instructions],
          language: "EN",
          mainImage: "",
          mealTimes: [mealTime],
          name: recipeName,
          numberOfServings: numberOfServings,
          squareImage: "",
          tags: ["userRecipe"],
          text: "",
          totalTime: totalTime,
          totalTimeInSeconds: 0,
        },
      },
    }).then((value) => {
      if (value?.data?.createMyRecipe?.success) {
        alert.success("Recipe is successfully created.", TIMEOUT);
        handleCloseAction();
      } else {
        alert.error("An error occurred while creating recipe.", TIMEOUT);
      }
    });
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      dispatch(setUserRecipes(data.myRecipes?.edges.map((item) => item.node)));
    }
  }, [data]);

  return (
    <div className="CreateYourOwnRecipe">
      <Modal
        className="modal-dialog-centered full-screen-modal"
        scrollable
        isOpen={isOpen}
        toggle={handleCloseAction}
      >
        {/* <ModalHeader
          toggle={handleCloseAction}
          close={
            <button
              onClick={() => handleClose()}
              type="button"
              className="close modal-cancel"
            >
              Cancel
            </button>
          }
        ></ModalHeader> */}
        <ModalBody>
          <div className="d-flex justify-content-end mb-3">
            <button
              onClick={() => handleClose()}
              type="button"
              className="close modal-cancel fixed-cancel"
            >
              Cancel
            </button>
          </div>
          <div className="create-recipe-wrap">
            <div className="recipe-img">
              <img src="/img/create-recipe.png" />
            </div>
            <div className="page-title mt-3 text-center">
              Create Your Own Recipe
            </div>
            <div className="page-subtitle text-center">
              Connect with coach &amp; users on ELXR and join communities to see
              live posts &amp; topics.
            </div>

            <div className="create-recipe-form">
              <TextField
                id="recipe-name-input"
                name="recipe-name"
                label="Recipe Name"
                type="text"
                // color="secondary"
                value={recipeName}
                // placeholder="Recipe name"
                onChange={(e) => dispatch(setRecipeName(e.target.value))}
              />

              <FormControl fullWidth className="mt-3">
                <InputLabel id="select-number-of-servings-label">
                  Number of Servings
                </InputLabel>
                <Select
                  labelId="select-number-of-servings-label"
                  id="select-number-of-servings"
                  // value={numberOfServings}
                  label="Number of Servings"
                  onChange={(e) =>
                    dispatch(setNumberOfServings(e.target.value))
                  }
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </FormControl>

              {/*Meal Time*/}
              <FormControl fullWidth className="mt-3">
                <InputLabel id="select-meal-time-label">Meal Time</InputLabel>
                <Select
                  labelId="select-meal-time-label"
                  id="select-meal-time"
                  // value={mealTime}
                  label="Meal Time"
                  onChange={(e) => dispatch(setMealTime(e.target.value))}
                >
                  <MenuItem value={"BREAKFAST"}>Breakfast</MenuItem>
                  <MenuItem value={"LUNCH"}>Lunch</MenuItem>
                  <MenuItem value={"DINNER"}>Dinner</MenuItem>
                  <MenuItem value={"SNACK"}>Snack</MenuItem>
                </Select>
              </FormControl>

              {/*Total Time*/}
              <TextField
                className="mt-3 input-with-helper"
                fullWidth
                id="total-time-input"
                name="total-time"
                label="Total time to make recipe"
                type="text"
                // color="secondary"
                helperText={'e.g. "5 minutes" or "2 hours"'}
                value={totalTime}
                onChange={(e) => dispatch(setTotalTime(e.target.value))}
              />

              <Divider />

              <Ingredients />

              <Divider />

              <Instructions />

              <Divider />

              <IngredientLines />

              <GradientButton
                disabled={isDisabled()}
                type="submit"
                onClick={handleSubmit}
                className="btn-block mt-5"
              >
                Create Recipe
              </GradientButton>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};
