import React, { useEffect } from "react";

import { BackToDashboardButton } from "../../../components/buttons/back-to-dashboard-button/BackToDashboardButton";
import { ChangeProgram } from "./change-program/ChangeProgram";
import { LogoutButton } from "../../../components/buttons/logout-button/LogoutButton";
import { Divider } from "@material-ui/core";
import { ChangeRestrictions } from "./change-restrictions/ChangeRestrictions";
import { useAppDispatch } from "../../../store/store";
import { useQuery } from "@apollo/client";
import { MY_PROFILE } from "../../../graphql/suggestic-queries";
import { setUserProfile } from "../../../store/features/user-profile/user-profile-slice";
import { ToggleImperialMetric } from "./toggle-imperial-metric/ToggleImperialMetric";
import { AboutSection } from "./about-section/AboutSection";
import { ChangePersonalInfo } from "./change-personal-info/ChangePersonalInfo";
import { ViewProgram } from "./view-program/ViewProgram";
import { ActionOutcomeDialog } from "../../../components/action-outcome-dialog/ActionOutcomeDialog";
import { CreateYourOwnRecipe } from "./create-your-own-recipe/CreateYourOwnRecipe";

export const Settings = () => {
  const dispatch = useAppDispatch();

  const { error, data /*loading, refetch, networkStatus*/ } = useQuery(
    MY_PROFILE,
    {
      variables: {},
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      // console.log(data)
      dispatch(setUserProfile(data.myProfile));
    }
  }, [data]);

  return (
    <div className="Settings">
      {/* <ActionOutcomeDialog/> */}
      <BackToDashboardButton textLabel={"Back to dashboard"} />
      <ChangePersonalInfo />
      <ViewProgram />
      <CreateYourOwnRecipe />
      <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
      <ChangeProgram />
      <ChangeRestrictions />
      <ToggleImperialMetric />
      <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
      <AboutSection />
      <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
      <LogoutButton />
    </div>
  );
};
