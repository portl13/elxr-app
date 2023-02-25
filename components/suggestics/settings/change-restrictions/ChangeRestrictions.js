import React, { useEffect } from "react";

import { AppBar, Button, Dialog, Toolbar, Typography } from "@material-ui/core";
import { Block, Close, NavigateNext } from "@material-ui/icons";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { useMutation } from "@apollo/client";
import { PROFILE_RESTRICTIONS_UPDATE } from "../../../../graphql/suggestic-mutatons";
import { setChosenRestrictions } from "../../../../store/features/onboarding-prefs/onboarding-prefs-slice";
import { ChooseRestrictions } from "../../onboarding/slides/ChooseRestrictions";
import { FloatingButton } from "../../../../components/buttons/floating-button/FloatingButton";

export const ChangeRestrictions = () => {
  const chosenRestrictions = useAppSelector(
    (state) => state.onboardingPrefs.chosenRestrictions
  );
  const userProfile = useAppSelector((state) => state.userProfile.profile);

  const dispatch = useAppDispatch();

  const [changeRestrictionsOpen, setChangeRestrictionsOpen] =
    React.useState(false);

  const [profileRestrictionsUpdate /*{data, loading, error}*/] = useMutation(
    PROFILE_RESTRICTIONS_UPDATE
  );

  useEffect(() => {
    if (userProfile?.restrictions && userProfile?.restrictions?.length > 0) {
      dispatch(
        setChosenRestrictions(
          [...userProfile?.restrictions].map((item) => item.id)
        )
      );
    }
  }, [userProfile]);

  const handleClose = () => {
    dispatch(setChosenRestrictions([]));
    setChangeRestrictionsOpen(false);
  };

  const handleOpen = () => {
    setChangeRestrictionsOpen(true);
  };

  const handleSubmit = () => {
    setChangeRestrictionsOpen(false);
    if (chosenRestrictions.length > 0) {
      profileRestrictionsUpdate({
        variables: {
          replace: true,
          restrictions: [...chosenRestrictions],
        },
      }).then((value) => {
        if (value.data?.profileRestrictionsUpdate?.success) {
          console.log(value);
          dispatch(setChosenRestrictions([]));
        }
      });
    }
  };

  return (
    <div className="ChangeRestrictions">
      <Button
        variant="contained"
        sx={{ width: "100%" }}
        color={"secondary"}
        startIcon={<Block />}
        endIcon={<NavigateNext />}
        onClick={handleOpen}
      >
        <Typography>Change Restrictions</Typography>
      </Button>
      <Dialog fullScreen open={changeRestrictionsOpen} onClose={handleClose}>
        <AppBar
          sx={{ position: "relative", marginBottom: 2 }}
          color="transparent"
        >
          <Toolbar>
            <div>
              <Button
                variant="text"
                size={"large"}
                sx={{ width: "100%" }}
                color="error"
                startIcon={<Close />}
                onClick={handleClose}
              >
                <Typography alignSelf={"center"}>Cancel</Typography>
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        <ChooseRestrictions />
        <FloatingButton
          onClick={handleSubmit}
          bottomPosition={0}
          text={"Submit"}
        />
      </Dialog>
    </div>
  );
};
