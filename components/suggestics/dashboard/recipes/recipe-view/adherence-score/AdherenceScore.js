import React from "react";

import { useAppSelector } from "@store/store";
import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";

import BookMarkButton from "@/components/buttons/bookmark-button/BookmarkButton";

import { FoodScoreRow } from "./AdherenceScore.style";

export const AdherenceScore = () => {
  const selectedRecipe = useAppSelector(
    (state) => state.recipes.selectedRecipe
  );

  const adherenceScore = Math.floor(
    selectedRecipe?.adherenceDetails?.score / 10
  );

  return (
    <>
      <FoodScoreRow>
        <div className="foodScore">
          {" "}
          <span className="text-white">
            <strong>Adherence Score: </strong>
          </span>
          {selectedRecipe?.adherenceDetails?.score >= 65 ? (
            <span className="like darkgreen">
              <img src="/img/like.svg" alt="ELXR" />{" "}
              {!!adherenceScore
                ? adherenceScore < 10
                  ? "0" + adherenceScore
                  : adherenceScore
                : ""}
            </span>
          ) : selectedRecipe?.adherenceDetails?.score >= 40 ? (
            <span className="like darkorange">
              <img src="/img/like.svg" alt="ELXR" />{" "}
              {!!adherenceScore
                ? adherenceScore < 10
                  ? "0" + adherenceScore
                  : adherenceScore
                : ""}
            </span>
          ) : (
            <span className="like darkred">
              <img src="/img/like.svg" alt="ELXR" />{" "}
              {!!adherenceScore ? adherenceScore : ""}
            </span>
          )}
        </div>

        <BookMarkButton />
      </FoodScoreRow>

      <p className="healthTagLine">{selectedRecipe?.adherenceDetails?.title}</p>
    </>
  );
};
