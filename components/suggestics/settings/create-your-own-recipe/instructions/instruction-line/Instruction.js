import React, { memo, useState } from "react";

import { Button, Grid, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { setInstructions } from "../../../../../../store/features/create-own-recipe/create-own-recipe-slice";

function Instruction(props) {
  const { instructions } = useSelector((state) => state.createOwnRecipe);

  const dispatch = useDispatch();

  const handleRemoveInstructions = () => {
    const result = [...instructions];
    result.splice(props.index, 1);
    dispatch(setInstructions(result));
  };

  const handleSaveInstruction = (e) => {
    const result = [...instructions];
    result[props.index] = e.target.value;
    dispatch(setInstructions(result));
  };

  return (
    <Grid
      className="Instruction"
      container
      padding={1}
      spacing={1}
      alignItems="center"
      key={props.key}
    >
      <Grid item xs={12}>
        <div className="d-flex align-items-center mb-3">
          <TextField
            fullWidth
            id="instruction-input"
            name="instruction"
            variant="standard"
            type="text"
            value={instructions[props.index]}
            onChange={(e) => handleSaveInstruction(e)}
          />
          <button
            className="recipe-delete-btn"
            onClick={() => handleRemoveInstructions(props.text)}
          >
            <img src="/img/cross-icon.svg" alt="icon" />
          </button>
        </div>
      </Grid>
    </Grid>
  );
}

export default memo(Instruction);
