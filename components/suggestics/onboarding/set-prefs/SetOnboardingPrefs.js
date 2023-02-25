import React from "react";

import { SetProgram } from "./SetProgram";
import { SetRestrictions } from "./SetRestrictions";

export const SetOnboardingPrefs = () => {
  return (
    <div className="SetOnboardingPrefs">
      <SetProgram />
      <SetRestrictions />
    </div>
  );
};
