import React from "react";

import { Card } from "@material-ui/core";
import { useAppSelector } from "../../../../../../store/store";

export const SUGGESTIC_NO_IMAGE_URL =
  "https://sg-data.storage.googleapis.com/images_bucket/Empty.png";

export function RecipeMainInfo() {
  const selectedRecipe = useAppSelector(
    (state) => state.recipes.selectedRecipe
  );

  return (
    <Card className="RecipeMainInfo">
      <div className="bookMark d-none">
        <img src="/img/bookmark.svg" alt="ELXR" />
      </div>
      <div className="imageLeft">
        <img
          src={
            selectedRecipe?.mainImage &&
            selectedRecipe?.mainImage !== SUGGESTIC_NO_IMAGE_URL
              ? selectedRecipe.mainImage
              : "/img/image_not_found_placeholder.png"
          }
          alt=""
        />
      </div>
    </Card>
  );
}
