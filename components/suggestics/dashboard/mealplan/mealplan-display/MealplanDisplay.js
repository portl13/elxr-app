import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Typography, Grid, Button, Container } from "@material-ui/core";
import dayjs from "dayjs";
import { useAppSelector } from "../../../../../store/store";
import { MealplanList } from "./mealplan-list/MealplanList";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProgramsList } from "../../../../../store/features/onboarding-prefs/ProgramsList";
import ChangeProgram from "../../../../ChangeProgram/ChangeProgram";
import { EditAllergens } from "../../../../EditAllergens/EditAllergens";
import { BottomDashNav } from "../../../bottom-dash-nav/BottomDashNav";

const settings = {
  dots: false,
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export function MealplanDisplay({ updateMealPlan }) {
  const currentMealplan = useAppSelector(
    (state) => state.mealplan.currentMealplan
  );

  // debugger;
  const chosenProgramId = useAppSelector(
    (state) => state.onboardingPrefs.chosenProgramId
  );

  const { myprofile } = useAppSelector((state) => state.userProfile);

  const [programName, setProgramName] = useState("");
  const [isChangeProgramOpen, setIsChangeProgramOpen] = useState(false);
  const [isEditAllergens, setIsEditAllergens] = useState(false);

  useEffect(() => {
    const name = ProgramsList?.data?.programs?.edges.find(
      (program) => program?.node?.id == chosenProgramId
    );
    setProgramName(name?.node?.name);
  }, [chosenProgramId]);

  return (
    <div className="row">
      <div className="col-12">
        <div className="title-bar d-flex justify-content-between">
          <div className="prog_left">
            <Typography>Meals &amp; calorie board</Typography>
            <Typography variant="h1">YOUR MEAL PLAN</Typography>
            <Typography variant="subtitle1 text-white">
              {programName || myprofile?.programName}
            </Typography>
          </div>
          <BottomDashNav />
        </div>
      </div>
      <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
        <div className="button-bar d-flex justify-content-between align-items-end">
          {currentMealplan.length > 0 && (
            <Typography variant="subtitle1" className="duration">
              ({dayjs(currentMealplan[0].date).format("MMM DD")} -{" "}
              {dayjs(currentMealplan[currentMealplan.length - 1].date).format(
                "MMM DD"
              )}
              )
            </Typography>
          )}
          <div className="prog_button">
            <ul className="list-unstyled">
              <li>
                <Button
                  variant="outlined"
                  onClick={() => setIsEditAllergens(!isEditAllergens)}
                >
                  Edit Allergens
                </Button>
              </li>
              <li>
                <Button
                  variant="outlined"
                  onClick={() => setIsChangeProgramOpen(true)}
                >
                  Change Program
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <div style={{ paddingTop: 16 }}>
          <Slider {...settings}>
            {currentMealplan.map((mealPlanDay) => (
              <div
                className="MealplanDisplay"
                style={{ paddingTop: 10 }}
                key={mealPlanDay.date}
              >
                <Typography
                  variant="h5"
                  color="text.secondary"
                  fontWeight="bold"
                  textAlign="left"
                >
                  DAY {mealPlanDay.day},{" "}
                  {dayjs(mealPlanDay.date).format("dddd")}
                </Typography>
                <div>
                  <MealplanList meals={mealPlanDay.meals} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {isChangeProgramOpen && (
        <ChangeProgram
          isOpen={isChangeProgramOpen}
          handleClose={() => {
            setIsChangeProgramOpen(!isChangeProgramOpen);
            updateMealPlan();
          }}
        />
      )}
      {isEditAllergens && (
        <EditAllergens
          isOpen={isEditAllergens}
          handleClose={() => setIsEditAllergens(!isEditAllergens)}
        />
      )}
    </div>
  );
}
