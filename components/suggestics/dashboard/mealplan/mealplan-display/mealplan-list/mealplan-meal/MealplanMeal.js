import React from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Link,
} from "@material-ui/core";
import { SwapButton } from "./swap-button/SwapButton";
import { RecipeIcon } from "../../../../recipes/recipe-icon/RecipeIcon";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../store/store";
import { ShoppingListCheckBox } from "./shopping-list-check-box/ShoppingListCheckBox";
import { setSelectedRecipe } from "../../../../../../../store/features/recipes/recipes-slice";
import { AddToMealPlanCheckBox } from "./add-to-meal-plan-check-box/AddToMealPlanCheckBox";
import { setAddToMealPlanMode } from "../../../../../../../store/features/mealplan/mealplan-slice";
import MealUpdateModal from "../../MealUpdateModal";

export const MealplanMeal = (props) => {
  const addToShoppingListMode = useAppSelector(
    (state) => state.mealplan.addToShoppingListMode
  );
  const addToMealPlanMode = useAppSelector(
    (state) => state.mealplan.addToMealPlanMode
  );

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleClick = () => {
    dispatch(
      setSelectedRecipe({ ...props.meal.recipe, calories: props.meal.calories })
    );
    router.push("/recepe-details");
    dispatch(setAddToMealPlanMode(false));
  };

  return (
    <div className="MealplanMeal">
      <Card>
        <CardContent>
          <div>
            <RecipeIcon imageSource={props.meal?.recipe?.mainImage} />
            <div>
              <Typography variant="h6">{props.meal?.recipe?.name}</Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="left"
                fontWeight={"bold"}
                className="breakfast"
              >
                {props.meal?.meal}
              </Typography>
              <Typography variant="body1" className="kcal">
                {props.meal?.numOfServings}{" "}
                {props.meal?.numOfServings === 1 ? "serving" : "servings"},{" "}
                {props.meal?.calories?.toFixed(2)} Kcal
              </Typography>
              <aside>
                <span onClick={handleClick} className="recepie_link">
                  See Recipe <img src="../img/path.svg" className="path-icon" />{" "}
                </span>
              </aside>
            </div>
          </div>
        </CardContent>

        {addToShoppingListMode && (
          <CardActions
            style={{ justifyContent: "flex-end" }}
            sx={{ display: "flex", marginTop: -10, marginBottom: 1 }}
          >
            <ShoppingListCheckBox
              recipeDatabaseId={props.meal.recipe.databaseId}
            />
          </CardActions>
        )}
        {!addToShoppingListMode && addToMealPlanMode && (
          <CardActions
            style={{ justifyContent: "flex-end" }}
            sx={{ display: "flex", marginTop: -10, marginBottom: 1 }}
          >
            <AddToMealPlanCheckBox meal={props.meal} />
          </CardActions>
        )}
        {!addToShoppingListMode && !addToMealPlanMode && (
          <CardActions
            style={{ justifyContent: "flex-end" }}
            sx={{ display: "flex", marginTop: -10, marginBottom: -1 }}
          >
            <SwapButton meal={props.meal} />
          </CardActions>
        )}
      </Card>
    </div>
  );
};
