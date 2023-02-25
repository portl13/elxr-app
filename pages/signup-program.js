import React, { useEffect, useContext } from "react";
import Router, { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../store/store";

import GradientButton from "../components/ui/button/GradientButton";
import { ChooseProgram } from "../components/suggestics/onboarding/slides/ChooseProgram";
import { UserContext } from "../context/UserContext";
import BlockUi from "../components/ui/blockui/BlockUi";
import useLocalStorage from "../hooks/useLocalStorage";
import { UPDATE_USER_PROGRAM } from "../graphql/suggestic-mutatons";
import { setChosenProgramId } from "../store/features/onboarding-prefs/onboarding-prefs-slice";
import { setLoaderStatus } from "../store/features/loader/loader-slice";

import { useMutation } from "@apollo/client";
import { Container } from "@material-ui/core";
import Loader from "../components/loader";

const SignupProgram = () => {
  const { user } = useContext(UserContext);
  const chosenProgramId = useAppSelector(
    (state) => state.onboardingPrefs.chosenProgramId
  );
  const isLoading = useAppSelector((state) => state.loader.isLoading);

  const router = useRouter();

  const isEditMode = router.pathname === "/signup-program";

  const [updateUserProgram] = useMutation(UPDATE_USER_PROGRAM);
  const [program, setProgram] = useLocalStorage("program", {});

  const dispatch = useAppDispatch();

  const goToNextPage = () => {
    dispatch(setLoaderStatus(true));
    updateUserProgram({
      variables: {
        programId: chosenProgramId,
      },
    })
      .then((value) => {
        if (value.data?.updateUserProgram?.success) {
          dispatch(setChosenProgramId(chosenProgramId));
          const chosenProgram = {
            ...program,
            id: chosenProgramId,
          };
          setProgram(chosenProgram);
          dispatch(setLoaderStatus(false));
          Router.push("/signup-restrictions");
        }
      })
      .catch(() => dispatch(setLoaderStatus(false)));
  };

  const goToHomePage = () => {
    Router.push("/my_dashboard");
  };

  return (
    <div className="assessment-layout">
      {isEditMode && (
        <Container maxWidth="lg" className="main-inner">
          <div className="assessment-btn-row container justify-content-end">
            <div
              className="onboarding-skip"
              disabled={chosenProgramId === ""}
              onClick={goToHomePage}
            >
              Skip
            </div>
          </div>
        </Container>
      )}
      <div className="assessment-wrap">
        <img
          src="/img/brand/logo.png"
          alt="ELXR Logo"
          className="assessment-logo d-none d-md-block"
        />
        <img
          src="/img/logo.png"
          alt="ELXR Logo"
          className="assessment-logo d-md-none"
        />

        <div className="onboarding-title">Start a new meal program</div>
        <div className="onboarding-subtitle px-4">
          Hi {user?.name}, Do you want to add meals to your daily schedule? Just
          select a programe and we will help you identify the dishes.
        </div>
        <ChooseProgram />
      </div>

      <div className="onboarding-fixed-btn">
        <GradientButton
          type="submit"
          disabled={chosenProgramId === ""}
          onClick={() => goToNextPage()}
          className="btn-block"
        >
          {isLoading ? <Loader /> : "Select & Proceed"}
        </GradientButton>
        <div className="copyright-text">
          Copyright © 2010-2023 ELXR. All rights reserved.
        </div>
      </div>
      {/* {isLoading && <BlockUi color="#eb1e79" />} */}
    </div>
  );
};

export default SignupProgram;
