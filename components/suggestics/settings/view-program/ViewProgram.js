import React, { useEffect } from "react";

import {
  AppBar,
  Button,
  CircularProgress,
  Dialog,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  NavigateBefore,
  NavigateNext,
  VisibilityOutlined,
} from "@material-ui/icons";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { useQuery } from "@apollo/client";
import { MY_PROFILE } from "../../../../graphql/suggestic-queries";
import { setUserProfile } from "../../../../store/features/user-profile/user-profile-slice";
import { ProgramRule } from "./program-rule/ProgramRule";

export const ViewProgram = () => {
  const userProfile = useAppSelector((state) => state.userProfile.profile);
  const [viewProgramOpen, setViewProgramOpen] = React.useState(false);

  const dispatch = useAppDispatch();

  const { loading, error, data /*refetch, networkStatus*/ } = useQuery(
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

  const handleClose = () => {
    setViewProgramOpen(false);
  };

  const handleOpen = () => {
    setViewProgramOpen(true);
  };

  return (
    <div className="ViewProgram">
      <Button
        variant="contained"
        sx={{ width: "100%" }}
        color={"secondary"}
        startIcon={<VisibilityOutlined />}
        endIcon={<NavigateNext />}
        onClick={handleOpen}
      >
        <Typography>View Program</Typography>
      </Button>
      <Dialog fullScreen open={viewProgramOpen} onClose={handleClose}>
        <AppBar
          sx={{ position: "relative", marginBottom: 2 }}
          color="transparent"
        >
          <Toolbar>
            <Button
              variant="text"
              size={"large"}
              sx={{ width: "100%" }}
              color="warning"
              startIcon={<NavigateBefore />}
              onClick={handleClose}
            >
              <Typography alignSelf={"center"}>Back</Typography>
            </Button>
          </Toolbar>
        </AppBar>
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <Paper>
            <Typography
              variant="h5"
              padding={2}
              paddingBottom={0}
              component="div"
              textAlign="center"
            >
              {userProfile?.program?.name}
            </Typography>
            <Typography
              variant="body2"
              padding={2}
              component="div"
              textAlign="left"
            >
              {userProfile?.program?.descriptionLong}
            </Typography>
            <ProgramRule
              title={"Increase"}
              items={userProfile?.program?.cpcsIngredientGroups?.increase}
            />
            <ProgramRule
              title={"Decrease"}
              items={userProfile?.program?.cpcsIngredientGroups?.decrease}
            />
            <ProgramRule
              title={"Avoid"}
              items={userProfile?.program?.cpcsIngredientGroups?.avoid}
            />
          </Paper>
        )}
      </Dialog>
    </div>
  );
};
