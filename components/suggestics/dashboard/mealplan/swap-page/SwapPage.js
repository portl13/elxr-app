import React, { useEffect } from "react";

import {
  AppBar,
  Button,
  Dialog,
  Toolbar,
  Typography,
  RadioGroup,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

import { RecommendedSwaps } from "./swap-options/RecommendedSwaps";
import { SwapButtonBar } from "../../../dashboard/recipes/recipe-view/swap-button-bar/SwapButtonBar";
import { useAppSelector } from "../../../../../store/store";
import { FavoriteSwaps } from "./swap-options/FavoriteSwaps";
import CenterLoader from "../../../../CenterLoader/index";
import { setRecommendedSwaps } from "../../../../../store/features/mealplan/mealplan-slice";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { RECOMMENDED_SWAPS } from "../../../../../graphql/suggestic-queries";

export const SwapPage = ({ isOpen, handleClose }) => {
  const { mealToSwap, favoriteLoader, recommendedLoader, recommendedSwaps } =
    useAppSelector((state) => state.mealplan);

  const dispatch = useDispatch();

  const { loading, error, data /*refetch, networkStatus*/ } = useQuery(
    RECOMMENDED_SWAPS,
    {
      variables: {
        forSimpleMealPlan: false,
        mealTime: mealToSwap?.meal?.toUpperCase(),
      },
    }
  );

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      dispatch(setRecommendedSwaps(data.recommendedSwaps?.recipes));
    }
  }, [data]);

  return (
    <Dialog
      fullScreen
      maxWidth="sm"
      open={isOpen}
      onClose={handleClose}
      className="mealModal newMeal"
    >
      <div className="SwapPage new_swap">
        <AppBar
          sx={{ position: "relative", marginBottom: 2 }}
          color="transparent"
        >
          <Toolbar>
            <Button
              variant="text"
              sx={{ width: "100%" }}
              color="error"
              startIcon={<Close />}
              onClick={handleClose}
            >
              <Typography alignSelf={"right"}></Typography>
            </Button>
          </Toolbar>
        </AppBar>
        <Typography variant="h4" className="header-text text-white">
          {/* {mealToSwap?.meal ? mealToSwap?.meal?.charAt(0)?.toUpperCase() + mealToSwap?.meal?.slice(1) : ""} Swap Options */}{" "}
          SWAP YOUR MEAL
        </Typography>
        <Typography className="header-sub-text text-white">
          Swap your breakfast with a meal recommended for you or your
          favourites!
        </Typography>

        <RadioGroup className="mealGroup">
          {loading ? (
            <div className="full-page-loader">
              <CenterLoader />
            </div>
          ) : (
            <div className="mealBox text-white">
              <Typography>Recommended Meals</Typography>
              <RecommendedSwaps
                recommendedSwaps={recommendedSwaps}
                loading={loading}
              />

              <div className="favoriteMeal">
                <Typography>Favorite Meal</Typography>
                <FavoriteSwaps />
              </div>
            </div>
          )}
        </RadioGroup>
      </div>
      <div>{mealToSwap?.id && <SwapButtonBar />}</div>
    </Dialog>
  );
};
