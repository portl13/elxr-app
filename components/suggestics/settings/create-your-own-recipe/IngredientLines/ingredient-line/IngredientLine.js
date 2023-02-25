import React from "react";

import { Button, Grid, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { setIngredientLines } from "../../../../../../store/features/create-own-recipe/create-own-recipe-slice";
import { useAppDispatch, useAppSelector } from "../../../../../../store/store";

export const IngredientLine = (props) => {
  const ingredientLines = useAppSelector(
    (state) => state.createOwnRecipe.ingredientLines
  );
  const dispatch = useAppDispatch();

  /*
    TODO: draggable ingredient lines and/or adding ingredients after any other ingredient (not just at the end)
     */

  const handleRemoveIngredientLine = () => {
    const result = [...ingredientLines];
    result.splice(props.index, 1);
    dispatch(setIngredientLines(result));
  };

  const handleSaveIngredientLine = (e) => {
    let result = [...ingredientLines];
    result[props.index] = e.target.value;
    dispatch(setIngredientLines(result));
  };

  return (
    <Grid
      className="IngredientLine"
      container
      padding={1}
      spacing={1}
      alignItems="center"
    >
      <Grid item xs={12}>
        <div className="d-flex align-items-center mb-3">
          <TextField
            fullWidth
            id="ingredient-line-input"
            name="ingredient-line"
            variant="standard"
            type="text"
            value={ingredientLines[props.index]}
            onChange={(e) => handleSaveIngredientLine(e)}
          />

          {/* <div className="recipe-delete-btn" onClick={handleRemoveIngredientLine}><DeleteIcon /></div> */}
          <div
            className="recipe-delete-btn"
            onClick={handleRemoveIngredientLine}
          >
            <img src="/img/cross-icon.svg" alt="icon" />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};
