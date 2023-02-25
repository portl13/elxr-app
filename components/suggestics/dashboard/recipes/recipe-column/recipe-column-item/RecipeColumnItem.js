import React from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardActionArea,
  CardContent,
  FormControlLabel,
  Radio,
  Typography,
} from "@material-ui/core";
import { RecipeIcon } from "../../recipe-icon/RecipeIcon";
import { setSelectedRecipe } from "../../../../../../store/features/recipes/recipes-slice";
import { useAppDispatch, useAppSelector } from "../../../../../../store/store";
// import {FavoriteButton} from "../favorite-button/FavoriteButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

export const RecipeColumnItem = (props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const selectedRecipe = useAppSelector(
    (state) => state.recipes.selectedRecipe
  );

  const handleClick = (event) => {
    event.stopPropagation();
    dispatch(setSelectedRecipe(props.recipe));
  };

  const goToRecipeDetails = (recipe) => {
    if (props.closeSearch) {
      props.closeSearch();
    }
    dispatch(setSelectedRecipe(recipe));
    router.push("/recepe-details?showAddToMealPlanButton=true");
  };

  return (
    <div className="RecipeColumnItem">
      <Card sx={{ width: "100%" }}>
        <CardActionArea>
          <CardContent>
            <div className="RecipeBox">
              <div className="RecipeTop">
                <RecipeIcon imageSource={props.recipe.mainImage} />
                <div className="search-recipe-wrap">
                  <Typography
                    onClick={() => goToRecipeDetails(props.recipe)}
                    className="recipe-name"
                    gutterBottom
                    variant="body1"
                    component="div"
                    textAlign="left"
                  >
                    {props.recipe.name}
                  </Typography>
                  <Typography variant="body1" className="recipe-category">
                    {props.recipe?.mealTags?.join(", ")}
                  </Typography>
                  <Typography variant="body1" className="recipe-category">
                    {props.recipe?.numberOfServings}{" "}
                    {props.recipe?.numberOfServings === 1
                      ? "serving"
                      : "servings"}{" "}
                    {props.recipe?.nutrientsPerServing?.calories} Kcal
                  </Typography>
                  {/* <aside><span onClick={() => goToRecipeDetails(props.recipe)} className="recepie_link">See Recipe
                                        <img src="../img/path.svg" className="path-icon" /> </span></aside> */}
                </div>
              </div>
              {props.selectRecipe && (
                <div>
                  <FormControlLabel
                    value={props.recipe?.id}
                    control={
                      <Radio
                        color={"secondary"}
                        checkedIcon={
                          <img
                            className="meal-check"
                            src="/img/checked-circle.png"
                            alt="icon"
                          />
                        }
                        checked={selectedRecipe?.id === props.recipe?.id}
                        onClick={handleClick}
                      />
                    }
                  />
                </div>
              )}
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};
