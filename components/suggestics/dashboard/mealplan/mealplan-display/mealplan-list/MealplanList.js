import React from "react";

import { MealplanMeal } from "./mealplan-meal/MealplanMeal";
import { RecipeMealTime } from "@suggestic/sdk/dist/__generated_sdk";
import { useSelector } from "react-redux";
import MealUpdateModal from "../MealUpdateModal";

const CarrouselChannelEvents = ({ category, typeEvent }) => {
  const [artistList, setArtist] = useState([]);
  const noEvent = artistList && artistList?.length === 0;

  useEffect(() => {
    getArtistList({
      per_page: 20,
      page: 1,
      category: category,
      status: typeEvent,
    })
      .then((res) => {
        setArtist(res.data);
      })
      .catch(() => {});
  }, [category]);
};

export const MealplanList = (props) => {
  const { mealplanModal } = useSelector((state) => state.mealplan);

  return (
    <div className="MealplanList">
      <div>
        {[...props.meals]
          .sort((item1, item2) => {
            // sort meals by meal time
            if (item1.meal.toUpperCase() === RecipeMealTime.Breakfast)
              return -1;
            if (item2.meal.toUpperCase() === RecipeMealTime.Breakfast) return 1;
            if (item1.meal.toUpperCase() === RecipeMealTime.Snack) return -1;
            if (item2.meal.toUpperCase() === RecipeMealTime.Snack) return 1;
            if (item1.meal.toUpperCase() === RecipeMealTime.Lunch) return -1;
            if (item2.meal.toUpperCase() === RecipeMealTime.Lunch) return 1;
            return -1;
          })
          .map((meal, index) => {
            return (
              <MealplanMeal
                meal={meal}
                key={meal?.recipe?.name + "-" + index.toString()}
              />
            );
          })}
      </div>
    </div>
  );
};
