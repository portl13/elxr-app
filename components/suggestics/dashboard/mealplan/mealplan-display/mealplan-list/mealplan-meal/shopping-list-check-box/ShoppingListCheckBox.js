import React from "react";

import { FormControlLabel, Radio } from "@material-ui/core";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../../store/store";
import { setToAddList } from "../../../../../../../../store/features/shopping-list/shopping-list-slice";

export const ShoppingListCheckBox = (props) => {
  const toAddList = useAppSelector((state) => state.shoppingList.toAddList);

  const dispatch = useAppDispatch();

  const isRecipeSelected = (id) => {
    return toAddList.includes(id);
  };

  const handleClick = () => {
    if (!toAddList.includes(props.recipeDatabaseId)) {
      dispatch(setToAddList([...toAddList, props.recipeDatabaseId]));
    } else {
      dispatch(
        setToAddList(
          toAddList.filter((currentId) => props.recipeDatabaseId != currentId)
        )
      );
    }
  };

  return (
    <div className="ShoppingListCheckBox">
      <FormControlLabel
        label={""}
        aria-label="Select recipe to be added to Shopping List"
        value={props.recipeDatabaseId}
        control={
          <Radio
            color={"secondary"}
            checked={isRecipeSelected(props.recipeDatabaseId)}
            onClick={handleClick}
          />
        }
      />
    </div>
  );
};
