import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { useMutation } from "@apollo/client";
import { PROFILE_RESTRICTIONS_UPDATE } from "../../../../graphql/suggestic-mutatons";
import { setChosenRestrictions } from "../../../../store/features/onboarding-prefs/onboarding-prefs-slice";

export const SetRestrictions = () => {
  const chosenRestrictions = useAppSelector(
    (state) => state.onboardingPrefs.chosenRestrictions
  );

  const dispatch = useAppDispatch();

  const [profileRestrictionsUpdate /*{data, loading, error}*/] = useMutation(
    PROFILE_RESTRICTIONS_UPDATE
  );

  useEffect(() => {
    if (chosenRestrictions.length > 0) {
      profileRestrictionsUpdate({
        variables: {
          replace: true,
          restrictions: [...chosenRestrictions],
        },
      }).then((value) => {
        if (value.data?.profileRestrictionsUpdate?.success) {
          dispatch(setChosenRestrictions([]));
        }
      });
    }
  });

  return <div className="SetRestrictions" />;
};
