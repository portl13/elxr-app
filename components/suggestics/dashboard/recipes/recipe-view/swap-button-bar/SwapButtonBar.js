import React from "react";

import { Box, Paper } from "@material-ui/core";
import { useAppSelector } from "../../../../../../store/store";
import { SwapActionButton } from "./swap-action-button/SwapActionButton";

export function SwapButtonBar() {
  const selectedRecipe = useAppSelector(
    (state) => state.recipes.selectedRecipe
  );
  const ref = React.useRef(null);

  return (
    <div className="SwapButtonBar">
      <Box ref={ref} sx={{ pb: 7 }}>
        <div className="SwapButtons">
          <Box sx={{ width: "50%" }}>
            <SwapActionButton recipeId={selectedRecipe.id} everyday={false} />
          </Box>
          <Box sx={{ width: "50%" }}>
            <SwapActionButton recipeId={selectedRecipe.id} everyday />
          </Box>
        </div>
      </Box>
    </div>
  );
}
