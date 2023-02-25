import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_PROGRAM } from "../../../../graphql/suggestic-mutatons";
import { setChosenProgramId } from "../../../../store/features/onboarding-prefs/onboarding-prefs-slice";

export const SetProgram = () => {
  const chosenProgramId = useAppSelector(
    (state) => state.onboardingPrefs.chosenProgramId
  );

  const dispatch = useAppDispatch();

  const [updateUserProgram /*{ data, loading, error }*/] =
    useMutation(UPDATE_USER_PROGRAM);

  useEffect(() => {
    if (chosenProgramId != "") {
      updateUserProgram({
        variables: {
          programId: chosenProgramId,
        },
      }).then((value) => {
        if (value.data?.updateUserProgram?.success) {
          dispatch(setChosenProgramId(""));
        }
      });
    }
  });

  return <div className="SetProgram" />;
};
