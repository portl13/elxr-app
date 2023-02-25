import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Modal,
  ModalBody,
  FormGroup,
  Row,
  ModalFooter,
  Button,
  ModalHeader,
} from "reactstrap";
import { ChooseProgram } from "../suggestics/onboarding/slides/ChooseProgram";
import SignUpRestrictions from "../../pages/signup-restrictions";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../store/store";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useMutation } from "@apollo/client";
import { GENERATE_MEALPLAN } from "../../graphql/suggestic-mutatons";
import { ChooseRestrictions } from "../suggestics/onboarding/slides/ChooseRestrictions";
import { ProgramsList } from "../../store/features/onboarding-prefs/ProgramsList";
import GradientButton from "../ui/button/GradientButton";
import { setCurrentMealplan } from "../../store/features/mealplan/mealplan-slice";
import { setFailureDialog } from "../../store/features/dialog/dialog-slice";
import dayjs from "dayjs";
import { useAlert } from "react-alert";
import { TIMEOUT } from "../../utils/constant";

export const EditAllergens = ({ isOpen, handleClose }) => {
  const [selProgram, setSelProgram] = useState(null);
  const chosenProgramId = useAppSelector(
    (state) => state.onboardingPrefs.chosenProgramId
  );
  const chosenRestrictions = useAppSelector(
    (state) => state.onboardingPrefs.chosenRestrictions
  );
  const isLoading = useAppSelector((state) => state.loader.isLoading);
  const [program, setProgram] = useLocalStorage("program", {});

  const alert = useAlert();

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
        handleClose();
        alert.success("Changes have been updated successfully.", TIMEOUT);
      } else {
        dispatch(
          setFailureDialog(
            "An error occurred while generating a new Meal Plan..."
          )
        );
      }
    });
  };

  useEffect(() => {
    const temProgram = ProgramsList.data.programs.edges.filter(
      (item) => item.node.id === chosenProgramId
    );
    if (!!temProgram.length) {
      setSelProgram(temProgram[0]);
    }
  });

  return (
    <>
      <Head>
        <title>Edit Allergens</title>
      </Head>
      <Modal
        className="modal-dialog-centered full-screen-modal"
        scrollable
        isOpen={isOpen}
        toggle={handleClose}
      >
        <div className="container">
          <ModalBody>
            <button
              onClick={handleClose}
              type="button"
              className="close modal-cancel assessment-cancel fixed-cancel"
            >
              Cancel
            </button>
            <div className="assessment-layout">
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
                  Before we generate a plan for you, we would like to know if
                  you are allergic to any ingredients.
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
          </ModalBody>
          <div className="copyright-text">
            Copyright © 2010-2023 ELXR. All rights reserved.
          </div>
        </div>
      </Modal>
    </>
  );
};
