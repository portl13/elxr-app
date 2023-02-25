import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { ProgramsList } from "../../../../store/features/onboarding-prefs/ProgramsList";
import { setChosenProgramId } from "../../../../store/features/onboarding-prefs/onboarding-prefs-slice";
import useLocalStorage from "../../../../hooks/useLocalStorage";

export const ChooseProgram = () => {
  const chosenProgramId = useAppSelector(
    (state) => state.onboardingPrefs.chosenProgramId
  );
  const dispatch = useAppDispatch();
  const [lessMore, setLessMore] = useState({});
  const [program, setProgram] = useLocalStorage("program", {});

  function isCurrentProgram(id) {
    return chosenProgramId === id;
  }

  const getSlicedDesc = (prgDescription, id) => {
    return !lessMore[id]
      ? prgDescription.substring(0, 150) + "..."
      : prgDescription;
  };

  const toggleDescription = (id) => {
    setLessMore({ ...lessMore, [id]: !lessMore[id] });
  };

  const handleCurrentProgram = () => {
    const isCurrentProgram = Object.keys(program).length > 0 && program.id;
    if (isCurrentProgram) {
      dispatch(setChosenProgramId(program.id));
    }
  };

  useEffect(() => {
    handleCurrentProgram();
  }, []);

  return (
    <div className="onboarding-mealplan-wrap">
      <RadioGroup>
        {ProgramsList.data.programs.edges.map((program) => {
          return (
            <div
              key={program.node.id}
              className={`mealplan-card ${
                !!isCurrentProgram(program.node.id) && "selected"
              } `}
            >
              <div>
                <div className="mealplan-card-title">{program.node.name}</div>
                <div className="mealplan-card-description">
                  {getSlicedDesc(program.node.descriptionLong, program.node.id)}
                  <span
                    onClick={() => toggleDescription(program.node.id)}
                    className="more-btn"
                  >
                    {!lessMore[program.node.id] ? "More" : "Less"}
                  </span>
                </div>
              </div>
              <div className="mealplan-radio mt-2">
                <FormControl>
                  <FormControlLabel
                    value={program.node.id}
                    control={
                      <Radio
                        color={"primary"}
                        // checkedIcon={<CheckCircleIcon />}
                        checkedIcon={
                          <img src="/img/checked-circle.png" alt="icon" />
                        }
                        checked={!!isCurrentProgram(program.node.id)}
                        onClick={() =>
                          dispatch(setChosenProgramId(program.node.id))
                        }
                      />
                    }
                  />
                </FormControl>
              </div>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};
