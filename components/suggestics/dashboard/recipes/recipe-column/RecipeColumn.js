import React from "react";
import Nodata from "../../../../Nodata/index";
import { CircularProgress } from "@material-ui/core";
import { RecipeColumnItem } from "./recipe-column-item/RecipeColumnItem";
import CenterLoader from "../../../../CenterLoader/index";

export const RecipeColumn = (props) => {
  return (
    <div className="RecipeColumn">
      {props.isLoading ? (
        <CenterLoader />
      ) : (
        <div>
          {props.recipeList?.map((recipe, index) => {
            return (
              <RecipeColumnItem
                recipe={recipe}
                key={index}
                selectRecipe={props.selectRecipe}
                closeSearch={props.closeSearch}
              />
            );
          })}
        </div>
      )}
      {!props?.isLoading && props?.recipeList?.length === 0 && (
        // <div className="no-meal-col">No Meals Available</div>
        <Nodata text="No Meals Available" />
      )}
    </div>
  );
};
