import React from "react";
import dayjs from "dayjs";
import { Menu, MenuItem, Popper } from "@material-ui/core";
import Dropdown from "react-bootstrap/Dropdown";

import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import { FavoriteButton } from "../favorite-button/FavoriteButton";
import { setAddToMealPlanMode } from "../../../../../store/features/mealplan/mealplan-slice";
import { useAppSelector, useAppDispatch } from "../../../../../store/store";
import { setSelectedRecipe } from "../../../../../store/features/recipes/recipes-slice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export function ThreeDotMenu(props) {
  const classes = useStyles();
  const currentMealplan = useAppSelector(
    (state) => state.mealplan.currentMealplan
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useAppDispatch();

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
    setAnchorEl(null);
  };

  const handleAddToMealClose = (event) => {
    event.stopPropagation();
    dispatch(setSelectedRecipe(props.recipe));
    dispatch(setAddToMealPlanMode(true));
    setAnchorEl(null);
  };

  return (
    <div className="recipe-menu-wrap">
      {/* <div className="recipe-menu-btn"><img src="/img/menu-dots-dark.svg" alt="menu" /></div>
            <div className="more-action-list">
                <div className="inner-tag">
                  <div className="main-tag">
                    <div
                      className="item-link"
                    >
                      Add to Favorites
                    </div>
                  </div>
                </div>
                <div className="inner-tag">
                  <div className="main-tag">
                    <div
                      className="item-link"
                    >
                      Swap Meal
                    </div>
                  </div>
                </div>
            </div> */}

      {/* <div className="recipe-menu-btn" aria-controls="recipe-options" aria-haspopup="true" onClick={handleClick}>
        <img src="/img/menu-dots-dark.svg" alt="menu" />
      </div>
      <Menu
        id="simple-menu"
        className="recipe-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <FavoriteButton
          handleClose={handleClose}
          recipe={props.recipe}
          recipeType={props.recipeType}
          singleRecipeView={false}
        />
        {currentMealplan.length !== 0
         && !dayjs(currentMealplan[currentMealplan.length - 1]?.date).isBefore(dayjs())
                    && (<MenuItem onClick={handleAddToMealClose}>Swap Meal</MenuItem>)}
      </Menu> */}

      {/* <Popper open={open} transition disablePortal>
        <Paper className={classes.paper}>
          <MenuList>
            <MenuItem>Add to Favorites</MenuItem>
            <MenuItem>Swap meal</MenuItem>
          </MenuList>
        </Paper>
      </Popper> */}

      {props.showDots === props.recipe.id && (
        <Dropdown>
          <Dropdown.Toggle className="recipe-menu-btn" id="dropdown-basic">
            <img
              src="/img/menu-dots-dark.svg"
              alt="menu"
              onClick={() => props.setDots(props.recipe.id)}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <FavoriteButton
              handleClose={handleClose}
              recipe={props.recipe}
              recipeType={props.recipeType}
              singleRecipeView={false}
            />
            {currentMealplan.length !== 0 &&
              !dayjs(
                currentMealplan[currentMealplan.length - 1]?.date
              ).isBefore(dayjs()) && (
                <MenuItem onClick={handleAddToMealClose}>Swap meal</MenuItem>
              )}
            {/* <Dropdown.Item>Another action</Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
}
