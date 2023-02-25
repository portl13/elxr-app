import React from "react";

import { Box, Button, Typography } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import Instruction from "./instruction-line/Instruction";
import { setInstructions } from "../../../../../store/features/create-own-recipe/create-own-recipe-slice";

export const Instructions = () => {
  const { instructions } = useAppSelector((state) => state.createOwnRecipe);

  const dispatch = useAppDispatch();

  const handleAddInstruction = () => {
    dispatch(setInstructions([...instructions, ""]));
  };

  return (
    <div className="Instructions">
      <div className="recipe-form-title">Add Instructions</div>
      <div className="recipe-form-subtitle">
        A step by step manual on how to create a recipe
      </div>
      {instructions?.length > 0 && (
        <Box paddingTop={3}>
          {instructions?.map((instruction, index) => (
            <Instruction key={index * 13} text={instruction} index={index} />
          ))}
        </Box>
      )}

      <div className="recipe-add-btn" onClick={handleAddInstruction}>
        +Add another instruction
      </div>
    </div>
  );
};
