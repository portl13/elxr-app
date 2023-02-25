/* eslint-disable */
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Container,
} from "@material-ui/core";
import { NavigateBefore } from "@material-ui/icons";
import dayjs from "dayjs";
import { useQuery } from "@apollo/client";

import { useAppDispatch, useAppSelector } from "../store/store";
import { setSelectedRecipe } from "../store/features/recipes/recipes-slice";
import Meta from "../components/layout/Meta";
import { AddToMealPlan } from "../components/suggestics/dashboard/recipes/recipe-view/add-to-mealplan/AddToMealPlan";
import { ActionOutcomeDialog } from "../components/action-outcome-dialog/ActionOutcomeDialog";
import { SwapButtonBar } from "../components/suggestics/dashboard/recipes/recipe-view/swap-button-bar/SwapButtonBar";
import { NutritionalInfo } from "../components/suggestics/dashboard/recipes/recipe-view/nutritional-info/NutritionalInfo";
import { RecipeInstructions } from "../components/suggestics/dashboard/recipes/recipe-view/recipe-instructions/RecipeInstructions";
import { IngredientsList } from "../components/suggestics/dashboard/recipes/recipe-view/ingredients-list/IngredientsList";
import { RecipeMainInfo } from "../components/suggestics/dashboard/recipes/recipe-view/recipe-main-info/RecipeMainInfo";
import { AdherenceScore } from "../components/suggestics/dashboard/recipes/recipe-view/adherence-score/AdherenceScore";
import { setAddToMealPlanMode } from "../store/features/mealplan/mealplan-slice";
import { GET_CURRENT_MEALPLAN } from "../graphql/suggestic-queries";
import { setCurrentMealplan } from "../store/features/mealplan/mealplan-slice";
import { UserContext } from "../context/UserContext";

