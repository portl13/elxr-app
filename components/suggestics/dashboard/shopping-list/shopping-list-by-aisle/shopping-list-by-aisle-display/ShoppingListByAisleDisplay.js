import React from "react";
import { useMutation } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../../../../store/store";
import {
  Typography,
  Divider,
  List,
  ListItem,
  Radio,
  Grid,
  Box,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { setIsDoneList } from "../../../../../../store/features/shopping-list/shopping-list-slice";
import { TOGGLE_SHOPPING_LIST_ITEM } from "../../../../../../graphql/suggestic-mutatons";

export const ShoppingListByAisleDisplay = (props) => {
  // const currentList = useAppSelector((state) => state.shoppingList.currentList);
  const isDoneList = useAppSelector((state) => state.shoppingList.isDoneList);

  const dispatch = useAppDispatch();

  const [toggleShoppingListItem /*{ data, loading, error }*/] = useMutation(
    TOGGLE_SHOPPING_LIST_ITEM
  );

  const handleClick = (databaseId) => {
    toggleShoppingListItem({
      variables: {
        isAggregate: true,
        itemId: databaseId,
      },
    }).then((value) => {
      if (value.data.toggleShoppingListItem.success) {
        if (!isItemChecked(databaseId)) {
          dispatch(setIsDoneList([...isDoneList, databaseId]));
        } else {
          dispatch(
            setIsDoneList(
              isDoneList.filter((currentId) => databaseId != currentId)
            )
          );
        }
      }
    });
  };

  const isItemChecked = (databaseId) => {
    return isDoneList.includes(databaseId);
  };

  return (
    <div className="ShoppingListByAisleDisplay">
      {props.aisleList.length > 0 && (
        <Box className="recipe-list">
          <Typography variant="h5">{props.aisleName}</Typography>
          <Box className="recipe-list-container">
            <List>
              {props.aisleList.map((item) => {
                const checked = isItemChecked(item.databaseId);
                return (
                  <ListItem
                    key={item.databaseId}
                    sx={{ width: "100%" }}
                    onClick={() => handleClick(item.databaseId)}
                  >
                    <Grid container alignItems="center">
                      <Grid item xs={8} className="d-flex align-items-center">
                        <Radio
                          color={"primary"}
                          checked={checked}
                          checkedIcon={
                            <img src="/img/checked-icon.svg" alt="icon" />
                          }
                        />
                        <Typography
                          sx={checked ? { textDecoration: "line-through" } : {}}
                        >
                          {item.ingredient}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography className="unit-text">
                          {item.quantity} {item.unit}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Box>
      )}
    </div>
  );
};
