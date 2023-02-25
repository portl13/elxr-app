import React, { useEffect, useState } from "react";
import Router from "next/router";

import dayjs from "dayjs";
import { useMutation } from "@apollo/client";
import { GENERATE_MEALPLAN } from "../graphql/suggestic-mutatons";
import { setCurrentMealplan } from "../store/features/mealplan/mealplan-slice";
import { useAppDispatch, useAppSelector } from "../store/store";
import BlockUi from "../components/ui/blockui/BlockUi";
import GradientButton from "../components/ui/button/GradientButton";
import { ProgramsList } from "../store/features/onboarding-prefs/ProgramsList";
import { ChooseRestrictions } from "../components/suggestics/onboarding/slides/ChooseRestrictions";
import useLocalStorage from "../hooks/useLocalStorage";
import { Container } from "@material-ui/core";

const SignUpRestrictions = () => {
  const [selProgram, setSelProgram] = useState(null);
  const chosenProgramId = useAppSelector(
    (state) => state.onboardingPrefs.chosenProgramId
  );
  const chosenRestrictions = useAppSelector(
    (state) => state.onboardingPrefs.chosenRestrictions
  );
  const isLoading = useAppSelector((state) => state.loader.isLoading);
  const [program, setProgram] = useLocalStorage("program", {});

  const [generateNewMealPlan] = useMutation(GENERATE_MEALPLAN);

  const dispatch = useAppDispatch();

  const generateMealPlan = () => {
    const chosenProgram = {
      ...program,
      restrictedChildProgram: chosenRestrictions,
    };
    setProgram(chosenProgram);
    generateNewMealPlan({
      variables: {
        ignoreLock: true,
        includeFavorites: true,
      },
    }).then((value) => {
      if (
        value.data?.generateMealPlan?.success &&
        value.data?.generateMealPlan?.mealPlan
      ) {
        dispatch(
          setCurrentMealplan(
            [...value.data.generateMealPlan.mealPlan]
              .sort((item1, item2) => {
                if (item1 === item2) return 0;
                return dayjs(item1.date).isBefore(dayjs(item2.date)) ? -1 : 1;
              })
              .slice(-7)
          )
        );
        Router.push("/mealplan-success");
      } else {
        dispatch(
          setFailureDialog(
            "An error occurred while generating a new Meal Plan..."
          )
        );
      }
    });
  };

  const goToHomePage = () => {
    Router.push("/my_dashboard");
  };

  const goToBack = () => {
    Router.push("/signup-program");
  };

  useEffect(() => {
    const isCurrentProgram = Object.keys(program).length > 0 && program.id;
    if (!isCurrentProgram) {
      goToBack();
      return;
    }
    const temProgram = ProgramsList.data.programs.edges.filter(
      (item) => item.node.id === chosenProgramId
    );
    if (!!temProgram.length) {
      setSelProgram(temProgram[0]);
    }
  }, []);

  return (
    <div className="assessment-layout">
      <Container maxWidth="lg" className="main-inner">
        <div className="assessment-btn-row justify-content-between">
          <div className="onboarding-back d-none d-md-flex" onClick={goToBack}>
            {" "}
            <img src="/img/back-arrow.svg" alt="back" /> Back
          </div>
          <div className="onboarding-back d-md-none">
            {" "}
            <img src="/img/back-icon.svg" alt="back" />
          </div>
          <div className="onboarding-skip" onClick={goToHomePage}>
            Skip
          </div>
        </div>
      </Container>
      <div className="assessment-wrap">
        <img
          src="/img/brand/logo-icon.png"
          alt="ELXR Logo"
          className="assessment-logo"
        />
        <div className="selected-mealplan">
          <div className="meal-label">MEAL PLAN SELECTED:</div>
          <div className="meal-title">{selProgram?.node?.name}</div>
        </div>
        <div className="onboarding-title">Allergens</div>
        <div className="onboarding-subtitle">
          Before we generate a plan for you, we would like to know if you are
          allergic to any ingredients.
        </div>
        <ChooseRestrictions />
      </div>
      <div className="onboarding-fixed-btn">
        <GradientButton
          type="submit"
          onClick={generateMealPlan}
          className="btn-block"
        >
          Generate Meal Plan
        </GradientButton>
        <div className="copyright-text">
          Copyright © 2010-2023 ELXR. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default SignUpRestrictions;
