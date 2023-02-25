import React, { useEffect } from "react";

import {
  Box,
  InputAdornment,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { useLazyQuery } from "@apollo/client";
import { COMMON_FOODS } from "../../../../../graphql/suggestic-queries";
import {
  setIngredientSearchResults,
  setIngredientSearchTerm,
} from "../../../../../store/features/create-own-recipe/create-own-recipe-slice";
import { IngredientToAdd } from "./ingredient-to-add/IngredientToAdd";
import { AddedIngredient } from "./added-ingredient/AddedIngredient";

export const Ingredients = () => {
  const ingredientSearchTerm = useAppSelector(
    (state) => state.createOwnRecipe.ingredientSearchTerm
  );
  const ingredientSearchResults = useAppSelector(
    (state) => state.createOwnRecipe.ingredientSearchResults
  );
  const recipeIngredients = useAppSelector(
    (state) => state.createOwnRecipe.recipeIngredients
  );

  const dispatch = useAppDispatch();

  const [commonFoods, { data, error /*loading */ }] = useLazyQuery(
    COMMON_FOODS,
    {
      variables: {
        first: 20,
        query: ingredientSearchTerm,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    if (ingredientSearchTerm !== "") {
      commonFoods();
    } else {
      // reset results
      dispatch(setIngredientSearchResults([]));
    }
  }, [ingredientSearchTerm]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      // console.log(data)
      if (ingredientSearchTerm !== "") {
        dispatch(
          setIngredientSearchResults(
            data.commonFoods?.edges?.map((item) => {
              return {
                name: item.node.name,
                foodId: item.node.id,
                quantity: "",
                isInGrams: true,
              };
            })
          )
        );
      } else {
        dispatch(setIngredientSearchResults([]));
      }
    }
  }, [data]);

  return (
    <div className="Ingredients">
      {ingredientSearchTerm !== "" && ingredientSearchResults?.length > 0 && (
        <Paper className="ingredient-list-wrap">
          <List sx={{ width: "100%" }}>
            {ingredientSearchResults?.map((ingredient, index) => {
              return (
                <ListItem className="ingredient-list">
                  <IngredientToAdd
                    key={"ingredient search result: " + index}
                    ingredient={ingredient}
                  />
                </ListItem>
              );
            })}
          </List>
        </Paper>
      )}

      <div className="selected-ingredient-wrap">
        {/* <Typography variant="h6" gutterBottom textAlign="left">
                    Ingredients
                </Typography> */}

        <TextField
          placeholder="Search for ingredients..."
          type="search"
          value={ingredientSearchTerm}
          sx={{
            width: "100%",
            marginTop: 1,
            marginBottom: 0,
          }}
          color="secondary"
          // InputProps={{
          //     startAdornment: (
          //         <InputAdornment position="start">
          //             <Search/>
          //         </InputAdornment>
          //     )
          // }}
          onChange={(e) => dispatch(setIngredientSearchTerm(e?.target?.value))}
        />
        {recipeIngredients?.length > 0 && (
          <Box paddingTop={3}>
            {recipeIngredients?.map((ingredient, index) => {
              return (
                <AddedIngredient
                  key={"chosen ingredient: " + index}
                  ingredient={ingredient}
                />
              );
            })}
          </Box>
        )}
      </div>
    </div>
  );
};
