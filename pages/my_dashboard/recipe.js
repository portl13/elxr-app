import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
import Layout from "../../components/layout/Layout";
import { Recipes } from "../../components/suggestics/dashboard/recipes/Recipes";
import { LoadRecipes } from "../../components/suggestics/dashboard/recipes/load-recipes/LoadRecipes";
import { AddToMealPlan } from "../../components/suggestics/dashboard/recipes/recipe-view/add-to-mealplan/AddToMealPlan";
import {
  setCurrentMealplan,
  setRefetchMealPlan,
} from "../../store/features/mealplan/mealplan-slice";
import { GET_CURRENT_MEALPLAN } from "../../graphql/suggestic-queries";
import CenterLoader from "../../components/CenterLoader/index";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";

function RecipePage() {
  const dispatch = useDispatch();
  const {
    favoriteRecipesLoading,
    popularRecipesLoading,
    breakfastRecipesLoading,
    lunchRecipesLoading,
    dinnerRecipesLoading,
    snackRecipesLoading,
    dessertRecipesLoading,
    userRecipesLoading,
  } = useSelector((state) => state.recipes);

  const isRecipesLoading =
    favoriteRecipesLoading ||
    popularRecipesLoading ||
    breakfastRecipesLoading ||
    lunchRecipesLoading ||
    dinnerRecipesLoading ||
    snackRecipesLoading ||
    dessertRecipesLoading ||
    userRecipesLoading;

  const { error, data, loading, refetch } = useQuery(GET_CURRENT_MEALPLAN, {
    variables: {
      useDatetime: false,
      // fromDate: todayString,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    dispatch(setRefetchMealPlan(true));
  }, []);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      // console.log(data)
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

  return (
    <>
      <MainLayout sidebar={<MainSidebar />}>
        <LoadRecipes />
        <Container
          maxWidth="lg"
          className="main-inner d-flex flex-column justify-content-between"
        >
          {isRecipesLoading ? (
            <div className="full-page-loader flex-grow-1">
              <CenterLoader />
            </div>
          ) : (
            <div>
              <Recipes />
              <AddToMealPlan />
            </div>
          )}
        </Container>
      </MainLayout>
      {/* <div className="copyright-text footer-mb">
        Copyright © 2010-2023 ELXR. All rights reserved.ddd
      </div> */}
    </>
  );
}

export default RecipePage;
