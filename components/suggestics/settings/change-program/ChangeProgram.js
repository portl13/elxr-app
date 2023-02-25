import React, { useEffect } from "react";

import {
  AppBar,
  Button,
  Dialog,
  Stack,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Close, NavigateNext, TrackChanges } from "@material-ui/icons";
import { ChooseProgram } from "../../onboarding/slides/ChooseProgram";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_PROGRAM } from "../../../../graphql/suggestic-mutatons";
import { setChosenProgramId } from "../../../../store/features/onboarding-prefs/onboarding-prefs-slice";
import { FloatingButton } from "../../../../components/buttons/floating-button/FloatingButton";

export const ChangeProgram = () => {
  const chosenProgramId = useAppSelector(
    (state) => state.onboardingPrefs.chosenProgramId
  );
  const userProfile = useAppSelector((state) => state.userProfile.profile);

  const dispatch = useAppDispatch();

  const [changeProgramOpen, setChangeProgramOpen] = React.useState(false);

  const [updateUserProgram /*{ data, loading, error }*/] =
    useMutation(UPDATE_USER_PROGRAM);

  useEffect(() => {
    if (userProfile?.program?.id) {
      dispatch(setChosenProgramId(userProfile?.program?.id));
    }
  }, [userProfile]);

  const handleClose = () => {
    dispatch(setChosenProgramId(""));
    setChangeProgramOpen(false);
  };

  const handleOpen = () => {
    setChangeProgramOpen(true);
  };

  const handleSubmit = () => {
    setChangeProgramOpen(false);
    console.log("calling");
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
  };

  return (
    <div className="ChangeProgram">
      <Button
        variant="contained"
        sx={{ width: "100%" }}
        color={"secondary"}
        startIcon={<TrackChanges />}
        endIcon={<NavigateNext />}
        onClick={handleOpen}
      >
        <Typography>Change Program</Typography>
      </Button>
      <Dialog fullScreen open={changeProgramOpen} onClose={handleClose}>
        <div className="lander">
          <AppBar
            sx={{ position: "relative", marginBottom: 2 }}
            color="transparent"
          >
            <Toolbar>
              <Button
                variant="text"
                sx={{ width: "100%" }}
                color="error"
                startIcon={<Close />}
                onClick={handleClose}
              >
                <Typography alignSelf={"center"}>Cancel</Typography>
              </Button>
            </Toolbar>
          </AppBar>
          <ChooseProgram />
          <FloatingButton
            onClick={handleSubmit}
            bottomPosition={0}
            text={"Submit"}
          />
        </div>
      </Dialog>
    </div>
  );
};
