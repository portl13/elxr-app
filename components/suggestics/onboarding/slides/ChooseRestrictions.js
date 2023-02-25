import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Typography,
  List,
  ListItem,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { ProgramsList } from "../../../../store/features/onboarding-prefs/ProgramsList";
import {
  setChosenProgramId,
  setChosenRestrictions,
} from "../../../../store/features/onboarding-prefs/onboarding-prefs-slice";
import { RestrictionsDict } from "../../../../store/features/onboarding-prefs/RestrictionsDict";
import useLocalStorage from "../../../../hooks/useLocalStorage";

export const ChooseRestrictions = () => {
  const [selProgram, setSelProgram] = useState(null);
  const chosenRestrictions = useAppSelector(
    (state) => state.onboardingPrefs.chosenRestrictions
  );
  const chosenProgramId = useAppSelector(
    (state) => state.onboardingPrefs.chosenProgramId
  );
  const [program, setProgram] = useLocalStorage("program", {});

  const dispatch = useAppDispatch();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandContract = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function isChildChecked(id) {
    return chosenRestrictions?.includes(id);
  }

  function handleChildChange(id) {
    if (!chosenRestrictions.includes(id)) {
      dispatch(setChosenRestrictions([...chosenRestrictions, id]));
    } else {
      dispatch(
        setChosenRestrictions(
          chosenRestrictions.filter((currentId) => id != currentId)
        )
      );
    }
  }

  useEffect(() => {
    const temProgram = ProgramsList.data.programs.edges.filter(
      (item) => item.node.id === chosenProgramId
    );
    if (!!temProgram.length) {
      setSelProgram(temProgram[0]);
    }
    const isRestricted = program?.restrictedChildProgram?.length > 0;
    if (isRestricted) {
      dispatch(setChosenRestrictions(program.restrictedChildProgram));
    }
    const isCurrentProgram = Object.keys(program).length > 0 && program.id;
    if (isCurrentProgram) {
      const temProgram = ProgramsList.data.programs.edges.filter(
        (item) => item.node.id === program.id
      );
      if (!!temProgram.length) {
        setSelProgram(temProgram[0]);
      }
    }
  }, []);

  return (
    <div className="onboarding-mealplan-wrap">
      <div className="mealplan-card selected align-items-center d-none d-md-flex">
        <div>
          {console.log(selProgram)}
          <div className="mealplan-card-title">{selProgram?.node?.name}</div>
          <div className="mealplan-card-description">
            {selProgram?.node?.descriptionLong}
          </div>
        </div>
        <div className="mealplan-radio">
          <img src="/img/checked-circle.png" alt="icon" />
        </div>
      </div>
      <FormGroup>
        {Object.keys(RestrictionsDict).map((category) => {
          return (
            <div className="allergen-category-wrap">
              <div className="allergen-category-title">{category}</div>
              <div className="allergen-category-row">
                {RestrictionsDict[category].map((restriction) => {
                  return (
                    <div className="allergen-checkbox">
                      <label for={restriction.node.id}>
                        <input
                          type="checkbox"
                          id={restriction.node.id}
                          checked={isChildChecked(restriction.node.id)}
                          onChange={() => {
                            handleChildChange(restriction.node.id);
                          }}
                        />
                        <div className="allergen-category-btn">
                          {restriction.node.name}
                        </div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </FormGroup>
    </div>
  );
};
