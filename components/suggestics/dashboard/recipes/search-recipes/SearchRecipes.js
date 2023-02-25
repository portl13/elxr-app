import React, { useEffect, useRef, useState } from "react";

import { Search } from "@material-ui/icons";

import {
  Tabs,
  Tab,
  InputAdornment,
  List,
  ListItem,
  TextField,
  Button,
} from "@material-ui/core";
import { CreateYourOwnRecipe } from "../../../settings/create-your-own-recipe/CreateYourOwnRecipe";
import { useQuery } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import {
  setCurrentSearchTerm,
  setOnPlanSearchResults,
  setOtherSearchResults,
} from "../../../../../store/features/recipes/recipes-slice";
import { SEARCH_RECIPE_BY_NAME_OR_INGREDIENT } from "../../../../../graphql/suggestic-queries";
import { RecipeColumn } from "../recipe-column/RecipeColumn";
import { SearchTabPanel } from "./SearchTabPanel";
import useOnClickOutSide from "../../../../../hooks/useOnClickOutside";
import { BottomDashNav } from "../../../bottom-dash-nav/BottomDashNav";

export function SearchRecipes() {
  const [isRecipeOpen, setIsRecipeOpen] = useState(false);

  const inputRef = useRef();
  const [showResults, setShowResults] = useState(false);
  const currentSearchTerm = useAppSelector(
    (state) => state.recipes.currentSearchTerm
  );
  const onPlanSearchResults = useAppSelector(
    (state) => state.recipes.onPlanSearchResults
  );
  const otherSearchResults = useAppSelector(
    (state) => state.recipes.otherSearchResults
  );

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useAppDispatch();

  useOnClickOutSide(inputRef, () => setShowResults(false));

  const { error, data, refetch, loading } = useQuery(
    SEARCH_RECIPE_BY_NAME_OR_INGREDIENT,
    {
      variables: {
        query: currentSearchTerm,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      dispatch(
        setOnPlanSearchResults(
          [...data.searchRecipeByNameOrIngredient?.onPlan].sort(
            (item1, item2) =>
              item1.name === item2.name ? 0 : item1.name < item2.name ? -1 : 1
          )
        )
      );
      dispatch(
        setOtherSearchResults(
          [...data.searchRecipeByNameOrIngredient?.otherResults].sort(
            (item1, item2) =>
              item1.name === item2.name ? 0 : item1.name < item2.name ? -1 : 1
          )
        )
      );
    }
  }, [data]);

  return (
    <>
      <div className="d-flex align-items-md-center align-items-start justify-content-between mb-4 flex-column flex-md-row page-header">
        <div>
          <div className="page-title">ELXR RECIPES</div>
          <div className="page-subtitle">
            Find your favourite recipes on ELXR &amp; add them to your daily
            meals!
          </div>
        </div>
        <BottomDashNav />
      </div>
      {/* <div>
        <div className="page-title">ELXR RECIPES</div>
        <div className="page-subtitle">
          Find your favourite recipes on ELXR &amp; add them to your daily
          meals!
        </div>
      </div> */}
      <div className="SearchRecipes search-box mt-4 mb-3 d-flex align-items-center justify-content-between">
        <TextField
          variant="outlined"
          type="search"
          placeholder="Search"
          value={currentSearchTerm}
          onFocus={() => setShowResults(true)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            e.preventDefault();
            dispatch(setCurrentSearchTerm(e.target.value));
            refetch();
          }}
        />
        {/* <RecipeView showAddToMealPlanButton={true}/> */}
        {showResults && (
          <div ref={inputRef} className="search-result-box">
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
            >
              <Tab label="On Plan" {...a11yProps(0)} />
              <Tab label="Other Results" {...a11yProps(1)} />
            </Tabs>
            <SearchTabPanel
              className="recipe-search-wrap"
              value={value}
              index={0}
            >
              {!loading && onPlanSearchResults?.length === 0 && (
                <span className="noresult">No Results found!</span>
              )}

              {/* <Typography
                      variant={"body2"}
                      margin={"auto"}
                      color={"secondary"}
                    >
                    </Typography> */}

              <List>
                <ListItem>
                  {/* <ListItemText
                                        secondary="Search results that match your program and personal preferences"
                                    /> */}
                </ListItem>
                <span className="foundresult">
                  {onPlanSearchResults.length !== 0 &&
                    `${onPlanSearchResults.length} RESULT${
                      onPlanSearchResults?.length > 1 ? "S" : ""
                    } FOUND`}
                </span>
                {onPlanSearchResults.length > 0 && (
                  <RecipeColumn
                    recipeList={onPlanSearchResults}
                    isLoading={false}
                    selectRecipe={false}
                    closeSearch={() => dispatch(setCurrentSearchTerm(""))}
                  />
                )}
              </List>
            </SearchTabPanel>
            <SearchTabPanel
              className="recipe-search-wrap"
              value={value}
              index={1}
            >
              {!loading && otherSearchResults?.length === 0 && (
                <span className="noresult">No Results found!</span>
              )}
              <List>
                <ListItem>
                  {/* <ListItemText
                    primary="Other Results"
                    secondary="Recipes that match your search but are outside of your program and preferences"
                  /> */}
                </ListItem>
                <span className="foundresult">
                  {otherSearchResults.length !== 0 &&
                    `${otherSearchResults.length} RESULT${
                      otherSearchResults?.length > 1 ? "S" : ""
                    } FOUND`}
                </span>
                {otherSearchResults.length > 0 && (
                  <RecipeColumn
                    recipeList={otherSearchResults}
                    isLoading={false}
                    selectRecipe={false}
                    closeSearch={() => dispatch(setCurrentSearchTerm(""))}
                  />
                )}
              </List>
            </SearchTabPanel>
          </div>
        )}
        <div className="add-recipe-btn prog_button">
          <Button
            className="px-35"
            variant="outlined"
            onClick={() => setIsRecipeOpen(!isRecipeOpen)}
          >
            + Create a new recipe
          </Button>
          {isRecipeOpen && (
            <CreateYourOwnRecipe
              isOpen={isRecipeOpen}
              handleClose={() => setIsRecipeOpen(!isRecipeOpen)}
            />
          )}
        </div>
      </div>
    </>
  );
}
