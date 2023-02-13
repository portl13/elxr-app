import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import Card from "@/elxr/components/bits/Card";

import SpinnerLoader from "@/components/shared/loader/SpinnerLoader";

import { useRecipes } from "@/elxr/hooks/api/recipes";

import {
  cardCSS,
  carouselCSS,
  NoResults,
  RecipeItem,
  RecipeContainer,
  RecipeDetails,
  Title,
  RecipeTitle,
} from "./styles";

const RecipesWidget = () => {
  const { data: recipes = [], isValidating: loading } = useRecipes();

  return (
    <Card css={cardCSS}>
      {loading && <SpinnerLoader />}

      {!loading && !recipes?.length && (
        <NoResults>No recipes available</NoResults>
      )}

      {!loading && !!recipes?.length && (
        <RecipeContainer>
          <Carousel
            css={carouselCSS}
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            infiniteLoop
            autoPlay={false}
            stopOnHover={false}
            autoFocus={false}
            emulateTouch={true}
            dynamicHeight={false}
          >
            {recipes.map((recipe, index) => {
              return (
                <RecipeItem key={index} image={recipe.image}>
                  <Title>Recipe:</Title>
                  <RecipeDetails>
                    <span>{`${recipe.ingredients} ingredients`}</span>
                    <span>{recipe.duration}</span>
                  </RecipeDetails>
                  <RecipeTitle href={recipe.url} target="_blank">
                    {recipe.title}
                  </RecipeTitle>
                </RecipeItem>
              );
            })}
          </Carousel>
        </RecipeContainer>
      )}
    </Card>
  );
};

export default RecipesWidget;
