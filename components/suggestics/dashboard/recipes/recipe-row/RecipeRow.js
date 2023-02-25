import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Slider from "react-slick";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@material-ui/core";

import MagicSliderDots from "react-magic-slider-dots";
import { ThreeDotMenu } from "./ThreeDotMenu";
import {
  setSelectedRecipe,
  RECIPE_COUNT_INCREMENT,
  setFavoriteRecipesCount,
  setPopularRecipesCount,
  setBreakfastRecipesCount,
  setLunchRecipesCount,
  setDinnerRecipesCount,
  setSnackRecipesCount,
  setDessertRecipesCount,
  setUserRecipesCount,
  setPaginationLoader,
} from "../../../../../store/features/recipes/recipes-slice";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { SUGGESTIC_NO_IMAGE_URL } from "../recipe-view/recipe-main-info/RecipeMainInfo";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RecipeType } from "../../../../../utils/constant";
import CenterLoader from "../../../../CenterLoader/index";
import useOnClickOutside from "../../../../../hooks/useOnClickOutside";
import FallbackImage from "../../../../FallbackImage";
import "react-magic-slider-dots/dist/magic-dots.css";

const settings = {
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  centerMode: false,
  autoplay: false,
  autoplaySpeed: 2000,
  appendDots: (dots) => (
    <MagicSliderDots dots={dots} numDotsToShow={3} dotWidth={30} />
  ),
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export function RecipeRow(props) {
  const { recipeType } = props;
  const [pagination, setPagination] = useState("");
  const [showDots, setShowDots] = useState("");
  const [dots, setDots] = useState("");

  const { favoriteRecipes, paginationloader } = useAppSelector(
    (state) => state.recipes
  );

  const favoriteRecipesCount = useAppSelector(
    (state) => state.recipes.favoriteRecipesCount
  );
  const popularRecipesCount = useAppSelector(
    (state) => state.recipes.popularRecipesCount
  );
  const breakfastRecipesCount = useAppSelector(
    (state) => state.recipes.breakfastRecipesCount
  );
  const lunchRecipesCount = useAppSelector(
    (state) => state.recipes.lunchRecipesCount
  );
  const dinnerRecipesCount = useAppSelector(
    (state) => state.recipes.dinnerRecipesCount
  );
  const snackRecipesCount = useAppSelector(
    (state) => state.recipes.snackRecipesCount
  );
  const dessertRecipesCount = useAppSelector(
    (state) => state.recipes.dessertRecipesCount
  );
  const userRecipesCount = useAppSelector(
    (state) => state.recipes.userRecipesCount
  );

  const dispatch = useAppDispatch();
  const router = useRouter();
  const cardRef = useRef();
  useOnClickOutside(cardRef, () => {
    if (dots) {
      setDots("");
      setShowDots("");
    }
  });

  const loadMoreRecipe = () => {
    // dispatch(setPaginationLoader(recipeType));
    switch (props.recipeType) {
      case RecipeType.Favorite:
        dispatch(
          setFavoriteRecipesCount(favoriteRecipesCount + RECIPE_COUNT_INCREMENT)
        );
        break;
      case RecipeType.Popular:
        dispatch(
          setPopularRecipesCount(popularRecipesCount + RECIPE_COUNT_INCREMENT)
        );
        break;
      case RecipeType.Breakfast:
        dispatch(
          setBreakfastRecipesCount(
            breakfastRecipesCount + RECIPE_COUNT_INCREMENT
          )
        );
        break;
      case RecipeType.Lunch:
        dispatch(
          setLunchRecipesCount(lunchRecipesCount + RECIPE_COUNT_INCREMENT)
        );
        break;
      case RecipeType.Dinner:
        dispatch(
          setDinnerRecipesCount(dinnerRecipesCount + RECIPE_COUNT_INCREMENT)
        );
        break;
      case RecipeType.Snack:
        dispatch(
          setSnackRecipesCount(snackRecipesCount + RECIPE_COUNT_INCREMENT)
        );
        break;
      case RecipeType.Dessert:
        dispatch(
          setDessertRecipesCount(dessertRecipesCount + RECIPE_COUNT_INCREMENT)
        );
        break;
      case RecipeType.User:
        dispatch(
          setUserRecipesCount(userRecipesCount + RECIPE_COUNT_INCREMENT)
        );
        break;
      default:
        break;
    }
  };

  const goToDetails = (recipe) => {
    dispatch(setSelectedRecipe(recipe));
    router.push("/recepe-details?showAddToMealPlanButton=true");
  };

  const handleSwipeEvent = (_current, next) => {
    if (props.recipeList.length - next <= 4) {
      loadMoreRecipe();
    }
  };

  if (paginationloader === props.recipeType) {
    return <CenterLoader />;
  }

  const onLeave = () => {
    if (dots !== showDots) {
      setShowDots("");
      setDots("");
    }
  };

  return (
    <div className="RecipeRow">
      <div className="recipes-list-row">
        <Slider {...settings} dots beforeChange={handleSwipeEvent}>
          {props.recipeList?.map((recipe, index) => (
            <Card
              ref={cardRef}
              className="recipe-card"
              key={`${recipe.name}-${index.toString()}`}
              onMouseEnter={() => setShowDots(recipe.id)}
              onMouseLeave={() => dots == onLeave()}
            >
              <CardActionArea className="recipe-card-action">
                <div className="recipe-img-card">
                  {/* <ThreeDotMenu recipe={recipe} recipeType={props.recipeType} /> */}
                  <FallbackImage
                    className="card-recipe-img"
                    onClick={() => goToDetails(recipe)}
                    src={recipe.mainImage}
                    fallback={"/img/recipe_placeholder.png"}
                    defaultImage={"/img/image_not_found_placeholder.png"}
                    alt={recipe.name}
                  />
                  {/* <CardMedia
                    component="img"
                    className="card-recipe-img"
                    onClick={() => goToDetails(recipe)}
                    image={
                      recipe.mainImage
                        && recipe.mainImage !== SUGGESTIC_NO_IMAGE_URL
                        ? recipe.mainImage
                        : '/img/image_not_found_placeholder.png'
                    }
                    alt={recipe.name}
                  /> */}
                </div>
                <CardContent>
                  <div
                    className="recipe-title"
                    title={recipe.name}
                    onClick={() => goToDetails(recipe)}
                  >
                    {recipe.name}
                  </div>
                  <ThreeDotMenu
                    setDots={(e) => setDots(e)}
                    recipe={recipe}
                    dots={dots}
                    showDots={showDots}
                    recipeType={props.recipeType}
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Slider>
      </div>
    </div>
  );
}
