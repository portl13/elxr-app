import React, { useState, useEffect } from "react";

import { IconButton, Tooltip, Typography } from "@material-ui/core";
import { SwapHorizontalCircle } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { SwapPage } from "../../../../swap-page/SwapPage";
import { useAppDispatch } from "../../../../../../../../store/store";
// import {useNavigate} from "react-router-dom";
import { setMealToSwap } from "../../../../../../../../store/features/mealplan/mealplan-slice";
import { setSelectedRecipe } from "../../../../../../../../store/features/recipes/recipes-slice";
import MealUpdateModal from "../../../MealUpdateModal";

export function SwapButton(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const { mealplanModal } = useSelector((state) => state.journal);
  const handleClose = () => {
    setIsOpen(!isOpen);
    dispatch(setSelectedRecipe({}));
  };

  // useEffect(() => {
  //     if (mealplanModal) {
  //         setIsOpen(false)
  //     }
  // }, [mealplanModal])

  return (
    <>
      <div className="SwapButton">
        {/* TODO: should use columns to place this in meal card */}
        <IconButton
          aria-label="Swap Recipe"
          onClick={(e) => {
            e.preventDefault();
            dispatch(setMealToSwap(props.meal));
            setIsOpen(!isOpen);
            // navigate(`/swap/${props.meal.id}`);
          }}
        >
          <div>
            <img src="../img/swap.svg" className="swap-icon" />
            <Typography fontWeight="bold" variant="body2">
              Swap
            </Typography>
          </div>
        </IconButton>
        <SwapPage isOpen={isOpen} handleClose={handleClose} />
        {/* <MealUpdateModal isOpen={mealplanModal} /> */}
      </div>
    </>
  );
}