const RecipeDetails = (props) => {
  const [showSwapMealPlanBtn, setShowMealPlanBtn] = useState(false);
  const selectedRecipe = useAppSelector(
    (state) => state.recipes.selectedRecipe
  );
  const slideIndex = useAppSelector((state) => state.dashInfo.slideIndex);
  const mealToSwap = useAppSelector((state) => state.mealplan.mealToSwap);
  const currentMealplan = useAppSelector(
    (state) => state.mealplan.currentMealplan
  );

  const dispatch = useAppDispatch();
  const router = useRouter();
  let { query } = router;
  const { user } = useContext(UserContext);

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

  useEffect(() => {
    if (!selectedRecipe?.name) {
      router.push("/my-dashboard");
    }
  }, [selectedRecipe]);

  useEffect(() => {
    const { showAddToMealPlanButton } = router.query;
    if (!!showAddToMealPlanButton) {
      setShowMealPlanBtn(true);
    }
  }, []);

  const handleClose = () => {
    // dispatch(setSelectedRecipe({}));
    router.back();
  };

  const getTotalKcal = (calories) => {
    let totalKcal = 0;
    if (calories) {
      Object?.keys(calories).forEach(function (key) {
        if (calories[key] && !isNaN(calories[key])) {
          totalKcal += +calories[key];
        }
      });
    }
    return parseFloat(totalKcal).toFixed(2);
  };

  useEffect(() => {
    var lastScrollTop = 0;
    let headerEle = document.querySelector(".back_to_the_page");
    document.addEventListener("scroll", () => {
      var st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        headerEle.classList.add("fixed-top");
      } else {
        headerEle.classList.remove("fixed-top");
      }
    });
  }, []);

  const handleAddMealPlan = () => {
    dispatch(setAddToMealPlanMode(true));
  };

  return (
    <>
      <Meta />
      <Head>
        <title>Recipe Details</title>
      </Head>
      <Container maxWidth="lg" className="main-inner">
        <div className="RecipeView">
          {/* {!query.showAddToMealPlanButton ? <Toolbar>
                    <div className="back_to_the_page">
                        <Button
                            color="default"
                            className="back-btn justify-content-start"
                            startIcon={<NavigateBefore />}
                            onClick={handleClose}
                        >
                            <Typography alignSelf={"center"}>
                                <span className="hide-xs">Back to Meal Plan</span>
                            </Typography>
                        </Button>
                    </div>
                </Toolbar>: */}
          {!query.showAddToMealPlanButton ? (
            <div className="back_to_the_page">
              <div className="back-btn" onClick={handleClose}>
                <img
                  src="/img/back-arrow.svg"
                  className="d-none d-md-block"
                  alt="back"
                />
                <img
                  src="/img/back-white.svg"
                  className="d-md-none"
                  alt="back"
                />
                <span>Back to Meal Plan</span>
              </div>
            </div>
          ) : (
            <div className="back_to_the_page">
              <div className="back-btn" onClick={handleClose}>
                <img
                  src="/img/back-arrow.svg"
                  className="d-none d-md-block"
                  alt="back"
                />
                <img
                  src="/img/back-white.svg"
                  className="d-md-none"
                  alt="back"
                />
                <span>Back to Recipes</span>
              </div>
            </div>
          )}
          <div
            spacing={2}
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
            className="recepieBox"
          >
            <div className="row">
              <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12">
                <RecipeMainInfo />
              </div>
              <div className="col-xl-5 col-lg-8 col-md-12 col-sm-12">
                <div className="contentWrapper">
                  <CardContent>
                    {!!Math.floor(
                      selectedRecipe?.adherenceDetails?.score / 10
                    ) && <AdherenceScore />}
                    <Typography variant="h5" component="div" textAlign="left">
                      {selectedRecipe?.name}
                    </Typography>
                    <p>
                      Hi {user?.name || user?.display_name}, do you want to add
                      meals to your daily schedule? Just select a programme and
                      we will help you identify the dishes
                    </p>
                    {showSwapMealPlanBtn &&
                      currentMealplan.length !== 0 &&
                      !dayjs(
                        currentMealplan[currentMealplan.length - 1]?.date
                      ).isBefore(dayjs()) && (
                        <aside>
                          <span
                            className="gradientButton"
                            onClick={handleAddMealPlan}
                          >
                            Add to your existing meal plan
                          </span>
                        </aside>
                      )}
                    <ul className="list-unstyled foodInfo">
                      <li>
                        <p>
                          <img src="/img/kcal.svg" alt="ELXR" />{" "}
                          <span>
                            {selectedRecipe?.calories?.toFixed(2) ||
                              getTotalKcal(
                                selectedRecipe?.caloriesPerServing
                              )}{" "}
                            Kcal
                          </span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <img src="/img/clock.svg" alt="ELXR" />
                          <span>
                            {selectedRecipe?.totalTime
                              ? selectedRecipe?.totalTime
                              : ""}
                          </span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <img src="/img/dine.svg" alt="ELXR" />{" "}
                          <span>
                            {selectedRecipe?.numberOfServings
                              ? selectedRecipe?.numberOfServings > 1
                                ? `${selectedRecipe?.numberOfServings} servings`
                                : `${selectedRecipe?.numberOfServings} serving`
                              : ""}
                          </span>
                        </p>
                      </li>
                    </ul>

                    <Divider sx={{ marginBottom: 3 }} />

                    <div
                      direction="row"
                      spacing={2}
                      justifyContent="space-between"
                    ></div>
                  </CardContent>

                  <RecipeInstructions />

                  <NutritionalInfo />
                </div>
              </div>
              <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12">
                <div className="sideBar">
                  <IngredientsList showMealButton={showSwapMealPlanBtn} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <AddToMealPlan />
        <div className="copyright-text footer-mb ">
          Copyright © 2010-2023 ELXR. All rights reserved.
        </div>
      </Container>
    </>
  );
};

export default RecipeDetails;
