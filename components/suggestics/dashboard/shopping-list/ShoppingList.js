import React, { useEffect, useState } from "react";

import { Button, Toolbar, Typography } from "@material-ui/core";
import { NavigateBefore } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../../../../store/store";
import { ToggleByAisleRecipe } from "./toggle-by-aisle-recipe/ToggleByAisleRecipe";
import { setSlideIndex } from "../../../../store/features/dash-info/dash-info-slice";
import { ShoppingListByAisle } from "./shopping-list-by-aisle/ShoppingListByAisle";
import { ClearEntireShoppingList } from "./clear-entire-shopping-list/ClearEntireShoppingList";
import { ClearSelectedShoppingListItems } from "./clear-selected-shopping-list-items/ClearSelectedShoppingListItems";
import { ShoppingListByRecipe } from "./shopping-list-by-recipe/ShoppingListByRecipe";
import { ActionOutcomeDialog } from "../../../action-outcome-dialog/ActionOutcomeDialog";
import GradientButton from "../../../ui/button/GradientButton";
import { setLoaderStatus } from "../../../../store/features/loader/loader-slice";

export function ShoppingList() {
  const dispatch = useAppDispatch();
  const byAisleMode = useAppSelector((state) => state.shoppingList.byAisleMode);
  const currentList = useAppSelector((state) => state.shoppingList.currentList);
  const isLoading = useAppSelector((state) => state.loader.isLoading);
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [byAisleMode]);

  useEffect(() => {
    setLoaderStatus(true);
  }, [isLoading]);

  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 10);
    });
  }, []);

  return (
    <div className="ShoppingList">
      <div
        className={scroll ? "back_to_the_page fixed-top" : "back_to_the_page"}
      >
        <div className="back-btn" onClick={() => router.back()}>
          <img
            src="/img/back-arrow.svg"
            className="d-none d-md-block"
            alt="back"
          />
          <img src="/img/back-white.svg" className="d-md-none" alt="back" />
          <span>Back</span>
        </div>
      </div>
      {/* <Toolbar>
        <Button
          color="default"
          className="back-btn"
          startIcon={<NavigateBefore />}
          onClick={() => router.push('/my_dashboard/meal-plan')}
        >
          Back to Meal Plan
        </Button>
      </Toolbar> */}
      <div className="login-title text-md-center">SHOPPING LIST</div>
      <div className="login-subtitle text-md-center subtitle-bottom-margin">
        {currentList?.length} Items added in your shopping list
      </div>
      <ToggleByAisleRecipe />
      {byAisleMode ? <ShoppingListByAisle /> : <ShoppingListByRecipe />}
      {!isLoading && (
        <>
          <ClearSelectedShoppingListItems />
          <ClearEntireShoppingList />
        </>
      )}
      <div className="payment-btn">
        <GradientButton type="button" className="btn-block">
          Make Payment
        </GradientButton>
      </div>
    </div>
  );
}
